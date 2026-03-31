"use client";

import { useState } from "react";
import { ImageLightbox } from "@/components/image-lightbox";
import { SafeImage } from "@/components/safe-image";
import { reviewImages } from "@/lib/media-data";
import { homepageReviews } from "@/lib/k2-content";
import { uiCopy, type Locale } from "@/lib/i18n";

export function HomeReviews({ locale = "vi", showMoreLink = true }: { locale?: Locale; showMoreLink?: boolean }) {
  const copy = uiCopy[locale].home;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="reviews" className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">{copy.reviewsTitle}</p>
          <h2 className="mt-1 font-display text-xl sm:text-3xl">{copy.reviewsHeading}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-[var(--ink-muted)]">{copy.reviewsSubtext}</p>
          {showMoreLink ? (
            <button type="button" onClick={() => setActiveIndex(0)} className="mt-2 inline-flex whitespace-nowrap text-sm font-semibold text-[var(--brand)] sm:hidden">
              {copy.reviewsMore} â†’
            </button>
          ) : null}
        </div>
        {showMoreLink ? (
          <button type="button" onClick={() => setActiveIndex(0)} className="hidden whitespace-nowrap text-sm font-semibold text-[var(--brand)] sm:inline-flex">
            {copy.reviewsMore} â†’
          </button>
        ) : null}
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {homepageReviews.slice(0, 6).map((review, index) => (
          <article key={`${review.lang}-${index}`} className="rounded-[18px] bg-[var(--card-soft)] p-3 sm:p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">{review.lang}</div>
            <p className="mt-2 text-sm leading-5 text-[var(--ink-strong)] sm:leading-6">{review.quote}</p>
            <p className="mt-1.5 text-xs font-semibold text-[var(--ink-soft)]">{review.author}</p>
          </article>
        ))}
      </div>

      <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">{copy.reviewsPlatformLabel}</div>

      <div className="mt-2 flex gap-2.5 overflow-x-auto pb-1.5 sm:mt-3 sm:gap-3 sm:pb-2">
        {reviewImages.slice(0, 6).map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative min-h-[88px] min-w-[118px] overflow-hidden rounded-[14px] border border-[var(--line)] bg-white text-left sm:min-h-[150px] sm:min-w-[230px] sm:rounded-[16px]"
          >
            <SafeImage src={image.src} alt={image.alt} sizes="230px" className="object-cover object-top" fallbackLabel="Review" />
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <ImageLightbox
          images={reviewImages}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrev={() => setActiveIndex((current) => (current === null ? 0 : (current - 1 + reviewImages.length) % reviewImages.length))}
          onNext={() => setActiveIndex((current) => (current === null ? 0 : (current + 1) % reviewImages.length))}
        />
      ) : null}
    </section>
  );
}
