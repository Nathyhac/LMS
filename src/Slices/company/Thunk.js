import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCompany = createAsyncThunk(
  "Company/fetchCompany",

  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(`${BASE_URL}/companies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response.data.data.companies)
    return response.data.data.companies;
  }
);
