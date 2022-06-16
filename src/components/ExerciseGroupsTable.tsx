import colors from '@config/colors';
import { getFormatedMinutes } from '@utils/utils';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { BackButton } from './BackButton';
const windowWidth = Dimensions.get('window').width;

interface Props {
  training: TrainingData;
}

export function ExerciseGroupsTable({ training }: Props) {
  return (
    <>
      {training?.exerciseGroups?.map(exerciseGroup => (
        <ExerciseGroupContainer>
          <ExerciseGroupNumberOfRepetitionsContainer>
            <ExerciseGroupNumberOfRepetitionsText>
              {exerciseGroup?.numberRepetitions}x
            </ExerciseGroupNumberOfRepetitionsText>
          </ExerciseGroupNumberOfRepetitionsContainer>
          <ExercisesContainer>
            {exerciseGroup?.exercises?.map((exercise, index) => (
              <ExerciseItemContainer isLastItem={index === exerciseGroup?.exercises.length - 1}>
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
    </>
  );
}

const ExerciseGroupContainer = styled.View`
  flex-direction: row;
  width: 100%;
  min-height: 60px;
  padding: 0;
  margin-top: 25px;
`;

const ExerciseGroupNumberOfRepetitionsContainer = styled.View`
  width: 45px;
  min-height: 60px;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${colors.GRAY2};
`;

const ExerciseGroupNumberOfRepetitionsText = styled.Text`
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: ${colors.PRIMARY};
`;

interface ExerciseItemContainerProps {
  isLastItem?: boolean;
}

const ExerciseItemContainer = styled.View<ExerciseItemContainerProps>`
  height: 60px;
  justify-content: space-evenly;
  align-items: flex-start;
  border-bottom-width: ${({ isLastItem }) => (isLastItem ? 0 : 1)}px;
  border-bottom-color: ${colors.GRAY2};
`;

const ExerciseText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.PRIMARY};
`;
const ExerciseDistanceText = styled(ExerciseText)``;

const ExerciseTimeText = styled(ExerciseText)``;

const ExerciseDesscriptionText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.PRIMARY3};
`;

const ExercisesContainer = styled.View`
  flex: 1;
`;
