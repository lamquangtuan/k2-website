"use server";

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

function formatSocialPost({ roomName = "K2 Homestay", priceText = "Giá tốt tại trung tâm Ninh Kiều", highlights = [] }: SocialPostInput) {
  const lines = [
    `${roomName} - ${priceText}`,
    "Gần trung tâm Ninh Kiều, dễ di chuyển, phản hồi nhanh qua Zalo.",
    ...highlights,
    "Liên hệ K2 Homestay để giữ phòng nhanh.",
  ];

  return lines.filter(Boolean).join("\n");
}
