import { createSlice } from "@reduxjs/toolkit";
import { fetchPendingLicence } from "./Thunk";

const PendingLicenseSlice = createSlice({
    name: 'pendinglicence',
    initialState: {
        isLoading: false,
        error: false,
        data: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPendingLicence.pending, (state, action) => {
                state.isLoading = true;
                state.error = false;
                state.data = null
            }).addCase(fetchPendingLicence.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.data = action.payload;
            }).addCase(fetchPendingLicence.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.data = null;
            })
    }
})

export default PendingLicenseSlice.reducer