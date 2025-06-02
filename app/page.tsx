import FloatingImageCard from "@/bholuma-components/floating-image-card";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" relative bg-zinc-900 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <FloatingImageCard imageUrl="/metamaskDisk.png" alt="Metamask Disk" top={50} left={50} animationDuration={4} />
      <FloatingImageCard imageUrl="/metamaskDisk.png" alt="Metamask Disk" top={40} left={60} animationDuration={2}/>
      <FloatingImageCard imageUrl="/metamaskDisk.png" alt="Metamask Disk" top={50} left={40} animationDuration={6}/>
      <FloatingImageCard imageUrl="/metamaskDisk.png" alt="Metamask Disk" top={30} left={40} animationDuration={8}/>
    </div>
  );
}
