"use client";

import Image from "next/image";
import { useState } from "react";

type SafeImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fallbackLabel?: string;
  position?: string;
  scale?: number;
};

export function SafeImage({
  src,
  alt,
  sizes = "100vw",
  className = "object-cover object-center",
  priority = false,
  fallbackLabel = "K2 Homestay",
  position = "center",
  scale = 1,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--card-soft)] px-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
        {fallbackLabel}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      style={{ objectPosition: position, transform: scale !== 1 ? `scale(${scale})` : undefined }}
      onError={() => setHasError(true)}
    />
  );
}
