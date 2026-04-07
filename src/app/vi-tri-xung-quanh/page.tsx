import type { Metadata } from "next";
import { CtaButtons } from "@/components/cta-buttons";
import { MobileStickyActions } from "@/components/mobile-sticky-actions";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { k2SupportOptions, localGuideIntro, nearbyAttractions, suggestedItineraries } from "@/lib/local-guide-data";
import { buildCanonicalUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Vị trí xung quanh | K2 Homestay",
  description:
    "Khám phá các điểm gần K2 Homestay như Bến Ninh Kiều, Chợ đêm Ninh Kiều, Bảo tàng Cần Thơ, Khám Lớn Cần Thơ và Chợ nổi Cái Răng.",
  alternates: {
    canonical: buildCanonicalUrl("/vi-tri-xung-quanh"),
  },
};

export default function SurroundingsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-strong)]">
      <SiteHeader />
      <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[36px] border border-[var(--line)] bg-[var(--hero-surface)] p-6 shadow-[0_24px_80px_rgba(37,26,16,0.08)] sm:p-8">
            <SectionHeading eyebrow="Vị trí xung quanh" title={localGuideIntro.title} description={localGuideIntro.description} />
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--ink-muted)]">{localGuideIntro.travelNote}</p>
            <div className="mt-6">
              <CtaButtons />
            </div>
          </section>

          <section className="mt-8 rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="font-display text-4xl">Các điểm gần và dễ đi</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {nearbyAttractions.map((place) => (
                <article key={place.slug} className="rounded-[24px] bg-[var(--card-soft)] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{place.name}</h3>
                      <div className="mt-1 text-sm font-medium text-[var(--ink-soft)]">{place.category}</div>
                    </div>
                    <div className="text-sm font-semibold text-[var(--brand)]">{place.distanceLabel}</div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">{place.whyGo}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">{place.shortSell}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="font-display text-4xl">Gợi ý lịch trình</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {suggestedItineraries.map((plan) => (
                <article key={plan.slug} className="rounded-[24px] bg-[var(--card-soft)] p-5">
                  <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">{plan.timeLabel}</div>
                  <h3 className="mt-2 font-display text-3xl">{plan.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">{plan.summary}</p>
                  <div className="mt-4 grid gap-3">
                    {plan.steps.map((step, index) => (
                      <div key={step} className="rounded-[18px] bg-white/70 p-4 text-sm leading-7 text-[var(--ink-muted)]">
                        <span className="font-semibold text-[var(--ink-strong)]">Bước {index + 1}:</span> {step}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="font-display text-4xl">K2 có thể hỗ trợ gì</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {k2SupportOptions.map((item) => (
                <article key={item.title} className="rounded-[24px] bg-[var(--card-soft)] p-5">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="font-display text-4xl">Từ K2 nên đi đâu trước</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[24px] bg-[var(--card-soft)] p-5 text-sm leading-7 text-[var(--ink-muted)]">
                <p>
                  Nếu bạn mới tới Cần Thơ vào đầu giờ chiều hoặc cuối chiều, Bến Ninh Kiều và Chợ đêm Ninh Kiều là hai điểm dễ đi
                  nhất trong ngày đầu tiên. Đây là lựa chọn phù hợp cho khách ở ngắn ngày và muốn bắt đầu lịch trình nhẹ, gần trung tâm.
                </p>
                <p className="mt-4">
                  Nếu ở qua đêm và muốn có thêm một trải nghiệm đặc trưng, chợ nổi Cái Răng là hoạt động buổi sáng đáng cân nhắc nhất.
                  K2 có thể gợi ý lộ trình phù hợp theo thời gian bạn lưu trú thực tế.
                </p>
              </div>
              <div className="rounded-[24px] bg-[var(--card-soft)] p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">Địa chỉ lưu trú</div>
                <div className="mt-3 text-xl font-semibold">{siteConfig.name}</div>
                <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">{siteConfig.address}</p>
                <a href={siteConfig.mapsUrl} className="mt-4 inline-flex text-sm font-semibold text-[var(--brand)]" target="_blank" rel="noopener noreferrer">
                  Mở bản đồ
                </a>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[36px] border border-[var(--line)] bg-[var(--hero-surface)] p-6 shadow-[0_24px_80px_rgba(37,26,16,0.08)] sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">Liên hệ nhanh</p>
                <h2 className="mt-2 font-display text-4xl">Muốn ở gần các điểm này, bạn có thể liên hệ trực tiếp với K2</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">
                  Bạn có thể đặt phòng, gọi điện hoặc nhắn Zalo để K2 kiểm tra phòng và hỗ trợ lịch trình phù hợp.
                </p>
              </div>
              <div className="flex items-center">
                <CtaButtons />
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
      <MobileStickyActions />
    </div>
  );
}
