import Api from '@config/Api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigation from '@screens/RootNavigation';
import {
  GET_ALL_PLANNINGS_FROM_ATHLETE,
  GET_ALL_PLANNINGS_FROM_ATHLETE_SUCCESS,
  GET_ALL_PLANNINGS_FROM_ATHLETE_FAIL,
} from './types';

interface HandleErrorProps {
  message?: string;
  type?: string;
}

const handleError =
  ({ message, type }: HandleErrorProps) =>
  (dispatch: any) => {
    Alert.alert(
      'Ocorreu um erro',
      message || 'Por favor, verifique os seus dados e tente novamente',
    );
    return dispatch({
      type: type || GET_ALL_PLANNINGS_FROM_ATHLETE_FAIL,
    });
  };

interface SelectAthleteActionsProps {
  athleteId: string;
}

export const PlanningDetailsActions = {
  GetAllPlanningsFromAthlete: ({ athleteId }: SelectAthleteActionsProps) => {
    return async (dispatch: any) => {
      dispatch({ type: GET_ALL_PLANNINGS_FROM_ATHLETE });

      const token = await AsyncStorage.getItem('token');
      if (token === null) {
        handleError({
          type: GET_ALL_PLANNINGS_FROM_ATHLETE_FAIL,
          message: 'Usuário inválido, por favor faça login novamente.',
        });
        return navigation.navigate({
          name: 'Login',
          reset: true,
        });
      }

      try {
        const response: any = await Api.get(
          `/planning/${athleteId}`,
          {},
          {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          },
        );
        const problemExists = response?.problem && response?.data;
        if (problemExists) {
          console.log('problem', response);
          return dispatch(
            handleError({
              type: GET_ALL_PLANNINGS_FROM_ATHLETE_FAIL,
              message: response?.data.message,
            }),
          );
        }
        console.log('response', response.data);
        dispatch({
          type: GET_ALL_PLANNINGS_FROM_ATHLETE_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch(handleError({ type: GET_ALL_PLANNINGS_FROM_ATHLETE_FAIL }));
      }
    };
  },
};
