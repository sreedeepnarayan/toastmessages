# Toast Notification Component - Testing Guide

This document provides comprehensive information about testing the Toast Notification component.

## Table of Contents
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Test Files](#test-files)
- [Testing Patterns](#testing-patterns)
- [Best Practices](#best-practices)
- [Common Issues and Solutions](#common-issues-and-solutions)

## Test Structure

The application has three main test files:

1. `ToastContext.test.jsx`: Tests the context and state management
2. `ToastContainer.test.jsx`: Tests the container component
3. `ToastDemo.test.jsx`: Tests the demo component and user interactions

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Test Files

### 1. ToastContext.test.jsx
Tests the context and state management functionality:

```javascript
// Key test cases:
- Adding a toast
- Removing a toast
- Setting default duration
- Using custom duration
- Error handling when used outside provider
```

### 2. ToastContainer.test.jsx
Tests the container component functionality:

```javascript
// Key test cases:
- Rendering without toasts
- Rendering with toasts
- Rendering multiple toasts
- Applying correct styles based on toast type
```

### 3. ToastDemo.test.jsx
Tests the demo component and user interactions:

```javascript
// Key test cases:
- Rendering all toast buttons
- Success toast interaction
- Warning toast interaction
- Error toast interaction
- Custom duration toast interaction
```

## Testing Patterns

### 1. Component Testing
```javascript
it('renders without toasts', () => {
  renderWithProvider(<ToastContainer />);
  const container = screen.getByTestId('toast-container');
  expect(container).toBeInTheDocument();
  expect(container.children).toHaveLength(0);
});
```

### 2. Interaction Testing
```javascript
it('shows success toast when success button is clicked', async () => {
  renderWithProvider(<ToastDemo />);
  fireEvent.click(screen.getByText(/Show Success Toast/i));
  await waitFor(() => {
    const toastMessage = screen.getByText('Your action was completed successfully!');
    expect(toastMessage).toBeInTheDocument();
  });
});
```

### 3. Error Testing
```javascript
it('throws error when used outside provider', () => {
  expect(() => {
    render(<TestComponent />);
  }).toThrow('useToast must be used within a ToastProvider');
});
```

## Best Practices

### 1. Setup and Teardown
```javascript
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});
```

### 2. Provider Wrapping
```javascript
const renderWithProvider = (ui) => {
  return render(
    <ToastProvider>
      {ui}
    </ToastProvider>
  );
};
```

### 3. Async Testing
```javascript
await waitFor(() => {
  const toastMessage = screen.getByText('Your message');
  expect(toastMessage).toBeInTheDocument();
}, { timeout: 3000 });
```

## Testing Tools

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/react**: React-specific testing utilities
- **@testing-library/jest-dom**: DOM testing utilities

## Key Testing Principles

1. **Test Behavior, Not Implementation**
   - Focus on what the component does, not how it does it
   - Test user interactions and outcomes

2. **Meaningful Test Descriptions**
   - Use clear, descriptive test names
   - Follow the pattern: "it should [expected behavior]"

3. **Test Isolation**
   - Each test should be independent
   - Clean up after each test
   - Don't rely on test order

4. **Async Operations**
   - Use `waitFor` for async operations
   - Set appropriate timeouts
   - Handle loading states

5. **Error Cases**
   - Test error boundaries
   - Verify error messages
   - Test invalid inputs

6. **User Interactions**
   - Test click events
   - Test keyboard interactions
   - Verify state changes

## Common Issues and Solutions

### 1. Async Timing Issues
```javascript
// Problem: Test fails due to timing
// Solution: Use waitFor with appropriate timeout
await waitFor(() => {
  expect(screen.getByText('Toast Message')).toBeInTheDocument();
}, { timeout: 3000 });
```

### 2. Context Provider Issues
```javascript
// Problem: Component needs context
// Solution: Use renderWithProvider helper
const renderWithProvider = (ui) => {
  return render(
    <ToastProvider>
      {ui}
    </ToastProvider>
  );
};
```

### 3. Timer Issues
```javascript
// Problem: Tests affected by timers
// Solution: Use fake timers
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});
```

## Coverage Areas

1. **Component Rendering**
   - Initial render
   - Re-renders
   - Conditional rendering

2. **State Management**
   - State updates
   - Context usage
   - Props changes

3. **User Interactions**
   - Click events
   - Keyboard events
   - Toast lifecycle

4. **Error Handling**
   - Error boundaries
   - Invalid inputs
   - Edge cases

5. **Style Application**
   - CSS classes
   - Responsive design
   - Theme variations

## Contributing

When adding new tests:
1. Follow the existing patterns
2. Add meaningful descriptions
3. Test both success and failure cases
4. Update this documentation if needed

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet) 