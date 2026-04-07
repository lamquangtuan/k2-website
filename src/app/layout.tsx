import type { Metadata } from "next";
import Script from "next/script";
import { siteMedia } from "@/lib/media-data";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID;
const title = "K2 Homestay Cần Thơ | Trung tâm Ninh Kiều | Giá từ 120k";
const description =
  "Homestay tại trung tâm Ninh Kiều, Cần Thơ. Dorm từ 120k, phòng riêng từ 300k. Đặt nhanh qua Zalo hoặc gọi trực tiếp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  title: {
    default: title,
    template: "%s | K2 Homestay",
  },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "vi_VN",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.siteUrl}${siteMedia.heroFrontAlt.src}`,
        width: 1200,
        height: 630,
        alt: "K2 Homestay Cần Thơ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteConfig.siteUrl}${siteMedia.heroFrontAlt.src}`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
