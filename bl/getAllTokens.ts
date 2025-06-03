import { SolanaTokenInterface } from '@/interfaces/solanaTokenInterface';
import axios from 'axios';

const getAllTokens = async () => {
    try {
    const response = await axios.get<SolanaTokenInterface[]>('https://lite-api.jup.ag/tokens/v1/mints/tradable');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tokens:', error);
    return [];
  }
}

export default getAllTokens;