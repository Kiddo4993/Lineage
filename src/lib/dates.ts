// Calendar days in the browser's own time zone, as YYYY-MM-DD. (toISOString()
// gives the UTC day, which flips to "tomorrow" around 5 PM on the US west coast.)
export function localDay(now: Date = new Date()): string {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function isYesterday(dateISO: string, now: Date = new Date()): boolean {
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  return dateISO === localDay(yesterday);
}
