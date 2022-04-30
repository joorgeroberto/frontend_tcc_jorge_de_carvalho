import colors from '@config/colors';
import styled from 'styled-components/native';
import { Button as RawButton } from '@components/index';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.WHITE};
`;

export const Button = styled(RawButton)`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;
