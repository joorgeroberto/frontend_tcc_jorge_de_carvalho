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
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
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
