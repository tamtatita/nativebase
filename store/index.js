import { configureStore } from "@reduxjs/toolkit";
import { MODULE_AUTH, authReducer } from "./auth";
import { messageBoxReducer, MODULE_MESSAGEBOX } from "./messagebox/index";
import { MODULE_SEARCH, searchReducer } from "./search/index";
export const store = configureStore({
  reducer: {
    [MODULE_AUTH]: authReducer,
    [MODULE_MESSAGEBOX]: messageBoxReducer,
    [MODULE_SEARCH]: searchReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
