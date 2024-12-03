import { configureStore } from "@reduxjs/toolkit";
import { MODULE_AUTH, authReducer } from "./auth";
import { messageBoxReducer, MODULE_MESSAGEBOX } from "./messagebox/index";
export const store = configureStore({
  reducer: {
    [MODULE_AUTH]: authReducer,
    [MODULE_MESSAGEBOX]: messageBoxReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
