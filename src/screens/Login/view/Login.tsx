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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@storeData/index';
import { LoginActions } from '@storeData/actions/Login';

interface OnSubmitProps {
  email: string;
  password: string;
}

export function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading } = useSelector(({ login }: RootState) => login);

  const validationSchema = yup.object().shape({
    email: yup.string().required('O email não pode ser vazio.').email('Digite um email válido.'),
    password: yup
      .string()
      .required('A senha não pode ser vazia.')
      .min(6, 'A senha deve conter pelo menos 6 dígitos.'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = ({ email, password }: OnSubmitProps) => {
    dispatch(LoginActions.Login({ email, password }));
    // return Alert.alert(email, password);
  };

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()} />
      <ImageContainer>
        <Image resizeMode="contain" source={require('@assets/images/login_screen_image.png')} />
      </ImageContainer>

      <InputsContainer>
        <InputWithLabel
          name={'email'}
          control={control}
          label={'Email:'}
          marginBottom={15}
          keyboardType={'email-address'}
          placeholder={'email@email.com'}
        />

        <InputWithLabel
          secureTextEntry
          name={'password'}
          control={control}
          label={'Password:'}
          placeholder={'********'}
        />
      </InputsContainer>

      <BottomContainer>
        <LoginButton label="Login" onPress={handleSubmit(onSubmit)} loading={loading} />
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
