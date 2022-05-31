import React from 'react';
import {
  Container,
  Button,
  ImageContainer,
  Image,
  AthleteName,
  Input,
} from '../styles/RegisterPlanningNameWeekAndDate.styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateSelector } from '@screens/SignUp/view/DateSelector';
import { API_BASE_URL } from '@config/Api';
import { NumberQuantitySelector } from '@components/NumberQuantitySelector';
import moment from 'moment';

interface Props {
  athlete: AthleteData;
  planning: PlanningData;
  onPress: (data: RegisterPlanningNameWeekAndDateReturnData) => void;
}

export function RegisterPlanningNameWeekAndDate({
  athlete,
  planning: { name, numberOfWeeks, startDate },
  onPress,
}: Props) {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Por favor, digite o nome do planejamento.'),
    startDate: yup.string().required('Por favor, selecione uma data de inicio.'),
    numberOfWeeks: yup
      .number()
      .required('Por favor, digite o uma quantidade válida de semanas.')
      .min(1, 'A quantidade de semanas deve ser maior que zero.'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name,
      numberOfWeeks,
      startDate,
    },
  });

  const onSubmit = (info: any) => {
    info.endDate = moment(info.startDate)
      .add(7 * info.numberOfWeeks, 'days')
      .format();

    onPress(info);
  };

  return (
    <Container>
      <ImageContainer>
        <Image source={{ uri: `${API_BASE_URL}/files/${athlete.image}` }} />
        <AthleteName>{athlete.name}</AthleteName>
      </ImageContainer>

      <Input
        autoCapitalize={'sentences'}
        name={'name'}
        control={control}
        label={'Nome do Planejamento:'}
        marginBottom={15}
        placeholder={'Digite o nome do planejamento.'}
      />

      <NumberQuantitySelector
        control={control}
        name={'numberOfWeeks'}
        label={'Quantidade de semanas:'}
        description={{ singular: 'semana', plural: 'semanas' }}
      />

      <DateSelector
        control={control}
        name={'startDate'}
        label={'Data do início do Treino:'}
        placeholder={'DD/MM/AAAA'}
      />

      <Button label={'Próximo'} onPress={handleSubmit(onSubmit)} />
    </Container>
  );
}
