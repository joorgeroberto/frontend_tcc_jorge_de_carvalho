import React, { useEffect, useState } from 'react';
import { Container, Input, ImageContainer, Button } from '../styles/SelectPersonalInfo.styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'react-native';
import { RegisterActions } from '@storeData/actions';

interface Props {
  onPress: () => void;
}

export function SelectPersonalInfo({ onPress }: Props) {
  const [phone, setPhone] = useState('');
  const validationSchema = yup.object().shape({
    name: yup.string().required('O nome não pode ser vazio.').min(3, 'Digite um nome válido'),
    email: yup.string().required('O email não pode ser vazio.').email('Digite um email válido.'),
    phone: yup
      .string()
      .required('O telefone não pode ser vazio.')
      .min(1, 'Digite um telefone válido.'),
    // .max(15, 'Digite um telefone válido.'),
  });

  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    register('name');
    register('email');
    register('phone');
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <Container>
      <ImageContainer />
      <Input
        label={'Nome:'}
        marginBottom={15}
        placeholder={'Digite o seu nome'}
        onChangeText={text => setValue('name', text)}
        error={errors?.name?.message}
      />
      <Input
        label={'Telefone:'}
        marginBottom={15}
        placeholder={'(79) 99999-9999'}
        mask={text => {
          const maskedvalue = text
            .replace(/^(\d{2})(\d{1})/, '($1) $2')
            .replace(/^\((\d{2})\) (\d{1})(\d{1})/, '($1) $2 $3')
            .replace(/^\((\d{2})\) (\d{1}) (\d{4})(\d{1,4})/, '($1) $2$3-$4');
          // console.log('maskedvalue', maskedvalue);
          return maskedvalue;
        }}
        onChangeText={text => {
          // console.log('text', text);
          setValue('phone', text);
        }}
        error={errors?.phone?.message}
      />
      <Input
        label={'Email:'}
        marginBottom={15}
        placeholder={'email@email.com'}
        onChangeText={text => setValue('email', text)}
        error={errors?.email?.message}
      />
      <Button label={'Próximo'} onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
