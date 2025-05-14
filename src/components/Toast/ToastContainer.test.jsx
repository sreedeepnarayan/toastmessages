import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ToastProvider, useToast } from './ToastContext';
import ToastContainer from './ToastContainer';

describe('ToastContainer', () => {
  const TestComponent = () => {
    const { addToast } = useToast();
    return (
      <div>
        <button onClick={() => addToast({ type: 'success', message: 'Test message' })}>
          Add Toast
        </button>
        <ToastContainer />
      </div>
    );
  };

  const renderWithProvider = (ui) => {
    return render(
      <ToastProvider>
        {ui}
      </ToastProvider>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without toasts', () => {
    renderWithProvider(<ToastContainer />);
    const container = screen.getByTestId('toast-container');
    expect(container).toBeInTheDocument();
    expect(container.children).toHaveLength(0);
  });

  it('renders with toasts', () => {
    renderWithProvider(<TestComponent />);
    
    act(() => {
      screen.getByText('Add Toast').click();
    });

    const toast = screen.getByText('Test message');
    expect(toast).toBeInTheDocument();
    expect(toast.closest('[role="alert"]')).toHaveClass('bg-toast-success');
  });

  it('renders multiple toasts', () => {
    const MultipleToastComponent = () => {
      const { addToast } = useToast();
      return (
        <div>
          <button onClick={() => {
            addToast({ type: 'success', message: 'Success message' });
            addToast({ type: 'danger', message: 'Danger message' });
          }}>
            Add Multiple Toasts
          </button>
          <ToastContainer />
        </div>
      );
    };

    renderWithProvider(<MultipleToastComponent />);
    
    act(() => {
      screen.getByText('Add Multiple Toasts').click();
    });

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Danger message')).toBeInTheDocument();
  });

  it('applies correct styles based on toast type', () => {
    const WarningToastComponent = () => {
      const { addToast } = useToast();
      return (
        <div>
          <button onClick={() => addToast({ type: 'warning', message: 'Warning message' })}>
            Add Warning Toast
          </button>
          <ToastContainer />
        </div>
      );
    };

    renderWithProvider(<WarningToastComponent />);
    
    act(() => {
      screen.getByText('Add Warning Toast').click();
    });

    const toast = screen.getByText('Warning message');
    expect(toast.closest('[role="alert"]')).toHaveClass('bg-toast-warning');
  });
}); 