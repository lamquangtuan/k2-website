import type { Locale } from "@/lib/i18n";
import { formatRoomPrice, pricingData, type PricingUnit } from "@/lib/pricing-data";

export type LocalizedText = Record<Locale, string>;

export type RoomType = {
  slug: string;
  pricingKey: keyof typeof pricingData;
  pricingUnit: PricingUnit;
  name: LocalizedText;
  shortName: string;
  capacity: LocalizedText;
  guestCount: number;
  bed: LocalizedText;
  priceFrom: LocalizedText;
  numericPriceFrom: number;
  summary: LocalizedText;
  decisionTitle: LocalizedText;
  tagline: LocalizedText;
  size: LocalizedText;
  goodFor: LocalizedText[];
  amenityGroups: Array<{
    title: LocalizedText;
    items: LocalizedText[];
  }>;
};

const singlePricing = pricingData.single;
const familyPricing = pricingData.family;
const dormPricing = pricingData.dorm;

export const roomTypes: readonly RoomType[] = [
  {
    slug: "phong-don",
    pricingKey: "single",
    pricingUnit: singlePricing.pricingUnit,
    name: { vi: "Ph\u00f2ng \u0111\u01a1n", en: "Single room" },
    shortName: "Single",
    capacity: { vi: "1-2 kh\u00e1ch", en: "1-2 guests" },
    guestCount: 2,
    bed: { vi: "1 gi\u01b0\u1eddng queen", en: "1 queen bed" },
    priceFrom: {
      vi: formatRoomPrice("vi", singlePricing),
      en: formatRoomPrice("en", singlePricing),
    },
    numericPriceFrom: singlePricing.priceFromVnd,
    summary: {
      vi: "Ph\u00f2ng ri\u00eang cho kh\u00e1ch \u0111i ng\u1eafn ng\u00e0y, c\u1ea7n ch\u1ed7 \u1edf g\u1ecdn g\u00e0ng v\u00e0 ri\u00eang t\u01b0.",
      en: "Private room for short stays, with a simple and quiet setup.",
    },
    decisionTitle: {
      vi: "Ph\u00f9 h\u1ee3p 1-2 kh\u00e1ch mu\u1ed1n \u1edf ri\u00eang, v\u00e0o \u1edf nhanh.",
      en: "Good for 1-2 guests who want privacy and a quick stay.",
    },
    tagline: {
      vi: "1-2 kh\u00e1ch, ri\u00eang t\u01b0",
      en: "1-2 guests, private",
    },
    size: { vi: "18-20m\u00b2", en: "18-20m\u00b2" },
    goodFor: [
      { vi: "Kh\u00e1ch \u0111i m\u1ed9t m\u00ecnh ho\u1eb7c c\u1eb7p \u0111\u00f4i", en: "Solo travelers or couples" },
      { vi: "Kh\u00e1ch c\u00f4ng t\u00e1c ng\u1eafn ng\u00e0y", en: "Short business stays" },
    ],
    amenityGroups: [
      {
        title: { vi: "Trong ph\u00f2ng", en: "In room" },
        items: [
          { vi: "M\u00e1y l\u1ea1nh", en: "Air conditioning" },
          { vi: "Ph\u00f2ng t\u1eafm ri\u00eang", en: "Private bathroom" },
          { vi: "Wi-Fi", en: "Wi-Fi" },
        ],
      },
      {
        title: { vi: "Ph\u00f9 h\u1ee3p", en: "Good for" },
        items: [
          { vi: "\u1ede 1-2 kh\u00e1ch", en: "1-2 guests" },
          { vi: "Ngh\u1ec9 ng\u1eafn ng\u00e0y", en: "Short stays" },
          { vi: "G\u1ea7n trung t\u00e2m", en: "Near the center" },
        ],
      },
    ],
  },
  {
    slug: "phong-gia-dinh",
    pricingKey: "family",
    pricingUnit: familyPricing.pricingUnit,
    name: { vi: "Ph\u00f2ng gia \u0111\u00ecnh", en: "Family room" },
    shortName: "Family",
    capacity: { vi: "2-4 kh\u00e1ch", en: "2-4 guests" },
    guestCount: 4,
    bed: { vi: "2 gi\u01b0\u1eddng queen", en: "2 queen beds" },
    priceFrom: {
      vi: formatRoomPrice("vi", familyPricing),
      en: formatRoomPrice("en", familyPricing),
    },
    numericPriceFrom: familyPricing.priceFromVnd,
    summary: {
      vi: "Ph\u00f2ng r\u1ed9ng h\u01a1n, ph\u00f9 h\u1ee3p gia \u0111\u00ecnh nh\u1ecf ho\u1eb7c nh\u00f3m b\u1ea1n \u1edf c\u00f9ng nhau.",
      en: "A more spacious room for small families or friends staying together.",
    },
    decisionTitle: {
      vi: "Ph\u00f9 h\u1ee3p nh\u00f3m 3-4 ng\u01b0\u1eddi c\u1ea7n ng\u1ee7 tho\u1ea3i m\u00e1i trong m\u1ed9t ph\u00f2ng.",
      en: "Good for groups of 3-4 who want to stay together in one room.",
    },
    tagline: {
      vi: "3-4 kh\u00e1ch, r\u1ed9ng r\u00e3i",
      en: "3-4 guests, spacious",
    },
    size: { vi: "28-32m\u00b2", en: "28-32m\u00b2" },
    goodFor: [
      { vi: "Gia \u0111\u00ecnh 3-4 ng\u01b0\u1eddi", en: "Families of 3-4" },
      { vi: "Nh\u00f3m b\u1ea1n nh\u1ecf", en: "Small friend groups" },
    ],
    amenityGroups: [
      {
        title: { vi: "Trong ph\u00f2ng", en: "In room" },
        items: [
          { vi: "2 gi\u01b0\u1eddng queen", en: "2 queen beds" },
          { vi: "M\u00e1y l\u1ea1nh", en: "Air conditioning" },
          { vi: "Ph\u00f2ng t\u1eafm ri\u00eang", en: "Private bathroom" },
        ],
      },
      {
        title: { vi: "Ph\u00f9 h\u1ee3p", en: "Good for" },
        items: [
          { vi: "Nh\u00f3m 3-4 kh\u00e1ch", en: "Groups of 3-4" },
          { vi: "Gia \u0111\u00ecnh c\u00f3 tr\u1ebb nh\u1ecf", en: "Families with children" },
          { vi: "\u1ede chung m\u1ed9t ph\u00f2ng", en: "Staying together in one room" },
        ],
      },
    ],
  },
  {
    slug: "phong-dorm-giuong-tang",
    pricingKey: "dorm",
    pricingUnit: dormPricing.pricingUnit,
    name: { vi: "Ph\u00f2ng dorm gi\u01b0\u1eddng t\u1ea7ng", en: "Bunk-bed dorm room" },
    shortName: "Dorm",
    capacity: { vi: "theo s\u1ed1 kh\u00e1ch", en: "based on guest count" },
    guestCount: 6,
    bed: { vi: "gi\u01b0\u1eddng t\u1ea7ng", en: "bunk beds" },
    priceFrom: {
      vi: formatRoomPrice("vi", dormPricing),
      en: formatRoomPrice("en", dormPricing),
    },
    numericPriceFrom: dormPricing.priceFromVnd,
    summary: {
      vi: "\u0110\u1eb7t theo s\u1ed1 l\u01b0\u1ee3ng kh\u00e1ch, K2 s\u1ebd s\u1eafp x\u1ebfp gi\u01b0\u1eddng ph\u00f9 h\u1ee3p.",
      en: "Book by guest count and K2 will arrange the right bunk setup.",
    },
    decisionTitle: {
      vi: "Ph\u00f9 h\u1ee3p kh\u00e1ch \u0111i m\u1ed9t m\u00ecnh ho\u1eb7c nh\u00f3m nh\u1ecf mu\u1ed1n t\u1ed1i \u01b0u chi ph\u00ed.",
      en: "Good for solo guests or small groups who want better value.",
    },
    tagline: {
      vi: "Gi\u01b0\u1eddng t\u1ea7ng, ti\u1ebft ki\u1ec7m",
      en: "Bunk beds, budget-friendly",
    },
    size: { vi: "khu dorm chung", en: "shared dorm area" },
    goodFor: [
      { vi: "Kh\u00e1ch \u0111i m\u1ed9t m\u00ecnh", en: "Solo travelers" },
      { vi: "Nh\u00f3m nh\u1ecf c\u1ea7n gi\u00e1 t\u1ed1t", en: "Small groups with a budget" },
    ],
    amenityGroups: [
      {
        title: { vi: "Gi\u01b0\u1eddng ng\u1ee7", en: "Sleeping setup" },
        items: [
          { vi: "Gi\u01b0\u1eddng t\u1ea7ng", en: "Bunk beds" },
          { vi: "R\u00e8m che ri\u00eang", en: "Curtains for privacy" },
          { vi: "\u1ed4 c\u1eafm ri\u00eang", en: "Personal power outlet" },
        ],
      },
      {
        title: { vi: "Sinh ho\u1ea1t", en: "Shared use" },
        items: [
          { vi: "M\u00e1y l\u1ea1nh", en: "Air conditioning" },
          { vi: "Wi-Fi", en: "Wi-Fi" },
          { vi: "Khu v\u1ec7 sinh chung s\u1ea1ch", en: "Clean shared bathroom" },
        ],
      },
    ],
  },
] as const;

