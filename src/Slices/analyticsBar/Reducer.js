import { createSlice } from "@reduxjs/toolkit";
import { fetchLicensesAnalytics, fetchProductsAnalytics, fetchCompaniesAnalytics } from "./Thunk"; 
import { data } from "react-router-dom";

const analyticsBarSlice = createSlice({
  name: "analyticsBar",
  initialState: {
    licenseCount: [],
    productCount: [],
    companyCount: [],
    months: [],
    isLoading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
       .addCase(fetchLicensesAnalytics.pending,(state, action)=>{
                  state.isLoading=true;
                  state.error=false;
                  state.data=null
               })
      .addCase(fetchLicensesAnalytics.fulfilled, (state, action) => {
        state.licenseCount = action.payload.map(item => item.count);
        state.months =action.payload.map(item => `${item.month.split(" ")[0]} ${item.month.split(" ")[2]}`);
        state.isLoading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(fetchLicensesAnalytics.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.data = null;
      })
       .addCase(fetchProductsAnalytics.pending,(state, action)=>{
                  state.isLoading=true;
                  state.error=false;
                  state.data=null
               })

      .addCase(fetchProductsAnalytics.fulfilled, (state, action) => {
        state.productCount = action.payload.map(item => item.count);
        state.months = action.payload.map(item => `${item.month.split(" ")[0]} ${item.month.split(" ")[2]}`);
         state.isLoading = false;
         state.data = action.payload;
        state.error = false;
      })
      .addCase(fetchProductsAnalytics.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.data = null;
      })
        .addCase(fetchCompaniesAnalytics.pending,(state, action)=>{
                  state.isLoading=true;
                  state.error=false;
                  state.data=null
               })
      .addCase(fetchCompaniesAnalytics.fulfilled, (state, action) => {
        state.companyCount = action.payload.map(item => item.count);
        state.months =action.payload.map(item => `${item.month.split(" ")[0]} ${item.month.split(" ")[2]}`);
        state.isLoading = false;
        state.data = action.payload;
        state.error = false;
      })
       .addCase(fetchCompaniesAnalytics.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.data = null;
      })
      
      ;
  },
  
});

export default analyticsBarSlice.reducer;
