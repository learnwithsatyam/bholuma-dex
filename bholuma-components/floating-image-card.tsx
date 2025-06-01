import React from 'react'
import Image from 'next/image';

function FloatingImageCard({imageUrl, alt}: {imageUrl: string, alt: string}) {
  if (!imageUrl) {
    return null;
  }
  return (
    <div className="absolute top-50 float-animate w-[100px] h-[100px] rounded-full">
        {/* Blurred halo */}
        <Image
          src={imageUrl}
          fill
          alt={alt}
          className="absolute blur-sm opacity-40 rounded-full z-0"
        />
        {/* Actual sharp icon */}
        <Image
          src={imageUrl}
          fill
          alt={alt}
          className="opacity-0 hover:scale-110 hover:opacity-100 -rotate-10 hover:rotate-0 transition-all duration-300 ease-in-out"
        />
      </div>

  )
}

export default FloatingImageCard