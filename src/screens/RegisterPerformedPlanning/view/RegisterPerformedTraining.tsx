import { useNavigation } from '@react-navigation/native';
import { RootState } from '@storeData/index';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Header,
  Loader,
  SaveButtonContainer,
  SaveButton,
  StyledScrollView,
  TrainingInfoContainer,
  TrainingInfoText,
  TrainingInfoIcon,
  TrainingInfoRow,
  ArrowIcon,
  ExerciseGroupsTable,
  Divider,
  Input,
} from '../styles/RegisterPerformedTraining.styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { PerformedTrainingActions } from '@storeData/actions/PerformedTraining';
import { formatDate } from '@utils/utils';
import { useForm } from 'react-hook-form';

const fcMaxLength = 3;
const caloriesMaxLength = 15;
const durationMaxLength = 8;

interface Props {
  route?: {
    params?: {
      training?: TrainingData;
      planningName?: string;
    };
  };
}

export function RegisterPerformedTraining({ route }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading } = useSelector(({ performedTraining }: RootState) => performedTraining);
  const [isTrainingInfoOpen, setTrainingInfoOpen] = useState(false);

  const training: any = useMemo(() => {
    return route?.params?.training;
  }, [route]);

  const validationSchema = yup.object().shape({
    calories: yup
      .number()
      .required('Por favor, digite a quantidade de calorias.')
      .typeError('Por favor, digite a quantidade de calorias.')
      .min(1, 'A quantidade de calorias deve ser maior que zero.'),
    duration: yup
      .string()
      .required('Por favor, digite a  duração no formato hh:mm:ss.')
      .min(8, 'Por favor, digite uma duração no formato hh:mm:ss.')
      .test(
        'validDuration',
        'Por favor, digite uma duração de treino válida no formato hh:mm:ss.',
        duration => {
          const aux = duration?.toString().replace(/[^0-9]/g, '');
          return Number(aux) > 0;
        },
      ),
    distance: yup
      .string()
      .min(1, 'Por favor, digite a distância do treino.')
      .required('Por favor, digite a distância do treino.')
      .test(
        'validDistance',
        'Por favor, digite uma distância de treino válida',
        v => Number(v) > 0,
      ),
    vMed: yup
      .number()
      .required('Por favor, digite a velocidade média.')
      .typeError('Por favor, digite a velocidade média.')
      .min(1, 'A velocidade média deve ser maior que zero.')
      .test(
        'validAverageSpeed',
        'Por favor, digite uma velocidade média válida.',
        v => Number(v) > 0,
      ),
    vMax: yup
      .number()
      .required('Por favor, digite a velocidade máxima.')
      .typeError('Por favor, digite a velocidade máxima.')
      .min(1, 'A velocidade máxima deve ser maior que zero.')
      .test('validMaxSpeed', 'Por favor, digite uma velocidade máxima válida.', v => Number(v) > 0),
    fcRest: yup
      .number()
      .required('Por favor, digite a frequência em repouso.')
      .typeError('Por favor, digite a frequência em repouso.')
      .min(1, 'A frequência em repouso deve ser maior que zero.'),
    fcMed: yup
      .number()
      .required('Por favor, digite a frequência média.')
      .typeError('Por favor, digite a frequência média.')
      .min(1, 'A frequência média deve ser maior que zero.'),
    fcMax: yup
      .number()
      .required('Por favor, digite a frequência máxima.')
      .typeError('Por favor, digite a frequência máxima.')
      .min(1, 'A frequência máxima deve ser maior que zero.'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = (data: PerformedTraining) => {
    data.trainingId = training.id;
    dispatch(PerformedTrainingActions.Register(data));
    // return Alert.alert(email, password);
  };

  const renderTrainingInfo = () => {
    return (
      <TrainingInfoContainer onPress={() => setTrainingInfoOpen(!isTrainingInfoOpen)}>
        <ArrowIcon
          resizeMode="contain"
          flipVertically={isTrainingInfoOpen}
          source={require('@assets/icons/arrow_down_icon.png')}
        />
        <TrainingInfoRow>
          <TrainingInfoIcon source={require('@assets/icons/calendar_icon.png')} />
          <TrainingInfoText>{formatDate(training?.date)}</TrainingInfoText>
        </TrainingInfoRow>
        {isTrainingInfoOpen && (
          <>
            <TrainingInfoRow marginTop={15}>
              <TrainingInfoIcon source={require('@assets/icons/athlete_button_icon_blue.png')} />
              <TrainingInfoText>{route?.params?.planningName}</TrainingInfoText>
            </TrainingInfoRow>
            <Divider />
            <ExerciseGroupsTable training={training as TrainingData} />
          </>
        )}
      </TrainingInfoContainer>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header title={'Cadastrar treino realizado'} onPressBackButton={() => navigation.goBack()} />
      {renderTrainingInfo()}

      <StyledScrollView>
        <Input
          control={control}
          name={'calories'}
          label={'Calorias queimadas (Kcal):'}
          marginBottom={15}
          placeholder={'Insira a quantidade de calorias queimadas.'}
          keyboardType={'decimal-pad'}
          mask={({ oldValue, newValue }) => {
            const isMaxLength = newValue.length > caloriesMaxLength;
            if (isMaxLength) {
              return oldValue;
            }
            return newValue.replace(/[^0-9]/g, '');
          }}
        />

        <Input
          control={control}
          name={'duration'}
          label={'Duração do treino:'}
          marginBottom={15}
          placeholder={'hh:mm:ss'}
          keyboardType={'decimal-pad'}
          mask={({ oldValue, newValue }) => {
            const isMaxPhoneLength = newValue.length > durationMaxLength;
            if (isMaxPhoneLength) {
              return oldValue;
            }

            const replacedText = newValue.replace(/[^0-9]/g, '');
            return replacedText
              .replace(/^(\d{1,2})(\d)/, '$1:$2')
              .replace(/^(\d{2}:\d{2})(\d)/, '$1:$2');
          }}
        />

        <Input
          control={control}
          name={'distance'}
          label={'Distância percorrida (Km):'}
          marginBottom={15}
          placeholder={'Insira a distância percorrida.'}
          keyboardType={'decimal-pad'}
          mask={({ oldValue, newValue }) => {
            const maxPhoneLength = 9;
            const isMaxPhoneLength = newValue.length > maxPhoneLength;
            if (isMaxPhoneLength) {
              return oldValue;
            }

            const replacedText = newValue.replace(/[^0-9]/g, '');
            return replacedText.replace(/^(\d{1,6})(\d{2})/, '$1.$2');
          }}
        />

        <Input
          control={control}
          name={'vMed'}
          label={'Velocidade média (Km/h):'}
          marginBottom={15}
          placeholder={'Insira a velocidade média percorrida.'}
          keyboardType={'decimal-pad'}
          mask={({ oldValue, newValue }) => {
            const maxPhoneLength = 9;
            const isMaxPhoneLength = newValue.length > maxPhoneLength;
            if (isMaxPhoneLength) {
              return oldValue;
            }
            const replacedText = newValue.replace(/[^0-9]/g, '');
            return replacedText.replace(/^(\d{1,6})(\d{2})/, '$1.$2');
          }}
        />

        <Input
          control={control}
          name={'vMax'}
          label={'Velocidade máxima (Km/h):'}
          marginBottom={15}
          placeholder={'Insira a velocidade máxima percorrida.'}
          keyboardType={'decimal-pad'}
          mask={({ oldValue, newValue }) => {
            const maxPhoneLength = 9;
            const isMaxPhoneLength = newValue.length > maxPhoneLength;
            if (isMaxPhoneLength) {
              return oldValue;
            }
            const replacedText = newValue.replace(/[^0-9]/g, '');
            return replacedText.replace(/^(\d{1,6})(\d{2})/, '$1.$2');
          }}
        />

        <Input
          control={control}
          name={'fcRest'}
          label={'Frequência cardíaca em repouso (Bpm):'}
          marginBottom={15}
          placeholder={'Insira a Frequência cardíaca em repouso.'}
          keyboardType={'decimal-pad'}
          mask={({ oldValue, newValue }) => {
            const isMaxLength = newValue.length > fcMaxLength;
            if (isMaxLength) {
              return oldValue;
            }
            return newValue.replace(/[^0-9]/g, '');
          }}
        />

        <Input
          control={control}
          name={'fcMed'}
          label={'Frequência cardíaca média (Bpm):'}
          marginBottom={15}
          placeholder={'Insira a Frequência cardíaca média'}
          keyboardType={'decimal-pad'}
          mask={({ oldValue, newValue }) => {
            const isMaxLength = newValue.length > fcMaxLength;
            if (isMaxLength) {
              return oldValue;
            }
            return newValue.replace(/[^0-9]/g, '');
          }}
        />

        <Input
          control={control}
          name={'fcMax'}
          label={'Frequência cardíaca máxima (Bpm):'}
          marginBottom={15}
          placeholder={'Insira a Frequência cardíaca máxima'}
          keyboardType={'decimal-pad'}
          mask={({ oldValue, newValue }) => {
            const isMaxLength = newValue.length > fcMaxLength;
            if (isMaxLength) {
              return oldValue;
            }
            return newValue.replace(/[^0-9]/g, '');
          }}
        />
      </StyledScrollView>

      <SaveButtonContainer>
        <SaveButton label={'Salvar'} onPress={handleSubmit(onSubmit)} />
      </SaveButtonContainer>
    </Container>
  );
}
