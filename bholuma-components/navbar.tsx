"use client";

import Image from "next/image";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FaGithub, FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
import { useEffect, useState } from "react";
export const Navbar = () => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null; // ⛔️ Prevent hydration mismatch

    return (
        <nav className="sticky top-0 z-50 w-full bg-gradient-to-b from-black/50 to-transparent backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/bholumaIcon.png" alt="Bholuma" width={32} height={32} />
                    <span className="text-xl font-bold text-white">Bholuma DEX</span>
                </Link>

                {/* Social Icons */}
                <div className="flex space-x-6 items-center text-white">
                    <Link
                        href="https://x.com/sattyshivhare"
                        target="_blank"
                        className="hover:text-orange-500"
                    >
                        <FaSquareXTwitter size={20} />
                    </Link>
                    <Link
                        href="https://github.com/learnwithsatyam"
                        target="_blank"
                        className="hover:text-orange-500"
                    >
                        <FaGithub size={20} />
                    </Link>
                    <Link
                        href="https://linkedin.com/in/satyam-shivhare"
                        target="_blank"
                        className="hover:text-orange-500"
                    >
                        <FaLinkedin size={20} />
                    </Link>
                </div>

                {/* Wallet Button */}
                <WalletMultiButton className="!bg-pink-600 !hover:bg-pink-700 !text-white !font-semibold !rounded-md !px-4 !py-2" />
            </div>
        </nav>
    );
};
