import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

// Example asynchronous Redux action
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount) => {
    return amount;
  },
);

const counterSlice = createSlice({
  name: 'counter',

  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    reset: (state) => {
      state.value = 0;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      incrementAsync.fulfilled,
      (state, action) => {
        state.value += action.payload;
      },
    );
  },
});

export const {
  increment,
  decrement,
  reset,
  incrementByAmount,
} = counterSlice.actions;

export default counterSlice.reducer;