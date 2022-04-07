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

export const ImageContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 48px;
  margin-bottom: 48px;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: ${windowWidth * 0.453}px;
  height: ${windowWidth * 0.453}px;
  background-color: ${colors.GRAY1};
  border-radius: 500px;
`;

export const StyledTextError = styled.Text`
  max-width: ${windowWidth * 0.6};
  text-align: center;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  margin-top: 5px;
  color: ${colors.RED};
`;
