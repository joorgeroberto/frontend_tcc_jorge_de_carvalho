import React, { useState } from 'react';
import {
  Container,
  Input,
  ImageContainer,
  Button,
  Image,
  StyledTextError,
} from '../styles/SelectPersonalInfo.styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { launchImageLibrary } from 'react-native-image-picker';

interface Props {
  onPress: (data: SelectPersonalInfoReturnData) => void;
}

const maxPhoneLength = 15;

export function SelectPersonalInfo({ onPress }: Props) {
  const validationSchema = yup.object().shape({
    name: yup.string().required('O nome não pode ser vazio.').min(3, 'Digite um nome válido'),
    email: yup.string().required('O email não pode ser vazio.').email('Digite um email válido.'),
    phone: yup
      .string()
      .required('O telefone não pode ser vazio.')
      .length(maxPhoneLength, 'Digite um telefone válido.'),
    image: yup.string().required('Por favor, clique no círculo acima e selecione uma imagem.'),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      image: '',
    },
  });

  const onSubmit = (data: any) => onPress(data);

  const getImage = async () => {
    try {
      const { assets } = await launchImageLibrary({
        maxWidth: 1920,
        maxHeight: 1080,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        quality: 1,
      });

      const isValidImage = assets && assets?.length > 0;
      if (isValidImage) {
        return assets?.[0].uri as string;
      }
    } catch (error) {
      return '';
    }
  };

  return (
    <Container>
      <Controller
        control={control}
        name="image"
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <ImageContainer onPress={async () => onChange(await getImage())}>
              <Image source={{ uri: value }} />
              {error && error?.message && <StyledTextError>{error?.message}</StyledTextError>}
            </ImageContainer>
          );
        }}
      />

      <Input
        label={'Nome:'}
        marginBottom={15}
        placeholder={'Digite o seu nome'}
        onChangeText={text => setValue('name', text)}
        error={errors?.name?.message}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value: savedValue }, fieldState: { error } }) => {
          return (
            <Input
              label={'Telefone:'}
              marginBottom={15}
              value={savedValue}
              placeholder={'(79) 99999-9999'}
              keyboardType={'decimal-pad'}
              mask={text => {
                const isMaxPhoneLength = text.length > maxPhoneLength;
                if (isMaxPhoneLength) {
                  return savedValue;
                }
                const replacedText = text.replace(/[^0-9]/g, '');
                return replacedText
                  .replace(/^(\d{2})(\d{1})/, '($1) $2')
                  .replace(/^\((\d{2})\) (\d{5})/, '($1) $2')
                  .replace(/^\((\d{2})\) (\d{5})(\d{1,4})/, '($1) $2-$3');
              }}
              onChangeText={onChange}
              error={error?.message}
            />
          );
        }}
      />
      <Input
        label={'Email:'}
        marginBottom={15}
        keyboardType={'email-address'}
        placeholder={'email@email.com'}
        onChangeText={text => setValue('email', text)}
        error={errors?.email?.message}
      />
      <Button label={'Próximo'} onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
