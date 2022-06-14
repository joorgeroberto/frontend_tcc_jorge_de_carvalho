import colors from '@config/colors';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import {
  Button as RawButton,
  Loader as RawLoader,
  Header as RawHeader,
  ExerciseGroupsTable as RawExerciseGroupsTable,
} from '@components/index';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 21px;
  padding-right: 21px;
  background-color: ${colors.WHITE};
`;

export const Header = styled(RawHeader)``;

export const Loader = styled(RawLoader)``;

export const SaveButtonContainer = styled.View`
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.WHITE};
`;

export const SaveButton = styled(RawButton)``;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  /* width: ${windowWidth - 42}px; */
  background-color: white;
  width: 100%;
`;

export const TrainingInfoContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-start;
  padding-top: 21px;
  padding-bottom: 21px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.GRAY2};
`;

export const TrainingInfoIcon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const TrainingInfoText = styled.Text`
  width: 100%;
  text-align: left;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.PRIMARY3};
`;

interface TrainingInfoRow {
  marginTop?: number;
}

export const TrainingInfoRow = styled.View<TrainingInfoRow>`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : 0)}px;
`;

interface ArrowIconProps {
  flipVertically: boolean;
}

export const ArrowIcon = styled.Image<ArrowIconProps>`
  width: 15px;
  height: 15px;
  position: absolute;
  right: 0px;
  top: 26px;
  transform: rotate(${({ flipVertically }) => (flipVertically ? 180 : 0)}deg);
`;

export const Divider = styled.View`
  height: 1px;
  width: 100%;
  margin-top: 21px;
  background-color: ${colors.GRAY2};
`;

export const ExerciseGroupsTable = styled(RawExerciseGroupsTable)``;
