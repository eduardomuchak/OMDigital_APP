export function omIDFormatter(num: number): string {
  const desiredLength = 6;
  const numStr = num.toString();
  const diff = desiredLength - numStr.length;
  const zeros = '0'.repeat(Math.max(0, diff));
  return `#${zeros}${numStr}`;
}
