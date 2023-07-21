export function getDateWithoutTime(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

export function getHoursAndMinutes(date: Date) {
  return `${date.getHours()}:${date.getMinutes()}`;
}

export function formatDateToPTBR(date: string) {
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2];

  return `${day}/${month}/${year}`;
}

export function removeSecondsFromTime(time: string) {
  const hours = time.split(":")[0];
  const minutes = time.split(":")[1];

  return `${hours}h${minutes}`;
}
