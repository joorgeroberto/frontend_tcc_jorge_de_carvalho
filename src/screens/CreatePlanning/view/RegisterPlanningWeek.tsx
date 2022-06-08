import { getDaysBetweenFisrtAndEndDates } from '@utils/utils';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { Container, WeekSelector } from '../styles/RegisterPlanningWeek.styles';
import { CreateDailyTraining } from './CreateDailyTraining';

interface Props {
  planning: PlanningData;
  referenceTraining: TrainingData;
  onSave: (data: PlanningData) => void;
  onSubmit: (data: PlanningData) => void;
}

export function RegisterPlanningWeek({ planning, referenceTraining, onSave, onSubmit }: Props) {
  const [selectedDate, setSelectedDate] = useState(planning.startDate);
  const [selectedTraining, setSelectedTraining] = useState<TrainingData | null>(null);

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

  const toNextDateOrSubmit = (data: PlanningData) => {
    const canChangeDate =
      new Date(selectedDate).toString() !== new Date(planning?.endDate).toString();
    if (canChangeDate) {
      return setSelectedDate(moment(selectedDate).add(1, 'days').format());
    }
    return onSubmit(data);
  };

  const handleOnSave = (data: TrainingData) => {
    const dataAux: PlanningData = planning;
    const trainingDays = dataAux?.trainings?.map(({ date }) => new Date(date).toString());
    const toChangeIndex = trainingDays.indexOf(new Date(data?.date).toString());
    dataAux.trainings[toChangeIndex] = data;

    onSave(dataAux);
    toNextDateOrSubmit(dataAux);
  };

  const isLastDate = () =>
    new Date(selectedDate).toString() === new Date(planning.endDate).toString();

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
          isLastDate={isLastDate()}
          selectedDate={selectedDate}
          onSave={data => handleOnSave(data)}
        />
      )}
    </Container>
  );
}
