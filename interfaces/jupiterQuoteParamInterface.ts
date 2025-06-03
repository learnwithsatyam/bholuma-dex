export interface jupiterQuoteParamsInterface {
  inputMint: string;
  outputMint: string;
  amount: string; // string to support large numbers
  slippageBps?: number;
  swapMode?: 'ExactIn' | 'ExactOut';
  dexes?: string[]; // e.g. ['Raydium', 'Orca+V2']
  excludeDexes?: string[];
  restrictIntermediateTokens?: boolean;
  onlyDirectRoutes?: boolean;
  asLegacyTransaction?: boolean;
  platformFeeBps?: number;
  maxAccounts?: number;
  dynamicSlippage?: boolean;
}