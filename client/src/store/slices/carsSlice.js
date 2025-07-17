import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Async thunks for cars
export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (_, { rejectWithValue }) => {
    try {
      // Create a separate axios instance without auth headers for public endpoints
      const publicAxios = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
      });
      const { data } = await publicAxios.get("/api/user/cars");
      if (data.success) {
        return data.cars;
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const initialState = {
  cars: [],
  loading: false,
  error: null,
  pickupDate: "",
  returnDate: "",
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setPickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload;
    },
    clearCarsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPickupDate, setReturnDate, clearCarsError } =
  carsSlice.actions;

export default carsSlice.reducer;
