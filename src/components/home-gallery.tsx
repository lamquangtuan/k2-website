"use client";

import { useMemo, useState } from "react";
import { ImageLightbox } from "@/components/image-lightbox";
import { SafeImage } from "@/components/safe-image";
import { commonGalleryImages, getRoomMedia, toursByCategory, type ImageAsset } from "@/lib/media-data";
import { uiCopy, type Locale } from "@/lib/i18n";

type GalleryGroup = {
  key: string;
  label: string;
  items: readonly ImageAsset[];
  imageClassName?: (item: ImageAsset, index: number) => string;
};

const tourLabelMap: Record<string, string> = {
  "floating-market": "Floating Market",
  orchid: "Fruit Orchard",
  cacao: "Cacao",
  conson: "Con Son",
};

export function HomeGallery({ locale = "vi" }: { locale?: Locale }) {
  const copy = uiCopy[locale].gallery;
  const [activeGroupKey, setActiveGroupKey] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const groups = useMemo<GalleryGroup[]>(
    () => [
      {
        key: "rooms",
        label: copy.rooms,
        items: [getRoomMedia("phong-don").cardImage, getRoomMedia("phong-gia-dinh").cardImage, getRoomMedia("phong-dorm-giuong-tang").cardImage],
        imageClassName: () => "object-cover",
      },
      {
        key: "common",
        label: copy.common,
        items: commonGalleryImages,
        imageClassName: () => "object-cover",
      },
      {
        key: "tours",
        label: copy.tour,
        items: [],
      },
    ],
    [copy.common, copy.rooms, copy.tour],
  );

  return (
    <section className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm sm:p-5">
      <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
        {groups.slice(0, 2).map((group) => (
          <div key={group.key} className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)] sm:text-sm">{group.label}</div>
            <div className={`grid gap-2.5 sm:gap-3 ${group.key === "common" ? "grid-cols-2" : ""}`}>
              {group.items.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => {
                    setActiveGroupKey(group.key);
                    setActiveIndex(index);
                  }}
                  className={`relative overflow-hidden rounded-[20px] text-left ${group.key === "common" ? "min-h-[112px] sm:min-h-[150px]" : "min-h-[138px] sm:min-h-[190px]"}`}
                >
                  <SafeImage
                    src={item.src}
                    alt={item.alt}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className={group.imageClassName?.(item, index) ?? "object-cover"}
                    position={item.position}
                    scale={item.scale}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)] sm:text-sm">{copy.tour}</div>
          <div className="grid gap-2.5 sm:gap-3">
            {(["floating-market", "orchid", "cacao", "conson"] as const).map((key) => {
              const items = toursByCategory[key];
              return (
                <div key={key} className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">{tourLabelMap[key]}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {items.length > 0 ? (
                      items.slice(0, 2).map((item, index) => (
                        <button
                          key={item.src}
                          type="button"
                          onClick={() => {
                            setActiveGroupKey(key);
                            setActiveIndex(index);
                          }}
                          className="relative min-h-[96px] overflow-hidden rounded-[16px] text-left sm:min-h-[112px]"
                        >
                          <SafeImage src={item.src} alt={item.alt} sizes="(min-width: 1024px) 15vw, 45vw" className="object-cover" position={item.position} scale={item.scale} />
                        </button>
                      ))
                    ) : (
                      <div className="flex min-h-[112px] items-center justify-center rounded-[16px] border border-dashed border-[var(--line)] bg-[var(--card-soft)] px-3 text-center text-xs text-[var(--ink-soft)]">
                        {copy.tourPlaceholder}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {activeGroupKey !== null ? (
        <ImageLightbox
          images={
            activeGroupKey === "rooms"
              ? groups[0].items
              : activeGroupKey === "common"
                ? groups[1].items
                : toursByCategory[activeGroupKey as keyof typeof toursByCategory]
          }
          index={activeIndex}
          onClose={() => setActiveGroupKey(null)}
          onPrev={() => {
            const images =
              activeGroupKey === "rooms"
                ? groups[0].items
                : activeGroupKey === "common"
                  ? groups[1].items
                  : toursByCategory[activeGroupKey as keyof typeof toursByCategory];
            setActiveIndex((current) => (current - 1 + images.length) % images.length);
          }}
          onNext={() => {
            const images =
              activeGroupKey === "rooms"
                ? groups[0].items
                : activeGroupKey === "common"
                  ? groups[1].items
                  : toursByCategory[activeGroupKey as keyof typeof toursByCategory];
            setActiveIndex((current) => (current + 1) % images.length);
          }}
        />
      ) : null}
    </section>
  );
}
