# Toast Notification Component

A flexible and reusable toast notification system built with React, featuring multiple notification types, custom durations, and automatic dismissal.

## Table of Contents
- [Implementation Details](#implementation-details)
- [Technical Architecture](#technical-architecture)
- [Key Features](#key-features)
- [Usage Guide](#usage-guide)
- [Testing Strategy](#testing-strategy)
- [Interview Talking Points](#interview-talking-points)
- [Best Practices](#best-practices)
- [Performance Considerations](#performance-considerations)

## Implementation Details

### Core Architecture
The toast system is built with three main components:
1. **ToastContext**: Manages state and provides toast functionality
2. **ToastContainer**: Handles toast layout and positioning
3. **Toast**: Individual notification component

### State Management
```jsx
// ToastContext.jsx
const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type, title, message, duration = 6000 }) => {
    const id = uuidv4();
    setToasts(prev => [...prev, { id, type, title, message, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
```

### UI Implementation
```jsx
// ToastContainer.jsx
const ToastContainer = () => {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      <div className="max-w-md mx-auto">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </div>
  );
};
```

## Technical Architecture

### 1. Context-Based State Management
- Uses React Context for global state
- Provides custom hook (useToast) for easy access
- Manages toast lifecycle (add/remove)
- Handles default and custom durations

### 2. Component Structure
```jsx
// Toast.jsx
const Toast = ({ id, type, title, message, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div role="alert" className={`bg-toast-${type}`}>
      {title && <h3>{title}</h3>}
      <p>{message}</p>
    </div>
  );
};
```

## Key Features

### 1. Type System
```typescript
type ToastType = 'success' | 'warning' | 'danger';
```

### 2. Customization Options
- Custom durations
- Optional titles
- Different styles per type
- Responsive design

### 3. Accessibility Features
- ARIA roles
- Screen reader support
- Keyboard navigation
- Color contrast compliance

## Usage Guide

### Basic Usage
```jsx
function MyComponent() {
  const { addToast } = useToast();

  const handleSuccess = () => {
    addToast({
      type: 'success',
      title: 'Success',
      message: 'Operation completed!'
    });
  };

  return <button onClick={handleSuccess}>Complete</button>;
}
```

### With Custom Duration
```jsx
addToast({
  type: 'warning',
  title: 'Warning',
  message: 'This will stay longer',
  duration: 10000 // 10 seconds
});
```

## Testing Strategy

### 1. Unit Tests
```jsx
it('shows success toast when button is clicked', async () => {
  renderWithProvider(<ToastDemo />);
  fireEvent.click(screen.getByText(/Show Success Toast/i));
  await waitFor(() => {
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });
});
```

### 2. Integration Tests
- Toast lifecycle testing
- Multiple toast handling
- Error boundary testing

Notes: 

### 1. Design Decisions
- **Why Context?**
  - Global state management
  - Avoids prop drilling
  - Easy access throughout app
  - Clean component tree

- **Why Custom Hook?**
  - Encapsulates toast logic
  - Provides clean API
  - Enables error handling
  - Makes testing easier

### 2. Technical Challenges
- **State Management**
  - Handling multiple toasts
  - Preventing memory leaks
  - Managing toast lifecycle
  - Ensuring proper cleanup

- **Performance**
  - Efficient renders
  - Memoized callbacks
  - Proper cleanup
  - Memory management

### 3. Alternative Approaches
- **Redux vs Context**
  - Context is simpler for this use case
  - No need for complex state management
  - Better performance for simple state
  - Easier to maintain

- **CSS-in-JS vs Tailwind**
  - Tailwind provides consistent design
  - Better performance
  - Easier maintenance
  - Built-in responsive design

### 4. Scalability Considerations
- **Adding New Features**
  - Easy to extend toast types
  - Simple to add new animations
  - Flexible styling system
  - Modular component structure

- **Performance at Scale**
  - Efficient state updates
  - Proper cleanup
  - Memory management
  - Render optimization

## Best Practices

### 1. Code Organization
- Separate concerns
- Reusable components
- Clear file structure
- Consistent patterns

### 2. Error Handling
- Clear error messages
- Provider validation
- Type checking
- Graceful fallbacks

### 3. Accessibility
- ARIA roles
- Screen reader support
- Keyboard navigation
- Color contrast

## Performance Considerations

### 1. Optimization Techniques
- Memoized callbacks
- Efficient renders
- Proper cleanup
- Memory management

### 2. Best Practices
- Limit simultaneous toasts
- Clean up on unmount
- Use appropriate durations
- Monitor memory usage

## Contributing
1. Follow the existing patterns
2. Add tests for new features
3. Update documentation
4. Maintain accessibility

## License
MIT License 