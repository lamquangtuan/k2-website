import type { Metadata } from "next";
import { CtaButtons } from "@/components/cta-buttons";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/i18n";
import { buildCanonicalUrl } from "@/lib/site-config";
import { offers } from "@/lib/site-data";

type SearchParams = Promise<{ lang?: string }>;

const copy = {
  vi: {
    eyebrow: "Ưu đãi",
    heading: "Một số lựa chọn phù hợp khi đặt trực tiếp",
    subtext: "Xem nhanh các lựa chọn phù hợp rồi liên hệ trực tiếp để kiểm tra phòng.",
    badge: "Ưu đãi",
  },
  en: {
    eyebrow: "Offers",
    heading: "A few direct booking options",
    subtext: "See the options quickly, then contact K2 to check room availability.",
    badge: "Offer",
  },
} as const;

export const metadata: Metadata = {
  title: "Ưu đãi",
  description: "Một số ưu đãi dành cho khách đặt trực tiếp tại K2 Homestay.",
  alternates: {
    canonical: buildCanonicalUrl("/offers"),
  },
};

export default async function OffersPage({ searchParams }: { searchParams?: SearchParams }) {
  const locale = getLocale((await searchParams)?.lang);
  const text = copy[locale];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]">
      <SiteHeader locale={locale} currentPath="/offers" />
      <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[36px] border border-[var(--line)] bg-[var(--hero-surface)] p-6 shadow-[0_24px_80px_rgba(37,26,16,0.08)] sm:p-8">
            <SectionHeading eyebrow={text.eyebrow} title={text.heading} description={text.subtext} />
            <div className="mt-6">
              <CtaButtons locale={locale} />
            </div>
          </section>
          <section className="mt-8 grid gap-5">
            {offers.map((offer) => (
              <article key={offer.slug} className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">{text.badge}</div>
                <h2 className="mt-2 font-display text-4xl">{offer.title}</h2>
                <p className="mt-3 text-base leading-7 text-[var(--ink-muted)]">{offer.teaser}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">{offer.detail}</p>
                <div className="mt-6">
                  <CtaButtons locale={locale} />
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
      <SiteFooter locale={locale} />
      <MobileStickyActions locale={locale} />
    </div>
  );
}
