const convertISOToCustomFormat = (isoDateString) => {
  const isoDate = new Date(isoDateString);
  const day = isoDate.getDate();
  const month = isoDate.getMonth() + 1;
  const year = isoDate.getFullYear();
  const hours = isoDate.getHours();
  const minutes = isoDate.getMinutes();
  const seconds = isoDate.getSeconds();

  const formattedDate = `${addLeadingZero(day)}/${addLeadingZero(
    month
  )}/${year} ${addLeadingZero(hours)}:${addLeadingZero(
    minutes
  )}:${addLeadingZero(seconds)}`;

  return formattedDate;
};

const addLeadingZero = (value, length = 2) => {
  return value.toString().padStart(length, '0');
};

export default convertISOToCustomFormat;
