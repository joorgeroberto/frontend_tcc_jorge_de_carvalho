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
