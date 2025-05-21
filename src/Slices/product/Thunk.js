import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const fetchProduct = createAsyncThunk(
    "Product/fetchProduct",
    async () => {
        const response = await axios.get(`${BASE_URL}/products`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        // console.log(response.data.data.products)
        return response.data.data.products;
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/products`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data.product;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'Something went wrong';
            return rejectWithValue(message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id) => {
        await axios.delete(`${BASE_URL}/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return id;
    }
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, product }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/products/${id}`, product, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'Something went wrong';
            return rejectWithValue(message);
        }
    }
);
