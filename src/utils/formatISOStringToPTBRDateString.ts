export function formatISOStringToPTBRDateString(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear().toString();
  const hour = date.getUTCHours().toString().padStart(2, '0');
  const minute = date.getUTCMinutes().toString().padStart(2, '0');

  if (isNaN(date.getDate())) return NaN.toString();

  return `${day}/${month}/${year} - ${hour}h${minute}`;
}
