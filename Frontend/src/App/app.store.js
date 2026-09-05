import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/auth.slice";
import themSlice from "../Shared/State/ThemSlice";
import { taskApi } from "../features/adminModule/tasks/service/Tasks.service";
import { activityApi } from "../features/dashboard/service/api.service";
import { chatApi } from "../features/chats/service/chat.api";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themSlice,

    [taskApi.reducerPath]: taskApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      taskApi.middleware,
      activityApi.middleware,
      chatApi.middleware
    ),
});

