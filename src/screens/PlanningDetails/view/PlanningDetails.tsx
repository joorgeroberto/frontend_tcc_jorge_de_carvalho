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
  ExerciseGroupContainer,
  ExerciseGroupNumberOfRepetitionsContainer,
  ExerciseGroupNumberOfRepetitionsText,
  ExercisesContainer,
  ExerciseItemContainer,
  ExerciseDistanceText,
  ExerciseTimeText,
  ExerciseDesscriptionText,
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
    const selected = formatDate(new Date(selectedDate).toString());
    const todayDate = formatDate(new Date().toString());

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
            {training?.exerciseGroups?.map(exerciseGroup => (
              <ExerciseGroupContainer>
                <ExerciseGroupNumberOfRepetitionsContainer>
                  <ExerciseGroupNumberOfRepetitionsText>
                    {exerciseGroup?.numberRepetitions}x
                  </ExerciseGroupNumberOfRepetitionsText>
                </ExerciseGroupNumberOfRepetitionsContainer>
                <ExercisesContainer>
                  {exerciseGroup?.exercises?.map((exercise, index) => (
                    <ExerciseItemContainer
                      isLastItem={index === exerciseGroup?.exercises.length - 1}>
                      {exercise?.type === 'distance' ? (
                        <ExerciseDistanceText>
                          {Number(exercise?.distance).toFixed(1)} KMs
                        </ExerciseDistanceText>
                      ) : (
                        <ExerciseTimeText>
                          {getFormatedMinutes(exercise?.duration)} minutos
                        </ExerciseTimeText>
                      )}
                      <ExerciseDesscriptionText>{exercise?.description}</ExerciseDesscriptionText>
                    </ExerciseItemContainer>
                  ))}
                </ExercisesContainer>
              </ExerciseGroupContainer>
            ))}

            {showSavePerformedTrainingButton() && (
              <PerformedTrainingButton
                imageSource={require('@assets/icons/athlete_button_icon.png')}
                label={'Registar dados de treino'}
                onPress={() => console.log('To next step')}
              />
            )}
          </>
        )}
      </InfoContainer>
    </Container>
  );
}
