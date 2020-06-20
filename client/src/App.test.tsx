import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders home title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Fibonacci Generator/i);
  expect(linkElement).toBeInTheDocument();
});
