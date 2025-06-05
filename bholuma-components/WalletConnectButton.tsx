"use client";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react';

export default function ConnectWallet() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // ⛔️ Prevent hydration mismatch

  return <WalletMultiButton className="bg-pink-600 hover:bg-pink-900 text-white w-full font-bold py-2 px-4 rounded-md p-6" />
}
