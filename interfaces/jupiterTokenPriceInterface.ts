export interface TokenPriceInfo {
  id: string;
  type: string; // Could also be union: 'derivedPrice' | ...
  price: string;
  extraInfo?: object;
  lastSwappedPrice?: object;
  quotedPrice?: object;
  confidenceLevel?: 'high' | 'medium' | 'low';
  depth?: object;
}

export interface jupiterTokenPriceInterface {
  data: {
    [mintAddress: string]: TokenPriceInfo;
  };
  timeTaken: number;
}
