import type { Metadata } from "next";
import { CtaButtons } from "@/components/cta-buttons";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { RoomCard } from "@/components/room-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { roomTypes } from "@/lib/k2-content";
import { getLocale, uiCopy } from "@/lib/i18n";
import { buildCanonicalUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Danh sách phòng",
  description: "Xem nhanh 3 loại phòng tại K2 Homestay để chọn đúng nhu cầu và đặt trực tiếp.",
  alternates: {
    canonical: buildCanonicalUrl("/rooms"),
  },
};

export default async function RoomsPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const locale = getLocale((await searchParams)?.lang);
  const copy = uiCopy[locale];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]">
      <SiteHeader locale={locale} currentPath="/rooms" />
      <main className="px-4 pb-24 pt-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[24px] border border-[var(--line)] bg-[var(--hero-surface)] p-4 shadow-[0_18px_50px_rgba(37,26,16,0.08)] sm:p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">{copy.rooms.title}</p>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl">{copy.rooms.heading}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ink-muted)]">{copy.rooms.subtitle}</p>
            <div className="mt-4">
              <CtaButtons locale={locale} />
            </div>
          </section>

          <section className="mt-5 grid gap-3 lg:grid-cols-3">
            {roomTypes.map((room) => (
              <RoomCard key={room.slug} room={room} locale={locale} />
            ))}
          </section>
        </div>
      </main>
      <SiteFooter locale={locale} />
      <MobileStickyActions locale={locale} />
    </div>
  );
}
