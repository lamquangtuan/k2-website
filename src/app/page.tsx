import type { Metadata } from "next";
import Image from "next/image";
import { BookingRequestForm } from "@/components/booking-request-form";
import { CtaButtons } from "@/components/cta-buttons";
import { HomeGallery } from "@/components/home-gallery";
import { HomeHeroActions } from "@/components/home-hero-actions";
import { HomeReviews } from "@/components/home-reviews";
import { HomeRoomList } from "@/components/home-room-list";
import { JsonLd } from "@/components/json-ld";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { homeHighlights } from "@/lib/k2-content";
import { getLocale, uiCopy } from "@/lib/i18n";
import { siteMedia } from "@/lib/media-data";
import { buildHomepageStructuredData } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const homeDescription =
  "Homestay tại trung tâm Ninh Kiều, Cần Thơ. Dorm từ 120k, phòng riêng từ 300k. Đặt nhanh qua Zalo hoặc gọi trực tiếp.";
const homeTitle = "K2 Homestay Cần Thơ | Trung tâm Ninh Kiều | Giá từ 120k";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: {
    canonical: `${siteConfig.siteUrl}/`,
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: `${siteConfig.siteUrl}/`,
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: `${siteConfig.siteUrl}${siteMedia.heroFrontAlt.src}`,
        width: 1200,
        height: 630,
        alt: "K2 Homestay Cần Thơ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [`${siteConfig.siteUrl}${siteMedia.heroFrontAlt.src}`],
  },
};

export default async function HomePage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const locale = getLocale((await searchParams)?.lang);
  const copy = uiCopy[locale];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]">
      <SiteHeader locale={locale} currentPath="/" />

      <main className="px-4 pb-24 pt-2 sm:px-6 lg:px-8 lg:pt-4">
        <JsonLd data={buildHomepageStructuredData()} />

        <div className="mx-auto max-w-7xl space-y-3.5 sm:space-y-6">
          <section className="grid gap-3 lg:grid-cols-[0.96fr_1.04fr] lg:gap-4">
            <div className="rounded-[24px] border border-[var(--line)] bg-[var(--hero-surface)] p-4 shadow-[0_18px_50px_rgba(37,26,16,0.08)] sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">{copy.home.eyebrow}</p>
              <h1 className="mt-1 max-w-3xl font-display text-[1.65rem] leading-[1.02] tracking-[-0.04em] sm:text-4xl lg:text-[2.9rem]">
                {copy.home.title}
              </h1>
              <p className="mt-2 max-w-xl whitespace-pre-line text-sm leading-5 text-[var(--ink-muted)] sm:text-base sm:leading-6">
                {copy.home.subtitle}
              </p>
              <div className="mt-2.5">
                <HomeHeroActions locale={locale} />
              </div>
            </div>

            <section className="relative overflow-hidden rounded-[24px] border border-[var(--line)] shadow-sm">
              <div className="relative min-h-[168px] sm:min-h-[260px] lg:min-h-[300px]">
                <Image
                  src={siteMedia.heroFront.src}
                  alt={siteMedia.heroFront.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,12,0.04),rgba(20,16,12,0.22))]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                <div className="rounded-[16px] bg-white/92 px-3 py-2 text-[13px] leading-5 text-[var(--ink-muted)] backdrop-blur sm:text-sm">
                  {copy.home.heroStat1}
                </div>
              </div>
            </section>
          </section>

          <HomeRoomList locale={locale} />

          <section className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm sm:p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">{copy.home.whyTitle}</p>
            <h2 className="mt-1 font-display text-xl sm:text-3xl">{copy.home.whyHeading}</h2>
            <div className="mt-3 grid gap-2.5 md:grid-cols-2 xl:grid-cols-4">
              {homeHighlights.map((highlight) => (
                <article key={highlight.title.vi} className="rounded-[18px] bg-[var(--card-soft)] p-3.5 sm:p-4">
                  <h3 className="text-[15px] font-semibold sm:text-base">{highlight.title[locale]}</h3>
                  <p className="mt-1 text-sm leading-5 text-[var(--ink-muted)]">{highlight.description[locale]}</p>
                </article>
              ))}
            </div>
          </section>

          <HomeGallery locale={locale} />
          <HomeReviews locale={locale} />

          <section id="booking-request" className="rounded-[24px] border border-[var(--line)] bg-[var(--hero-surface)] p-4 shadow-[0_18px_50px_rgba(37,26,16,0.08)] sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[0.88fr_1.12fr] lg:gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">{copy.home.bookingEyebrow}</p>
                <h2 className="mt-1 font-display text-xl sm:text-3xl">{copy.home.bookingHeading}</h2>
                <div className="mt-2.5">
                  <CtaButtons locale={locale} />
                </div>
              </div>

              <BookingRequestForm sourcePage="home" variant="compact" locale={locale} commitmentText={copy.home.bookingCommitment} />
            </div>
          </section>
        </div>
      </main>

      <SiteFooter locale={locale} />
      <MobileStickyActions locale={locale} />
    </div>
  );
}
