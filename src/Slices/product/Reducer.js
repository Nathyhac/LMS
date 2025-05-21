import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "./Thunk";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    error: false,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.data = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.data = null;
      });
  },
});

export default ProductSlice.reducer;
