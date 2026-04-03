import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { blogPosts } from "@/lib/blog-data";
import { getLocale, withLang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type SearchParams = Promise<{ lang?: string }>;

const copy = {
  vi: {
    eyebrow: "Blog",
    heading: "Gợi ý nhanh cho chuyến đi Cần Thơ",
    subtext: "Đọc nhanh, chọn đúng loại phòng, rồi nhắn Zalo để giữ chỗ.",
    readMore: "Đọc bài viết",
  },
  en: {
    eyebrow: "Blog",
    heading: "Quick guides for your Can Tho stay",
    subtext: "Read fast, pick the right room, then message K2 on Zalo.",
    readMore: "Read article",
  },
} as const;

export const metadata: Metadata = {
  title: "Blog K2 Homestay Cần Thơ | Kinh nghiệm chọn phòng gần Ninh Kiều",
  description: "Bài viết ngắn về chọn homestay, chọn phòng và kinh nghiệm ở gần trung tâm Ninh Kiều, Cần Thơ.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/blog`,
  },
};

export default async function BlogPage({ searchParams }: { searchParams?: SearchParams }) {
  const locale = getLocale((await searchParams)?.lang);
  const text = copy[locale];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]">
      <SiteHeader locale={locale} currentPath="/blog" />

      <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[32px] border border-[var(--line)] bg-[var(--hero-surface)] p-5 shadow-[0_24px_80px_rgba(37,26,16,0.08)] sm:p-8">
            <SectionHeading eyebrow={text.eyebrow} title={text.heading} description={text.subtext} />
          </section>

          <section className="mt-5 grid gap-4 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)] shadow-sm"
              >
                <div className="relative min-h-[180px]">
                  <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">{post.readTime}</div>
                  <h2 className="mt-2 font-display text-2xl leading-tight text-[var(--ink-strong)]">{post.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{post.description}</p>
                  <Link
                    href={withLang(`/blog/${post.slug}`, locale)}
                    className="mt-4 inline-flex text-sm font-semibold text-[var(--brand)]"
                  >
                    {text.readMore}
                  </Link>
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
