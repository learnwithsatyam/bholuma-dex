"use client";
import { createSlice } from "@reduxjs/toolkit";

const buyAndSellTokenSlice = createSlice({
    name: 'buySellToken',
    initialState:{
        buyTokenAddress: '',
        sellTokenAddress: '',
        buyTokenPrice: 0,
        sellTokenPrice: 0,
        sellTokenAmount: 0,
        buyTokenAmount:0,
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
        },
        setBuyTokenAmount(state, action){
            state.buyTokenAmount = action.payload
        },
        setSellTokenAmount(state, action){
            state.sellTokenAmount = action.payload
        }
    }
})

export const {setBuyTokenAddress, setSellTokenAddress, setBuyTokenPrice, setSellTokenPrice, setBuyTokenAmount, setSellTokenAmount} = buyAndSellTokenSlice.actions;
export default buyAndSellTokenSlice.reducer;