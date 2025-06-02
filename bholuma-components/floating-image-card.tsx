import React from 'react'
import Image from 'next/image';

function FloatingImageCard({imageUrl, alt, top, left, animationDuration}: {imageUrl: string, alt: string, top: number, left: number, animationDuration: number}) {
  if (!imageUrl) {
    return null;
  }
  return (
    <div className="absolute float-animate w-[100px] h-[100px] rounded-full"
    style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${animationDuration}s` }}>
        {/* Blurred halo */}
        <Image
          src={imageUrl}
          fill
          alt={alt}
          className="absolute blur-sm opacity-40 rounded-full z-0 rotate-left-right"
        />
        {/* Actual sharp icon */}
        <Image
          src={imageUrl}
          fill
          alt={alt}
          className="rotate-left-right opacity-0 hover:scale-110 hover:opacity-100 -rotate-10 hover:rotate-0 transition-all duration-300 ease-in-out"
        />
      </div>

  )
}

export default FloatingImageCard