import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import bingoReducer from "../features/bingo/bingoSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bingo: bingoReducer,
  },
});
