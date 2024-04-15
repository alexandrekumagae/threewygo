import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { CreateCourse } from './create-course';

describe('Create course page', () => {
  test('should render create course page without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/admin/cursos/novo']}>
        <CreateCourse />
      </MemoryRouter>
    );

    expect(screen.getByText('Cadastro de novo curso')).toBeTruthy();
  });
});
