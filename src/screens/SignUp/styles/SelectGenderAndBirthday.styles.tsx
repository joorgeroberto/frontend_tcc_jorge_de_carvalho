import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button as RawButton, InputWithLabel } from '@components/index';
import colors from '@config/colors';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  background-color: white;
`;

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const Image = styled.Image`
  width: ${windowWidth * 0.488}px;
  height: ${windowWidth * 0.5973}px;
`;

export const Button = styled(RawButton)`
  width: 100%;
  margin-top: 20px;
`;
