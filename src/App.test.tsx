import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders name', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Luke Kennedy/i);
  expect(linkElement).toBeInTheDocument();
});
