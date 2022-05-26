import colors from '@config/colors';
import React from 'react';
import styled from 'styled-components/native';
import { BackButton } from './BackButton';

interface Props {
  // startDate: string;
  // currentDate: string;
  // onPress: (date: string) => void;
}

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const weekDaysDate = [31, 2, 3, 4, 5, 6, 7];

export function WeekSelector({}: Props) {
  return (
    <Container>
      <HeaderContainer>
        <BackButton height={25} width={25} onPress={() => {}} />
        <HeaderText>{'Semana 1'}</HeaderText>
        <BackButton height={25} width={25} flipHorizontally onPress={() => {}} />
      </HeaderContainer>
      <DaysContainer>
        {weekDays.map((day, index) => (
          <WeekDayContainer>
            <WeekDayNameText isSelected={index === 2}>{day}</WeekDayNameText>
            <WeekDayDateContainer isSelected={index === 2}>
              <WeekDayDateText isSelected={index === 2}>{weekDaysDate[index]}</WeekDayDateText>
            </WeekDayDateContainer>
          </WeekDayContainer>
        ))}
      </DaysContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 25px;
  margin-bottom: 16px;
`;

const HeaderText = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.PRIMARY};
`;

const DaysContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60.5px;
`;

const WeekDayContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

interface WeekDayDateProps {
  isSelected: Boolean;
}

const WeekDayNameText = styled.Text<WeekDayDateProps>`
  font-weight: 700;
  font-size: ${({ isSelected }) => (isSelected ? 20 : 12)}px;
  line-height: ${({ isSelected }) => (isSelected ? 23.5 : 14)}px;
  color: ${colors.PRIMARY3};
`;

const WeekDayDateContainer = styled.View<WeekDayDateProps>`
  width: ${({ isSelected }) => (isSelected ? 32.5 : 22)}px;
  height: ${({ isSelected }) => (isSelected ? 32.5 : 22)}px;
  justify-content: center;
  align-items: center;
  margin-top: ${({ isSelected }) => (isSelected ? 5 : 7)}px;
  border-radius: 100px;
  background-color: ${({ isSelected }) => (isSelected ? colors.PRIMARY : colors.PRIMARY4)};
`;

const WeekDayDateText = styled.Text<WeekDayDateProps>`
  font-size: ${({ isSelected }) => (isSelected ? 18 : 12)}px;
  line-height: ${({ isSelected }) => (isSelected ? 21 : 14)}px;
  font-weight: 700;
  color: ${({ isSelected }) => (isSelected ? colors.WHITE : colors.PRIMARY)};
`;
