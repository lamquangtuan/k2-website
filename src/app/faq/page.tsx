import type { Metadata } from "next";
import { CtaButtons } from "@/components/cta-buttons";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/i18n";
import { fullFaqs } from "@/lib/site-data";

type SearchParams = Promise<{ lang?: string }>;
const copy = { vi: { eyebrow: "FAQ", heading: "M\u1ed9t s\u1ed1 c\u00e2u h\u1ecfi th\u01b0\u1eddng g\u1eb7p", subtext: "Xem nhanh tr\u01b0\u1edbc khi li\u00ean h\u1ec7 \u0111\u1ec3 \u0111\u1eb7t ph\u00f2ng." }, en: { eyebrow: "FAQ", heading: "A few common questions", subtext: "See the basics quickly before you contact K2." } } as const;
export const metadata: Metadata = { title: "FAQ", description: "Gi\u1ea3i \u0111\u00e1p nhanh m\u1ed9t s\u1ed1 c\u00e2u h\u1ecfi ph\u1ed5 bi\u1ebfn tr\u01b0\u1edbc khi \u0111\u1eb7t ph\u00f2ng t\u1ea1i K2 Homestay." };
export default async function FaqPage({ searchParams }: { searchParams?: SearchParams }) { const locale = getLocale((await searchParams)?.lang); const text = copy[locale]; return <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]"><SiteHeader locale={locale} currentPath="/faq" /><main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><section className="rounded-[36px] border border-[var(--line)] bg-[var(--hero-surface)] p-6 shadow-[0_24px_80px_rgba(37,26,16,0.08)] sm:p-8"><SectionHeading eyebrow={text.eyebrow} title={text.heading} description={text.subtext} /><div className="mt-6"><CtaButtons locale={locale} /></div></section><section className="mt-8 grid gap-3">{fullFaqs.map((item)=><details key={item.question} className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm"><summary className="cursor-pointer list-none text-lg font-semibold">{item.question}</summary><p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">{item.answer}</p></details>)}</section></div></main><SiteFooter locale={locale} /><MobileStickyActions locale={locale} /></div>; }