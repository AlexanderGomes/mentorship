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
    updateProjectData: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
    newData: (state, action) => {
      const index = state.projects.findIndex(
        (project) => project._id === action.payload._id
      );

      state.projects = [
        ...state.projects.slice(0, index),
        action.payload,
        ...state.projects.slice(index + 1),
      ];
    },
    deleteData: (state, action) => {
      const filtered = state.projects.filter(
        (project) => project._id !== action.payload._id
      );

      state.projects = [...filtered];
    },
  },
});

export const { setProjectData, updateProjectData, newData, deleteData } =
  projectSlice.actions;

export default projectSlice.reducer;
