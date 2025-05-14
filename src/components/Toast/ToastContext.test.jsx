import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useToast, ToastProvider } from './ToastContext';

describe('ToastContext', () => {
  const TestComponent = () => {
    const { addToast, removeToast, toasts } = useToast();
    return (
      <div>
        <button onClick={() => addToast({ type: 'success', message: 'Test message' })}>
          Add Toast
        </button>
        <button onClick={() => removeToast(toasts[0]?.id)}>
          Remove Toast
        </button>
        <div data-testid="toast-count">{toasts.length}</div>
        <div data-testid="toast-message">{toasts[0]?.message}</div>
        <div data-testid="toast-duration">{toasts[0]?.duration}</div>
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

  it('adds a toast', () => {
    renderWithProvider(<TestComponent />);
    
    act(() => {
      screen.getByText('Add Toast').click();
    });

    expect(screen.getByTestId('toast-count')).toHaveTextContent('1');
    expect(screen.getByTestId('toast-message')).toHaveTextContent('Test message');
  });

  it('removes a toast', () => {
    renderWithProvider(<TestComponent />);
    
    act(() => {
      screen.getByText('Add Toast').click();
    });

    act(() => {
      screen.getByText('Remove Toast').click();
    });

    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
  });

  it('sets default duration', () => {
    renderWithProvider(<TestComponent />);
    
    act(() => {
      screen.getByText('Add Toast').click();
    });

    expect(screen.getByTestId('toast-duration')).toHaveTextContent('6000');
  });

  it('uses custom duration', () => {
    const CustomDurationComponent = () => {
      const { addToast, toasts } = useToast();
      return (
        <div>
          <button onClick={() => addToast({ 
            type: 'success', 
            message: 'Test message',
            duration: 10000 
          })}>
            Add Custom Duration Toast
          </button>
          <div data-testid="toast-duration">{toasts[0]?.duration}</div>
        </div>
      );
    };

    renderWithProvider(<CustomDurationComponent />);
    
    act(() => {
      screen.getByText('Add Custom Duration Toast').click();
    });

    expect(screen.getByTestId('toast-duration')).toHaveTextContent('10000');
  });

  it('throws error when used outside provider', () => {
    const consoleError = console.error;
    console.error = jest.fn();
    
    const TestComponent = () => {
      const { addToast } = useToast();
      return <button onClick={() => addToast({ type: 'success', message: 'test' })}>Test</button>;
    };

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useToast must be used within a ToastProvider');
    
    console.error = consoleError;
  });
}); 