import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import carsReducer from "./slices/carsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Types for TypeScript (if needed, create store.ts instead)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
