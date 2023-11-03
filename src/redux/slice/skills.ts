import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LIMIT } from "../../constants";
import request from "../../server";
import Skill from "../../types/skills";

interface initialStateType {
  skills: Skill[];
  loading: boolean;
  total: number;
  isModalLoading: boolean;
}

const initialState: initialStateType = {
  skills: [],
  loading: false,
  total: 0,
  isModalLoading: false,
};

export const getSkills = createAsyncThunk(
  "skill/fetching",
  async ({ search, page }: { search: string; page: number }) => {
    const params = { search, page, limit: LIMIT };
    const { data } = await request.get<Skill[]>("skills", { params });
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
        (state, { payload: { data, pagination } }: PayloadAction<Skill[]>) => {
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
