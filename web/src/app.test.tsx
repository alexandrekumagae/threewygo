import { render, screen, waitFor } from '@testing-library/react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

jest.mock('./lib/api', () => ({
  api: {
    get: jest.fn().mockResolvedValue({
      status: 200,
      data: [
        { 
          "id": "1",
          "title": "Fundamentos e Metodologia da Educação Corporativa",
          "slug": "fundamentos-e-metodologia-da-educacao-corporativa",
          "description": "No cenário globalizado, as organizações governamentais têm percebido os servidores públicos como seu principal ativo, o que faz com que a educação corporativa assuma um papel essencial no desenvolvimento e aprimoramento das competências profissionais. Neste curso, aprenda diferentes métodos e estratégias de ensino aplicados à aprendizagem corporativa e contribua para o crescimento organizacional.",
          "expiration_date": "2020-01-01T00:00:00",
          "videos": [
          ]
        }, 
      ],
    }),
  },
}));

describe('App component', () => {
  test('renders header, button and courses', async () => {
    render(
      <RouterProvider router={router} />
    );

    expect(screen.getByText('Threewygo LMS')).toBeTruthy();
    expect(screen.getByText('Ver cursos')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('Fundamentos e Metodologia da Educação Corporativa')).toBeTruthy();
    });
  });
});
