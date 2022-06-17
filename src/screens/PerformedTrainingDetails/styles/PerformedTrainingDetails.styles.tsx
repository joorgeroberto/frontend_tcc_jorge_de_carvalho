import colors from '@config/colors';
import styled from 'styled-components/native';
import { Loader as RawLoader, Header as RawHeader } from '@components/index';
import { Dimensions } from 'react-native';
import { boolean } from 'yup/lib/locale';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${colors.WHITE};
`;

export const Header = styled(RawHeader)``;

export const ResultsText = styled.Text`
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.PRIMARY};
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-top: 21px;
  background-color: ${colors.WHITE};
`;

interface ResultsRowContainerProps {
  isLastContainer?: boolean;
}

export const ResultsRowContainer = styled.View<ResultsRowContainerProps>`
  flex-direction: row;
  height: 101px;
  width: ${windowWidth - 42}px;
  margin-left: 21px;
  background-color: ${colors.WHITE};
  border-bottom-width: 1px;
  border-bottom-color: ${({ isLastContainer }) =>
    isLastContainer ? colors.TRANSPARENT : colors.GRAY2};
`;

interface TrainingDataContainerProps {
  showRightBorder?: boolean;
}

export const TrainingDataContainer = styled.View<TrainingDataContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-right-width: ${({ showRightBorder }) => (showRightBorder ? 1 : 0)}px;
  border-right-color: ${({ showRightBorder }) =>
    showRightBorder ? colors.GRAY2 : colors.TRANSPARENT};
`;

export const TrainingData = styled.Text`
  font-weight: 700;
  font-size: 35px;
  line-height: 41px;
  color: ${colors.PRIMARY};
`;

export const TrainingDataDescription = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-top: 3px;
  color: ${colors.PRIMARY3};
`;
