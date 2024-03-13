export const convertDateVnCustom = (isoDateString) => {
  const isoDate = new Date(isoDateString);
  const day = isoDate.getDate();
  const month = isoDate.getMonth() + 1;
  const year = isoDate.getFullYear();

  return 'Ngày ' + day + ' Tháng ' + month + ' Năm ' + year;
};
