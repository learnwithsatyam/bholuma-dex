import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-900 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className=""><Image src={"/metamaskDisk.png"} width={100} height={100} className="blur-md opacity-60 hover:blur-none" alt=""/></div>
    </div>
  );
}
