import FloatingImageCard from "@/bholuma-components/floating-image-card";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" relative bg-zinc-900 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <FloatingImageCard imageUrl="/metamaskDisk.png" alt="Metamask Disk" top={50} left={200} />
      <FloatingImageCard imageUrl="/metamaskDisk.png" alt="Metamask Disk" top={400} left={600} />
      <FloatingImageCard imageUrl="/metamaskDisk.png" alt="Metamask Disk" top={500} left={400} />
      <FloatingImageCard imageUrl="/metamaskDisk.png" alt="Metamask Disk" top={300} left={400} />
    </div>
  );
}
