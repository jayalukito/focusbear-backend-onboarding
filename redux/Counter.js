import { useDispatch, useSelector } from 'react-redux';

import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from './features/counter/counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Redux Counter</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>Increment</button>

      <button onClick={() => dispatch(decrement())}>Decrement</button>

      <button onClick={() => dispatch(reset())}>Reset</button>

      <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
    </div>
  );
}

export default Counter;
