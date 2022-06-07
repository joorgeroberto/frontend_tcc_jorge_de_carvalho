import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Container,
  SaveButton,
  HollowButton,
  HollowButtonContainer,
  GroupName,
  GroupContainer,
  Image,
  ImageDescription,
} from '../styles/CreateDailyTraining.styles';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NumberQuantitySelector } from '@components/NumberQuantitySelector';
import useExerciseGroupsFieldArray from '@hooks/useExerciseGroupsFieldArray';
import useExercisesFieldArray from '@hooks/useExercisesFieldArray';
import { CreateExercise } from './CreateExercise';
import { Alert } from 'react-native';
import { OptionsModal } from '@components/OptionsModal';

interface Props {
  training: TrainingData | object;
  selectedDate: string;
  onSave: (data: TrainingData) => void;
  referenceTraining: TrainingData;
}

export function CreateDailyTraining({ training, selectedDate, onSave, referenceTraining }: Props) {
  const validationSchema = yup.object().shape({
    training: yup.object().shape({
      date: yup
        .string()
        .required('Por favor, selecione uma data válida.')
        .min(1, 'Por favor, selecione uma data válida.'),
      type: yup.string().required().min(1, 'Por favor, selecione o tipo de treino.'),
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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      training,
    },
  });

  useEffect(() => {
    console.log(errors?.training);
    const showModal = errors?.training?.exerciseGroups?.find((group: any) => {
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

  useEffect(() => {
    reset({ training });
  }, [training, reset]);

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
    name: 'training.exerciseGroups',
  });

  const isFreeTraining = useCallback((type: any) => type.toString() === 'free', []);

  const showSaveButton = useMemo(
    () => exerciseGroups && Array.isArray(exerciseGroups) && exerciseGroups.length > 0,
    [exerciseGroups],
  );

  const onSubmit = (info: any) => onSave(info?.training);

  const renderExerciseGroupsSelection = () => {
    return (
      <>
        {exerciseGroups.map((_: any, index: number) => {
          return (
            <GroupContainer key={`GroupContainer-${index}`}>
              <GroupName>{`Grupo ${index + 1}:`}</GroupName>
              <NumberQuantitySelector
                control={control}
                name={`training.exerciseGroups.${index}.numberRepetitions`}
                label={'Repetir Grupo:'}
                description={{ singular: 'vez', plural: 'vezes' }}
              />
              <CreateExercise name={'training'} index={index} control={control} />
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

        <HollowButton
          imageSource={require('@assets/icons/plus_icon_blue.png')}
          label={'Replicar treino de referência'}
          onPress={() => reset({ training: referenceTraining })}
        />
      </>
    );
  };

  return (
    <Controller
      control={control}
      name={'training.type'}
      render={({ field: { value: trainingType } }) => {
        return (
          <Container>
            <OptionsModal
              control={control}
              name={'training.type'}
              label={'Tipo de treino:'}
              modalTitle={'Selecione o tipo de treino'}
            />

            {isFreeTraining(trainingType) ? (
              <>
                <Image source={require('@assets/images/free_training_image.png')} />
                <ImageDescription>Não existem treinos planejados para este dia.</ImageDescription>
              </>
            ) : (
              renderExerciseGroupsSelection()
            )}
            {showSaveButton || isFreeTraining(trainingType) ? (
              <SaveButton label={'Salvar'} onPress={handleSubmit(onSubmit)} />
            ) : (
              <></>
            )}
          </Container>
        );
      }}
    />
  );
}
