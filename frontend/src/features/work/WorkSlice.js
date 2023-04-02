import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  work: [],
};

const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    getWork: (state, action) => {
      state.work = [...action.payload];
    },
    createWork: (state, action) => {
      state.work = [...state.work, action.payload];
    },
    updateWork: (state, action) => {
      const index = state.work.findIndex(
        (project) => project._id === action.payload._id
      );

      state.work = [
        ...state.work.slice(0, index),
        action.payload,
        ...state.work.slice(index + 1),
      ];
    },
    deleteWork: (state, action) => {
      const filtered = state.work.filter(
        (project) => project._id !== action.payload._id
      );

      state.work = [...filtered];
    },
  },
});

export const { getWork, updateWork, createWork, deleteWork } =
  workSlice.actions;

export default workSlice.reducer;
