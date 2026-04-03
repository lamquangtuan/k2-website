"use client";

import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

export function BlogInlineZaloCta({ children }: { children: string }) {
  return (
    <a
      href={siteConfig.zaloUrl}
      onClick={() => trackEvent("click_zalo")}
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand)] px-5 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(181,95,46,0.28)]"
    >
      {children}
    </a>
  );
}
