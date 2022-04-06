import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button as RawButton, InputWithLabel } from '@components/index';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  background-color: white;
`;

export const ImageContainer = styled.View`
  margin-top: 48px;
  margin-bottom: 48px;
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
