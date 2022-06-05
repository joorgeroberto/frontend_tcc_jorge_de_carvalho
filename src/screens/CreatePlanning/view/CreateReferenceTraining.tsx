import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Container,
  NextButton,
  HollowButton,
  HollowButtonContainer,
  GroupName,
  GroupContainer,
  Image,
  AthleteName,
  Input,
  StyledTextError,
} from '../styles/CreateReferenceTraining.styles';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NumberQuantitySelector } from '@components/NumberQuantitySelector';
import useExerciseGroupsFieldArray from '@hooks/useExerciseGroupsFieldArray';
import useExercisesFieldArray from '@hooks/useExercisesFieldArray';
import { CreateExercise } from './CreateExercise';
import { Alert } from 'react-native';

interface Props {
  athlete: AthleteData;
  referenceTraining: TrainingData;
  onPress: (data: TrainingData) => void;
}

export function CreateReferenceTraining({ athlete, referenceTraining, onPress }: Props) {
  const validationSchema = yup.object().shape({
    referenceTraining: yup.object().shape({
      date: yup
        .string()
        .required('Por favor, selecione uma data válida.')
        .min(1, 'Por favor, selecione uma data válida.'),
      isOptional: yup.boolean().required(),
      exerciseGroups: yup.array().of(
        yup.object().shape({
          numberRepetitions: yup
            .number()
            .required('Por favor, insira o número de repetições')
            .min(1, 'Por favor, insira o número de repetições.'),
          exercises: yup
            .array()
            .of(
              yup.object().shape({
                type: yup
                  .string()
                  .required('Por favor, selecione o tipo do exercício.')
                  .min(1, 'Por favor, selecione o tipo do exercício.'),
                duration: yup.number().when('type', {
                  is: 'duration',
                  then: yup
                    .number()
                    .required('Por favor, selecione um valor válido.')
                    .min(0.1, 'Por favor, selecione um valor válido.'),
                }),
                distance: yup.number().when('type', {
                  is: 'distance',
                  then: yup
                    .number()
                    .required('Por favor, selecione um valor válido.')
                    .min(0.2, 'Por favor, selecione um valor válido.'),
                }),
                description: yup
                  .string()
                  .required('Por favor, insira a descrição do exercício.')
                  .min(1, 'Por favor, insira a descrição do exercício.'),
              }),
            )
            .required('Por favor, insira um ou mais exercícios a este grupo')
            .min(1, 'Por favor, insira um ou mais exercícios a este grupo.'),
        }),
      ),
    }),
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      referenceTraining,
    },
  });

  useEffect(() => {
    const showModal = errors?.referenceTraining?.exerciseGroups?.find(group => {
      if (group?.exercises) {
        return (
          (group?.exercises?.message as String) ===
          'Por favor, insira um ou mais exercícios a este grupo.'
        );
      }
    });
    if (showModal) {
      Alert.alert('Por favor, insira um ou mais exercícios ao grupo.');
    }
  }, [errors]);

  const {
    fields: exerciseGroups,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
  } = useFieldArray({
    control,
    name: 'referenceTraining.exerciseGroups',
  });

  const showNextButton = useMemo(
    () => exerciseGroups && Array.isArray(exerciseGroups) && exerciseGroups.length > 0,
    [exerciseGroups],
  );

  const onSubmit = (info: any) => onPress(info?.referenceTraining);

  return (
    <Container>
      {exerciseGroups.map((field: any, index: number) => {
        return (
          <GroupContainer>
            <GroupName>{`Grupo ${index + 1}:`}</GroupName>
            <NumberQuantitySelector
              control={control}
              name={`referenceTraining.exerciseGroups.${index}.numberRepetitions`}
              label={'Repetir Grupo:'}
              description={{ singular: 'vez', plural: 'vezes' }}
            />
            <CreateExercise index={index} control={control} />
          </GroupContainer>
        );
      })}

      <HollowButtonContainer>
        <HollowButton
          imageSource={require('@assets/icons/plus_icon_blue.png')}
          label={'Adicionar grupo de exercícios'}
          onPress={() =>
            append({
              numberRepetitions: 0,
              exercises: [],
            })
          }
        />
      </HollowButtonContainer>
      {showNextButton ? <NextButton label={'Próximo'} onPress={handleSubmit(onSubmit)} /> : <></>}
    </Container>
  );
}
