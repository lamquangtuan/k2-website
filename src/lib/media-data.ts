export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
  scale?: number;
  fit?: "cover" | "contain";
};

export type RoomMedia = {
  cardImage: ImageAsset;
  heroImage: ImageAsset;
  ogImage: ImageAsset;
  gallery: ImageAsset[];
};

const altTexts = {
  logo: "K2 Homestay Cần Thơ",
  hero: "mặt tiền K2 Homestay Cần Thơ gần trung tâm Ninh Kiều",
  facade: "mặt tiền K2 Homestay Cần Thơ",
  common: "không gian chung K2 Homestay Cần Thơ",
  single: "phòng đơn homestay K2 Cần Thơ",
  family: "phòng gia đình homestay K2 Cần Thơ",
  dorm: "phòng dorm homestay K2 Cần Thơ",
  review: "ảnh đánh giá thực tế của khách K2 Homestay",
  tour: "ảnh tour trong ngày tại Cần Thơ",
} as const;

function img(
  src: string,
  alt: string,
  width: number,
  height: number,
  options: Omit<ImageAsset, "src" | "alt" | "width" | "height"> = {},
): ImageAsset {
  return { src, alt, width, height, ...options };
}

export const siteMedia = {
  heroFront: img("/k2-media/hero-1.jpg", altTexts.hero, 1280, 1600, { position: "center 38%" }),
  heroFrontAlt: img("/k2-media/facade-1.jpg", altTexts.facade, 640, 960, { position: "center 34%" }),
  commonLounge: img("/images/gallery/lobby-1.jpg", altTexts.common, 1600, 900, { position: "center 18%", scale: 0.96 }),
  commonCorridor: img("/images/gallery/hallway-1.jpg", altTexts.common, 1600, 900, { position: "center 16%", scale: 0.95 }),
  commonArch: img("/images/gallery/staircase-1.jpg", altTexts.common, 1280, 1600, { position: "center 20%", scale: 0.96 }),
  logo: img("/logo-k2.jpg", altTexts.logo, 900, 900, { fit: "contain" }),
} as const;

const singleRoomGallery = [
  img("/images/rooms/room-single-1.jpg", altTexts.single, 1600, 900, { position: "center 40%", scale: 0.95 }),
  img("/images/rooms/room-single-2.jpg", altTexts.single, 1600, 900, { position: "center 42%", scale: 0.94 }),
  img("/images/rooms/room-single-3.jpg", altTexts.single, 1600, 900, { position: "center 40%", scale: 0.96 }),
];

const familyRoomGallery = [
  img("/images/rooms/room-family-1.jpg", altTexts.family, 1600, 900, { position: "center 42%", scale: 0.94 }),
  img("/images/rooms/room-family-2.jpg", altTexts.family, 1600, 900, { position: "center 40%", scale: 0.95 }),
  img("/images/rooms/room-family-3.jpg", altTexts.family, 1600, 900, { position: "center 40%", scale: 0.96 }),
];

const dormRoomGallery = [
  img("/images/rooms/room-dorm-1.jpg", altTexts.dorm, 1600, 900, { position: "center 40%", scale: 0.95 }),
  img("/images/rooms/room-dorm-2.jpg", altTexts.dorm, 1600, 900, { position: "center 40%", scale: 0.96 }),
  img("/images/rooms/room-dorm-3.jpg", altTexts.dorm, 1600, 900, { position: "center 38%", scale: 0.97 }),
];

export const roomMediaBySlug = {
  "phong-don": {
    cardImage: singleRoomGallery[0],
    heroImage: singleRoomGallery[0],
    ogImage: singleRoomGallery[0],
    gallery: singleRoomGallery,
  },
  "phong-gia-dinh": {
    cardImage: familyRoomGallery[0],
    heroImage: familyRoomGallery[0],
    ogImage: familyRoomGallery[0],
    gallery: familyRoomGallery,
  },
  "phong-dorm-giuong-tang": {
    cardImage: dormRoomGallery[0],
    heroImage: dormRoomGallery[0],
    ogImage: dormRoomGallery[0],
    gallery: dormRoomGallery,
  },
  "dorm-4-giuong-tang": {
    cardImage: dormRoomGallery[0],
    heroImage: dormRoomGallery[0],
    ogImage: dormRoomGallery[0],
    gallery: dormRoomGallery,
  },
  "dorm-6-giuong-tang": {
    cardImage: dormRoomGallery[0],
    heroImage: dormRoomGallery[0],
    ogImage: dormRoomGallery[0],
    gallery: dormRoomGallery,
  },
} as const satisfies Record<string, RoomMedia>;

