import React from 'react';
import {
  Container,
  Button,
  ImageContainer,
  Image,
} from '../styles/SelectGenderAndBirthdate.styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { GenderTabs } from './GenderTabs';
import { DateSelector } from './DateSelector';

interface Props {
  data: SelectGenderAndBirthdateReturnData;
  onPress: (data: SelectGenderAndBirthdateReturnData) => void;
}

export function SelectGenderAndBirthdate({ data: { gender, birthdate }, onPress }: Props) {
  const validationSchema = yup.object().shape({
    birthdate: yup.string().required('Selecione uma data de nascimento.'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      birthdate,
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

      <Button label={'Próximo'} onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
