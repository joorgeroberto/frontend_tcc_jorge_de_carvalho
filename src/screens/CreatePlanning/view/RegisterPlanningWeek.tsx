import React from 'react';
import { Container, WeekSelector } from '../styles/RegisterPlanningWeek.styles';

interface Props {}

export function RegisterPlanningWeek({}: Props) {
  const onSubmit = (info: any) => console.log(info);

  return (
    <Container>
      <WeekSelector />
    </Container>
  );
}
