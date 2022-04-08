import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button } from '@components/index';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding: 20px;
  /* justify-content: space-between; */
  background-color: white;
`;

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const StyledImage = styled.Image`
  width: ${windowWidth * 0.488}px;
  height: ${windowWidth * 0.5973}px;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  width: ${windowWidth - 42}px;
  margin-bottom: 21px;
`;

export const StyledText = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 40px;
`;
