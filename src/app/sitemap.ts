import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://k2homestay.com",
      lastModified: new Date(),
    },
    {
      url: "https://k2homestay.com/#rooms",
      lastModified: new Date(),
    },
    {
      url: "https://k2homestay.com/#contact",
      lastModified: new Date(),
    },
  ];
}
