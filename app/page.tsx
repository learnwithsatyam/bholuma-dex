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

export default function Home() {

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
        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/trUmpZnz3uf4pHDwsVbdpEeMygiiVCpJq9ZgoWcaWBz/logo.png" alt="TRUMP" blur={5} width={100} top={50} left={50} animationDuration={4} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png" alt="SERUM" blur={30} width={100} top={20} left={40} animationDuration={2} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac/token.png" alt="MANGO" blur={30} width={150} top={-5} left={-5} animationDuration={6} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" blur={30} width={90} top={50} left={10} animationDuration={8} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/SergeyDobrinyn/token/master/files/jupiter.png" alt="JUPITER" blur={2} width={30} top={10} left={20} animationDuration={8} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png" alt="RAYDIUM" blur={7} width={100} top={70} left={80} animationDuration={8} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6dhTynDkYsVM7cbF7TKfC9DWB636TcEM935fq7JzL2ES/logo.png" alt="BONK" blur={20} width={100} top={10} left={90} animationDuration={8} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png" alt="ORCA" blur={20} width={100} top={90} left={10} animationDuration={8} />

        <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/D3KdBta3p53RV5FoahnJM5tP45h6Fd3AyFYgXTJvGCaK/logo.svg" alt="USDT" blur={20} width={100} top={90} left={40} animationDuration={8} />
        <Dex tokens={tokens} />

      </div>
    </div>
  );
}
