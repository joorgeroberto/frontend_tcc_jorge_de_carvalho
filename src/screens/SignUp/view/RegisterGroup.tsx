import React from 'react';
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
  data: { group_name, athletes_quantity, group_image },
  onPress,
}: Props) {
  const validationSchema = yup.object().shape({
    group_name: yup
      .string()
      .required('O nome do grupo não pode ser vazio.')
      .min(3, 'O nome do grupo deve conter pelo menos 3 letras.'),
    group_image: yup
      .string()
      .required('Por favor, clique no círculo acima e selecione uma imagem.'),
    athletes_quantity: yup
      .number()
      .typeError('A quantidade de atletas deve ser válida e maior que zero.')
      .required('A quantidade de atletas deve ser válida e maior que zero.')
      .min(1, 'A quantidade de atletas deve ser maior que zero.'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      group_name,
      athletes_quantity,
      group_image,
    },
  });

  const onSubmit = (info: any) => onPress(info);

  return (
    <Container>
      <ImageSelector name={'group_image'} control={control} />

      <InputsContainer>
        <Input
          autoCapitalize={'sentences'}
          name={'group_name'}
          control={control}
          label={'Nome do grupo:'}
          marginBottom={15}
          placeholder={'Digite o nome do grupo'}
        />

        <Input
          name={'athletes_quantity'}
          control={control}
          label={'Quantidade de atletas:'}
          placeholder={'Digite a quantidade de atletas'}
        />
      </InputsContainer>

      <StyledButton label={'Cadastre-se'} onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
