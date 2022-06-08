import styled from 'styled-components/native';
import {
  Button as RawButton,
  InputWithLabel,
  Header as RawHeader,
  ProgressBar as RawProgressBar,
  Loader as RawLoader,
} from '@components/index';
import colors from '@config/colors';
import { AthleteCell as RawAthleteCell } from '@components/AthleteCell';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.WHITE};
`;

export const Header = styled(RawHeader).attrs({})``;

export const ProgressBar = styled(RawProgressBar).attrs({
  marginLeft: 21,
  marginRight: 21,
})``;

export const AthleteCellContainer = styled.View`
  height: 120px;
`;

export const AthleteCell = styled(RawAthleteCell).attrs({ borderColor: colors.TRANSPARENT })``;

export const Loader = styled(RawLoader)``;
