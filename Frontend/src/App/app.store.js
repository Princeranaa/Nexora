import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/auth.slice";
import themSlice from "../Shared/State/ThemSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themSlice,   
  },
});
