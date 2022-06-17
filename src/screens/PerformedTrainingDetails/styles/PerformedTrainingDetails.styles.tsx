import colors from '@config/colors';
import styled from 'styled-components/native';
import { Loader as RawLoader, Header as RawHeader } from '@components/index';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${colors.WHITE};
`;

export const Header = styled(RawHeader)``;
