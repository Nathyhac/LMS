import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchLicensesAnalytics = createAsyncThunk(
  "analyticsbar/fetchLicensesAnalytics",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(
      `${BASE_URL}/analytics/get-license-analytics-last-12-months`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success == true) {
      return response.data.data.licenses;
    }
  }
);

export const fetchProductsAnalytics = createAsyncThunk(
  "analyticsbar/fetchProductsAnalytics",

  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(
      `${BASE_URL}/analytics/get-product-analytics-last-12-months`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success == true) {
      return response.data.data.products;
    }
  }
);

export const fetchCompaniesAnalytics = createAsyncThunk(
  "analyticsbar/fetchCompaniesAnalytics",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(
      `${BASE_URL}/analytics/get-company-analytics-last-12-months`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success == true) {
      return response.data.data.companies;
    }
  }
);
