import { jupiterTokenPriceInterface } from '@/interfaces/jupiterTokenPriceInterface';
import { SolanaTokenInterface } from '@/interfaces/solanaTokenInterface';
import axios from 'axios';

const getTokenPrice = async (address: string) => {
    const searchParams = new URLSearchParams({
        "ids": address
    })
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://lite-api.jup.ag/price/v2?${searchParams.toString()}`,
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const response = await axios.request<jupiterTokenPriceInterface>(config);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch tokens:', error);
        return undefined;
    }
}

export default getTokenPrice;