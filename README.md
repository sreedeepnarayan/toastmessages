# React Toast Notification System

A lightweight, customizable toast notification system built with React and Tailwind CSS. This implementation follows best practices and provides a clean, reusable API for displaying temporary feedback messages to users.

## Features

- 🎨 Three types of notifications: Success, Warning, and Danger
- ⏱️ Configurable auto-dismiss duration
- 📱 Responsive design for both mobile and desktop
- 🎯 Stacking notifications with smooth animations
- 🔍 Accessible with proper ARIA attributes
- 🎯 No external toast libraries used
- 🎨 Matches Figma design specifications

## Installation

```bash
npm install
```

## Usage

### 1. Wrap your app with ToastProvider

```jsx
import { ToastProvider } from './components/Toast/ToastContext';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

### 2. Add ToastContainer to your app

```jsx
import ToastContainer from './components/Toast/ToastContainer';

function YourApp() {
  return (
    <>
      <YourContent />
      <ToastContainer />
    </>
  );
}
```

### 3. Use the useToast hook to show notifications

```jsx
import { useToast } from './components/Toast/ToastContext';

function YourComponent() {
  const { addToast } = useToast();

  const showNotification = () => {
    addToast({
      type: 'success', // 'success', 'warning', or 'danger'
      title: 'Optional Title',
      message: 'Your message here',
      duration: 6000, // optional, defaults to 6000ms
    });
  };

  return <button onClick={showNotification}>Show Toast</button>;
}
```

## API Reference

### ToastProvider Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | Yes | The content to be wrapped by the provider |

### useToast Hook

Returns an object with the following methods:

#### addToast(options: ToastOptions)

```typescript
interface ToastOptions {
  type: 'success' | 'warning' | 'danger';
  title?: string;
  message: string;
  duration?: number; // in milliseconds
}
```

#### removeToast(id: string)

Removes a toast by its ID.

## Testing

### Unit Tests

1. **Toast Component Tests**
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Toast from './Toast';

describe('Toast', () => {
  it('renders with correct type and message', () => {
    render(
      <Toast
        id="1"
        type="success"
        message="Test message"
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Toast
        id="1"
        type="success"
        message="Test message"
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledWith('1');
  });
});
```

2. **Toast Context Tests**
```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useToast, ToastProvider } from './ToastContext';

describe('ToastContext', () => {
  it('adds and removes toasts', () => {
    const wrapper = ({ children }) => (
      <ToastProvider>{children}</ToastProvider>
    );
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast({
        type: 'success',
        message: 'Test message',
      });
    });

    expect(result.current.toasts).toHaveLength(1);
  });
});
```

### Integration Tests

1. **Toast Stacking**
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider } from './ToastContext';
import ToastDemo from './ToastDemo';

describe('Toast Stacking', () => {
  it('stacks multiple toasts correctly', () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success Toast'));
    fireEvent.click(screen.getByText('Show Warning Toast'));

    const toasts = screen.getAllByRole('alert');
    expect(toasts).toHaveLength(2);
  });
});
```

## Demo

The project includes a demo component (`ToastDemo.jsx`) that showcases all toast types and features:

```jsx
import React from 'react';
import { useToast } from './ToastContext';

const ToastDemo = () => {
  const { addToast } = useToast();

  return (
    <div className="space-y-4">
      <button
        onClick={() => addToast({
          type: 'success',
          title: 'Success',
          message: 'Operation completed successfully!',
        })}
      >
        Show Success Toast
      </button>

      <button
        onClick={() => addToast({
          type: 'warning',
          title: 'Warning',
          message: 'Please review your action.',
        })}
      >
        Show Warning Toast
      </button>

      <button
        onClick={() => addToast({
          type: 'danger',
          title: 'Error',
          message: 'An error occurred.',
        })}
      >
        Show Error Toast
      </button>
    </div>
  );
};
```

## Design Specifications

The toast notifications follow these design specifications:

- **Colors:**
  - Success: `#8EE59B`
  - Warning: `#F7D774`
  - Danger: `#F16C6C`
  - Text: `#1A1A1A`

- **Layout:**
  - Position: Bottom of screen
  - Max width: 448px
  - Padding: 20px
  - Border radius: 12px
  - Shadow: 0px 4px 24px rgba(0, 0, 0, 0.08)

- **Typography:**
  - Title: Bold, 16px
  - Message: Regular, 14px

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 