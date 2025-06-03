import { jupiterQuoteInterface } from '@/interfaces/jupiterQuoteInterface';
import { jupiterQuoteParamsInterface } from '@/interfaces/jupiterQuoteParamInterface';
import axios, { AxiosRequestConfig } from 'axios';

const getQuote = async (params: jupiterQuoteParamsInterface) => {
    const {
    inputMint,
    outputMint,
    amount,
    slippageBps,
    swapMode = 'ExactIn',
    dexes,
    excludeDexes,
    restrictIntermediateTokens = true,
    onlyDirectRoutes = false,
    asLegacyTransaction = false,
    platformFeeBps,
    maxAccounts,
    dynamicSlippage = false,
  } = params;

  const searchParams = new URLSearchParams({
    inputMint,
    outputMint,
    amount: amount.toString(),
    swapMode,
    restrictIntermediateTokens: restrictIntermediateTokens.toString(),
    onlyDirectRoutes: onlyDirectRoutes.toString(),
    asLegacyTransaction: asLegacyTransaction.toString(),
    dynamicSlippage: dynamicSlippage.toString(),
  });

    if (slippageBps !== undefined) {
    searchParams.append('slippageBps', slippageBps.toString());
  }

  if (platformFeeBps !== undefined) {
    searchParams.append('platformFeeBps', platformFeeBps.toString());
  }

  if (maxAccounts !== undefined) {
    searchParams.append('maxAccounts', maxAccounts.toString());
  }

  if (dexes?.length) {
    searchParams.append('dexes', dexes.join(','));
  }

  if (excludeDexes?.length) {
    searchParams.append('excludeDexes', excludeDexes.join(','));
  }

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://lite-api.jup.ag/swap/v1/quote?${searchParams.toString()}`,
    headers: {
      Accept: 'application/json',
    },
  };

  try {
    const response = await axios.request<jupiterQuoteInterface>(config);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching Jupiter quote:', error.message);
    throw error;
  }
}

export default getQuote;