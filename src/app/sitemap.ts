import type { MetadataRoute } from "next";
import { roomTypes } from "@/lib/k2-content";
import { blogPosts } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/rooms", "/booking", "/contact", "/offers", "/reviews", "/faq", "/vi-tri-xung-quanh", "/blog"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...roomTypes.map((room) => ({
      url: `${siteConfig.siteUrl}/rooms/${room.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
