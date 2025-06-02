"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SolanaTokenInterface } from '@/interfaces/solanaTokenInterface'
import TokenSelector from '@/bholuma-components/token-selector'
import React from 'react'

function Dex({ tokens }: { tokens: SolanaTokenInterface[] }) {
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
                                if (/^\d*$/.test(val)) {
                                    //setSolAmount(Number(val)); // only set state if it's an integer or empty
                                } else {
                                    e.target.value = ''; // reset input if invalid
                                }
                            }} />
                        <TokenSelector tokens={tokens ?? []} />
                    </div>
                    <Label className="text-slate-500 text-left text-sm w-full">
                        $0.00
                    </Label>
                </div>
                <div className='grid grid-rows-[auto_1fr_auto] items-center justify-items-center px-2 py-2 bg-gray-800 rounded-md space-y-4 min-h-30 min-w-120'>
                    <Label className="text-slate-500 text-left text-sm w-full">
                        BUY
                    </Label>
                    <div className='flex items-center rounded-md w-full'>
                        <Input type="text" placeholder="0" className='[&&]:text-4xl px-0 [&&]:h-fit [&&]:!border-none [&&]:!outline-none [&&]:!ring-0 [&&]:!focus-visible:ring-0 [&&]:!focus-visible:border-none [&&]:!focus-visible:outline-none'
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*$/.test(val)) {
                                    //setSolAmount(Number(val)); // only set state if it's an integer or empty
                                } else {
                                    e.target.value = ''; // reset input if invalid
                                }
                            }} />
                        <TokenSelector tokens={tokens ?? []} />
                    </div>
                    <Label className="text-slate-500 text-left text-sm w-full">
                        $0.00
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