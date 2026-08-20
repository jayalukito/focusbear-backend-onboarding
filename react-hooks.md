# Understanding React Hooks (Use Effect) #103
## When should you use useEffect instead of handling logic inside event handlers?
Use useEffect when something should happen because the component mounted, unmounted, or a dependency changed. Use event handlers when the action is directly caused by the user, such as clicking a button.

## What happens if you don’t provide a dependency array?
The useEffect runs after every component render, which may cause unnecessary repeated operations.

## How can improper use of useEffect cause performance issues?
It can repeatedly run expensive operations or API requests on every render. It can also cause infinite re-render loops if the effect continuously updates state.

# Preventing Unnecessary Renders with useCallback #101

## What problem does useCallback solve?
useCallback prevents a function from being recreated unnecessarily on every render. This can help prevent memoized child components from re-rendering when their function props have not actually changed.

## How does useCallback work differently from useMemo?
useCallback memoizes a function, while useMemo memoizes the result of a calculation.

## When would useCallback not be useful?
useCallback is usually unnecessary when the function is cheap and isn't passed to a memoized child or used as a dependency. Using it everywhere can add complexity without providing a meaningful performance improvement.