import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [], // This must be correctly updated
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload; // Make sure payload contains jobs
    },
  },
});

export const { setAllJobs } = jobSlice.actions;
export default jobSlice.reducer;
