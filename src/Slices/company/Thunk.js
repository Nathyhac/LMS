import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const fetchCompany = createAsyncThunk(
  "Company/fetchCompany",

  async () => {

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

export const createCompany = createAsyncThunk(
  'company/createCompany',
  async (formData) => {
    const response = await axios.post(`${BASE_URL}/companies`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.product;
  }
);

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (id) => {
    await axios.delete(`${BASE_URL}/companies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return id;
  }
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async ({ id, company }) => {
    const res = await axios.post(`${BASE_URL}/companies/${id}`, company, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
);