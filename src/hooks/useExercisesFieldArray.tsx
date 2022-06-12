import { useFieldArray } from 'react-hook-form';

interface Props {
  control: any;
  index: number;
}

export default function useExerciseGroupsFieldArray({ control, index }: Props) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: `referenceTraining.exerciseGroups[${index}].exercises`,
  });

  const exercises = fields as Array<any>;
  const appendExercise = append as any;

  return [exercises, appendExercise];
}
