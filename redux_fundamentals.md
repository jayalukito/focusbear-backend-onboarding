# Introduction to Redux Toolkit (State Management)

## When should you use Redux instead of useState? 

Use Redux when state needs to be shared across many components or managed consistently across a larger application. For simple state that only belongs to one component, useState is usually simpler and more appropriate.

## What are the benefits of using selectors instead of directly accessing state?

Selectors make state access more reusable and easier to maintain by keeping the logic for retrieving or deriving data in one place. They can also help with performance by preventing unnecessary recalculations or re-renders when used with memoized selectors.