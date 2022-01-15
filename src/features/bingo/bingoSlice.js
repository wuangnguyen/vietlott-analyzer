import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./bingoService";

const initialState = {
  data: [],
  status: "idle",
  itemCount: {},
  selectedItems: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getDataAsync = createAsyncThunk("bingo/getDataAsync", async () => {
  const response = await fetchData();
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleSelect: (state, action) => {
      state.itemCount[action.payload].selected =
        !state.itemCount[action.payload].selected;
      console.log(state.itemCount[action.payload]);
      state.selectedItems = Object.entries(state.itemCount)
        .filter(function ([key, value]) {
          return value.selected === true;
        })
        .map((x) => x[0] * 1);
    },
    clearLocalData: () => {
      window.localStorage.removeItem("bingoData");
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload.sort(function (a, b) {
          return b.date.seconds - a.date.seconds;
        });
        let concatArray = [];
        state.data.forEach((element) => {
          concatArray = concatArray.concat(element.numbers);
        });
        state.itemCount = {};
        for (let index = 0; index < concatArray.length; index++) {
          const element = concatArray[index];
          if (state.itemCount[element]) {
            state.itemCount[element].count = state.itemCount[element].count + 1;
          } else {
            state.itemCount[element] = { count: 1, selected: false };
          }
        }
      });
  },
});
function hasSubArray(master, sub) {
  return sub.every(
    (
      (i) => (v) =>
        (i = master.indexOf(v, i) + 1)
    )(0)
  );
}
export const { toggleSelect, clearLocalData } = bingoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.bingo.value)`
export const filterData = function (state) {
  return state.bingo.data.filter(function (item) {
    return hasSubArray(item.numbers, state.bingo.selectedItems);
  });
};

export default bingoSlice.reducer;