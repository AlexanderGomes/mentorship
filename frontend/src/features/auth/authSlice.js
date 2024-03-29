import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (user, thunkAPI) => {
    try {
      return await authService.refresh(user);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    id: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setDecodedId: (state, action) => {
      state.id = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.accessToken = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.accessToken = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.isSuccess = true;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
      })
      .addCase(refresh.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset, setDecodedId, setAccessToken, setErrorMsg } = authSlice.actions;

export default authSlice.reducer;
