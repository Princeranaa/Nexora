import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../App/config/baseQuery";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["ChatUsers", "Chat"],

  endpoints: (builder) => ({
    getChatUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      transformResponse: (response) => response.users || [],
      providesTags: ["ChatUsers"],
    }),

    getOrCreateChat: builder.query({
      query: (targetUserId) => ({
        url: `/chat/${targetUserId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.chat,
      providesTags: (result, error, targetUserId) => [
        { type: "Chat", id: targetUserId },
      ],
    }),

    sendMessage: builder.mutation({
      query: ({ chatId, text }) => ({
        url: `/chat/${chatId}/message`,
        method: "POST",
        data: { text },
      }),
      invalidatesTags: (result, error, { targetUserId }) => [
        { type: "Chat", id: targetUserId },
      ],
    }),
  }),
});

export const {
  useGetChatUsersQuery,
  useGetOrCreateChatQuery,
  useSendMessageMutation,
} = chatApi;
