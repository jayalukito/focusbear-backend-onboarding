import { memo, useCallback, useState } from "react";

const Child = memo(function Child({ onClick }) {
  console.log("Child rendered");

  return (
    <div>
      <h2>Child Component</h2>
      <button onClick={onClick}>
        Child Button
      </button>
    </div>
  );
});

function UseCallbackExample() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  console.log("Parent rendered");

  const handleChildClick = useCallback(() => {
    setMessage("Child button clicked!");
  }, []);

  return (
    <div>
      <h1>useCallback Example</h1>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>

      <p>{message}</p>

      <Child onClick={handleChildClick} />
    </div>
  );
}

export default UseCallbackExample;