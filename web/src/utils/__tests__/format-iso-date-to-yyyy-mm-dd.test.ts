import { formatIsoDateToYyyyMmDd } from '../format-iso-date-to-yyyy-mm-dd';

describe('formatIsoDateToYyyyMmDd function', () => {
  test('formats ISO date to YYYY-MM-DD format', () => {
    const isoDate = '2024-04-20T00:00:00Z';

    const formattedDate = formatIsoDateToYyyyMmDd(isoDate);

    expect(formattedDate).toBe('2024-04-20');
  });

  test('returns "-" when isoDate is empty', () => {
    const isoDate = '';

    const formattedDate = formatIsoDateToYyyyMmDd(isoDate);

    expect(formattedDate).toBe('-');
  });
});
