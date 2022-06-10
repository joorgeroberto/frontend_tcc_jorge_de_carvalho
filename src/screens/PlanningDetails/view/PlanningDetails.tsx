import { useNavigation } from '@react-navigation/native';
import { RootState } from '@storeData/index';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  InfoContainer,
  HeaderContainer,
  Loader,
  Header,
  WeekSelector,
  PlanningNameText,
  FreeTrainingImageContainer,
  FreeTrainingImage,
  FreeTrainingText,
} from '../styles/PlanningDetails.styles';

interface Props {
  route?: {
    params?: {
      planning?: PlanningData;
    };
  };
}

export function PlanningDetails({ route }: Props) {
  const navigation = useNavigation();

  const { loading } = useSelector(({ planningDetails }: RootState) => planningDetails);

  const planning = useMemo(() => {
    return route?.params?.planning as PlanningData;
  }, [route]);

  const [selectedDate, setSelectedDate] = useState(planning.startDate);

  const training = useMemo(() => {
    const aux = planning?.trainings.find(
      el => new Date(el?.date).toString() === new Date(selectedDate).toString(),
    );
    return aux || ({} as TrainingData);
  }, [planning, selectedDate]);

  const isFreeTraining = training.type === 'free';

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <HeaderContainer>
        <Header title={'Treinos planejados'} onPressBackButton={() => navigation.goBack()} />
      </HeaderContainer>
      <InfoContainer>
        <PlanningNameText>{planning.name}</PlanningNameText>
        <WeekSelector
          disableSelection
          startDate={planning.startDate}
          endDate={planning.endDate}
          numberOfWeeks={planning.numberOfWeeks}
          selectedDate={selectedDate}
          onPress={data => setSelectedDate(data)}
        />
        {isFreeTraining ? (
          <FreeTrainingImageContainer>
            <FreeTrainingImage source={require('@assets/images/free_training_image.png')} />
            <FreeTrainingText>Não existem treinos planejados este dia.</FreeTrainingText>
          </FreeTrainingImageContainer>
        ) : (
          <></>
        )}
      </InfoContainer>
    </Container>
  );
}
