import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import projectReducer from "../features/project/projectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    project: projectReducer,
  },
});
