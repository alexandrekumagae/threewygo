import { slugify } from "./slugify";

describe('slugify function', () => {
  test('should convert text to lowercase and replace spaces with dashes', () => {
    const input = 'Hello World';
    const expectedOutput = 'hello-world';
    expect(slugify(input)).toBe(expectedOutput);
  });

  test('should remove non-word characters', () => {
    const input = 'Hello!@#$%World';
    const expectedOutput = 'helloworld';
    expect(slugify(input)).toBe(expectedOutput);
  });

  test('should replace consecutive dashes with a single dash', () => {
    const input = 'Hello--World';
    const expectedOutput = 'hello-world';
    expect(slugify(input)).toBe(expectedOutput);
  });
});
