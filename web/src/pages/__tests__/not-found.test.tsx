import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { NotFound } from '../not-found';

describe('Not found page', () => {
  test('should render not found page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(getByText(/404 Página não encontrada/i)).toBeTruthy();

    expect(getByText(/Ver cursos/i)).toBeTruthy();
  });
})
