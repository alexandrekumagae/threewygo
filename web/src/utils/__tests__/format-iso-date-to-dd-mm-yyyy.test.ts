import { formatIsoDateToDdMmYyyy } from '../format-iso-date-to-dd-mm-yyyy';

describe('formatIsoDateToDdMmYyyy function', () => {
  test('formats ISO date to DD/MM/YYYY format', () => {
    const isoDate = '2024-04-20T00:00:00Z';
    const expectedDate = '20/04/2024';

    const formattedDate = formatIsoDateToDdMmYyyy(isoDate);

    expect(formattedDate).toBe(expectedDate);
  });

  test('returns "-" when isoDate is empty', () => {
    const isoDate = '';

    const formattedDate = formatIsoDateToDdMmYyyy(isoDate);

    expect(formattedDate).toBe('-');
  });
});
