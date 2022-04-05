import React from 'react';
import { BackButton, InputWithLabel } from '@components/index';
import {
  Container,
  Image,
  ImageContainer,
  LoginButton,
  SignUpTextContainer,
  SignUpText,
  SignUpButton,
  SignUpButtonLabel,
  BottomContainer,
  InputsContainer,
} from '../styles/Login.styles';
import { useNavigation } from '@react-navigation/native';

export function Login() {
  const navigation = useNavigation();

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()} />
      <ImageContainer>
        <Image resizeMode="contain" source={require('@assets/images/login_screen_image.png')} />
      </ImageContainer>

      <InputsContainer>
        <InputWithLabel label={'Email:'} />
      </InputsContainer>

      <BottomContainer>
        <LoginButton disabled label="Login" onPress={() => {}} />
        <SignUpTextContainer>
          <SignUpText>É um novo usuário?</SignUpText>
          <SignUpButton>
            <SignUpButtonLabel>Cadastre-se</SignUpButtonLabel>
          </SignUpButton>
        </SignUpTextContainer>
      </BottomContainer>
    </Container>
  );
}
