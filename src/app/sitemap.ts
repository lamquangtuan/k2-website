import type { MetadataRoute } from "next";

const baseUrl = "https://k2homestay.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
    },
  ];
}
