import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { CourseDetail } from '../course-detail';

describe('Course Detail page', () => {
  test('should render course detail page without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/courses/test-course']}>
        <CourseDetail />
      </MemoryRouter>
    );

    expect(screen.getByText('Curso não encontrado!')).toBeTruthy();

    expect(screen.getByText('Ver cursos')).toBeTruthy();
  });
});
