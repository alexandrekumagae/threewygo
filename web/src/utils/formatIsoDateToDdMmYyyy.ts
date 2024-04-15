export function formatIsoDateToDdMmYyyy(isoDate: string): string {
  if (isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear());

    return `${day}/${month}/${year}`;
  } else {
    return "-";
  }
}