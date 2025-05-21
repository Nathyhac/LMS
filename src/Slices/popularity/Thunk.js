import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const fetchPoplularity = createAsyncThunk(
  "popularity/fetchPoplularity",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/analytics/get-product-popularity-analytics`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success == true) {
      return response.data.data.productPopularityData;
    }
  }
);
