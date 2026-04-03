import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogInlineZaloCta } from "@/components/blog-inline-zalo-cta";
import { BlogStickyActions } from "@/components/blog-sticky-actions";
import { HomeHeroActions } from "@/components/home-hero-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-data";
import { getLocale, withLang } from "@/lib/i18n";
import { buildBlogPostMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
};

const midCtaCopy = {
  vi: "Nhắn Zalo để giữ phòng nhanh tại K2 Homestay",
  en: "Message K2 on Zalo to hold your room quickly",
} as const;

const midCtaNote = {
  vi: "Cuối tuần thường hết phòng sớm.",
  en: "Weekend dates often fill up early.",
} as const;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Không tìm thấy bài viết" };
  }

  return buildBlogPostMetadata(post);
}

export default async function BlogDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const locale = getLocale((await searchParams)?.lang);
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]">
      <SiteHeader locale={locale} currentPath={`/blog/${post.slug}`} />

      <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--surface)] shadow-sm">
          <div className="relative min-h-[220px] sm:min-h-[360px]">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 768px) 896px, 100vw" className="object-cover" />
          </div>

          <div className="p-5 sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
              {post.readTime} · {post.publishedAt}
            </div>
            <h1 className="mt-3 font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">{post.title}</h1>
            <p className="mt-3 text-base leading-7 text-[var(--ink-muted)]">{post.description}</p>

            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
              <p>
                {locale === "vi" ? "Xem thêm phòng tại " : "See more rooms on "}
                <Link href={withLang("/", locale)} className="font-semibold text-[var(--brand)]">
                  K2 Homestay
                </Link>{" "}
                {locale === "vi" ? "và " : "and "}
                <Link href={withLang("/#rooms", locale)} className="font-semibold text-[var(--brand)]">
                  {locale === "vi" ? "danh sách phòng" : "room section"}
                </Link>
                .
              </p>

              {post.content.map((paragraph, index) => (
                <div key={paragraph}>
                  <p>{paragraph}</p>
                  {index === 0 ? (
                    <div className="mt-4 rounded-[24px] bg-[var(--hero-surface)] p-4 text-sm font-semibold text-[var(--ink-strong)] sm:p-5">
                      <p>{midCtaCopy[locale]}</p>
                      <p className="mt-1 text-sm font-medium text-[var(--ink-muted)]">{midCtaNote[locale]}</p>
                      <div className="mt-3">
                        <BlogInlineZaloCta>{locale === "vi" ? "Nhắn Zalo" : "Chat on Zalo"}</BlogInlineZaloCta>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] bg-[var(--hero-surface)] p-5">
              <h2 className="font-display text-3xl tracking-[-0.04em]">
                {locale === "vi" ? "Giữ phòng nhanh tại K2 Homestay" : "Hold your room quickly at K2 Homestay"}
              </h2>
              <div className="mt-4">
                <HomeHeroActions locale={locale} />
              </div>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter locale={locale} />
      <BlogStickyActions locale={locale} />
    </div>
  );
}
