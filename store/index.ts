"use client";
import { configureStore } from "@reduxjs/toolkit";
import buyAndSellTokenReducer from "@/store/BuyAndSellTokenSlice"
export const store = () => configureStore({
    reducer: {
        buyAndSellToken: buyAndSellTokenReducer
    }
})

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']