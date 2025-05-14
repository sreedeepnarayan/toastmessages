import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastProvider } from './components/Toast/ToastContext';
import App from './App';

const renderWithProvider = (ui) => {
  return render(
    <ToastProvider>
      {ui}
    </ToastProvider>
  );
};

test('renders toast demo title', () => {
  renderWithProvider(<App />);
  const titleElement = screen.getByText(/Toast Notification Demo/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders all toast buttons', () => {
  renderWithProvider(<App />);
  expect(screen.getByText(/Show Success Toast/i)).toBeInTheDocument();
  expect(screen.getByText(/Show Warning Toast/i)).toBeInTheDocument();
  expect(screen.getByText(/Show Error Toast/i)).toBeInTheDocument();
  expect(screen.getByText(/Show Custom Duration Toast/i)).toBeInTheDocument();
});
