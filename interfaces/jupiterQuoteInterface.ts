export type SwapMode = 'ExactIn' | 'ExactOut';

export interface PlatformFee {
  amount: string;
  feeBps: number;
}

export interface SwapInfo {
  ammKey: string;
  label: string;
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  feeAmount: string;
  feeMint: string;
}

export interface RoutePlanEntry {
  swapInfo: SwapInfo;
  percent: number;
}

export interface jupiterQuoteInterface {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: SwapMode;
  slippageBps: number;
  platformFee?: PlatformFee;
  priceImpactPct: string;
  routePlan: RoutePlanEntry[];
  contextSlot: number;
  timeTaken: number;
}
