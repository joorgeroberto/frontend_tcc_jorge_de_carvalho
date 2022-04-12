import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button as RawButton, InputWithLabel } from '@components/index';
import colors from '@config/colors';

import { ImageSelector as ImagePicker } from '@components/ImageSelector';

const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  background-color: white;
`;

export const InputsContainer = styled.View`
  flex: 1;
`;

export const Input = styled(InputWithLabel)`
  margin-bottom: 15px;
`;

export const ImageSelector = styled(ImagePicker).attrs({
  width: windowWidth * 0.533,
  height: windowWidth * 0.533,
  borderRadius: 20,
})``;

export const Button = styled(RawButton)`
  width: 100%;
  margin-top: 20px;
`;
