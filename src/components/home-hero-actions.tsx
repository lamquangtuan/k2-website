"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { uiCopy, withLang, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export function HomeHeroActions({ locale = "vi" }: { locale?: Locale }) {
  const copy = uiCopy[locale].cta;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <a
        href={siteConfig.zaloUrl}
        onClick={() => trackEvent("click_zalo")}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(181,95,46,0.28)]"
      >
        {copy.zalo}
      </a>
      <a
        href={`tel:${siteConfig.phoneRaw}`}
        onClick={() => trackEvent("click_call")}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--ink-strong)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--ink-strong)]"
      >
        {copy.call}
      </a>
      <Link
        href={withLang("/rooms", locale)}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card-soft)] px-5 py-2.5 text-sm font-semibold text-[var(--ink-strong)]"
      >
        {copy.viewRoom}
      </Link>
    </div>
  );
}
