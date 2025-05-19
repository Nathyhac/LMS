import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../Slices/company/Reducer.js";
import analyticsBarReducer from "../Slices/analyticsBar/Reducer.js";
import statusChartReducer from "../Slices/statusChart/Reducer.js";
import userReducer from "../Slices/user/user.js";
import notificationReducer from "../Slices/notifications/Reducer.js";
import popularityReducer from "../Slices/popularity/Reducer.js";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    analyticsBar: analyticsBarReducer,
    user: userReducer,
    statusChart: statusChartReducer,
    notifications: notificationReducer,
    popularity: popularityReducer,
  },
});
