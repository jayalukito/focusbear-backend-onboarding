import { useDispatch, useSelector } from 'react-redux';

import {
  decrement,
  increment,
  reset,
} from './features/counter/counterSlice';

function Counter() {
  const count = useSelector(
    (state) => state.counter.value,
  );

  const dispatch = useDispatch();

  const getMessage = () => {
    if (count < 0) {
      return 'The counter is negative';
    }

    if (count === 0) {
      return 'The counter is zero';
    }

    if (count <= 5) {
      return 'The counter is getting bigger';
    }

    return 'The counter is high!';
  };

  return (
    <div>
      <h1>Redux Counter</h1>

      <h2>Count: {count}</h2>

      <p>{getMessage()}</p>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
}

export default Counter;