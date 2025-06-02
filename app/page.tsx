import Dex from "@/bholuma-components/dex";
import FloatingImageCard from "@/bholuma-components/floating-image-card";
import Navbar from "@/bholuma-components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" relative bg-zinc-900 grid grid-rows-[100vh_1fr_auto] items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <div className=" relative w-full h-screen overflow-hidden">
      // TRUMP
      <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/trUmpZnz3uf4pHDwsVbdpEeMygiiVCpJq9ZgoWcaWBz/logo.png" alt="Metamask Disk" blur={5} width={100} top={50} left={50} animationDuration={4} />

      // SERUM
      <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png" alt="Metamask Disk" blur={10} width={50} top={40} left={60} animationDuration={2}/>

      // MANGO
      <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac/token.png" alt="Metamask Disk" blur={30} width={150} top={-5} left={-5} animationDuration={6}/>

      // USDC
      <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="Metamask Disk" blur={30} width={90} top={30} left={40} animationDuration={8}/> 
      
      // JUPITER
      <FloatingImageCard imageUrl="https://raw.githubusercontent.com/SergeyDobrinyn/token/master/files/jupiter.png" alt="Metamask Disk" blur={2} width={30} top={10} left={20} animationDuration={8}/> 
      
      // RAYDIUM
      <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png" alt="Metamask Disk" blur={7} width={100} top={70} left={80} animationDuration={8}/> 
      
      // BONK
      <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6dhTynDkYsVM7cbF7TKfC9DWB636TcEM935fq7JzL2ES/logo.png" alt="Metamask Disk" blur={20} width={100} top={10} left={90} animationDuration={8}/> 
      
      // ORCA
      <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png" alt="Metamask Disk" blur={20} width={100} top={90} left={10} animationDuration={8}/> 
      
      // USDT
      <FloatingImageCard imageUrl="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/D3KdBta3p53RV5FoahnJM5tP45h6Fd3AyFYgXTJvGCaK/logo.svg" alt="Metamask Disk" blur={20} width={100} top={90} left={40} animationDuration={8}/> 
      
      <Dex />

      </div>
    </div>
  );
}
