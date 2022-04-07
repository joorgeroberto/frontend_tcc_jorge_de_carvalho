import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Container,
  ImageContainer,
  ButtonsContainer,
  LoginButton,
  SignUpButton,
  StyledImage,
} from '../styles/Initial.styles';

export function Initial() {
  const { navigate } = useNavigation();
  return (
    <Container>
      <ImageContainer>
        <StyledImage source={require('@assets/images/initial_screen_image.png')} />
      </ImageContainer>

      <ButtonsContainer>
        <LoginButton label="Login" onPress={() => navigate('Login')} />
        <SignUpButton label="Cadastre-se" onPress={() => navigate('SignUp')} />
      </ButtonsContainer>
    </Container>
  );
}
