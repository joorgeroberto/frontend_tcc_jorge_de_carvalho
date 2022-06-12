import styled from 'styled-components/native';
import {
  Button as RawButton,
  InputWithLabel,
  Header as RawHeader,
  ProgressBar as RawProgressBar,
} from '@components/index';
import colors from '@config/colors';
import { AthleteCell as RawAthleteCell } from '@components/AthleteCell';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.WHITE};
`;

export const HollowButton = styled(RawButton)`
  width: 100%;
  margin-top: 40px;
  border-width: 2px;
  background-color: ${colors.WHITE};
`;

export const BlueHollowButton = styled(HollowButton).attrs({
  textColor: colors.PRIMARY,
})`
  border-color: ${colors.PRIMARY};
`;

export const RedHollowButton = styled(HollowButton).attrs({
  textColor: colors.RED,
})`
  border-color: ${colors.RED};
`;

export const StyledTextError = styled.Text`
  width: 100%;
  font-size: 13px;
  line-height: 15px;
  font-weight: 400;
  margin-top: 10px;
  text-align: center;
  color: ${colors.RED};
`;
