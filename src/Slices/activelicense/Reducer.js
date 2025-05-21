import { createSlice } from "@reduxjs/toolkit";
import { fetchActiveLicence } from "./Thunk";

const ActiveLicenseSlice = createSlice({
    name: 'activelicence',
    initialState: {
        isLoading: false,
        error: false,
        data: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchActiveLicence.pending, (state, action) => {
                state.isLoading = true;
                state.error = false;
                state.data = null
            }).addCase(fetchActiveLicence.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.data = action.payload;
            }).addCase(fetchActiveLicence.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.data = null;
            })
    }
})

export default ActiveLicenseSlice.reducer