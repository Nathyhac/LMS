import { createSlice } from "@reduxjs/toolkit";
import { fetchExpiredLicence } from "./Thunk";

const ExpiredLicenseSlice = createSlice({
    name: 'expiredlicence',
    initialState: {
        isLoading: false,
        error: false,
        data: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpiredLicence.pending, (state, action) => {
                state.isLoading = true;
                state.error = false;
                state.data = null
            }).addCase(fetchExpiredLicence.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.data = action.payload;
            }).addCase(fetchExpiredLicence.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.data = null;
            })
    }
})

export default ExpiredLicenseSlice.reducer