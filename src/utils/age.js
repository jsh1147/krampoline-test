import dayjs from "dayjs";

export const convertDateToAge = (dateString) => {
  const today = dayjs();
  const birthDate = dayjs(dateString);
  let age = today.year() - birthDate.year();
  const ageMonth = today.month() - birthDate.month();
  const ageDay = today.date() - birthDate.date();

  if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
    age--;
  }

  return age;
};
