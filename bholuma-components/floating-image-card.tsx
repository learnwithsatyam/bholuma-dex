"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function FloatingImageCard({
  imageUrl,
  alt,
  top,
  left,
  animationDuration,
  width,
}: {
  imageUrl: string;
  alt: string;
  top: number;
  left: number;
  animationDuration: number;
  width: number;
}) {
  const [delay, setDelay] = useState<string | null>(null);
  const [blur, setBlur] = useState<string | null>(null);

  useEffect(() => {
    setDelay(`${Math.random() * 5}s`);
    setBlur(`${Math.random() * 20}`);
  }, []);

  if (!imageUrl || delay === null) return null;

  const style = {
    width: `${width}px`,
    height: `${width}px`,
    top: `${top}%`,
    left: `${left}%`,
    animationDelay: delay,
    animationDuration: `${animationDuration}s`,
  };

  return (
    <div className="absolute float-animate rounded-full" style={style}>
      {/* Blurred halo */}
      <Image
        src={imageUrl}
        fill
        alt={alt}
        className="absolute rounded-full z-0 rotate-left-right glow"
        style={{ filter: `blur(${blur}px)` }}
        loading="lazy"
      />
      {/* Actual sharp icon */}
      <Image
        src={imageUrl}
        fill
        alt={alt}
        className="rotate-left-right rounded-full opacity-20 blur-xs hover:blur-none hover:scale-110 hover:opacity-100 -rotate-10 hover:rotate-0 transition-all duration-300 ease-in-out"
        loading="lazy"
      />
    </div>
  );
}

export default FloatingImageCard;
