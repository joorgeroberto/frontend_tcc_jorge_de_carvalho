import styled from 'styled-components/native';
import {
  Button as RawButton,
  InputWithLabel,
  Header as RawHeader,
  ProgressBar as RawProgressBar,
} from '@components/index';
import colors from '@config/colors';

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
