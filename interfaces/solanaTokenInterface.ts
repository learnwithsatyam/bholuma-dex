export interface SolanaTokenInterface {
  address: string;
  chainId: number;
  decimals: number;
  name: string;
  symbol: string;
  logoURI: string;
  tags?: string[];
}
