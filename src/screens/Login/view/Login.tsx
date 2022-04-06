import React from 'react';
import { BackButton } from '@components/index';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  InputWithLabel,
} from '../styles/Login.styles';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export function Login() {
  const navigation = useNavigation();

  const validationSchema = yup.object().shape({
    email: yup.string().required('O email não pode ser vazio.').email('Digite um email válido.'),
    password: yup
      .string()
      .required('A senha não pode ser vazia.')
      .min(6, 'A senha deve conter pelo menos 6 dígitos.'),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => Alert.alert(data.email, data.password);

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()} />
      <ImageContainer>
        <Image resizeMode="contain" source={require('@assets/images/login_screen_image.png')} />
      </ImageContainer>

      <InputsContainer>
        <InputWithLabel
          label={'Email:'}
          marginBottom={15}
          keyboardType={'email-address'}
          placeholder={'email@email.com'}
          onChangeText={text => setValue('email', text)}
          error={errors?.email?.message}
        />

        <InputWithLabel
          secureTextEntry
          label={'Password:'}
          placeholder={'********'}
          onChangeText={text => setValue('password', text)}
          error={errors?.password?.message}
        />
      </InputsContainer>

      <BottomContainer>
        <LoginButton label="Login" onPress={handleSubmit(onSubmit)} />
        <SignUpTextContainer>
          <SignUpText>É um novo usuário?</SignUpText>
          <SignUpButton onPress={() => navigation.navigate('SignUp')}>
            <SignUpButtonLabel>Cadastre-se</SignUpButtonLabel>
          </SignUpButton>
        </SignUpTextContainer>
      </BottomContainer>
    </Container>
  );
}
