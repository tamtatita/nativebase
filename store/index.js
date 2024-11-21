import { configureStore } from "@reduxjs/toolkit";
import { MODULE_AUTH, authReducer } from "./auth";

export const store = configureStore({
  reducer: {
    [MODULE_AUTH]: authReducer,
  },
});
