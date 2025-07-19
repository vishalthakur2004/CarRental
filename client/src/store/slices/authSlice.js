import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Configure axios base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `${data.token}`;
        toast.success("Login successful!");
        return data;
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

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success("Registration successful! Please verify your OTP.");
        return { email, tempToken: data.tempToken };
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

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp, tempToken }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/verify-otp", {
        email,
        otp,
        tempToken,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `${data.token}`;
        toast.success("OTP verified successfully!");
        return data;
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

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/resend-otp", { email });
      if (data.success) {
        toast.success("OTP sent successfully!");
        return data;
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

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        return data.user;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateUserImage = createAsyncThunk(
  "auth/updateUserImage",
  async (imageFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const { data } = await axios.post("/api/user/update-image", formData);
      if (data.success) {
        toast.success(data.message);
        return data;
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
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isOwner: false,
  loading: false,
  error: null,
  showLogin: false,
  showRegister: false,
  showOTPVerification: false,
  registrationData: {
    email: "",
    tempToken: "",
  },
  otpData: {
    email: "",
    tempToken: "",
    expiresAt: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowLogin: (state, action) => {
      state.showLogin = action.payload;
      if (action.payload === false) {
        state.showRegister = false;
        state.showOTPVerification = false;
      }
    },
    setShowRegister: (state, action) => {
      state.showRegister = action.payload;
      if (action.payload === false) {
        state.showLogin = false;
        state.showOTPVerification = false;
      }
    },
    setShowOTPVerification: (state, action) => {
      state.showOTPVerification = action.payload;
      if (action.payload === false) {
        state.showLogin = false;
        state.showRegister = false;
      }
    },
    logout: (state) => {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isOwner = false;
      state.showLogin = false;
      state.showRegister = false;
      state.showOTPVerification = false;
      state.registrationData = { email: "", tempToken: "" };
      state.otpData = { email: "", tempToken: "", expiresAt: null };
      toast.success("You have been logged out");
    },
    clearError: (state) => {
      state.error = null;
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        axios.defaults.headers.common["Authorization"] = `${token}`;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isOwner = action.payload.user?.role === "owner";
        state.showLogin = false;
        state.showRegister = false;
        state.showOTPVerification = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationData = {
          email: action.payload.email,
          tempToken: action.payload.tempToken,
        };
        state.otpData = {
          email: action.payload.email,
          tempToken: action.payload.tempToken,
          expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes from now
        };
        state.showRegister = false;
        state.showOTPVerification = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // OTP Verification cases
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isOwner = action.payload.user?.role === "owner";
        state.showOTPVerification = false;
        state.registrationData = { email: "", tempToken: "" };
        state.otpData = { email: "", tempToken: "", expiresAt: null };
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Resend OTP cases
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpData.expiresAt = Date.now() + 10 * 60 * 1000; // Reset expiry time
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Data cases
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isOwner = action.payload?.role === "owner";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // If token is invalid, clear auth state
        if (
          action.payload?.includes("token") ||
          action.payload?.includes("unauthorized")
        ) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.isOwner = false;
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        }
      })

      // Update User Image cases
      .addCase(updateUserImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setShowLogin,
  setShowRegister,
  setShowOTPVerification,
  logout,
  clearError,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
