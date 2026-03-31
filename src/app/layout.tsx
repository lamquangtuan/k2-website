import type { Metadata } from "next";
import { siteMedia } from "@/lib/media-data";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "K2 Homestay Cần Thơ – Phòng đẹp, giá tốt, trung tâm",
    template: "%s | K2 Homestay",
  },
  description: "K2 Homestay Cần Thơ – phòng đơn, phòng gia đình, dorm sạch đẹp, gần trung tâm, giá tốt.",
  openGraph: {
    title: "K2 Homestay Cần Thơ – Phòng đẹp, giá tốt, trung tâm",
    description: "K2 Homestay Cần Thơ – phòng đơn, phòng gia đình, dorm sạch đẹp, gần trung tâm, giá tốt.",
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
    title: "K2 Homestay Cần Thơ – Phòng đẹp, giá tốt, trung tâm",
    description: "K2 Homestay Cần Thơ – phòng đơn, phòng gia đình, dorm sạch đẹp, gần trung tâm, giá tốt.",
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
      <body>{children}</body>
    </html>
  );
}
