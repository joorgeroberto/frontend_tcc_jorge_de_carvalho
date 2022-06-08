import Api from '@config/Api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigation from '@screens/RootNavigation';
import { CREATE_PLANNING, CREATE_PLANNING_SUCCESS, CREATE_PLANNING_FAIL } from './types';

interface CreatePlanningData {
  planning: PlanningData;
}

export const CreatePlanningActions = {
  CreatePlanning: ({ planning }: CreatePlanningData) => {
    return async (dispatch: any) => {
      dispatch({ type: CREATE_PLANNING });

      function handleError(message?: string) {
        Alert.alert(
          'Ocorreu um erro',
          message || 'Por favor, verifique os seus dados e tente novamente',
        );

        return dispatch({
          type: CREATE_PLANNING_FAIL,
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
        const response: any = await Api.post('/planning', planning, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getToken()}`,
          },
        });
        const problemExists = response?.problem && response?.data;
        if (problemExists) {
          console.log('problem', response);
          return handleError(response?.data?.message);
        }
        console.log('response', response);
        dispatch({
          type: CREATE_PLANNING_SUCCESS,
        });
        navigation.navigate({ name: 'CreatePlanningCompleted', reset: true });
      } catch (error) {
        handleError();
      }
    };
  },
};
