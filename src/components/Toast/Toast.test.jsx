import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toast from './Toast';

describe('Toast Component', () => {
  const defaultProps = {
    id: '1',
    type: 'success',
    message: 'Test message',
    onClose: jest.fn(),
  };

  it('renders with success type', () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-toast-success');
  });

  it('renders with warning type', () => {
    render(<Toast {...defaultProps} type="warning" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-toast-warning');
  });

  it('renders with danger type', () => {
    render(<Toast {...defaultProps} type="danger" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-toast-danger');
  });

  it('shows default title when no title is provided', () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('shows custom title when provided', () => {
    render(<Toast {...defaultProps} title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Toast {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClose).toHaveBeenCalledWith('1');
  });

  it('auto-dismisses after duration', () => {
    jest.useFakeTimers();
    render(<Toast {...defaultProps} duration={1000} />);
    jest.advanceTimersByTime(1000);
    expect(defaultProps.onClose).toHaveBeenCalledWith('1');
    jest.useRealTimers();
  });

  it('cleans up timer on unmount', () => {
    jest.useFakeTimers();
    const { unmount } = render(<Toast {...defaultProps} duration={1000} />);
    unmount();
    jest.advanceTimersByTime(1000);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
}); 