import colors from '@config/colors';
import { calculateMonthDays, getWeekDay, weekDays } from '@utils/utils';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { BackButton } from './BackButton';

interface Props {
  startDate: string;
  endDate: string;
  numberOfWeeks: number;
  selectedDate: string;
  disableSelection?: boolean;
  onPress: (date: string) => void;
}

interface HandleOnSelectDayProps {
  isSelected: boolean;
  isDisabled: boolean;
  currentDate: string;
}

// const weekDaysDate = [31, 2, 3, 4, 5, 6, 7];

export function WeekSelector({
  startDate,
  endDate,
  selectedDate,
  numberOfWeeks,
  onPress,
  disableSelection = false,
}: Props) {
  const [currentWeek, setCurrentWeek] = useState(1);

  const formatedWeeksQuantity = useMemo(() => {
    const isStartDateSunday = getWeekDay(startDate).toString() === 'Dom';
    if (isStartDateSunday) {
      return numberOfWeeks;
    }
    return numberOfWeeks + 1;
  }, [startDate, numberOfWeeks]);

  const handleWeekArrowButton = (type: 'next' | 'previous') => {
    const isToNext = type === 'next';
    const isFirstWeek = currentWeek === 1;
    const isLastWeek = currentWeek === formatedWeeksQuantity;
    if (isLastWeek && isToNext) {
      return setCurrentWeek(formatedWeeksQuantity);
    }
    if (isToNext) {
      return setCurrentWeek(current => current + 1);
    }
    if (isFirstWeek && !isToNext) {
      return setCurrentWeek(1);
    }

    return setCurrentWeek(current => current - 1);
  };

  const weekDaysDate = useMemo(
    () =>
      calculateMonthDays({
        startDate,
        endDate,
        weeksQuantity: formatedWeeksQuantity,
      }),
    [startDate, endDate, formatedWeeksQuantity],
  );

  const handleOnSelectDay = ({ isSelected, isDisabled, currentDate }: HandleOnSelectDayProps) => {
    const canChangeValue = isSelected || isDisabled;
    if (canChangeValue) {
      return;
    }
    onPress(currentDate);
  };

  return (
    <Container>
      <HeaderContainer>
        <ArrowButton onPress={() => handleWeekArrowButton('previous')} />
        <HeaderText>{`Semana ${currentWeek}`}</HeaderText>
        <ArrowButton flipHorizontally onPress={() => handleWeekArrowButton('next')} />
      </HeaderContainer>
      <DaysContainer>
        {weekDays.map((day, index) => {
          const currentDayIndex = index + 7 * (currentWeek - 1);
          const currentDate = new Date(weekDaysDate[currentDayIndex].fullDate);
          const isDisabled =
            moment(currentDate) < moment(startDate) || moment(currentDate) > moment(endDate);
          const isSelected = new Date(selectedDate).toString() === currentDate.toString();

          return (
            <WeekDayContainer
              key={`WeekDayContainer-${index}`}
              onPress={() =>
                //disableSelection
                //</DaysContainer>? {}
                //:
                handleOnSelectDay({
                  isSelected,
                  isDisabled,
                  currentDate: currentDate.toString(),
                })
              }>
              <WeekDayNameText isSelected={isSelected} isDisabled={isDisabled}>
                {day}
              </WeekDayNameText>
              <WeekDayDateContainer isSelected={isSelected}>
                <WeekDayDateText isSelected={isSelected} isDisabled={isDisabled}>
                  {currentDate.getDate()}
                </WeekDayDateText>
              </WeekDayDateContainer>
            </WeekDayContainer>
          );
        })}
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

const ArrowButton = styled(BackButton).attrs({
  height: 25,
  width: 25,
})``;

interface WeekDayDateProps {
  isSelected: Boolean;
  isDisabled?: Boolean;
}

const WeekDayNameText = styled.Text<WeekDayDateProps>`
  font-weight: 700;
  font-size: ${({ isSelected }) => (isSelected ? 20 : 12)}px;
  line-height: ${({ isSelected }) => (isSelected ? 23.5 : 14)}px;
  color: ${({ isSelected }) => (isSelected ? colors.PRIMARY : colors.PRIMARY3)};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1.0)};
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
  color: ${({ isSelected, isDisabled }) =>
    isDisabled ? colors.PRIMARY3 : isSelected ? colors.WHITE : colors.PRIMARY};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1.0)};
`;
