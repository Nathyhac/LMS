import { createSlice } from "@reduxjs/toolkit";
import { fetchCompany } from "./Thunk.js";

const companySlice = createSlice({
  name: "company",
  initialState: {
    isLoading: false,
    error: false,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.data = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(fetchCompany.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.data = null;
      });
  },
});

export default companySlice.reducer;
