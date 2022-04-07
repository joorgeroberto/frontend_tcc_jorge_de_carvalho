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
