"use client"
import Dex from "@/bholuma-components/dex";
import FloatingImageCard from "@/bholuma-components/floating-image-card";
import { Navbar } from "@/bholuma-components/navbar";
import getAllTokens from "@/bl/getAllTokens";
import { SUPPORTED_TOKENS } from "@/constants/supported-token";
import { SolanaTokenInterface } from "@/interfaces/solanaTokenInterface";
import { get } from "http";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {

  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_NODE_ENV === "production") {
  const originalConsoleError = console.error;

  console.error = (...args) => {
    const isWalletReject =
      args[0] instanceof Error &&
      (args[0].name === "WalletConnectionError" || args[0].name === "WalletDisconnectionError") ||
      args[0].message === "User rejected the request.";

    if (isWalletReject) {
      if (!args[0]?.message)toast.error(`Could not connect to wallet.`); // cleaner log
      return;
    }

    originalConsoleError(...args);
  };
}

  const [tokens, setTokens] = useState<SolanaTokenInterface[]>(SUPPORTED_TOKENS);

  useEffect(() => {
    //fetchTokens();
  }, []);

  const fetchTokens = async () => {
    const allTokens = await getAllTokens();
    setTokens(allTokens);
  };

  return (
    <div className=" relative bg-zinc-900 grid grid-rows-[100vh_1fr_auto] items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <div className=" relative w-full h-screen overflow-hidden">
        <Navbar />
        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/trUmpZnz3uf4pHDwsVbdpEeMygiiVCpJq9ZgoWcaWBz/logo.png" alt="TRUMP" width={100} top={50} left={50} animationDuration={4} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png" alt="SERUM" width={100} top={20} left={40} animationDuration={2} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac/token.png" alt="MANGO"  width={150} top={-5} left={-5} animationDuration={6} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC"  width={90} top={50} left={10} animationDuration={8} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/SergeyDobrinyn/token/master/files/jupiter.png" alt="JUPITER" width={30} top={10} left={20} animationDuration={8} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png" alt="RAYDIUM" width={100} top={70} left={80} animationDuration={8} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6dhTynDkYsVM7cbF7TKfC9DWB636TcEM935fq7JzL2ES/logo.png" alt="BONK" width={100} top={10} left={90} animationDuration={8} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png" alt="ORCA" width={100} top={90} left={10} animationDuration={8} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/D3KdBta3p53RV5FoahnJM5tP45h6Fd3AyFYgXTJvGCaK/logo.svg" alt="USDT" width={100} top={90} left={40} animationDuration={8} />
        <Dex tokens={tokens} />

      </div>
    </div>
  );
}
