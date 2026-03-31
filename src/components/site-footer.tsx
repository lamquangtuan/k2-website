import Image from "next/image";
import { siteMedia } from "@/lib/media-data";
import { uiCopy, type Locale } from "@/lib/i18n";
import { getSiteAddress, siteConfig } from "@/lib/site-config";

const extraChannels = (locale: Locale) => [
  { label: uiCopy[locale].footer.telegram, href: siteConfig.telegramUrl },
  { label: uiCopy[locale].footer.whatsapp, href: siteConfig.whatsappUrl },
  { label: uiCopy[locale].footer.messenger, href: siteConfig.messengerUrl },
];

export function SiteFooter({ locale = "vi" }: { locale?: Locale }) {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
            <Image src={siteMedia.logo.src} alt={siteMedia.logo.alt} fill sizes="40px" className="object-contain p-1.5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">{siteConfig.name}</p>
            <p className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">{getSiteAddress(locale)}</p>
          </div>
        </div>

        <div className="grid gap-1.5 text-sm leading-6 text-[var(--ink-muted)] sm:text-right">
          <a href={`tel:${siteConfig.phoneRaw}`} className="font-semibold text-[var(--brand)]">
            {siteConfig.phoneDisplay}
          </a>
          <a href={siteConfig.zaloUrl} className="font-semibold text-[var(--brand)]" target="_blank" rel="noopener noreferrer">
            Zalo
          </a>
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-[var(--brand)]">
            {siteConfig.email}
          </a>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {extraChannels(locale).map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-muted)]"
              >
                {channel.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
