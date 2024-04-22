import { scrollToSection } from './scrollToSection';

describe('scrollToSection function', () => {
  test('scrolls to the section when sectionId is valid', () => {
    const mockScrollIntoView = jest.fn();
    const mockElement = { scrollIntoView: mockScrollIntoView };
    document.getElementById = jest.fn().mockReturnValue(mockElement);

    scrollToSection('sectionId');

    expect(document.getElementById).toHaveBeenCalledWith('sectionId');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('does not scroll when sectionId is invalid', () => {
    document.getElementById = jest.fn().mockReturnValue(null);

    scrollToSection('invalidSectionId');

    expect(document.getElementById).toHaveBeenCalledWith('invalidSectionId');
  });
});
