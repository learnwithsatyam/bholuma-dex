"use client";
import { createSlice } from "@reduxjs/toolkit";

const buyAndSellTokenSlice = createSlice({
    name: 'buySellToken',
    initialState:{
        buyTokenAddress: '',
        sellTokenAddress: '',
        buyTokenPrice: 0,
        sellTokenPrice: 0
    },
    reducers: {
        setBuyTokenAddress(state, action){
            state.buyTokenAddress = action.payload
        },
        setSellTokenAddress(state, action){
            state.sellTokenAddress = action.payload
        },
        setBuyTokenPrice(state, action){
            state.buyTokenPrice = action.payload
        },
        setSellTokenPrice(state, action){
            state.sellTokenPrice = action.payload
        }
    }

})

export const {setBuyTokenAddress, setSellTokenAddress, setBuyTokenPrice, setSellTokenPrice} = buyAndSellTokenSlice.actions;
export default buyAndSellTokenSlice.reducer;