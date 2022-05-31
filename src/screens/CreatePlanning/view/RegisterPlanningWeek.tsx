import React, { useState } from 'react';
import { Container, WeekSelector } from '../styles/RegisterPlanningWeek.styles';

interface Props {
  planningData: PlanningData;
}

export function RegisterPlanningWeek({ planningData }: Props) {
  const [selectedDate, setSelectedDate] = useState(planningData.startDate);
  const onSubmit = (info: any) => console.log(info);

  return (
    <Container>
      <WeekSelector
        startDate={planningData.startDate}
        endDate={planningData.endDate}
        numberOfWeeks={planningData.numberOfWeeks}
        selectedDate={selectedDate}
        onPress={data => setSelectedDate(data)}
      />
    </Container>
  );
}
