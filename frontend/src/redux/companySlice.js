import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    filterCompany: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setFilterCompany: (state, action) => {
      state.filterCompany = action.payload;
    },
  },
});
export const { setSingleCompany, setCompanies, setFilterCompany } =
  companySlice.actions;
export default companySlice.reducer;
