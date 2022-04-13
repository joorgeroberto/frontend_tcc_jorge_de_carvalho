import styled from 'styled-components/native';
import colors from '@config/colors';
import { Button as RawButton } from '@components/index';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.WHITE};
`;

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${windowWidth * 0.616}px;
  height: ${windowHeight * 0.3386}px;
  margin-bottom: ${windowHeight * 0.1231}px;
`;

export const Button = styled(RawButton)``;

export const TextTitle = styled.Text`
  text-align: center;
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  letter-spacing: 0.2px;
  margin-bottom: ${windowHeight * 0.0234}px;
  color: ${colors.PRIMARY};
`;

export const TextDescription = styled.Text`
  max-width: ${windowWidth * 0.8}px;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: ${windowHeight * 0.0735}px;

  color: ${colors.PRIMARY3};
`;
