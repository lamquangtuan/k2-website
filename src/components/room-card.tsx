"use client";

import Link from "next/link";
import { SafeImage } from "@/components/safe-image";
import type { RoomType } from "@/lib/k2-content";
import { trackEvent } from "@/lib/analytics";
import { uiCopy, withLang, type Locale } from "@/lib/i18n";
import { getRoomMedia } from "@/lib/media-data";
import { siteConfig } from "@/lib/site-config";

export function RoomCard({ room, locale = "vi" }: { room: RoomType; locale?: Locale }) {
  const media = getRoomMedia(room.slug);
  const copy = uiCopy[locale].cta;
  const roomHref = withLang(`/rooms/${room.slug}`, locale);
  const bookingHref = siteConfig.zaloUrl;

  return (
    <article className="overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] shadow-sm">
      <div className="relative min-h-[136px] overflow-hidden sm:min-h-[208px]">
        <SafeImage
          src={media.cardImage.src}
          alt={media.cardImage.alt}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          position={media.cardImage.position}
          scale={media.cardImage.scale}
        />
      </div>

      <div className="p-2.5 sm:p-4">
        <h3 className="font-display text-[1.02rem] sm:text-xl">{room.name[locale]}</h3>
        <div className="mt-1.5 text-[1rem] font-bold leading-none text-[var(--brand)] sm:mt-2 sm:text-lg">
          {room.priceFrom[locale]}
        </div>
        <p className="mt-1 overflow-hidden text-[13px] leading-5 text-[var(--ink-muted)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] sm:mt-1.5 sm:text-sm sm:[-webkit-line-clamp:unset] sm:[display:block]">
          {room.tagline[locale]}
        </p>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <Link
            href={roomHref}
            onClick={() => trackEvent("click_view_room")}
            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-strong)]"
          >
            {copy.viewRoom}
          </Link>
          <a
            href={bookingHref}
            onClick={() => trackEvent("click_zalo")}
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(181,95,46,0.24)]"
          >
            {copy.quickBook}
          </a>
        </div>
      </div>
    </article>
  );
}
