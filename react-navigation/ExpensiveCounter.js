import { useMemo, useState } from "react";

function UseMemoExample() {
  const [counter, setCounter] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const numbers = Array.from({ length: 10000 }, (_, index) => index + 1);

  const expensiveResult = useMemo(() => {
    console.log("Running expensive calculation...");

    let result = 0;

    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < 1000; j++) {
        result += numbers[i] * multiplier;
      }
    }

    return result;
  }, [multiplier]);

  return (
    <div>
      <h1>useMemo Example</h1>

      <div>
        <label>
          Multiplier:
          <input
            type="number"
            value={multiplier}
            onChange={(event) => setMultiplier(Number(event.target.value))}
          />
        </label>
      </div>

      <h2>Calculation Result: {expensiveResult}</h2>

      <div>
        <p>Counter: {counter}</p>

        <button onClick={() => setCounter(counter + 1)}>
          Increase Counter
        </button>
      </div>

      <h2>Numbers</h2>

      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default UseMemoExample;