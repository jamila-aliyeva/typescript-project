import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LIMIT } from "../../constants";
import request from "../../server";

const initialState = {
  education: [],
  loading: false,
  total: 0,
  isModalLoading: false,
};

export const getEducations = createAsyncThunk(
  "education/fetching",
  async ({ search, page }: { search: string; page: number }) => {
    const params = { search, page, limit: LIMIT };
    const { data } = await request.get("education", { params });
    return data;
  }
);

const EducationSlice = createSlice({
  initialState,
  name: "education",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEducations.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getEducations.fulfilled,
        (state, { payload: { data, pagination } }) => {
          state.education = data;
          state.total = pagination.total;
          state.loading = false;
        }
      )
      .addCase(getEducations.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { name, reducer: educationReducer } = EducationSlice;

export { name as educationName, educationReducer as default };