export const commonGalleryImages = [
  img("/images/gallery/coffee-1.jpg", altTexts.common, 1600, 900, { position: "center 20%", scale: 0.96 }),
  img("/images/gallery/lobby-1.jpg", altTexts.common, 1600, 900, { position: "center 18%", scale: 0.96 }),
  img("/images/gallery/lobby-2.jpg", altTexts.common, 1600, 900, { position: "center 20%", scale: 0.95 }),
  img("/images/gallery/hallway-1.jpg", altTexts.common, 1600, 900, { position: "center 16%", scale: 0.94 }),
  img("/images/gallery/hallway-2.jpg", altTexts.common, 1600, 900, { position: "center 18%", scale: 0.95 }),
  img("/images/gallery/hallway-3.jpg", altTexts.common, 1600, 900, { position: "center 18%", scale: 0.95 }),
  img("/images/gallery/staircase-1.jpg", altTexts.common, 1600, 900, { position: "center 20%", scale: 0.96 }),
  img("/images/gallery/staircase-2.jpg", altTexts.common, 1600, 900, { position: "center 18%", scale: 0.95 }),
  img("/images/gallery/roof-1.jpg", altTexts.common, 1600, 900, { position: "center 18%", scale: 0.96 }),
  img("/images/gallery/roof-2.jpg", altTexts.common, 1600, 900, { position: "center 20%", scale: 0.96 }),
  img("/images/gallery/kitchen-1.jpg", altTexts.common, 1600, 900, { position: "center 16%", scale: 0.95 }),
  img("/images/gallery/common-1.jpg", altTexts.common, 1600, 900, { position: "center 20%", scale: 0.96 }),
] as const;

export const toursByCategory = {
  cacao: [
    img("/images/tours/tour-cacao-1.jpg", altTexts.tour, 1600, 900, { position: "center top" }),
    img("/images/tours/tour-cacao-2.jpg", altTexts.tour, 1600, 900, { position: "center top" }),
    img("/images/tours/tour-cacao-3.jpg", altTexts.tour, 1600, 900, { position: "center top" }),
  ],
  "floating-market": [
    img("/images/tours/tour-floating-market-2.jpg", altTexts.tour, 1600, 900, { position: "center top" }),
    img("/images/tours/tour-floating-market-1.jpg", altTexts.tour, 1600, 900, { position: "center 8%", scale: 0.99 }),
    img("/images/tours/tour-floating-market-3.jpg", altTexts.tour, 1600, 900, { position: "center top" }),
  ],
  conson: [
    img("/images/tours/tour-conson-1.jpg", altTexts.tour, 1600, 900, { position: "center top" }),
    img("/images/tours/tour-conson-2.jpg", altTexts.tour, 1600, 900, { position: "center 20%" }),
  ],
  orchid: [
    img("/images/tours/tour-orchid-1.jpg", altTexts.tour, 1600, 900, { position: "center top" }),
    img("/images/tours/tour-orchid-2.jpg", altTexts.tour, 1600, 900, { position: "center 22%" }),
  ],
} as const;

export const reviewImages = [
  img("/images/reviews/review-airbnb-1.jpeg", altTexts.review, 1200, 900, { position: "center top" }),
  img("/images/reviews/review-airbnb-2.jpeg", altTexts.review, 1200, 900, { position: "center top" }),
  img("/images/reviews/review-booking-1.jpg", altTexts.review, 1200, 900, { position: "center top" }),
  img("/images/reviews/review-booking-2.jpg", altTexts.review, 1200, 900, { position: "center top" }),
  img("/images/reviews/review-google-1.jpeg", altTexts.review, 1200, 900, { position: "center top" }),
  img("/images/reviews/review-google-2.jpeg", altTexts.review, 1200, 900, { position: "center top" }),
] as const;

export function getRoomMedia(slug: string): RoomMedia {
  return roomMediaBySlug[slug as keyof typeof roomMediaBySlug] ?? roomMediaBySlug["phong-don"];
}
