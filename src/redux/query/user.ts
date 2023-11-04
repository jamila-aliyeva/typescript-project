import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js-cookie";
import { TOKEN } from "../../constants";

const usersQuery = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ap-portfolio-backend.up.railway.app/api/v1/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        method: "GET",
        url: "users",
        params,
      }),
      transformResponse: (res) => ({
        users: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),
    getUser: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `users/${id}`,
      }),
      transformResponse: (res) => ({
        ...res,
        birthday: res.birthday?.split("T")[0],
      }),
    }),
    getClientUsers: builder.mutation({
      query: () => ({
        method: "GET",
        url: "/users?role=client",
      }),
    }),
    getNonClientUsers: builder.mutation({
      query: () => ({
        method: "GET",
        url: "/users?role=role",
      }),
    }),
    createUser: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "users",
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        method: "PUT",
        url: `users/${id}`,
        body,
      }),
    }),
    upgradeUser: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        url: `users/${id}`,
        body: values,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `users/${id}`,
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "upload",
        body,
      }),
    }),
  }),
});

const { reducer: usersReducer, reducerPath: usersName } = usersQuery;

export { usersQuery as default, usersReducer, usersName };

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadPhotoMutation,
  useUpgradeUserMutation,
  useGetClientUsersMutation,
  useGetNonClientUsersMutation,
} = usersQuery;
