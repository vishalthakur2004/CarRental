import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: import.meta.env.VITE_CURRENCY || "$",
  baseURL: import.meta.env.VITE_BASE_URL || "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setBaseURL: (state, action) => {
      state.baseURL = action.payload;
    },
  },
});

export const { setCurrency, setBaseURL } = appSlice.actions;
export default appSlice.reducer;
