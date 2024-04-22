import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';

import { CourseVideos } from '../course-videos';

const mockVideos = [
  {
    id: "1",
    path: 'video1.mp4',
    name: 'Video 1',
    size: "10"
  },
  {
    id: "2",
    path: 'video2.mp4',
    name: 'Video 2',
    size: "5"
  },
];

describe('CourseVideos Component', () => {
  test('renders second video', () => {
    render(<CourseVideos videos={mockVideos} />);
    const videoElement = screen.getByText('Video 2');
    expect(videoElement).toBeInTheDocument();
  });

  test('opens modal when first video is clicked', () => {
    render(<CourseVideos videos={mockVideos} />);
    const videoElement = screen.getByTitle('Video 1');
    fireEvent.click(videoElement);
    const modalElement = screen.getByTitle('Video 1');
    expect(modalElement).toBeInTheDocument();
  });
});
