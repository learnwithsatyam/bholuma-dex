import { Button } from '@/components/ui/button'
import React from 'react'

function Dex() {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl font-bold text-center text-white mb-4">Welcome to <br /> Bholuma Dex</h1>
            <div className="text-lg text-gray-300 bg-zinc-950 space-y-2 p-2 rounded-xl shadow-lg">
                <div className='grid grid-rows-[auto_1fr_auto] items-center justify-items-center bg-black rounded-md space-y-4 min-h-30 min-w-120'>
                    
                </div>   
                <div className='flex flex-col items-center bg-gray-800 rounded-md space-y-4 min-h-30 min-w-120'>
                    
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white w-full font-bold py-2 px-4 rounded-md p-6">
                    Swap
                </Button>    
            </div>
        </div>
    )
}

export default Dex