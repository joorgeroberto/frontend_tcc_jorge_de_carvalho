import React, { useEffect, useState } from 'react';
import {
  Container,
  Button as StyledButton,
  Input,
  InputContainer,
  ImageContainer,
  Image,
  StyledTextError,
} from '../styles/SelectGenderAndBirthday.styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { launchImageLibrary } from 'react-native-image-picker';
import { GenderTabs } from './GenderTabs';
import { DateSelector } from './DateSelector';

interface Props {
  data: SelectGenderAndBirthdayReturnData;
  onPress: (data: SelectGenderAndBirthdayReturnData) => void;
}

export function SelectGenderAndBirthday({ data: { gender, birthday }, onPress }: Props) {
  const validationSchema = yup.object().shape({
    birthday: yup.string().required('Selecione uma data de nascimento.'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      birthday,
      gender,
    },
  });

  const onSubmit = (info: any) => onPress(info);

  return (
    <Container>
      <ImageContainer>
        <Image source={require('@assets/images/signup_running_man_image.png')} />
      </ImageContainer>

      <GenderTabs control={control} />

      <DateSelector control={control} />

      <StyledButton label={'Próximo'} onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
