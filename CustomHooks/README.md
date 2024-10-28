# Custom Hooks in React

Custom hooks in React are a powerful way to extract and reuse logic across your components. They allow you to share stateful logic without changing your component hierarchy. Here are some key points to keep in mind:

## Naming Conventions
- **Hook Names**: Custom hook names must start with `use` followed by a capital letter (e.g., `useCounter`, `useFetch`). This convention helps to identify hooks easily.

## Usage Rules
1. **Call Hooks in Components**: Only call hooks inside of React component functions.
2. **Top-Level Calls**: Call hooks at the top level of your component. Avoid using them in nested functions or conditional statements to ensure consistent behavior across renders.

## Returning Values
- Custom hooks can return arbitrary values, including state variables, functions, or objects. This flexibility allows you to expose exactly what your component needs.

## Example: Creating a Custom Hook

Here's a simple example of a custom hook that manages a counter:

```javascript
import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

## Example: Using the Custom Hook

You can then use the `useCounter` hook in any functional component like this:

```javascript
import React from 'react';
import useCounter from './useCounter'; // Adjust the import path as necessary

function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterComponent;
```

## Best Practices
- **Focus on Single Responsibility**: Keep your hooks focused on a specific piece of functionality to promote reusability and clarity.
- **Testing**: Write unit tests for your hooks to ensure they perform as expected.
