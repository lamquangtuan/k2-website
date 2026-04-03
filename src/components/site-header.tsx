"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { uiCopy, withLang, type Locale } from "@/lib/i18n";
import { siteMedia } from "@/lib/media-data";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader({ locale = "vi", currentPath = "/" }: { locale?: Locale; currentPath?: string }) {
  const copy = uiCopy[locale];

  return (
    <header className="sticky top-0 z-40 px-3 pt-1.5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-[var(--line)] bg-white/95 px-3 py-1 shadow-sm backdrop-blur sm:gap-3 sm:px-5 sm:py-2">
        <Link href={withLang("/", locale)} className="flex min-w-0 items-center gap-2">
          <div className="relative h-[26px] w-[26px] overflow-hidden rounded-full border border-[var(--line)] bg-white sm:h-9 sm:w-9">
            <Image src={siteMedia.logo.src} alt={siteMedia.logo.alt} fill sizes="36px" className="object-contain p-1" />
          </div>
          <div className="min-w-0">
            <div className="hidden truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)] sm:block sm:text-[11px]">
              Ninh Kiều · Cần Thơ
            </div>
            <div className="truncate font-display text-[15px] leading-none sm:text-lg">{siteConfig.name}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          <Link href={withLang("/rooms", locale)} className="text-sm font-semibold text-[var(--ink-muted)] transition hover:text-[var(--ink-strong)]">
            {copy.nav.rooms}
          </Link>
          <Link href={`/?lang=${locale}#reviews`} className="text-sm font-semibold text-[var(--ink-muted)] transition hover:text-[var(--ink-strong)]">
            {copy.nav.reviews}
          </Link>
          <Link href={withLang("/contact", locale)} className="text-sm font-semibold text-[var(--ink-muted)] transition hover:text-[var(--ink-strong)]">
            {copy.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--ink-soft)] sm:gap-2 sm:text-xs">
            <Link href={withLang(currentPath, "vi")} className={locale === "vi" ? "text-[var(--ink-strong)]" : ""}>
              VI
            </Link>
            <span>|</span>
            <Link href={withLang(currentPath, "en")} className={locale === "en" ? "text-[var(--ink-strong)]" : ""}>
              EN
            </Link>
          </div>

          <a
            href={`tel:${siteConfig.phoneRaw}`}
            onClick={() => trackEvent("click_call")}
            className="hidden text-sm font-semibold text-[var(--ink-muted)] sm:block"
          >
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            onClick={() => trackEvent("click_call")}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--ink-strong)] px-3 py-1 text-sm font-semibold text-white sm:px-4 sm:py-2"
            aria-label={locale === "vi" ? "Gọi ngay" : "Call now"}
          >
            <span className="whitespace-nowrap text-white">{copy.cta.callShort}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
