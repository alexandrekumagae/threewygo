import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Course } from './course';

const mockCourse = {
  id: '1',
  title: 'Test Course',
  description: 'This is a test course description',
  slug: 'test-course',
  expiration_date: '2024-04-30',
  videos: []
};

describe('Course Component', () => {
  test('renders course title and description', () => {
    render(
      <Router>
        <Course course={mockCourse} />
      </Router>
    );

    const titleElement = screen.getByText('Test Course');
    const descriptionElement = screen.getByText('This is a test course description');

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('link points to correct course page', () => {
    render(
      <Router>
        <Course course={mockCourse} />
      </Router>
    );

    const linkElement = screen.getByRole('link', { name: /Test Course/i });

    expect(linkElement).toHaveAttribute('href', `/curso/${mockCourse.slug}`);
  });
});
