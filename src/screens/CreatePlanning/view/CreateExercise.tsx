import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm, useFieldArray, useWatch, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NumberQuantitySelector } from '@components/NumberQuantitySelector';
import { ExerciseTypeTabs } from '@components/ExerciseTypeTabs';
import { OneLineInput } from '@components/OneLineInput';
import { MinutesQuantitySelector } from '@components/MinutesQuantitySelector';

import {
  Container,
  BlueHollowButton,
  RedHollowButton,
  StyledTextError,
} from '../styles/CreateExercise.styles';

import useExerciseGroupsFieldArray from '@hooks/useExerciseGroupsFieldArray';
import useExercisesFieldArray from '@hooks/useExercisesFieldArray';

interface Props {
  index: number;
  control: any;
  name?: string;
}

export function CreateExercise({ index, control, name = 'referenceTraining' }: Props) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: `${name}.exerciseGroups[${index}].exercises`,
  });

  return (
    <Container>
      {fields.map((_, exerciseIndex) => {
        return (
          <React.Fragment key={`GroupContainer-${index}`}>
            <ExerciseTypeTabs
              control={control}
              name={`${name}.exerciseGroups[${index}].exercises[${exerciseIndex}].type`}
            />
            <OneLineInput
              control={control}
              label={'Descrição:'}
              name={`${name}.exerciseGroups[${index}].exercises[${exerciseIndex}].description`}
            />
            <Controller
              control={control}
              name={`${name}.exerciseGroups[${index}].exercises[${exerciseIndex}].type`}
              render={({ field: { value } }) => {
                return value === 'distance' ? (
                  <NumberQuantitySelector
                    control={control}
                    name={`${name}.exerciseGroups[${index}].exercises[${exerciseIndex}].distance`}
                    label={'Exercício:'}
                    numberFormat={'float'}
                    description={{ singular: 'KM', plural: 'KMs' }}
                  />
                ) : (
                  <MinutesQuantitySelector
                    control={control}
                    name={`${name}.exerciseGroups[${index}].exercises[${exerciseIndex}].duration`}
                    label={'Exercitar-se por:'}
                    description={{ singular: 'minuto', plural: 'minutos' }}
                  />
                );
              }}
            />

            <RedHollowButton
              imageSource={require('@assets/icons/clock_icon_red.png')}
              label={`Remover exercício ${exerciseIndex + 1}`}
              onPress={() => remove(exerciseIndex)}
            />
          </React.Fragment>
        );
      })}
      <BlueHollowButton
        imageSource={require('@assets/icons/clock_icon_blue.png')}
        label={`Adicionar exercício ao Grupo ${index + 1}`}
        onPress={() =>
          append({
            type: 'duration',
            duration: 0.0,
            distance: 0.0,
            description: '',
          })
        }
      />
    </Container>
  );
}
