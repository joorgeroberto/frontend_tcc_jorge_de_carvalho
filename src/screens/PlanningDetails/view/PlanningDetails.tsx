import { useNavigation } from '@react-navigation/native';
import { RootState } from '@storeData/index';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {} from '../styles/PlanningDetails.styles';

export function PlanningDetails() {
  const navigation = useNavigation();
  const {
    athlete: { user_type },
  } = useSelector(({ login }: RootState) => login);

  const isAdvisorUser = user_type === 'advisor';

  return <></>;
}
