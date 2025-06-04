"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SolanaTokenInterface } from '@/interfaces/solanaTokenInterface'
import TokenSelector from '@/bholuma-components/token-selector'
import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/index'
import { useSelector, useDispatch } from 'react-redux'
import getQuote from "@/bl/getQuote";
import { setBuyTokenAddress, setSellTokenAddress, setBuyTokenPrice, setSellTokenPrice, setBuyTokenAmount, setSellTokenAmount } from '@/store/BuyAndSellTokenSlice'
import { jupiterQuoteParamsInterface } from '@/interfaces/jupiterQuoteParamInterface'
import { SUPPORTED_TOKENS } from '@/constants/supported-token'
import { jupiterQuoteInterface } from '@/interfaces/jupiterQuoteInterface'
import { Root } from 'react-dom/client'
import getTokenPrice from '@/bl/getTokenPrice'

function Dex({ tokens }: { tokens: SolanaTokenInterface[] }) {

    const sellTokenPrice = useSelector((state: RootState) => state.buyAndSellToken.sellTokenPrice);
    const sellTokenAddress = useSelector((state: RootState) => state.buyAndSellToken.sellTokenAddress);
    const sellTokenAmount = useSelector((state: RootState) => state.buyAndSellToken.sellTokenAmount);
    const buyTokenPrice = useSelector((state: RootState) => state.buyAndSellToken.buyTokenPrice);
    const buyTokenAddress = useSelector((state: RootState) => state.buyAndSellToken.buyTokenAddress);
    const buyTokenAmount = useSelector((state: RootState) => state.buyAndSellToken.buyTokenAmount);

    const sellToken = SUPPORTED_TOKENS.find((token) => token.address == sellTokenAddress);
    const buyToken = SUPPORTED_TOKENS.find((token) => token.address == buyTokenAddress);

    const [currentQuote, setCurrentQuote] = useState<jupiterQuoteInterface>()
    
    const getCurrentQuote = async () => {
        if(sellTokenAmount < 1 ){
            dispatch(setBuyTokenAmount(0));
            dispatch(setSellTokenPrice(0));
            dispatch(setBuyTokenPrice(0));
            return;
        }
        if(!sellTokenAddress || !buyTokenAddress) return;
        
        const params: jupiterQuoteParamsInterface = {
            inputMint: sellTokenAddress,
            outputMint: buyTokenAddress, 
            amount: String(Math.pow(10, sellToken?.decimals!)*sellTokenAmount),
            slippageBps: 50,
            swapMode: 'ExactIn'
        }
        const quote = await getQuote(params);
        setCurrentQuote(quote);
        dispatch(setBuyTokenAmount((Number(quote?.outAmount ?? 0) / Math.pow(10, buyToken?.decimals ?? 0)) || ""));
        
        const buyTokenPriceData = await getTokenPrice(buyTokenAddress);
        const sellTokenPriceData = await getTokenPrice(sellTokenAddress);
        dispatch(setBuyTokenPrice(buyTokenPriceData?.data[buyTokenAddress].price));
        dispatch(setSellTokenPrice(sellTokenPriceData?.data[sellTokenAddress].price))
    }

    const changeSellTokenAddress = (address: string) => {
        dispatch(setSellTokenAddress(address));
    }

    const changeBuyTokenAddress = (address: string) => {
        dispatch(setBuyTokenAddress(address));
    }

    useEffect(() => {
        getCurrentQuote(); // Clean up on unmount
    }, [sellTokenAmount]);

    const dispatch = useDispatch();

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl font-bold text-center text-white mb-4">Welcome to <br /> Bholuma Dex</h1>
            <div className="text-lg text-gray-300 bg-zinc-950 space-y-2 p-2 rounded-xl shadow-lg">
                <div className='grid grid-rows-[auto_1fr_auto] items-center justify-items-center bg-black rounded-md px-2 py-2 space-y-4 min-h-30 min-w-120'>
                    <Label className="text-slate-500 text-left text-sm w-full">
                        SELL
                    </Label>
                    <div className='flex items-center rounded-md w-full'>
                        <Input type="text" placeholder="0" className='[&&]:text-4xl px-0 [&&]:h-fit [&&]:!border-none [&&]:!outline-none [&&]:!ring-0 [&&]:!focus-visible:ring-0 [&&]:!focus-visible:border-none [&&]:!focus-visible:outline-none'
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*$/.test(val) || val == '') {
                                    dispatch(setSellTokenAmount(Number(val))); // only set state if it's an integer or empty
                                } else {
                                    e.target.value = ''; // reset input if invalid
                                }
                            }} />
                        <TokenSelector tokens={tokens ?? []} address={sellTokenAddress} setAddress={changeSellTokenAddress} />
                    </div>
                    <Label className="text-slate-500 text-left text-sm w-full">
                        ${sellTokenPrice}
                    </Label>
                </div>
                <div className='grid grid-rows-[auto_1fr_auto] items-center justify-items-center px-2 py-2 bg-gray-800 rounded-md space-y-4 min-h-30 min-w-120'>
                    <Label className="text-slate-500 text-left text-sm w-full">
                        BUY
                    </Label>
                    <div className='flex items-center rounded-md w-full'>
                        <Input type="text" disabled placeholder="0" className='[&&]:text-4xl px-0 [&&]:h-fit [&&]:!border-none [&&]:!outline-none [&&]:!ring-0 [&&]:!focus-visible:ring-0 [&&]:!focus-visible:border-none [&&]:!focus-visible:outline-none'
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={buyTokenAmount}
                        />
                        <TokenSelector tokens={tokens ?? []} address={buyTokenAddress} setAddress={changeBuyTokenAddress} />
                    </div>
                    <Label className="text-slate-500 text-left text-sm w-full">
                        ${ buyTokenPrice }
                    </Label>
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white w-full font-bold py-2 px-4 rounded-md p-6">
                    Swap
                </Button>
            </div>
        </div>
    )
}

export default Dex