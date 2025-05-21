import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const fetchActiveLicence = createAsyncThunk(
    "license/fetchActiveLicence",
    async (status) => {
        const response = await axios.get(`${BASE_URL}/licenses/filter`, {
            params: { status },

            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        // console.log(response.data.data.companies)
        return response.data.data.licenses;
    }
)