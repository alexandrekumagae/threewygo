import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header } from '../header';

describe('Header Component', () => {
  test('renders header with Threewygo link and Dashboard button', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const threewygoLink = screen.getByText('Threewygo');
    const dashboardButton = screen.getByText('Dashboard');

    expect(threewygoLink).toBeTruthy();
    expect(dashboardButton).toBeTruthy();
  });

  test('Threewygo link points to home page', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const threewygoLink = screen.getByTitle('Link do logo');
    expect(threewygoLink).toHaveAttribute('href', '/');
  });

  test('Dashboard button points to admin page', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const dashboardButton = screen.getByTitle('Link para dashboard');
    expect(dashboardButton).toHaveAttribute('href', '/admin');
  });
});
