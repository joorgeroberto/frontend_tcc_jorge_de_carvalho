import colors from '@config/colors';
import styled from 'styled-components/native';
import { Button as RawButton, Loader as RawLoader, Header as RawHeader } from '@components/index';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${colors.WHITE};
`;

export const Loader = styled(RawLoader)``;

export const Header = styled(RawHeader)``;

export const StyledFlatList = styled.FlatList`
  flex: 1;
  width: 100%;
  padding-top: 15px;
  background-color: ${colors.WHITE};
`;
