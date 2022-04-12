import Api from '@config/Api';
import { Alert, Platform } from 'react-native';
import * as navigation from '@screens/RootNavigation';
import { SIGN_UP_SENDING_DATA, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from './types';

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

      const isAdvisor =
        user_type === 'advisor' &&
        group_name &&
        group_name?.length > 0 &&
        athletes_quantity &&
        athletes_quantity > 0 &&
        group_image.length > 0;
      //&&
      // athlete_image &&
      // athlete_image?.length > 0 &&
      // group_image &&
      // group_image?.length > 0;

      function handleError() {
        Alert.alert('Ocorreu um erro', 'Por favor, verifique os seus dados e tente novamente');
        hasError = true;
        return dispatch({
          type: SIGN_UP_FAIL,
        });
      }

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
          const response = await Api.post('/athletes', await getAthleteParams(), {
            headers: { 'Content-Type': 'application/json' },
          });
          const problemExists = response?.problem && response?.data;
          if (problemExists) {
            console.log(response);
            return handleError();
          }
          console.log(response);
          Alert.alert('PARABENS!', 'Usuário criado com sucesso!');

          return dispatch({
            type: SIGN_UP_SUCCESS,
          });
          // navigation.navigate({ name: 'Initial', reset: true });
        } catch (err) {
          return handleError();
        }
      }

      async function sendAthleteImage() {
        if (hasError) {
          return;
        }
        const createFormData = (body = {}) => {
          const data = new FormData();

          data.append('image', {
            name: athlete_image.fileName,
            type: athlete_image.type,
            uri: Platform.OS === 'ios' ? athlete_image.replace('file://', '') : athlete_image,
          });

          Object.keys(body).forEach(key => {
            data.append(key, body[key]);
          });

          return data;
        };

        try {
          const response = await Api.post('/athletes', await getAthleteParams(), {
            headers: { 'Content-Type': 'application/json' },
          });
          const problemExists = response?.problem && response?.data;
          if (problemExists) {
            console.log(response);
            return handleError();
          }
          console.log(response);
          Alert.alert('PARABENS!', 'Usuário criado com sucesso!');

          return dispatch({
            type: SIGN_UP_SUCCESS,
          });
          // navigation.navigate({ name: 'Initial', reset: true });
        } catch (err) {
          return handleError();
        }
      }

      await sendData();
      await sendAthleteImage();
      console.log('passoooooooou');
    };
  },
};
