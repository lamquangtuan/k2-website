import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { roomTypes } from "@/lib/k2-content";
import { siteConfig } from "@/lib/site-config";

const PUBLIC_ROUTES = [
  "",
  "/rooms",
  "/booking",
  "/contact",
  "/offers",
  "/reviews",
  "/faq",
  "/vi-tri-xung-quanh",
  "/location",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = PUBLIC_ROUTES.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified,
  }));

  const roomEntries = roomTypes.map((room) => ({
    url: `${siteConfig.siteUrl}/rooms/${room.slug}`,
    lastModified,
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: `${siteConfig.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticEntries, ...roomEntries, ...blogEntries];
}
