import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../../App/config/baseQuery";

export const taskApi = createApi({
  reducerPath: "taskApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Tasks"],

  endpoints: (builder) => ({
    
    getTasks: builder.query({
      query: (params) => ({
        url: "/tasks",
        method: "GET",
        params,
      }),

      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: "/create-task",
        method: "POST",
        data,
      }),

      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation({
      query: ({ taskId, data }) => ({
        url: `/tasks/${taskId}`,
        method: "PUT",
        data,
      }),

      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
