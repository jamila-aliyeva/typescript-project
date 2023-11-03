import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LIMIT } from "../../constants";
import request from "../../server";

const initialState = {
  skills: [],
  loading: false,
  total: 0,
  isModalLoading: false,
};

export const getSkills = createAsyncThunk(
  "skill/fetching",
  async ({ search, page }) => {
    const params = { search, page, limit: LIMIT };
    const { data } = await request.get("skills", { params });
    return data;
  }
);

const skillSlice = createSlice({
  initialState,
  name: "skill",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getSkills.fulfilled,
        (state, { payload: { data, pagination } }) => {
          state.skills = data;
          state.total = pagination.total;
          state.loading = false;
        }
      )
      .addCase(getSkills.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { name, reducer: skillReducer } = skillSlice;

export { name as skillName, skillReducer as default };
