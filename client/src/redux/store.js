import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import popupsSlice from "./slices/popupsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    popups: popupsSlice,
  },
});
