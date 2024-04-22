import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { Dashboard } from '../admin/dashboard';

describe('Dashboard page', () => {
  test('should render dashboard page without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard')).toBeTruthy();
  });
});
