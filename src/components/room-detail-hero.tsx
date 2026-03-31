import { CtaButtons } from "@/components/cta-buttons";
import { SafeImage } from "@/components/safe-image";
import { getRoomMedia } from "@/lib/media-data";
import type { Locale } from "@/lib/i18n";
import type { RoomType } from "@/lib/k2-content";

export function RoomDetailHero({ room, locale = "vi" }: { room: RoomType; locale?: Locale }) {
  const media = getRoomMedia(room.slug);
  const availabilityLine =
    locale === "en"
      ? "Available today \u2014 message on Zalo for a faster hold"
      : "C\u00f2n ph\u00f2ng h\u00f4m nay \u2013 nh\u1eafn Zalo \u0111\u1ec3 gi\u1eef ph\u00f2ng nhanh";

  return (
    <section className="overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_60px_rgba(37,26,16,0.08)]">
      <div className="relative min-h-[240px] sm:min-h-[280px] lg:min-h-[330px]">
        <SafeImage
          src={media.heroImage.src}
          alt={media.heroImage.alt}
          sizes="100vw"
          className="object-cover"
          position={media.heroImage.position}
          scale={media.heroImage.scale}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,12,0.08),rgba(20,16,12,0.28))]" />
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="order-2 lg:order-1">
          <h1 className="font-display text-2xl leading-tight sm:text-4xl">{room.name[locale]}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-[var(--ink-muted)] sm:leading-6">{room.decisionTitle[locale]}</p>
        </div>

        <div className="order-1 rounded-[22px] bg-[var(--card-soft)] p-4 lg:order-2">
          <div className="font-display text-3xl text-[var(--brand)] sm:text-4xl">{room.priceFrom[locale]}</div>
          <p className="mt-2 text-sm font-medium leading-5 text-[var(--ink-muted)]">{availabilityLine}</p>
          <div className="mt-3">
            <CtaButtons bookingHref={`/booking?room=${room.slug}`} locale={locale} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--ink-soft)]">{room.capacity[locale]}</span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--ink-soft)]">{room.bed[locale]}</span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--ink-soft)]">{room.size[locale]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

