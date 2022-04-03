import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button as RawButton } from '@components/Button';
import colors from '@config/colors';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  max-width: ${windowWidth};
  background-color: white;
  align-items: center;
  justify-content: space-between;
`;

export const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ButtonsContainer = styled.View`
  width: ${windowWidth}px;
  height: 160px;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 40px;
`;

export const LoginButton = styled(RawButton)``;

export const SignUpButton = styled(RawButton).attrs({
  textColor: colors.PRIMARY,
})`
  border-width: 2px;
  border-color: ${colors.PRIMARY};
  background-color: ${colors.WHITE};
`;

export const StyledImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${windowWidth}px;
  height: ${windowWidth * 1.34}px;
`;
