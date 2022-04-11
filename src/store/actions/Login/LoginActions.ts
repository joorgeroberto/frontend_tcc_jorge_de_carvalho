import Api from '@config/Api';
import { makeAthlete } from '@storeData/reducers/LoginReducer';
import { Alert } from 'react-native';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from './types';

interface LoginData {
  email: string;
  password: string;
}

export const LoginActions = {
  Login: ({ email, password }: LoginData) => {
    return async (dispatch: any) => {
      dispatch({ type: LOGIN });

      function handleLoginError() {
        Alert.alert('Ocorreu um erro', 'Por favor, verifique os seus dados e tente novamente');
        return dispatch({
          type: LOGIN_FAIL,
        });
      }

      try {
        const response = await Api.post(
          '/sessions',
          {
            email,
            password,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );
        const problemExists = response?.problem && response?.data;
        if (problemExists) {
          return handleLoginError();
        }
        // navigation.navigate('Home');
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        handleLoginError();
      }
    };
  },
};
