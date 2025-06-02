import React from 'react'
import Image from 'next/image';

function FloatingImageCard({imageUrl, alt, top, left, animationDuration, width, blur}: {imageUrl: string, alt: string, top: number, left: number, animationDuration: number, width: number, blur?: number}) {
  if (!imageUrl) {
    return null;
  }
  return (
    <div className="absolute float-animate rounded-full"
    style={{ width: `${width}px`, height: `${width}px`, top: `${top}%`, left: `${left}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${animationDuration}s` }}>
        {/* Blurred halo */}
        <Image
          src={imageUrl}
          fill
          alt={alt}
          className="absolute opacity-90 rounded-full z-0 rotate-left-right"
          style={{ filter: `blur(${blur ?? 20}px)`}}
        />
        {/* Actual sharp icon */}
        <Image
          src={imageUrl}
          fill
          alt={alt}
          className="rotate-left-right rounded-full opacity-0 hover:scale-110 hover:opacity-100 -rotate-10 hover:rotate-0 transition-all duration-300 ease-in-out"
        />
      </div>

  )
}

export default FloatingImageCard