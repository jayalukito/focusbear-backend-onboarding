# When should you use useEffect instead of handling logic inside event handlers?
Use useEffect when something should happen because the component mounted, unmounted, or a dependency changed. Use event handlers when the action is directly caused by the user, such as clicking a button.

# What happens if you don’t provide a dependency array?
The useEffect runs after every component render, which may cause unnecessary repeated operations.

# How can improper use of useEffect cause performance issues?
It can repeatedly run expensive operations or API requests on every render. It can also cause infinite re-render loops if the effect continuously updates state.