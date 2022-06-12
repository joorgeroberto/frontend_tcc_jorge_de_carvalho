import colors from '@config/colors';
import styled from 'styled-components/native';
import {
  Button as RawButton,
  Loader as RawLoader,
  Header as RawHeader,
  WeekSelector as RawWeekSelector,
} from '@components/index';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${colors.WHITE};
`;

export const InfoContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-left: 21px;
  padding-right: 21px;
  background-color: white;
`;

export const HeaderContainer = styled.View`
  height: 60px;
  margin-bottom: 32px;
  background-color: ${colors.WHITE};
`;

export const PlanningNameText = styled.Text`
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 18px;
  color: ${colors.BLACK};
`;

export const FreeTrainingImageContainer = styled.View`
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`;

export const FreeTrainingText = styled.Text`
  width: 80%;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  margin-top: 25px;
  color: ${colors.PRIMARY3};
`;

export const FreeTrainingImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: ${windowWidth * 0.3853}px;
  height: ${windowWidth * 0.476}px;
  align-self: center;
`;

export const Loader = styled(RawLoader)``;

export const Header = styled(RawHeader)``;

export const WeekSelector = styled(RawWeekSelector)``;

export const OptionalIndicatorContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12.5px;
  margin-top: 20px;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${colors.GRAY1};
`;

export const OptionalIndicatorText = styled.Text`
  width: 90%;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.PRIMARY3};
`;

export const OptionalIndicatorIcon = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 20px;
  height: 20px;
`;

export const PerformedTrainingButton = styled(RawButton)`
  width: ${windowWidth - 42}px;
  margin-top: 30px;
`;

export const ExerciseGroupContainer = styled.View`
  flex-direction: row;
  width: 100%;
  min-height: 60px;
  padding: 0;
  margin-top: 25px;
`;

export const ExerciseGroupNumberOfRepetitionsContainer = styled.View`
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

export const ExerciseGroupNumberOfRepetitionsText = styled.Text`
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: ${colors.PRIMARY};
`;

export const ExercisesContainer = styled.View`
  flex: 1;
`;

interface ExerciseItemContainerProps {
  isLastItem?: boolean;
}

export const ExerciseItemContainer = styled.View<ExerciseItemContainerProps>`
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
export const ExerciseDistanceText = styled(ExerciseText)``;

export const ExerciseTimeText = styled(ExerciseText)``;

export const ExerciseDesscriptionText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.PRIMARY3};
`;
