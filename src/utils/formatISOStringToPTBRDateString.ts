export function formatISOStringToPTBRDateString(isoString: string): string {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} - ${hour}h${minute}`;
}
