import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectData: (state, action) => {
      state.projects = [...action.payload];
    },
    updateProfileData: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
  },
});

export const { setProjectData, updateProfileData } = projectSlice.actions;

export default projectSlice.reducer;
