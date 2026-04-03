export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  readTime: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "homestay-can-tho-gan-ninh-kieu",
    title: "Homestay Cần Thơ gần Ninh Kiều: chọn K2 Homestay khi muốn ở trung tâm, giá dễ chịu",
    description:
      "Gợi ý nhanh cho khách muốn ở gần Ninh Kiều, dễ đi ăn uống, đi chơi và đặt phòng trực tiếp qua Zalo.",
    seoTitle: "Homestay Cần Thơ gần Ninh Kiều – giá từ 120k | K2 Homestay",
    seoDescription:
      "Ở trung tâm Ninh Kiều, giá từ 120k. 3 loại phòng dễ chọn. Nhắn Zalo giữ phòng nhanh.",
    image: "/images/gallery/lobby-1.jpg",
    imageAlt: "Không gian K2 Homestay gần trung tâm Ninh Kiều Cần Thơ",
    publishedAt: "2026-04-03",
    readTime: "4 phút đọc",
    content: [
      "Nếu bạn ưu tiên vị trí dễ đi lại ở Cần Thơ, khu Ninh Kiều là lựa chọn tiện nhất cho lịch ăn uống, dạo bến và di chuyển trong thành phố.",
      "K2 Homestay phù hợp khi bạn muốn phòng gọn, giá rõ ràng, có lựa chọn phòng đơn, phòng gia đình và dorm giường tầng cho nhóm nhỏ.",
      "Bạn có thể xem nhanh loại phòng trên website, sau đó nhắn Zalo để K2 kiểm tra phòng trống và giữ phòng theo đúng ngày đến - ngày đi.",
    ],
  },
  {
    slug: "o-can-tho-nen-chon-loai-phong-nao",
    title: "Ở Cần Thơ nên chọn phòng đơn, phòng gia đình hay dorm giường tầng?",
    description:
      "So sánh nhanh 3 loại phòng tại K2 Homestay để chọn đúng nhu cầu cho cặp đôi, gia đình hoặc nhóm nhỏ.",
    seoTitle: "Homestay Cần Thơ Ninh Kiều: chọn phòng đơn, gia đình hay dorm từ 120k | K2 Homestay",
    seoDescription:
      "So sánh 3 loại phòng ở trung tâm Ninh Kiều, giá từ 120k. Nhắn Zalo để K2 tư vấn và giữ phòng nhanh.",
    image: "/images/rooms/room-family-1.jpg",
    imageAlt: "Phòng gia đình K2 Homestay Cần Thơ",
    publishedAt: "2026-04-03",
    readTime: "5 phút đọc",
    content: [
      "Phòng đơn phù hợp 1-2 khách cần không gian riêng, muốn nghỉ ngắn ngày và ưu tiên sự gọn gàng.",
      "Phòng gia đình hợp với 3-4 khách muốn ở chung một phòng, thoải mái hơn khi đi cùng người thân hoặc nhóm bạn.",
      "Phòng dorm giường tầng là lựa chọn tiết kiệm hơn, phù hợp khách đi một mình hoặc nhóm nhỏ chỉ cần chỗ ngủ sạch, dễ ở và giá tốt.",
    ],
  },
  {
    slug: "kinh-nghiem-chon-homestay-trung-tam-ninh-kieu",
    title: "Kinh nghiệm chọn homestay trung tâm Ninh Kiều để dễ đi chơi và đặt phòng nhanh",
    description:
      "3 điểm nên kiểm tra trước khi chọn homestay ở trung tâm Ninh Kiều: vị trí, loại phòng, giá và cách liên hệ nhanh.",
    seoTitle: "Kinh nghiệm chọn homestay Cần Thơ trung tâm Ninh Kiều, giá từ 120k | K2 Homestay",
    seoDescription:
      "Cách chọn homestay Cần Thơ gần Ninh Kiều, giá từ 120k, có phòng đơn, gia đình và dorm. Nhắn Zalo để giữ phòng nhanh.",
    image: "/images/gallery/hallway-1.jpg",
    imageAlt: "Hành lang K2 Homestay trung tâm Ninh Kiều",
    publishedAt: "2026-04-03",
    readTime: "4 phút đọc",
    content: [
      "Hãy ưu tiên nơi ở có địa chỉ dễ tìm, gần khu trung tâm và thuận tiện di chuyển nếu bạn chỉ ở Cần Thơ 1-2 đêm.",
      "Xem ảnh thật, giá từ từng loại phòng và tiện nghi chính trước khi đặt để tránh mất thời gian hỏi lại quá nhiều.",
      "Nếu lịch đi đã rõ, cách nhanh nhất vẫn là nhắn Zalo hoặc gọi trực tiếp để K2 kiểm tra phòng trống và phản hồi ngay.",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
