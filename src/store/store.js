import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../Slices/company/Reducer.js";


export const store = configureStore({
reducer: {
    company:companyReducer,
}
});