# Toast Notification Component API Documentation

## Overview
The Toast Notification component provides a flexible and reusable way to display temporary notifications in your React application. It supports multiple types of notifications, custom durations, and automatic dismissal.

## Core Components

### 1. ToastProvider
The context provider that manages toast state and provides methods to add/remove toasts.

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

### 2. useToast Hook
Custom hook to access toast functionality within components.

```jsx
import { useToast } from './components/Toast/ToastContext';

function YourComponent() {
  const { addToast, removeToast } = useToast();
  // Use toast methods
}
```

## API Reference

### ToastProvider Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | Yes | Child components that will have access to toast functionality |

### useToast Hook
Returns an object with the following methods and state:

#### Methods
| Method | Parameters | Description |
|--------|------------|-------------|
| addToast | `{ type, title?, message, duration? }` | Adds a new toast notification |
| removeToast | `(id: string)` | Removes a toast by its ID |

#### State
| Property | Type | Description |
|----------|------|-------------|
| toasts | `Toast[]` | Array of current toast notifications |

### Toast Object Structure
```typescript
interface Toast {
  id: string;          // Unique identifier
  type: ToastType;     // Type of toast
  title?: string;      // Optional title
  message: string;     // Toast message
  duration: number;    // Duration in milliseconds
}

type ToastType = 'success' | 'warning' | 'danger';
```

## Usage Examples

### Basic Usage
```jsx
import { useToast } from './components/Toast/ToastContext';

function MyComponent() {
  const { addToast } = useToast();

  const handleSuccess = () => {
    addToast({
      type: 'success',
      message: 'Operation completed successfully!'
    });
  };

  return <button onClick={handleSuccess}>Complete Operation</button>;
}
```

### With Title
```jsx
addToast({
  type: 'warning',
  title: 'Warning',
  message: 'This action cannot be undone.'
});
```

### Custom Duration
```jsx
addToast({
  type: 'success',
  message: 'This will stay longer',
  duration: 10000 // 10 seconds
});
```

### Error Handling
```jsx
addToast({
  type: 'danger',
  title: 'Error',
  message: 'Failed to process your request.'
});
```

## Design Decisions

### 1. Context-Based State Management
- Uses React Context for global state management
- Provides easy access to toast functionality throughout the app
- Maintains clean component tree without prop drilling

### 2. Type System
- Supports three types of toasts: success, warning, and danger
- Each type has distinct visual styling
- Extensible for additional types if needed

### 3. Duration Handling
- Default duration: 6000ms (6 seconds)
- Customizable per toast
- Automatic cleanup after duration expires

### 4. Styling Approach
- Uses Tailwind CSS for styling
- Consistent with design system
- Responsive and accessible

## Best Practices

### 1. Toast Usage
- Keep messages concise and clear
- Use appropriate toast types
- Consider user experience when setting durations

### 2. Performance
- Limit number of simultaneous toasts
- Clean up toasts when component unmounts
- Use appropriate duration for message importance

### 3. Accessibility
- Toast messages are announced by screen readers
- Color is not the only indicator of toast type
- Keyboard accessible

## Error Handling

### 1. Context Usage
```jsx
// Error when used outside provider
const MyComponent = () => {
  const { addToast } = useToast(); // Throws error if not wrapped in ToastProvider
  // ...
};
```

### 2. Invalid Props
```jsx
// Type checking for toast properties
addToast({
  type: 'invalid', // TypeScript error
  message: 'Test'
});
```

## Styling Customization

### 1. Toast Types
```css
/* Tailwind classes for different toast types */
.bg-toast-success { /* Success styling */ }
.bg-toast-warning { /* Warning styling */ }
.bg-toast-danger  { /* Danger styling */ }
```

### 2. Container Positioning
```css
/* Toast container positioning */
.fixed.bottom-0.left-0.right-0 {
  /* Container styles */
}
```

## Migration Guide

### From Version 1.x to 2.x
1. Update import paths
2. Use new toast type system
3. Implement new duration handling

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported

## Dependencies
- React 16.8+ (for hooks)
- Tailwind CSS
- UUID (for toast IDs)

## Contributing
1. Follow the existing patterns
2. Add tests for new features
3. Update documentation
4. Maintain accessibility

## License
MIT License 