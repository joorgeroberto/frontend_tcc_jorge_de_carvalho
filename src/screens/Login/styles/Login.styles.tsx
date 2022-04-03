import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button } from '@components/Button';
import colors from '@config/colors';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
  background-color: white;
`;

export const LoginButton = styled(Button)`
  width: 100%;
`;

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: ${windowWidth * 0.573}px;
  height: ${windowWidth * 0.706}px;
`;

export const SignUpTextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const RawText = styled.Text`
  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
  color: ${colors.BLACK};
`;

export const SignUpText = styled(RawText)``;

export const SignUpButton = styled.TouchableOpacity`
  margin-left: 7px;
`;

export const SignUpButtonLabel = styled(RawText)`
  color: ${colors.PRIMARY};
`;

export const InputsContainer = styled.View`
  flex: 1;
`;

export const BottomContainer = styled.View``;
