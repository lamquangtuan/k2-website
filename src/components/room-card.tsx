import Link from "next/link";
import { SafeImage } from "@/components/safe-image";
import { getRoomMedia } from "@/lib/media-data";
import { withLang, type Locale } from "@/lib/i18n";
import type { RoomType } from "@/lib/k2-content";

export function RoomCard({ room, locale = "vi" }: { room: RoomType; locale?: Locale }) {
  const media = getRoomMedia(room.slug);
  const displayPrice = locale === "vi" ? room.priceFrom[locale].replace(/^từ/i, "Từ") : room.priceFrom[locale].replace(/^from/i, "From");
  const ctaLabel = locale === "vi" ? "Xem phòng" : "View room";

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
        <div className="mt-1.5 text-[1rem] font-bold leading-none text-[var(--brand)] sm:mt-2 sm:text-lg">{displayPrice}</div>
        <p className="mt-1 overflow-hidden text-[13px] leading-5 text-[var(--ink-muted)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] sm:mt-1.5 sm:text-sm sm:[-webkit-line-clamp:unset] sm:[display:block]">
          {room.tagline[locale]}
        </p>
        <div className="mt-2">
          <Link href={withLang(`/rooms/${room.slug}`, locale)} className="inline-flex w-full items-center justify-center rounded-full bg-[var(--ink-strong)] px-4 py-2 text-sm font-semibold text-white sm:w-auto">
            <span className="text-center text-white">{ctaLabel}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
