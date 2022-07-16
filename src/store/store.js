import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";
import { authSlice } from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
        auth: authSlice.reducer
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false
    })
});