export const homeHighlights = [
  {
    title: { vi: "V\u1ecb tr\u00ed thu\u1eadn ti\u1ec7n", en: "Convenient location" },
    description: { vi: "\u1ede ngay trung t\u00e2m Ninh Ki\u1ec1u.", en: "Right in central Ninh Kieu." },
  },
  {
    title: { vi: "Lo\u1ea1i ph\u00f2ng \u0111a d\u1ea1ng", en: "Room options" },
    description: { vi: "Ph\u00f9 h\u1ee3p kh\u00e1ch l\u1ebb, gia \u0111\u00ecnh, nh\u00f3m nh\u1ecf.", en: "Works for solo guests, families and small groups." },
  },
  {
    title: { vi: "Tour trong ng\u00e0y", en: "Day tours" },
    description: { vi: "C\u00f3 th\u1ec3 h\u1ed7 tr\u1ee3 tour tham quan trong ng\u00e0y.", en: "Day tour support can be arranged." },
  },
  {
    title: { vi: "Ph\u1ea3n h\u1ed3i 24/7", en: "24/7 response" },
    description: { vi: "G\u1ecdi ho\u1eb7c nh\u1eafn \u0111\u1ec3 \u0111\u01b0\u1ee3c ph\u1ea3n h\u1ed3i nhanh.", en: "Call or message for a quick reply." },
  },
] as const;

export const homepageReviews = [
  { lang: "vi", quote: "Ph\u00f2ng s\u1ea1ch, \u0111\u1eb7t qua Zalo r\u1ea5t nhanh.", author: "Kh\u00e1ch Vi\u1ec7t" },
  { lang: "en", quote: "Good location and fast reply.", author: "Guest from UK" },
  { lang: "fr", quote: "Chambre propre, r\u00e9ponse rapide.", author: "Client de France" },
  { lang: "de", quote: "Sauber, zentral und unkompliziert.", author: "Gast aus Deutschland" },
  { lang: "vi", quote: "\u0110i nh\u00f3m nh\u1ecf \u1edf dorm kh\u00e1 h\u1ee3p l\u00fd.", author: "Kh\u00e1ch nh\u00f3m nh\u1ecf" },
  { lang: "en", quote: "Easy check-in and fair price.", author: "Guest from Australia" },
] as const;

export function getRoomBySlug(slug: string) {
  return roomTypes.find((room) => room.slug === slug);
}

export function getRoomLabel(roomType: RoomType, locale: Locale) {
  return roomType.name[locale];
}
