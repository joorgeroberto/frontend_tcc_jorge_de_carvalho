import { getDaysBetweenFisrtAndEndDates } from '@utils/utils';
import React, { useEffect, useMemo, useState } from 'react';
import { Container, WeekSelector } from '../styles/RegisterPlanningWeek.styles';

interface Props {
  planning: PlanningData;
  onSave: (data: PlanningData) => void;
}

export function RegisterPlanningWeek({ planning, onSave }: Props) {
  const [selectedDate, setSelectedDate] = useState(planning.startDate);
  const onSubmit = (info: any) => console.log(info);

  useEffect(() => {
    const trainingDataExists = planning?.trainings?.length > 0;
    if (trainingDataExists) {
      return;
    }
    const dataAux = planning;
    const trainingDays = getDaysBetweenFisrtAndEndDates({
      startDate: dataAux.startDate,
      numberOfWeeks: dataAux.numberOfWeeks,
    });
    trainingDays.map(day =>
      dataAux.trainings.push({ date: day, isOptional: false, exerciseGroups: [] }),
    );
    onSave(dataAux);
  }, [onSave, planning]);

  useEffect(() => {
    console.log(planning);
  }, [planning]);

  const selectedTraining = useMemo(() => {
    // const formatedTrainings = planning?.trainings.map(training =>
    //   new Date(training.date).toString(),
    // );
    // return formatedTrainings.indexOf(new Date(selectedDate).toString());
    const training = planning?.trainings.find(
      el => new Date(el?.date).toString() === new Date(selectedDate).toString(),
    );
    return training;
  }, [planning, selectedDate]);

  return (
    <Container>
      <WeekSelector
        disableSelection
        startDate={planning.startDate}
        endDate={planning.endDate}
        numberOfWeeks={planning.numberOfWeeks}
        selectedDate={selectedDate}
        onPress={data => setSelectedDate(data)}
      />
    </Container>
  );
}
