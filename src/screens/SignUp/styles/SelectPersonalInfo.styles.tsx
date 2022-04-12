import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button as RawButton, InputWithLabel } from '@components/index';
import colors from '@config/colors';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  background-color: white;
`;

export const Input = styled(InputWithLabel)`
  flex: 1;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
  background-color: white;
`;

export const Button = styled(RawButton)`
  width: 100%;
  margin-top: 20px;
`;
