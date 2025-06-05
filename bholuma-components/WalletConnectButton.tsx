"use client";
import { useWalletModal, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react';

export default function ConnectWallet() {
  const [hasMounted, setHasMounted] = useState(false);
  const { setVisible } = useWalletModal();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // ⛔️ Prevent hydration mismatch

  return (
    <button
      onClick={() => setVisible(true)}
      className="bg-orange-600 hover:bg-orange-900  transition delay-150 duration-300 ease-in-out text-white w-full font-bold py-2 px-4 rounded-md"
    >
      Connect Wallet
    </button>
  );
}
