import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToastProvider } from './ToastContext';
import ToastDemo from './ToastDemo';

const renderWithProvider = (ui) => {
  return render(
    <ToastProvider>
      {ui}
    </ToastProvider>
  );
};

describe('ToastDemo', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all toast buttons', () => {
    renderWithProvider(<ToastDemo />);
    expect(screen.getByText(/Show Success Toast/i)).toBeInTheDocument();
    expect(screen.getByText(/Show Warning Toast/i)).toBeInTheDocument();
    expect(screen.getByText(/Show Error Toast/i)).toBeInTheDocument();
    expect(screen.getByText(/Show Custom Duration Toast/i)).toBeInTheDocument();
  });

  it('shows success toast when success button is clicked', async () => {
    renderWithProvider(<ToastDemo />);
    
    fireEvent.click(screen.getByText(/Show Success Toast/i));
    
    await waitFor(() => {
      const toastMessage = screen.getByText('Your action was completed successfully!');
      expect(toastMessage).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows warning toast when warning button is clicked', async () => {
    renderWithProvider(<ToastDemo />);
    
    fireEvent.click(screen.getByText(/Show Warning Toast/i));
    
    await waitFor(() => {
      const toastMessage = screen.getByText('This action might have consequences. Please review before proceeding.');
      expect(toastMessage).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows error toast when error button is clicked', async () => {
    renderWithProvider(<ToastDemo />);
    
    fireEvent.click(screen.getByText(/Show Error Toast/i));
    
    await waitFor(() => {
      const toastMessage = screen.getByText('An error occurred while processing your request.');
      expect(toastMessage).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows custom duration toast when custom duration button is clicked', async () => {
    renderWithProvider(<ToastDemo />);
    
    fireEvent.click(screen.getByText(/Show Custom Duration Toast/i));
    
    await waitFor(() => {
      const toastMessage = screen.getByText('This toast will stay for 10 seconds');
      expect(toastMessage).toBeInTheDocument();
    }, { timeout: 3000 });
  });
}); 