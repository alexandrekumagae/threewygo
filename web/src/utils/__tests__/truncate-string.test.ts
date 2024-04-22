import { truncateString } from "../truncate-string";

describe('truncateString', () => {
  it('should return the original string if its length is less than or equal to the maxLength', () => {
    const str = 'Hello, world!';
    const maxLength = 20;
    expect(truncateString(str, maxLength)).toBe(str);
  });

  it('should truncate the string and append "..." if its length is greater than maxLength', () => {
    const str = 'Lorem ipsum dolor sit amet';
    const maxLength = 10;
    const expected = 'Lorem ipsu...';
    expect(truncateString(str, maxLength)).toBe(expected);
  });

  it('should handle empty strings correctly', () => {
    const str = '';
    const maxLength = 10;
    expect(truncateString(str, maxLength)).toBe(str);
  });

  it('should handle maxLength of 0 correctly', () => {
    const str = 'Lorem ipsum dolor sit amet';
    const maxLength = 0;
    const expected = '...';
    expect(truncateString(str, maxLength)).toBe(expected);
  });

  it('should handle maxLength greater than the length of the string correctly', () => {
    const str = 'Hello';
    const maxLength = 10;
    expect(truncateString(str, maxLength)).toBe(str);
  });
});
