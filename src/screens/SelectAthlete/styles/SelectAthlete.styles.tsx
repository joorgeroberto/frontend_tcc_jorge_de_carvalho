import colors from '@config/colors';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  /* justify-content: center; */
  background-color: ${colors.WHITE};
`;

export const StyledFlatList = styled.FlatList`
  flex: 1;
  width: 100%;
  background-color: ${colors.WHITE};
`;
