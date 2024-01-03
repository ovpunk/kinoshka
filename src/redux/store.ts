import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./slices/searchSlice";
import { REDUX_LC, getInitialData } from "./initialState";

export const store = configureStore({
  reducer: searchReducer,
  preloadedState: getInitialData(),
});

store.subscribe(() => {
  localStorage.setItem(REDUX_LC, JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
