import Api from '@config/Api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigation from '@screens/RootNavigation';
import { REGISTER, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const PerformedTrainingActions = {
  Register: (data: PerformedTraining) => {
    return async (dispatch: any) => {
      dispatch({ type: REGISTER });

      function handleSuccess() {
        Alert.alert('Parabens!', 'Os dados do treino performado foram cadastrados com sucesso!');
        navigation.goBack();

        return dispatch({
          type: REGISTER_SUCCESS,
        });
      }

      function handleError(message?: string) {
        Alert.alert(
          'Ocorreu um erro',
          message || 'Por favor, verifique os seus dados e tente novamente',
        );

        return dispatch({
          type: REGISTER_FAIL,
        });
      }

      async function getToken() {
        const token = await AsyncStorage.getItem('token');
        if (token === null) {
          handleError('Usuário inválido, por favor faça login novamente.');
          return navigation.navigate({
            name: 'Login',
            reset: true,
          });
        }

        return token;
      }

      try {
        const response: any = await Api.post('/performedTraining', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getToken()}`,
          },
        });
        const problemExists = response?.problem && response?.data;
        if (problemExists) {
          return handleError(response?.data?.message);
        }
        handleSuccess();
      } catch (error) {
        handleError();
      }
    };
  },
};
