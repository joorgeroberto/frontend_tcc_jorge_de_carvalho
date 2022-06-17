import { useNavigation } from '@react-navigation/native';
import { RootState } from '@storeData/index';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button } from '../styles/Home.styles';

export function Home() {
  const navigation = useNavigation();
  const { athlete } = useSelector(({ login }: RootState) => login);

  const isAdvisorUser = athlete?.user_type === 'advisor';

  return (
    <Container>
      {isAdvisorUser && (
        <>
          <Button
            label="Cadastrar planejamento"
            onPress={() => navigation.navigate('SelectAthlete', { nextStep: 'CreatePlanning' })}
            marginBottom={15}
          />
          <Button
            label="Visualizar treinos de um atleta"
            onPress={() => navigation.navigate('SelectAthlete', { nextStep: 'PlanningList' })}
            marginBottom={15}
          />
        </>
      )}
      <Button
        label="Visualizar meus treinos planejados"
        onPress={() =>
          navigation.navigate('PlanningList', {
            athlete: (athlete as AthleteData) || ({} as AthleteData),
          })
        }
      />
      <Button
        label="Visualizar meus treinos realizados"
        onPress={() =>
          navigation.navigate('PlanningList', {
            athlete: (athlete as AthleteData) || ({} as AthleteData),
            nextStep: 'PerformedTrainingList',
          })
        }
      />
    </Container>
  );
}
