import { useFieldArray } from 'react-hook-form';

export default function useExerciseGroupsFieldArray(control: any) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'referenceTraining.exerciseGroups',
  });

  const exerciseGroups = fields as Array<any>;
  const appendExerciseGroup = append as any;

  return [exerciseGroups, appendExerciseGroup];
}
