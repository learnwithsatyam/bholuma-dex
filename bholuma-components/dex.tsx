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
import getTokenPrice from '@/bl/getTokenPrice'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import ConnectWallet from '@/bholuma-components/WalletConnectButton'
import { JupiterSwapTransactionRequestInterface } from '@/interfaces/jupiterSwapTransactionRequestInterface'
import { LAMPORTS_PER_SOL, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js'
import { createSwapTransaction } from '@/bl/swapTokens'
import { jupiterSwapTransactionResponseInterface } from '@/interfaces/jupiterSwapTransactionResponseInterface'
import { toast } from 'sonner'
import { BholumaButton } from './BholumaButton'
import { ArrowUpDown } from 'lucide-react'

function Dex({ tokens }: { tokens: SolanaTokenInterface[] }) {

    const sellTokenPrice = useSelector((state: RootState) => state.buyAndSellToken.sellTokenPrice);
    const sellTokenAddress = useSelector((state: RootState) => state.buyAndSellToken.sellTokenAddress);
    const sellTokenAmount = useSelector((state: RootState) => state.buyAndSellToken.sellTokenAmount);
    const buyTokenPrice = useSelector((state: RootState) => state.buyAndSellToken.buyTokenPrice);
    const buyTokenAddress = useSelector((state: RootState) => state.buyAndSellToken.buyTokenAddress);
    const buyTokenAmount = useSelector((state: RootState) => state.buyAndSellToken.buyTokenAmount);

    const dispatch = useDispatch();

    const { publicKey, disconnect, wallet } = useWallet();
    const { connection } = useConnection();

    const sellToken = SUPPORTED_TOKENS.find((token) => token.address == sellTokenAddress);
    const buyToken = SUPPORTED_TOKENS.find((token) => token.address == buyTokenAddress);

    const [currentQuote, setCurrentQuote] = useState<jupiterQuoteInterface>()

    const verifyBuyAndSellTokenAddress = (): boolean => {
        if ((sellTokenAddress === buyTokenAddress) && sellTokenAddress && buyTokenAddress) {
            toast("Buy token and sell token can not be same. Please select distinct tokens");
            return false;
        }
        return true;
    }
    const getCurrentQuote = async () => {
        if (!verifyBuyAndSellTokenAddress()) return;
        if (sellTokenAmount == 0 || !sellTokenAmount) {
            dispatch(setBuyTokenAmount(0));
            dispatch(setSellTokenAmount(0));
            dispatch(setSellTokenPrice(0));
            dispatch(setBuyTokenPrice(0));
            return;
        }
        if (!sellTokenAddress || !buyTokenAddress) return;

        const params: jupiterQuoteParamsInterface = {
            inputMint: sellTokenAddress,
            outputMint: buyTokenAddress,
            amount: String(Math.pow(10, sellToken?.decimals!) * sellTokenAmount),
            slippageBps: 50,
            swapMode: 'ExactIn'
        }
        const quote = await getQuote(params);
        setCurrentQuote(quote);
        const updatedBuyTokenAmount = (Number(quote?.outAmount ?? 0) / Math.pow(10, buyToken?.decimals ?? 0)) || 0;
        dispatch(setBuyTokenAmount(updatedBuyTokenAmount));

        const buyTokenPriceData = await getTokenPrice(buyTokenAddress);
        const sellTokenPriceData = await getTokenPrice(sellTokenAddress);
        const buyTokenPriceValue = Number(buyTokenPriceData?.data?.[buyTokenAddress]?.price) || 0;
        const buyTokenAmountValue = Number(updatedBuyTokenAmount) || 0;
        dispatch(setBuyTokenPrice(buyTokenPriceValue * buyTokenAmountValue));
        const sellTokenPriceValue = Number(sellTokenPriceData?.data?.[sellTokenAddress]?.price) || 0;
        dispatch(setSellTokenPrice(sellTokenPriceValue * sellTokenAmount));
    }

    const changeSellTokenAddress = (address: string) => {
        dispatch(setSellTokenAddress(address));
    }

    const changeBuyTokenAddress = (address: string) => {
        dispatch(setBuyTokenAddress(address));
    }

    const handleTokenExchange = async () => {
        const currentBuyToken = buyTokenAddress;
        const currentSellToken = sellTokenAddress;

        dispatch(setBuyTokenAddress(currentSellToken));
        dispatch(setSellTokenAddress(currentBuyToken));

    }
    const handleTokenSwap = async () => {
        if (!verifyBuyAndSellTokenAddress()) return;

        if (!sellTokenAddress || !buyTokenAddress) {
            toast.error("Please select the sell and buy tokens first.");
            return;
        }

        if (sellTokenAmount <= 0) {
            toast.error("Please enter the amount to sell.")
            return;
        }
        try {
            const requestBody: JupiterSwapTransactionRequestInterface = {
                userPublicKey: publicKey?.toBase58() as string,
                quoteResponse: currentQuote!,
                prioritizationFeeLamports: {
                    priorityLevelWithMaxLamports: {
                        maxLamports: 0.001 * LAMPORTS_PER_SOL,
                        priorityLevel: "high"
                    },
                },
                dynamicComputeUnitLimit: true,
                feeAccount: sellTokenAddress,
            }

            const swapTransaction: jupiterSwapTransactionResponseInterface | string = await createSwapTransaction(requestBody);

            if (typeof swapTransaction === "string") {
                toast.error(swapTransaction);
                return;
            }

            const transaction = VersionedTransaction.deserialize(
                Buffer.from(swapTransaction!.swapTransaction!, "base64")
            );

            const signature = await wallet?.adapter.sendTransaction(transaction, connection);
            if (!signature) {
                throw new Error("Failed to get transaction signature.");
            }
            const latestBlock = await connection.getLatestBlockhash();
            const result = await connection.confirmTransaction({
                lastValidBlockHeight: latestBlock.lastValidBlockHeight,
                blockhash: latestBlock.blockhash,
                signature: signature
            }, "finalized");

            if (result.value.err) {
                toast.error(`Something went wrong: ${result.value.err}`)
                return;
            }

            toast(`Tokens swapped successfully. ${result.context.slot.toString()}`)
        } catch (err: any) {
            if (err?.message?.includes("User rejected the request")) {
                toast.info("You cancelled the transaction.");
            } else {
                console.error("Transaction error:", err);
                toast.error("Transaction failed. Please try again.");
            }
        }
    }
    useEffect(() => {
        getCurrentQuote(); // Clean up on unmount
    }, [sellTokenAmount, sellTokenAddress, buyTokenAddress]);

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl font-bold text-center text-white mb-4">Welcome to <br /> Bholuma Dex</h1>
            <div className="text-lg text-gray-300 bg-zinc-950 space-y-2 p-2 rounded-xl shadow-lg">
                <div>
                    <BholumaButton className='absolute top-1/2 left-1/2 transform -translate-x-1/2 border-black border-1 text-center' onClick={handleTokenExchange} icon={<ArrowUpDown />} />
                    <div className='grid grid-rows-[auto_1fr_auto] items-center justify-items-center bg-black rounded-md px-2 py-2 space-y-4 min-h-30 min-w-120'>
                        <Label className="text-slate-500 text-left text-sm w-full">
                            SELL
                        </Label>
                        <div className='flex items-center rounded-md w-full'>
                            <Input type="text" placeholder="0" className='[&&]:text-4xl px-0 [&&]:h-fit [&&]:!border-none [&&]:!outline-none [&&]:!ring-0 [&&]:!focus-visible:ring-0 [&&]:!focus-visible:border-none [&&]:!focus-visible:outline-none'
                                inputMode="numeric"
                                value={sellTokenAmount}
                                pattern="[0-9]*"
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^\d*\.?\d*$/.test(val) || val == '') {
                                        dispatch(setSellTokenAmount(Number(val))); // only set state if it's an integer or empty
                                    } else {
                                        e.target.value = ''; // reset input if invalid
                                    }
                                }} />
                            <TokenSelector
                                tokens={tokens}
                                address={sellTokenAddress}
                                setAddress={changeSellTokenAddress}
                            />
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
                            <TokenSelector
                                tokens={tokens}
                                address={buyTokenAddress}
                                setAddress={changeBuyTokenAddress}
                            />
                        </div>
                        <Label className="text-slate-500 text-left text-sm w-full">
                            ${buyTokenPrice}
                        </Label>
                    </div>
                </div>
                {publicKey ?
                    <div className='flex items-center w-full space-x-2 px-2 justify-center'>
                        <BholumaButton className="bg-orange-600 hover:bg-orange-700 text-white w-1/2 font-bold py-2 px-4 rounded-md p-6" onClick={handleTokenSwap}>
                            Swap
                        </BholumaButton>
                        <Button className="bg-gray-600 hover:bg-gray-700 text-white w-1/2 font-bold py-2 px-4 rounded-md p-6" onClick={disconnect}>
                            Disconnect
                        </Button>
                    </div>
                    :
                    <ConnectWallet />
                }
            </div>
        </div>
    )
}

export default Dex