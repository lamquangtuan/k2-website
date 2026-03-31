"use client";

import { useEffect } from "react";
import { SafeImage } from "@/components/safe-image";
import type { ImageAsset } from "@/lib/media-data";

type ImageLightboxProps = {
  images: readonly ImageAsset[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function ImageLightbox({ images, index, onClose, onPrev, onNext }: ImageLightboxProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  const activeImage = images[index];

  if (!activeImage) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-[rgba(16,11,7,0.86)] p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
        <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-[var(--ink-strong)] shadow-sm"
            aria-label="Close image"
          >
            ×
          </button>

          <div className="relative overflow-hidden rounded-[24px] bg-black/20">
            <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
              <SafeImage src={activeImage.src} alt={activeImage.alt} sizes="100vw" className="object-contain object-top" fallbackLabel="Image unavailable" />
            </div>
          </div>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-[var(--ink-strong)] shadow-sm"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-[var(--ink-strong)] shadow-sm"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
