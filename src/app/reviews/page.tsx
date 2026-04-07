import type { Metadata } from "next";
import { HomeReviews } from "@/components/home-reviews";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/i18n";
import { buildCanonicalUrl } from "@/lib/site-config";

type SearchParams = Promise<{ lang?: string }>;

export const metadata: Metadata = {
  title: "Đánh giá từ khách",
  description: "Một số phản hồi thực tế từ khách đã ở tại K2 Homestay.",
  alternates: {
    canonical: buildCanonicalUrl("/reviews"),
  },
};

export default async function ReviewsPage({ searchParams }: { searchParams?: SearchParams }) {
  const locale = getLocale((await searchParams)?.lang);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]">
      <SiteHeader locale={locale} currentPath="/reviews" />
      <main className="px-4 pb-24 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <HomeReviews locale={locale} showMoreLink={false} />
        </div>
      </main>
      <SiteFooter locale={locale} />
      <MobileStickyActions locale={locale} />
    </div>
  );
}
