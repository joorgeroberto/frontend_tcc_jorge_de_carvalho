// type WeekDay = 'Dom' | 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb';

import moment from 'moment';

export const weekDays: Array<string> = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const formatDate = (rawDate: string, international = false) => {
  const date = new Date(rawDate);
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  let month = `${date.getMonth() + 1}`;
  if (parseInt(day, 10) < 10) {
    day = `0${day}`;
  }
  if (parseInt(month, 10) < 10) {
    month = `0${month}`;
  }

  return international ? `${year}-${month}-${day}` : `${day}/${month}/${year}`;
};

export const getWeekDay = (rawDate: string) => {
  const date = new Date(rawDate);

  return weekDays[date.getDay()];
};

export const getWeekOfMonthNumber = (rawDate: string) => {
  const d = new Date(rawDate);
  const date = d.getDate();
  const day = d.getDay();
  const weekOfMonth = Math.ceil((date - 1 - day) / 7);

  return weekOfMonth;
};

interface GetDaysBetweenFisrtAndEndDatesProps {
  startDate: string;
  numberOfWeeks: number;
}

export const getDaysBetweenFisrtAndEndDates = ({
  startDate,
  numberOfWeeks,
}: GetDaysBetweenFisrtAndEndDatesProps) => {
  let month: Array<string> = [];
  for (let i = 0; i <= numberOfWeeks * 7; i++) {
    month.push(moment(startDate).add(i, 'days').format().toString());
  }
  return month;
};

interface CalculateMonthDaysProps {
  startDate: string;
  endDate: string;
  weeksQuantity: number;
}

interface MonthDay {
  weekDay: string;
  fullDate: string;
}

export const calculateMonthDays = ({
  startDate,
  endDate,
  weeksQuantity,
}: CalculateMonthDaysProps) => {
  const daysQuantity = weeksQuantity * 7;
  const month: Array<MonthDay> = [];

  function prePopulateMonthArray() {
    let count = 0;
    while (month.length < daysQuantity) {
      if (count === 7) {
        count = 0;
      }
      month.push({ weekDay: weekDays[count], fullDate: '' });
      count++;
    }
  }

  function getFirstAndLastDaysIndexes() {
    const formatedMonthArray = month.map(object => object.weekDay);
    const firstDayIndex = formatedMonthArray.indexOf(getWeekDay(startDate));
    const lastDayIndex = formatedMonthArray.lastIndexOf(getWeekDay(endDate));

    return { firstDayIndex, lastDayIndex };
  }

  function populateDaysBeforeFirstDay(firstDayIndex: number) {
    const isFisrtIndex = firstDayIndex === 0;
    if (isFisrtIndex) {
      return;
    }
    for (let i = 0; i < firstDayIndex; i++) {
      month[i].fullDate = moment(month[firstDayIndex].fullDate)
        .subtract(firstDayIndex - i, 'days')
        .format();
    }
  }

  function populateDaysAfterFirstDay(firstDayIndex: number) {
    for (let i = firstDayIndex + 1; i < month.length; i++) {
      month[i].fullDate = moment(month[firstDayIndex].fullDate)
        .add(i - firstDayIndex, 'days')
        .format();
    }
  }

  prePopulateMonthArray();
  const { firstDayIndex, lastDayIndex } = getFirstAndLastDaysIndexes();
  month[firstDayIndex].fullDate = startDate;
  month[lastDayIndex].fullDate = endDate;
  populateDaysBeforeFirstDay(firstDayIndex);
  populateDaysAfterFirstDay(firstDayIndex);

  return month;
};
