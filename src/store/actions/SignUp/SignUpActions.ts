import Api from '@config/Api';
import { Alert, Platform } from 'react-native';
import * as navigation from '@screens/RootNavigation';
import {
  SIGN_UP_SENDING_DATA,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_SENDING_ATHLETE_IMAGE,
  SIGN_UP_SENDING_GROUP_IMAGE,
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

const handleError =
  ({ message, type }: HandleErrorProps) =>
  (dispatch: any) => {
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
      let hasError = false;
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
            hasError = true;
            return handleError({});
          }
          token = response.data.token;

          return dispatch({
            type: SIGN_UP_SUCCESS,
          });
        } catch (err) {
          hasError = true;
          return handleError({});
        }
      }

      await sendData();
      await dispatch(
        SignUpActions.SendImage({
          image: athlete_image as ImageData,
          token,
          image_type: 'athlete',
        }),
      );
      if (!isAdvisor) {
        return;
      }
      // navigation.navigate({ name: 'SignUpCompleted', reset: true });

      await dispatch(
        SignUpActions.SendImage({
          image: group_image as ImageData,
          token,
          image_type: 'group',
        }),
      );
      console.log('passoooooooou');
    };
  },

  SendImage: ({ image, token, image_type }: SendImageProps) => {
    return async (dispatch: any) => {
      dispatch({
        type:
          image_type === 'athlete' ? SIGN_UP_SENDING_ATHLETE_IMAGE : SIGN_UP_SENDING_GROUP_IMAGE,
      });
      let hasError = false;

      console.log(`sending ${image_type} image`);

      async function sendImage() {
        if (hasError) {
          return;
        }

        try {
          const response = await Api.patch(
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
            console.log(response);

            hasError = true;
            return handleError({});
          }
          // Se for athlete of monitor, encerrar aqui e navegar para a prox tela de cadastro concluido.
          //Se for advisor, ir para a prox função, enviar a imagem do grupo e navegar para a prox tela de cadastro concluido.
          // navigation.navigate({ name: 'Initial', reset: true });
          return dispatch({
            type: SIGN_UP_SUCCESS,
          });
        } catch (err) {
          hasError = true;
          return handleError({});
        }
      }

      await sendImage();
      console.log('passoooooooou');
    };
  },
};