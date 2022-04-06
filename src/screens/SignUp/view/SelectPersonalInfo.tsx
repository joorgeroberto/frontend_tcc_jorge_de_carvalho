import React from 'react';
import { Container, Input, ImageContainer, Button } from '../styles/SelectPersonalInfo.styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { launchImageLibrary } from 'react-native-image-picker';

interface Props {
  onPress: () => void;
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
  });

  const {
    control,
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

  const onSubmit = (data: any) => console.log(data);

  // const result = launchImageLibrary({
  //   title: 'Select Image',
  //   type: 'library',
  //   options: {
  //     maxWidth: 1920,
  //     maxHeight: 1080,
  //     selectionLimit: 0,
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     quality: 1,
  //   },
  // });

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
