import { createSlice } from "@reduxjs/toolkit";
import { fetchLicenseByStatus } from "./Thunk"; 

const statusChartSlice = createSlice({
  name: "statusChart",
  initialState: {
    activeStateCount: 0,
    inactiveStateCount: 0,
    pendingStateCount: 0,
    statusData:[],
    isloading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLicenseByStatus.pending,(state)=>{
        state.isloading=true;
        state.error=false;
        state.data=null
     })
     
      .addCase(fetchLicenseByStatus.fulfilled, (state, action) => {
          state.activeStateCount =  action.payload.filter(item => item.status === 'active')[0].count;
          state.pendingStateCount =  action.payload.filter(item => item.status === 'pending')[0].count;
          state.inactiveStateCount = action.payload.filter(item => item.status === 'expired')[0].count;
          state.statusData = action.payload.map(item => item.status);
          state.data = action.payload;
          state.isloading = false;
           state.error = false;
            })

      .addCase(fetchLicenseByStatus.rejected, (state) => {
            state.isloading = false;
            state.error = true;
            state.data = null;
      })
  }
});
export default statusChartSlice.reducer;