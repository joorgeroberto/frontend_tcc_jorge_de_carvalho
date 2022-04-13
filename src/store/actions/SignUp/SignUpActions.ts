import Api from '@config/Api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigation from '@screens/RootNavigation';
import {
  SIGN_UP_SENDING_DATA,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SENDING_ATHLETE_IMAGE,
  SIGN_UP_SENDING_GROUP_IMAGE,
  GET_GROUP_LIST,
  GET_GROUP_LIST_SUCCESS,
  GET_GROUP_LIST_FAIL,
} from './types';

interface CreateFormDataProps {
  image: ImageData;
  body?: object;
}

interface SendImageProps {
  image_type: 'athlete' | 'group';
  image: ImageData;
  token: string;
}

interface HandleErrorProps {
  message?: string;
  type?: string;
}

const createFormData = ({ image, body = {} }: CreateFormDataProps) => {
  const { multipartFormName, fileName, type, uri } = image;
  const data = new FormData();

  data.append(multipartFormName, {
    name: fileName,
    type: type,
    uri: uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key as keyof object]);
  });

  return data;
};

let hasError = false;
const handleError =
  ({ message, type }: HandleErrorProps) =>
  (dispatch: any) => {
    hasError = true;
    Alert.alert(
      'Ocorreu um erro',
      message || 'Por favor, verifique os seus dados e tente novamente',
    );
    return dispatch({
      type: type || SIGN_UP_FAIL,
    });
  };

export const SignUpActions = {
  SignUp: ({
    name,
    user_type,
    password,
    athlete_image,
    email,
    phone,
    birthdate,
    gender,
    group_id,
    group_name,
    athletes_quantity,
    group_image,
  }: SignUpData) => {
    return async (dispatch: any) => {
      dispatch({ type: SIGN_UP_SENDING_DATA });
      hasError = false;
      let token = '';

      const isAdvisor =
        user_type === 'advisor' &&
        group_name &&
        group_name?.length > 0 &&
        athletes_quantity &&
        athletes_quantity > 0;

      async function getAthleteParams() {
        const athleteParams = {
          name,
          user_type,
          password,
          email,
          phone: phone.replace(/[^0-9]/g, ''),
          birthdate,
          gender,
          group_id,
          group_name,
          athletes_quantity,
        };
        if (isAdvisor) {
          await delete athleteParams.group_id;
          return athleteParams;
        } else {
          return athleteParams;
        }
      }

      async function sendData() {
        if (hasError) {
          return;
        }

        try {
          const response: any = await Api.post('/athletes', await getAthleteParams(), {
            headers: { 'Content-Type': 'application/json' },
          });
          const problemExists = response?.problem && response?.data;
          if (problemExists) {
            return dispatch(handleError({ message: response?.data.message }));
          }
          token = response.data.token;
          try {
            await AsyncStorage.setItem('token', token);
          } catch (e) {
            dispatch(
              handleError({
                message: 'Erro ao salvar o token. Por favor, tente novamente mais tarde.',
              }),
            );
          }
          return dispatch({
            type: SIGN_UP_SUCCESS,
          });
        } catch (err) {
          return dispatch(handleError({}));
        }
      }

      await sendData();
      if (hasError) {
        return;
      }
      await dispatch(
        SignUpActions.SendImage({
          image: athlete_image as ImageData,
          token,
          image_type: 'athlete',
        }),
      );
      if (!isAdvisor) {
        navigation.navigate({ name: 'SignUpCompleted', reset: true });
        return;
      }
      if (hasError) {
        return;
      }

      await dispatch(
        SignUpActions.SendImage({
          image: group_image as ImageData,
          token,
          image_type: 'group',
        }),
      );

      navigation.navigate({ name: 'SignUpCompleted', params: { isAdvisor: true }, reset: true });
    };
  },

  SendImage: ({ image, token, image_type }: SendImageProps) => {
    return async (dispatch: any) => {
      dispatch({
        type:
          image_type === 'athlete' ? SIGN_UP_SENDING_ATHLETE_IMAGE : SIGN_UP_SENDING_GROUP_IMAGE,
      });
      hasError = false;

      async function sendImage() {
        if (hasError) {
          return;
        }

        try {
          const response: any = await Api.patch(
            image_type === 'athlete' ? '/athletes/image' : '/athletesGroup/image',
            createFormData({ image: image as ImageData }),
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const problemExists = response?.problem && response?.data;
          if (problemExists) {
            return dispatch(handleError({ message: response?.data.message }));
          }
          // Se for athlete of monitor, encerrar aqui e navegar para a prox tela de cadastro concluido.
          //Se for advisor, ir para a prox função, enviar a imagem do grupo e navegar para a prox tela de cadastro concluido.
          // navigation.navigate({ name: 'Initial', reset: true });
          return dispatch({
            type: SIGN_UP_SUCCESS,
          });
        } catch (err) {
          return dispatch(handleError({}));
        }
      }

      await sendImage();
    };
  },

  GetGroupList: () => {
    return async (dispatch: any) => {
      dispatch({ type: GET_GROUP_LIST });
      hasError = false;

      try {
        const response: any = await Api.get(
          '/athletesGroup',
          {},
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );
        const problemExists = response?.problem && response?.data;
        if (problemExists) {
          return dispatch(
            handleError({ type: GET_GROUP_LIST_FAIL, message: response?.data.message }),
          );
        }
        dispatch({
          type: GET_GROUP_LIST_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch(handleError({ type: GET_GROUP_LIST_FAIL }));
      }
    };
  },
};
