# Debugging Practice

## What was the issue?

I recreated the stale closure counter example from the CSS-Tricks article. The counter was supposed to increase every second, but it increased from 0 to 1 and then remained at 1.

The problem occurred because the `useEffect` had an empty dependency array, so the interval callback captured the initial value of `count`. As a result, it repeatedly calculated `0 + 1`.

## What debugging method did you use?

I used the browser console and added `console.log()` statements inside the interval to inspect the value of `count`.

I also checked React DevTools to confirm that the component state was updating only once instead of continuously.

This helped identify that the interval was using an outdated value of the state.

## How did you resolve the problem?

I changed the state update from:

```js
setCount(count + 1);
```

to:

```js
setCount((previousCount) => previousCount + 1);
```

The functional state update gives React access to the latest value of `count` each time the interval runs. After making this change, the counter correctly increments every second.

This exercise showed me that asynchronous callbacks such as `setInterval` can accidentally use stale React state if closures and hook dependencies are not handled correctly.
