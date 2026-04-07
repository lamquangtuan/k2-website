import type { Metadata } from "next";
import { BookingRequestForm } from "@/components/booking-request-form";
import { CtaButtons } from "@/components/cta-buttons";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/i18n";
import { buildCanonicalUrl, siteConfig } from "@/lib/site-config";

type SearchParams = Promise<{ lang?: string }>;

const copy = {
  vi: {
    eyebrow: "Liên hệ",
    heading: "Chọn kênh liên hệ phù hợp",
    subtext: "Gọi, nhắn Zalo hoặc điền form để K2 phản hồi sớm.",
    infoTitle: "Thông tin liên hệ",
    phone: "Điện thoại",
    zalo: "Zalo",
    address: "Địa chỉ",
    zaloText: "Phù hợp khi bạn muốn hỏi phòng nhanh trước khi đặt.",
    quickTitle: "Khi nào nên gọi ngay",
    quickItems: [
      "Khi cần hỏi phòng còn trống trong ngày.",
      "Khi đi theo nhóm nhỏ hoặc gia đình và muốn chọn nhanh loại phòng phù hợp.",
      "Khi cần trao đổi thêm về giờ đến hoặc nhu cầu đặc biệt.",
    ],
  },
  en: {
    eyebrow: "Contact",
    heading: "Choose the easiest contact channel",
    subtext: "Call, message on Zalo or send the form for a quick reply from K2.",
    infoTitle: "Contact details",
    phone: "Phone",
    zalo: "Zalo",
    address: "Address",
    zaloText: "Best when you want a quick room check before booking.",
    quickTitle: "When to call directly",
    quickItems: [
      "When you need a room check for today.",
      "When you travel with family or a small group and want the right room fast.",
      "When you need to confirm arrival time or a special request.",
    ],
  },
} as const;

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ K2 Homestay qua điện thoại, Zalo hoặc form đặt phòng.",
  alternates: {
    canonical: buildCanonicalUrl("/contact"),
  },
};

export default async function ContactPage({ searchParams }: { searchParams?: SearchParams }) {
  const locale = getLocale((await searchParams)?.lang);
  const text = copy[locale];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]">
      <SiteHeader locale={locale} currentPath="/contact" />
      <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[36px] border border-[var(--line)] bg-[var(--hero-surface)] p-6 shadow-[0_24px_80px_rgba(37,26,16,0.08)] sm:p-8">
            <SectionHeading eyebrow={text.eyebrow} title={text.heading} description={text.subtext} />
            <div className="mt-6">
              <CtaButtons locale={locale} />
            </div>
          </section>
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-6">
              <section className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
                <h2 className="font-display text-4xl">{text.infoTitle}</h2>
                <div className="mt-5 grid gap-3 text-sm text-[var(--ink-muted)]">
                  <div className="rounded-[24px] bg-[var(--card-soft)] p-5">
                    <div className="font-semibold text-[var(--ink-strong)]">{text.phone}</div>
                    <div className="mt-1">{siteConfig.phoneDisplay}</div>
                  </div>
                  <div className="rounded-[24px] bg-[var(--card-soft)] p-5">
                    <div className="font-semibold text-[var(--ink-strong)]">{text.zalo}</div>
                    <div className="mt-1">{text.zaloText}</div>
                  </div>
                  <div className="rounded-[24px] bg-[var(--card-soft)] p-5">
                    <div className="font-semibold text-[var(--ink-strong)]">{text.address}</div>
                    <div className="mt-1">{locale === "en" ? siteConfig.addressEn : siteConfig.address}</div>
                  </div>
                </div>
              </section>
              <section className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
                <h2 className="font-display text-4xl">{text.quickTitle}</h2>
                <ul className="mt-5 grid gap-3 text-sm leading-7 text-[var(--ink-muted)]">
                  {text.quickItems.map((item) => (
                    <li key={item} className="list-disc pl-5 marker:text-[var(--ink-soft)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <div id="booking-form">
              <BookingRequestForm sourcePage="contact" locale={locale} />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter locale={locale} />
      <MobileStickyActions locale={locale} />
    </div>
  );
}
