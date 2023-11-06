import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js-cookie";
import { TOKEN } from "../../constants";
interface ServerResponse {
  birthday: string;
}
// interface TransformedResponse extends ServerResponse {
//   birthdayFormatted: string;
// }

const authQuery = createApi({
  reducerPath: "auth-account",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ap-portfolio-backend.up.railway.app/api/v1/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        method: "GET",
        url: "auth/me",
      }),
      transformResponse: (res: ServerResponse) => ({
        ...res,
        birthday: res.birthday?.split("T")[0],
      }),
    }),
    updateUserInfo: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: "auth/updatedetails",
        body,
      }),
    }),
    uploadAccountPhoto: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "auth/upload",
        body,
      }),
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: "auth/updatepassword",
        body,
      }),
    }),
  }),
});

const { reducer: authAccountReducer, reducerPath: authAccountName } = authQuery;
export { authQuery as default, authAccountReducer, authAccountName };
export const {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUploadAccountPhotoMutation,
  useUpdatePasswordMutation,
} = authQuery;
