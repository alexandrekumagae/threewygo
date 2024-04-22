import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Footer } from '../footer';

describe('Footer Component', () => {
  test('renders footer with copyright text', () => {
    render(<Footer />);

    const copyrightText = screen.getByText(
      /Copyright © 2024 Threewygo - Todos os direitos reservados/i
    );

    expect(copyrightText).toBeInTheDocument();
  });
});
