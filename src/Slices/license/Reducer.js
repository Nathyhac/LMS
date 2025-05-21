import { createSlice } from "@reduxjs/toolkit";
import { fetchLicence } from "./Thunk";

const LicenseSlice = createSlice({
    name: 'licence',
    initialState: {
        isLoading: false,
        error: false,
        data: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLicence.pending, (state, action) => {
                state.isLoading = true;
                state.error = false;
                state.data = null
            }).addCase(fetchLicence.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.data = action.payload;
            }).addCase(fetchLicence.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.data = null;
            })
    }
})

export default LicenseSlice.reducer
