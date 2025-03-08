import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null, // ✅ Add token to state
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // ✅ Ensure token is stored
    },
    logout: (state) => {
      state.user = null;
      state.token = null; // ✅ Clear token on logout
      localStorage.removeItem("token"); // Remove from local storage
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
