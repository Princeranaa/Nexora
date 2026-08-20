import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/auth.slice";
import themSlice from "../Shared/State/ThemSlice";
import { taskApi } from "../features/adminModule/tasks/service/Tasks.service";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themSlice,

    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});
