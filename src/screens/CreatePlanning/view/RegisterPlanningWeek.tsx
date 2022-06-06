import { getDaysBetweenFisrtAndEndDates } from '@utils/utils';
import React, { useEffect, useMemo, useState } from 'react';
import { Container, WeekSelector } from '../styles/RegisterPlanningWeek.styles';
import { CreateDailyTraining } from './CreateDailyTraining';

interface Props {
  planning: PlanningData;
  onSave: (data: PlanningData) => void;
}

export function RegisterPlanningWeek({ planning, onSave }: Props) {
  const [selectedDate, setSelectedDate] = useState(planning.startDate);
  const [selectedTraining, setSelectedTraining] = useState<TrainingData | null>(null);
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
      dataAux.trainings.push({ date: day, type: 'free', exerciseGroups: [] }),
    );
    onSave(dataAux);
  }, [onSave, planning]);

  useEffect(() => {
    const training = planning?.trainings.find(
      el => new Date(el?.date).toString() === new Date(selectedDate).toString(),
    );
    setSelectedTraining(training || ({} as TrainingData));
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
      {selectedTraining && (
        <CreateDailyTraining
          training={selectedTraining}
          selectedDate={selectedDate}
          onPress={data => console.log(data)}
        />
      )}
    </Container>
  );
}
