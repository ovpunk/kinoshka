import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialData, IInitialData, initialData } from "../initialState";

const initialState: IInitialData = getInitialData().search || initialData;

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { changeSearchValue } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
