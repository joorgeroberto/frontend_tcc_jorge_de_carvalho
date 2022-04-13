import React, { useMemo } from 'react';
import {
  Container,
  Button as StyledButton,
  Input,
  InputsContainer,
  ImageSelector,
  LoaderContainer,
  LoaderText,
  Loader,
} from '../styles/RegisterGroup.styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { RootState } from '@storeData/index';

interface Props {
  data: RegisterGroupReturnData;
  onPress: (data: RegisterGroupReturnData) => void;
}

export function RegisterGroup({
  data: { group_name, athletes_quantity, group_image },
  onPress,
}: Props) {
  const { sendingData, sendingAthleteImage, sendingGroupImage } = useSelector(
    ({ signUp }: RootState) => signUp,
  );

  const isLoading = useMemo(
    () => sendingData || sendingAthleteImage || sendingGroupImage,
    [sendingData, sendingAthleteImage, sendingGroupImage],
  );

  const loadingText = useMemo(() => {
    if (sendingData) {
      return 'Enviando dados...';
    }
    if (sendingAthleteImage) {
      return 'Enviando imagem do usuário...';
    }
    if (sendingGroupImage) {
      return 'Enviando imagem do grupo...';
    }
  }, [sendingData, sendingAthleteImage, sendingGroupImage]);

  const validationSchema = () => {
    const imageFieldValidation = yup
      .string()
      .required('Por favor, clique no círculo acima e selecione uma imagem.')
      .min(3, 'Por favor, clique no círculo acima e selecione uma imagem.');
    return yup.object().shape({
      group_name: yup
        .string()
        .required('O nome do grupo não pode ser vazio.')
        .min(3, 'O nome do grupo deve conter pelo menos 3 letras.'),
      athletes_quantity: yup
        .number()
        .typeError('A quantidade de atletas deve ser válida e maior que zero.')
        .required('A quantidade de atletas deve ser válida e maior que zero.')
        .min(1, 'A quantidade de atletas deve ser maior que zero.'),
      group_image: yup
        .object()
        .shape({
          multipartFormName: imageFieldValidation,
          fileName: imageFieldValidation,
          type: imageFieldValidation,
          uri: imageFieldValidation,
        })
        .required()
        .typeError('Por favor, clique no quadrado acima e selecione uma imagem.'),
    });
  };

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      group_name,
      athletes_quantity,
      group_image,
    },
  });

  const onSubmit = (info: any) => onPress(info);

  if (isLoading) {
    return (
      <LoaderContainer>
        <LoaderText>{loadingText}</LoaderText>
        <Loader />
      </LoaderContainer>
    );
  }

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
