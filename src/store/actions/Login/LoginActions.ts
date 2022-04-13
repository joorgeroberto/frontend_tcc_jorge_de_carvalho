import Api from '@config/Api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigation from '@screens/RootNavigation';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from './types';

interface LoginData {
  email: string;
  password: string;
}

export const LoginActions = {
  Login: ({ email, password }: LoginData) => {
    return async (dispatch: any) => {
      dispatch({ type: LOGIN });

      function handleLoginError(message?: string) {
        Alert.alert(
          'Ocorreu um erro',
          message || 'Por favor, verifique os seus dados e tente novamente',
        );
        Alert.alert('Ocorreu um erro', 'Por favor, verifique os seus dados e tente novamente');
        return dispatch({
          type: LOGIN_FAIL,
        });
      }

      try {
        const response: any = await Api.post(
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
        try {
          await AsyncStorage.setItem('token', response.data.token);
        } catch (e) {
          dispatch(
            handleLoginError('Erro ao salvar o token. Por favor, tente novamente mais tarde.'),
          );
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
        navigation.navigate({ name: 'Home', reset: true });
      } catch (error) {
        handleLoginError();
      }
    };
  },
};
