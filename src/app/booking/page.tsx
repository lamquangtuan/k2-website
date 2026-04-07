import type { Metadata } from "next";
import { BookingRequestForm } from "@/components/booking-request-form";
import { CtaButtons } from "@/components/cta-buttons";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale, uiCopy } from "@/lib/i18n";
import { buildCanonicalUrl } from "@/lib/site-config";

type SearchParams = Promise<{ room?: string; lang?: string }>;

export const metadata: Metadata = {
  title: "Đặt phòng",
  description: "Gửi yêu cầu đặt phòng trực tiếp cho K2 Homestay qua form, điện thoại hoặc Zalo.",
  alternates: {
    canonical: buildCanonicalUrl("/booking"),
  },
};

export default async function BookingPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const locale = getLocale(params.lang);
  const copy = uiCopy[locale];
  const pageCopy = {
    vi: {
      eyebrow: "Đặt phòng trực tiếp",
      heading: "Chọn ngày ở và gửi form nhanh",
      subtext: "Gọi, nhắn Zalo hoặc điền form để K2 phản hồi sớm.",
      why: "Vì sao nên đặt trực tiếp",
      bullets: [
        "Biết nhanh phòng còn trống.",
        "Dễ trao đổi đúng số khách và nhu cầu.",
        "Gọi hoặc Zalo để xác nhận nhanh.",
      ],
    },
    en: {
      eyebrow: "Direct booking",
      heading: "Pick your dates and send the form quickly",
      subtext: "Call, message on Zalo or send the form for a quick reply from K2.",
      why: "Why book direct",
      bullets: [
        "Check room availability faster.",
        "Share your guest count and needs clearly.",
        "Call or use Zalo for a quick confirmation.",
      ],
    },
  } as const;
  const text = pageCopy[locale];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]">
      <SiteHeader locale={locale} currentPath="/booking" />
      <main className="px-4 pb-24 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-4 sm:space-y-5">
          <section className="rounded-[24px] border border-[var(--line)] bg-[var(--hero-surface)] p-4 shadow-[0_18px_50px_rgba(37,26,16,0.08)] sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">{text.eyebrow}</p>
                <h1 className="mt-1 font-display text-xl sm:text-3xl">{text.heading}</h1>
                <p className="mt-2 text-sm leading-5 text-[var(--ink-muted)] sm:leading-6">{text.subtext}</p>
                <div className="mt-3">
                  <CtaButtons locale={locale} />
                </div>
              </div>
              <BookingRequestForm
                sourcePage="booking"
                defaultRoomSlug={params.room}
                locale={locale}
                commitmentText={copy.bookingForm.compactCommitment}
              />
            </div>
          </section>
          <section className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm sm:p-5">
            <h2 className="font-display text-lg sm:text-2xl">{text.why}</h2>
            <ul className="mt-3 grid gap-2 text-sm leading-5 text-[var(--ink-muted)] md:grid-cols-3">
              {text.bullets.map((item) => (
                <li key={item} className="rounded-[16px] bg-[var(--card-soft)] px-3.5 py-2.5">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter locale={locale} />
      <MobileStickyActions locale={locale} />
    </div>
  );
}
