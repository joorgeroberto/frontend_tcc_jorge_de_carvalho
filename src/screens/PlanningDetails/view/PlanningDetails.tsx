import { useNavigation } from '@react-navigation/native';
import { RootState } from '@storeData/index';
import { formatDate, getFormatedMinutes } from '@utils/utils';
import moment from 'moment';
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
  OptionalIndicatorContainer,
  OptionalIndicatorText,
  OptionalIndicatorIcon,
  PerformedTrainingButton,
  ExerciseGroupsTable,
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
  const { athlete } = useSelector(({ login }: RootState) => login);

  const planning = useMemo(() => {
    return route?.params?.planning as PlanningData;
  }, [route]);

  const setInitialDate = () => {
    const startDate = new Date(planning.startDate);
    const todayDate = new Date();

    if (moment(todayDate) > moment(startDate)) {
      return new Date().toString();
    }
    return planning.startDate;
  };

  const [selectedDate, setSelectedDate] = useState(setInitialDate());

  const training = useMemo(() => {
    const aux = planning?.trainings.find(
      el =>
        formatDate(new Date(el?.date).toString()) === formatDate(new Date(selectedDate).toString()),
    );
    return aux || ({} as TrainingData);
  }, [planning, selectedDate]);

  const isFreeTraining = training.type === 'free';

  const isOptionalTraining = training.type === 'optional';

  const showSavePerformedTrainingButton = () => {
    const selected = new Date(selectedDate).toString();
    const todayDate = new Date().toString();

    const dayPassed = moment(todayDate) >= moment(selected);
    const isSameAthlete = athlete?.id === planning?.athleteId;

    return dayPassed && isSameAthlete;
  };

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
          <>
            {isOptionalTraining && (
              <OptionalIndicatorContainer>
                <OptionalIndicatorIcon
                  source={require('@assets/icons/optional_indicator_icon.png')}
                />
                <OptionalIndicatorText>
                  Este treino é opcional faça apenas se estiver se sentindo bem.
                </OptionalIndicatorText>
              </OptionalIndicatorContainer>
            )}
            <ExerciseGroupsTable training={training} />

            {showSavePerformedTrainingButton() && (
              <PerformedTrainingButton
                imageSource={require('@assets/icons/athlete_button_icon.png')}
                label={'Registrar dados de treino'}
                onPress={() =>
                  navigation.navigate('RegisterPerformedTraining', {
                    training,
                    planningName: planning?.name,
                  })
                }
              />
            )}
          </>
        )}
      </InfoContainer>
    </Container>
  );
}
