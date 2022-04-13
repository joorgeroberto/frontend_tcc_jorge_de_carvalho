import React from 'react';
import { Container, Input, Button } from '../styles/SelectPersonalInfo.styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ImageSelector } from '@components/ImageSelector';

interface Props {
  data: SelectPersonalInfoReturnData;
  onPress: (data: SelectPersonalInfoReturnData) => void;
}

const maxPhoneLength = 15;

export function SelectPersonalInfo({
  data: { name, email, phone, athlete_image },
  onPress,
}: Props) {
  const validationSchema = () => {
    const imageFieldValidation = yup
      .string()
      .required('Por favor, clique no círculo acima e selecione uma imagem.')
      .min(3, 'Por favor, clique no círculo acima e selecione uma imagem.');
    return yup.object().shape({
      name: yup.string().required('O nome não pode ser vazio.').min(3, 'Digite um nome válido'),
      email: yup.string().required('O email não pode ser vazio.').email('Digite um email válido.'),
      phone: yup
        .string()
        .required('O telefone não pode ser vazio.')
        .length(maxPhoneLength, 'Digite um telefone válido.'),
      athlete_image: yup
        .object()
        .shape({
          multipartFormName: imageFieldValidation,
          fileName: imageFieldValidation,
          type: imageFieldValidation,
          uri: imageFieldValidation,
        })
        .required()
        .typeError('Por favor, clique no círculo acima e selecione uma imagem.'),
    });
  };

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema()),
    defaultValues: {
      name,
      email,
      phone,
      athlete_image,
    },
  });

  const onSubmit = (data: any) => onPress(data);

  return (
    <Container>
      <ImageSelector name={'athlete_image'} control={control} />

      <Input
        name={'name'}
        autoCapitalize={'words'}
        control={control}
        label={'Nome:'}
        marginBottom={15}
        placeholder={'Digite o seu nome'}
      />

      <Input
        control={control}
        name={'phone'}
        label={'Telefone:'}
        marginBottom={15}
        placeholder={'(79) 99999-9999'}
        keyboardType={'decimal-pad'}
        mask={({ oldValue, newValue }) => {
          const isMaxPhoneLength = newValue.length > maxPhoneLength;
          if (isMaxPhoneLength) {
            return oldValue;
          }
          const replacedText = newValue.replace(/[^0-9]/g, '');
          return replacedText
            .replace(/^(\d{2})(\d{1})/, '($1) $2')
            .replace(/^\((\d{2})\) (\d{5})/, '($1) $2')
            .replace(/^\((\d{2})\) (\d{5})(\d{1,4})/, '($1) $2-$3');
        }}
      />

      <Input
        control={control}
        name={'email'}
        label={'Email:'}
        marginBottom={15}
        keyboardType={'email-address'}
        placeholder={'email@email.com'}
      />
      <Button label={'Próximo'} onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
