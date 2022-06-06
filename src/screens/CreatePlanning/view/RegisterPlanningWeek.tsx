import { getDaysBetweenFisrtAndEndDates } from '@utils/utils';
import React, { useEffect, useMemo, useState } from 'react';
import { Container, WeekSelector } from '../styles/RegisterPlanningWeek.styles';
import { CreateDailyTraining } from './CreateDailyTraining';

interface Props {
  planning: PlanningData;
  referenceTraining: TrainingData;
  onSave: (data: PlanningData) => void;
}

export function RegisterPlanningWeek({ planning, referenceTraining, onSave }: Props) {
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

  const handleOnSave = (data: TrainingData) => {
    const dataAux = planning;
    const trainingDays = dataAux?.trainings?.map(({ date }) => new Date(date).toString());
    const toChangeIndex = trainingDays.indexOf(new Date(data?.date).toString());
    dataAux.trainings[toChangeIndex] = data;
    onSave(dataAux);
  };

  // const referenceTrainingFormated = useMemo(() => {
  //   let formated = ;
  //   return formated;
  // }, [referenceTraining, selectedDate]);

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
      {selectedTraining && selectedTraining?.date?.length > 0 && (
        <CreateDailyTraining
          referenceTraining={{ ...referenceTraining, date: selectedDate }}
          training={selectedTraining}
          selectedDate={selectedDate}
          onSave={data => handleOnSave(data)}
        />
      )}
    </Container>
  );
}
