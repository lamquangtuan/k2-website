"use server";

import type { BlogPost } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";

type SocialPostInput = {
  roomName?: string;
  priceText?: string;
  highlights?: string[];
};

export async function generatePostContent(input: SocialPostInput = {}) {
  return formatSocialPost(input);
}

export async function formatFacebookZaloPost(input: SocialPostInput = {}) {
  return formatSocialPost(input);
}

export async function generateBlogPostContent(article: BlogPost) {
  return [
    `✨ ${article.title}`,
    article.description,
    `Nhắn Zalo giữ phòng nhanh: ${siteConfig.zaloUrl}`,
    `${siteConfig.siteUrl}/blog/${article.slug}`,
  ].join("\n");
}

function formatSocialPost({
  roomName = "K2 Homestay",
  priceText = "Giá tốt tại trung tâm Ninh Kiều",
  highlights = [],
}: SocialPostInput) {
  const lines = [
    `✨ ${roomName} - ${priceText}`,
    "Gần trung tâm Ninh Kiều, dễ di chuyển, phản hồi nhanh qua Zalo.",
    ...highlights,
    `Nhắn Zalo giữ phòng nhanh: ${siteConfig.zaloUrl}`,
  ];

  return lines.filter(Boolean).join("\n");
}
