import type { Metadata } from "next";
import { HomeReviews } from "@/components/home-reviews";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/i18n";

type SearchParams = Promise<{ lang?: string }>;
export const metadata: Metadata = { title: "\u0110\u00e1nh gi\u00e1 t\u1eeb kh\u00e1ch", description: "M\u1ed9t s\u1ed1 ph\u1ea3n h\u1ed3i th\u1ef1c t\u1ebf t\u1eeb kh\u00e1ch \u0111\u00e3 \u1edf t\u1ea1i K2 Homestay." };
export default async function ReviewsPage({ searchParams }: { searchParams?: SearchParams }) { const locale = getLocale((await searchParams)?.lang); return <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]"><SiteHeader locale={locale} currentPath="/reviews" /><main className="px-4 pb-24 pt-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><HomeReviews locale={locale} showMoreLink={false} /></div></main><SiteFooter locale={locale} /><MobileStickyActions locale={locale} /></div>; }