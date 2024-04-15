import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { EditCourse } from './edit-course';

describe('Edit course page', () => {
  test('should render edit course page without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/admin/cursos/editar/curso-teste']}>
        <EditCourse />
      </MemoryRouter>
    );

    expect(screen.getByText('Editar curso')).toBeTruthy();
  });
});
