import type { Metadata } from "next";
import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale, withLang } from "@/lib/i18n";
import { blogPosts } from "@/lib/site-data";

type SearchParams = Promise<{ lang?: string }>;
const copy = { vi: { eyebrow: "Blog", heading: "Gợi ý ngắn cho chuyến đi Cần Thơ", subtext: "Một số bài viết ngắn giúp bạn chọn phòng và lịch trình nhanh hơn.", readMore: "Đọc bài viết" }, en: { eyebrow: "Blog", heading: "Short guides for your Can Tho stay", subtext: "A few quick reads to help you choose a room and plan your trip.", readMore: "Read article" } } as const;
export const metadata: Metadata = { title: "Blog", description: "Bài viết ngắn về chọn phòng và lịch trình ở Cần Thơ." };
export default async function BlogPage({ searchParams }: { searchParams?: SearchParams }) { const locale = getLocale((await searchParams)?.lang); const text = copy[locale]; return <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]"><SiteHeader locale={locale} currentPath="/blog" /><main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><section className="rounded-[36px] border border-[var(--line)] bg-[var(--hero-surface)] p-6 shadow-[0_24px_80px_rgba(37,26,16,0.08)] sm:p-8"><SectionHeading eyebrow={text.eyebrow} title={text.heading} description={text.subtext} /><div className="mt-6"><CtaButtons locale={locale} /></div></section><section className="mt-8 grid gap-5">{blogPosts.map((post) => (<article key={post.slug} className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm"><div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]"><span>{post.category}</span><span>{post.readTime}</span></div><h2 className="mt-3 font-display text-4xl">{post.title}</h2><p className="mt-3 text-base leading-7 text-[var(--ink-muted)]">{post.excerpt}</p><Link href={withLang(`/blog/${post.slug}`, locale)} className="mt-5 inline-flex text-sm font-semibold text-[var(--brand)]">{text.readMore}</Link></article>))}</section></div></main><SiteFooter locale={locale} /><MobileStickyActions locale={locale} /></div>; }