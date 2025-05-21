import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const fetchLicence = createAsyncThunk(
    "license/fetchLicence",
    async () => {
        const response = await axios.get(`${BASE_URL}/licenses`, {

            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        // console.log(response.data.data.companies)
        return response.data.data.licenses;
    }
)

export const createLicence = createAsyncThunk(
    'licence/createLicence',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/licenses`, formData, {
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

export const updateLicenceStatus = createAsyncThunk(
    'licence/updateStatus',
    async ({ id, }) => {
        const response = await axios.patch(`${BASE_URL}/licenses/${id}/activate`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    }
);