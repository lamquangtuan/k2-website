import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.siteUrl}/#rooms`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.siteUrl}/#contact`,
      lastModified: new Date(),
    },
  ];
}
