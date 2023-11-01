export const handleTimezone = (date: Date) => {
  const dateWithoutTimezone = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  );
  return dateWithoutTimezone;
};
