import Api from '@config/Api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigation from '@screens/RootNavigation';
import {
  GET_ALL_ATHLETES_FROM_GROUP,
  GET_ALL_ATHLETES_FROM_GROUP_SUCCESS,
  GET_ALL_ATHLETES_FROM_GROUP_FAIL,
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
      type: type || GET_ALL_ATHLETES_FROM_GROUP_FAIL,
    });
  };

export const SelectAthleteActions = {
  GetAllAthletesFromGroup: () => {
    return async (dispatch: any) => {
      dispatch({ type: GET_ALL_ATHLETES_FROM_GROUP });

      const token = await AsyncStorage.getItem('token');
      if (token === null) {
        handleError({
          type: GET_ALL_ATHLETES_FROM_GROUP_FAIL,
          message: 'Usuário inválido, por favor faça login novamente.',
        });
        return navigation.navigate({
          name: 'Login',
          reset: true,
        });
      }

      try {
        const response: any = await Api.get(
          '/athletesGroup/athletes',
          {},
          {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          },
        );
        const problemExists = response?.problem && response?.data;
        if (problemExists) {
          return dispatch(
            handleError({
              type: GET_ALL_ATHLETES_FROM_GROUP_FAIL,
              message: response?.data.message,
            }),
          );
        }
        dispatch({
          type: GET_ALL_ATHLETES_FROM_GROUP_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch(handleError({ type: GET_ALL_ATHLETES_FROM_GROUP_FAIL }));
      }
    };
  },
};
