import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    filterJob: null,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setFilterJob: (state, action) => {
      state.filterJob = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setFilterJob } =
  jobSlice.actions;
export default jobSlice.reducer;
