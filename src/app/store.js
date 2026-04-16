import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";

import authReducer from "../features/auth/authSlice";
import breadcrumbReducer from "../features/breadcrumb/breadcrumbSlice";
import themeModeReducer from "../features/themeMode/themeModeSlice";
import salesReducer from "../features/sales/salesSlice";
import notificationReducer from "../features/notification/notificationSlice";
import { config } from "../util/const";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    notification: notificationReducer,
    breadcrumb: breadcrumbReducer,
    themeMode: themeModeReducer,
    sales: salesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: config === "dev",
});

setupListeners(store.dispatch);
