import api from "../../../App/config/axiosInstance";

import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../App/config/baseQuery";

export const logout = async () => {
  const response = await api.get("/logout");
  console.log("Logout", response);
  return response.data;
};

export const activityApi = createApi({
  reducerPath: "activityApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Activities", "Tasks", "Employees"],
  endpoints: (builder) => ({
    getRecentActivities: builder.query({
      query: (params) => ({
        url: "/activities",
        method: "GET",
        params, // { page, limit, module, action }
      }),
      providesTags: ["Activities"],
    }),
  }),
});

export const { useGetRecentActivitiesQuery } = activityApi;
