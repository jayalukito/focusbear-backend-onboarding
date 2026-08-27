import { configureStore } from '@reduxjs/toolkit';

import counterReducer, {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  reset,
} from './counterSlice';

describe('counterSlice', () => {
  test('should return the initial state', () => {
    const state = counterReducer(
      undefined,
      {
        type: 'unknown',
      },
    );

    expect(state).toEqual({
      value: 0,
    });
  });

  test('should increment the counter', () => {
    const initialState = {
      value: 0,
    };

    const state = counterReducer(
      initialState,
      increment(),
    );

    expect(state.value).toBe(1);
  });

  test('should decrement the counter', () => {
    const initialState = {
      value: 5,
    };

    const state = counterReducer(
      initialState,
      decrement(),
    );

    expect(state.value).toBe(4);
  });

  test('should reset the counter', () => {
    const initialState = {
      value: 10,
    };

    const state = counterReducer(
      initialState,
      reset(),
    );

    expect(state.value).toBe(0);
  });

  test('should increment by a given amount', () => {
    const initialState = {
      value: 2,
    };

    const state = counterReducer(
      initialState,
      incrementByAmount(5),
    );

    expect(state.value).toBe(7);
  });

  test('should handle incrementAsync', async () => {
    const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });

    await store.dispatch(
      incrementAsync(5),
    );

    expect(
      store.getState().counter.value,
    ).toBe(5);
  });
});