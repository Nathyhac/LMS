import { fetchNotifications } from "./Thunk";
import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    isloading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.error = false;
        state.data = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isloading = false;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.isloading = false;
        state.error = true;
        state.data = null;
      });
  },
});

export default notificationsSlice.reducer;
