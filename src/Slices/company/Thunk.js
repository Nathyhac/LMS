import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://172.20.82.100:8000/api/v1';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFhZjUzMzE1MTY5ZGYzMTlmMGI5MjQiLCJpYXQiOjE3NDY3OTAwMTYsImV4cCI6MTc0Njc5MDMxNn0.9-FvQ2PwfEUYYkSstquIThiTqlSkumnJwB3rYnl4hnQ'

export const fetchCompany = createAsyncThunk(
    "Company/fetchCompany",
    async()=>{
        const response = await axios.get(`${BASE_URL}/companies`, {
            headers: {
              Authorization: `Bearer ${token}`,
            } });
    // console.log(response.data.data.companies)
    return response.data.data.companies;
}
)