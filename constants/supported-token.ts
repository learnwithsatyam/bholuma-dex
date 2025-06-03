import { SolanaTokenInterface } from "@/interfaces/solanaTokenInterface";

export const SUPPORTED_TOKENS: SolanaTokenInterface[] = [
  {
    address: "So11111111111111111111111111111111111111112", // Pseudo-address for native SOL
    chainId: 101,
    decimals: 9,
    name: "Solana",
    symbol: "SOL",
    logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
    tags: ["native"]
  },
  {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
    chainId: 101,
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    tags: ["stablecoin"]
  },
  {
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT
    chainId: 101,
    decimals: 6,
    name: "Tether USD",
    symbol: "USDT",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/D3KdBta3p53RV5FoahnJM5tP45h6Fd3AyFYgXTJvGCaK/logo.svg",
    tags: ["stablecoin"]
  }
];
