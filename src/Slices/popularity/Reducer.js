import { createSlice } from "@reduxjs/toolkit";
import { fetchPoplularity } from "./Thunk";

const initialState = {
  popularCount: [],
  popularProductsName: [],
  data: null,
  isLoading: false,
  error: null,
};

const popularitySlice = createSlice({
  name: "popularity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoplularity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPoplularity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.popularCount = action.payload.map((item) => item.count);
        state.popularProductsName = action.payload.map(
          (item) => item.product.name
        );
      })
      .addCase(fetchPoplularity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// export const selectPopularCount = (state) => state.popularity.popularCount;
// export const selectPopularProductNames = (state) =>state.popularity.popularProductsName;

export default popularitySlice.reducer;
