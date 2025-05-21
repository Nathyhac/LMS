import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await axios.get(`${BASE_URL}/notifications/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success == true) {
      // console.log("notifications......", response.data.data.notifications);
      return response.data.data.notifications;
    }
  }
);
