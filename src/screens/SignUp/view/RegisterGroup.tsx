import React, { useEffect, useState } from 'react';
import {
  Container,
  Button as StyledButton,
  Input,
  InputsContainer,
  ImageSelector,
} from '../styles/RegisterGroup.styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  data: RegisterGroupReturnData;
  onPress: (data: RegisterGroupReturnData) => void;
}

export function RegisterGroup({
  data: { groupName, athletesQuantity, groupImage },
  onPress,
}: Props) {
  const validationSchema = yup.object().shape({
    groupName: yup
      .string()
      .required('O nome do grupo não pode ser vazio.')
      .min(3, 'O nome do grupo deve conter pelo menos 3 letras.'),
    groupImage: yup.string().required('Por favor, clique no círculo acima e selecione uma imagem.'),
    athletesQuantity: yup
      .number()
      .typeError('A quantidade de atletas deve ser válida e maior que zero.')
      .required('A quantidade de atletas deve ser válida e maior que zero.')
      .min(1, 'A quantidade de atletas deve ser maior que zero.'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      groupName,
      athletesQuantity,
      groupImage,
    },
  });

  const onSubmit = (info: any) => onPress(info);

  return (
    <Container>
      <ImageSelector name={'groupImage'} control={control} />

      <InputsContainer>
        <Input
          autoCapitalize={'sentences'}
          name={'groupName'}
          control={control}
          label={'Nome do grupo:'}
          marginBottom={15}
          placeholder={'Digite o nome do grupo'}
        />

        <Input
          name={'athletesQuantity'}
          control={control}
          label={'Quantidade de atletas:'}
          placeholder={'Digite a quantidade de atletas'}
        />
      </InputsContainer>

      <StyledButton label={'Cadastre-se'} onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
