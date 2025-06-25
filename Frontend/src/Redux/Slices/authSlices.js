import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to verify session (example, adjust API as needed)
export const verifySession = createAsyncThunk(
  "auth/verifySession",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-session-user`, {
        credentials: "include",
      });
      if (!res.ok) return false;
      return true;
    } catch {
      return false;
    }
  }
);

const initialState = {
  isLoggedIn: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifySession.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifySession.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
        state.loading = false;
      })
      .addCase(verifySession.rejected, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
      });
  },
});

export const { setLoggedIn, logout } = authSlice.actions;
export default authSlice.reducer;