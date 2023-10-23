export const convertDate = (date) => {
  const pastDate = new Date(date).toLocaleString("en-Us", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const nowDate = new Date(date).toLocaleTimeString("en-Us", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const getDate = new Date(date);
  const now = new Date();

  if (getDate.getMonth() < now.getMonth()) {
    return pastDate;
  } else {
    if (getDate.getDate() < now.getDate()) {
      return pastDate;
    } else {
      return nowDate;
    }
  }
};
