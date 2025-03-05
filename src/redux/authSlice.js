import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,  // Add loading state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;  // Fix: Add setLoading reducer
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;  // Ensure setLoading is exported
export default authSlice.reducer;
