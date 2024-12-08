import { configureStore } from "@reduxjs/toolkit";
import { MODULE_AUTH, authReducer } from "./auth";
import { messageBoxReducer, MODULE_MESSAGEBOX } from "./messagebox/index";
import { MODULE_SEARCH, searchReducer } from "./search/index";
import { jobDetailReducer, MODULE_JOBDETAIL } from "./jobdetail/index";
export const store = configureStore({
  reducer: {
    [MODULE_AUTH]: authReducer,
    [MODULE_MESSAGEBOX]: messageBoxReducer,
    [MODULE_SEARCH]: searchReducer,
    [MODULE_JOBDETAIL]: jobDetailReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
