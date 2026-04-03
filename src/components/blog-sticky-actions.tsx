"use client";

import { trackEvent } from "@/lib/analytics";
import { uiCopy, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export function BlogStickyActions({ locale = "vi" }: { locale?: Locale }) {
  const copy = uiCopy[locale].cta;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-white/95 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-10px_30px_rgba(38,27,17,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
        <a
          href={siteConfig.zaloUrl}
          onClick={() => trackEvent("click_zalo")}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand)] px-4 text-sm font-semibold text-white shadow-[0_12px_22px_rgba(181,95,46,0.22)]"
        >
          {copy.zalo}
        </a>
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          onClick={() => trackEvent("click_call")}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--ink-strong)] bg-white px-4 text-sm font-semibold text-[var(--ink-strong)]"
        >
          {copy.call}
        </a>
      </div>
    </div>
  );
}
