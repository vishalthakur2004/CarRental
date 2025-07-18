import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pickupDate: "",
  returnDate: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setPickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload;
    },
    clearDates: (state) => {
      state.pickupDate = "";
      state.returnDate = "";
    },
  },
});

export const { setPickupDate, setReturnDate, clearDates } =
  bookingSlice.actions;
export default bookingSlice.reducer;
