import React, { useEffect, useState } from 'react';
import {
  Container,
  Button as StyledButton,
  Input,
  InputsContainer,
  ImageContainer,
  Image,
} from '../styles/SelectPassword.styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  data: SelectPasswordReturnData;
  onPress: (data: SelectPasswordReturnData) => void;
}

export function SelectPassword({ data: { password, confirmedPassword }, onPress }: Props) {
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('A senha não pode ser vazia.')
      .min(6, 'A senha deve conter pelo menos 6 dígitos.'),
    confirmedPassword: yup
      .string()
      .required('A senha não pode ser vazia.')
      .min(6, 'A senha deve conter pelo menos 6 dígitos.')
      .oneOf([yup.ref('password')], 'As senhas precisam ser iguais.'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password,
      confirmedPassword,
    },
  });

  const onSubmit = (info: any) => onPress(info);

  return (
    <Container>
      <ImageContainer>
        <Image source={require('@assets/images/signup_running_man_image.png')} />
      </ImageContainer>

      <InputsContainer>
        <Input
          secureTextEntry
          name={'password'}
          control={control}
          label={'Senha:'}
          marginBottom={15}
          placeholder={'Digite a senha'}
        />

        <Input
          secureTextEntry
          name={'confirmedPassword'}
          control={control}
          label={'Confirme a senha:'}
          placeholder={'Confirme a senha'}
        />
      </InputsContainer>

      <StyledButton label={'Próximo'} onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
