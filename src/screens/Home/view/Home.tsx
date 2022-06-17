import { useNavigation } from '@react-navigation/native';
import { RootState } from '@storeData/index';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, Title, OptionsContainer } from '../styles/Home.styles';

export function Home() {
  const navigation = useNavigation();
  const { athlete } = useSelector(({ login }: RootState) => login);

  const isAdvisorUser = athlete?.user_type === 'advisor';

  return (
    <Container>
      {isAdvisorUser && (
        <OptionsContainer>
          <Title>Opções para assessores:</Title>
          <Button
            label="Cadastrar planejamento"
            onPress={() => navigation.navigate('SelectAthlete', { nextStep: 'CreatePlanning' })}
          />
          <Button
            label="Visualizar treinos de um atleta"
            onPress={() => navigation.navigate('SelectAthlete', { nextStep: 'PlanningList' })}
          />
          <Button
            label="Visualizar treinos realizados de um atleta"
            onPress={() =>
              navigation.navigate('SelectAthlete', {
                nextStep: 'PerformedTrainingList',
              })
            }
          />
        </OptionsContainer>
      )}
      <OptionsContainer>
        <Title>Opções para atletas:</Title>
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
      </OptionsContainer>
    </Container>
  );
}
