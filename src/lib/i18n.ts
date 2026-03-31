export type Locale = "vi" | "en";

export function getLocale(input?: string): Locale {
  return input === "en" ? "en" : "vi";
}

export function withLang(path: string, locale: Locale) {
  return `${path}${path.includes("?") ? "&" : "?"}lang=${locale}`;
}

export const uiCopy = {
  vi: {
    localeLabel: "VI",
    altLocaleLabel: "EN",
    nav: { rooms: "Ph\u00f2ng", reviews: "\u0110\u00e1nh gi\u00e1", contact: "Li\u00ean h\u1ec7" },
    cta: { book: "\u0110\u1eb7t ph\u00f2ng ngay", zalo: "Nh\u1eafn Zalo", call: "G\u1ecdi ngay", callShort: "G\u1ecdi", viewRoom: "Xem ph\u00f2ng", seeAll: "Xem t\u1ea5t c\u1ea3" },
    home: {
      metaTitle: "K2 Homestay C\u1ea7n Th\u01a1 \u2013 Ph\u00f2ng \u0111\u1eb9p, gi\u00e1 t\u1ed1t, trung t\u00e2m",
      metaDescription: "K2 Homestay C\u1ea7n Th\u01a1 \u2013 ph\u00f2ng \u0111\u01a1n, ph\u00f2ng gia \u0111\u00ecnh, dorm s\u1ea1ch \u0111\u1eb9p, g\u1ea7n trung t\u00e2m, gi\u00e1 t\u1ed1t.",
      eyebrow: "K2 Homestay \u00b7 Ninh Ki\u1ec1u \u00b7 C\u1ea7n Th\u01a1",
      title: "\u1ede trung t\u00e2m Ninh Ki\u1ec1u, d\u1ec5 \u0111i m\u1ecdi n\u01a1i.",
      subtitle: "Ch\u1ecdn nhanh lo\u1ea1i ph\u00f2ng ph\u00f9 h\u1ee3p v\u00e0 \u0111\u1eb7t tr\u1ef1c ti\u1ebfp qua Zalo, \u0111i\u1ec7n tho\u1ea1i ho\u1eb7c form.",
      heroStat1: "3 lo\u1ea1i ph\u00f2ng, gi\u00e1 r\u00f5 r\u00e0ng",
      heroStat2: "G\u1ecdi ho\u1eb7c nh\u1eafn Zalo \u0111\u1ec3 \u0111\u1eb7t nhanh",
      whyTitle: "V\u00ec sao ch\u1ecdn K2",
      whyHeading: "4 \u0111i\u1ec3m kh\u00e1ch c\u1ea7n bi\u1ebft ngay",
      reviewsTitle: "\u0110\u00c1NH GI\u00c1 T\u1eea KH\u00c1CH",
      reviewsHeading: "Kh\u00e1ch n\u00f3i g\u00ec v\u1ec1 K2 Homestay",
      reviewsSubtext: "M\u1ed9t s\u1ed1 ph\u1ea3n h\u1ed3i th\u1ef1c t\u1ebf t\u1eeb kh\u00e1ch \u0111\u00e3 \u1edf t\u1ea1i K2 Homestay.",
      reviewsMore: "Xem review g\u1ed1c",
      reviewsPlatformLabel: "\u0110\u00e1nh gi\u00e1 t\u1eeb nhi\u1ec1u n\u1ec1n t\u1ea3ng",
      bookingEyebrow: "\u0110\u1eb7t nhanh",
      bookingHeading: "\u0110\u1eb7t nhanh qua Zalo ho\u1eb7c form",
      bookingCommitment: "K2 s\u1ebd ph\u1ea3n h\u1ed3i s\u1edbm qua \u0111i\u1ec7n tho\u1ea1i ho\u1eb7c Zalo.",
    },
    rooms: { title: "Danh s\u00e1ch ph\u00f2ng", heading: "Th\u1ea5y gi\u00e1 nhanh, ch\u1ecdn ph\u00f2ng nhanh", subtitle: "3 l\u1ef1a ch\u1ecdn r\u00f5 r\u00e0ng cho kh\u00e1ch l\u1ebb, gia \u0111\u00ecnh v\u00e0 nh\u00f3m nh\u1ecf.", listEyebrow: "Lo\u1ea1i ph\u00f2ng", listHeading: "Ch\u1ecdn nhanh ph\u00f2ng ph\u00f9 h\u1ee3p", priceFrom: "T\u1eeb" },
    roomDetail: { quickInfo: "Th\u00f4ng tin nhanh", amenities: "Ti\u1ec7n nghi ch\u00ednh", contactEyebrow: "Li\u00ean h\u1ec7 \u0111\u1eb7t ph\u00f2ng", contactHeading: "Ch\u1ecdn k\u00eanh li\u00ean h\u1ec7 ph\u00f9 h\u1ee3p", contactText: "G\u1ecdi ho\u1eb7c nh\u1eafn Zalo \u0111\u1ec3 \u0111\u1eb7t nhanh. Form ph\u00f9 h\u1ee3p khi c\u1ea7n gi\u1eef ch\u1ed7.", contactChannels: { telegram: "Telegram", whatsapp: "WhatsApp", messenger: "Messenger" }, responseLine: "\u0110\u1eb7t nhanh qua Zalo, K2 ph\u1ea3n h\u1ed3i s\u1edbm.", decisionLine: "Ph\u00f9 h\u1ee3p kh\u00e1ch \u0111i ng\u1eafn ng\u00e0y, ch\u1ecdn nhanh l\u00e0 \u0111\u1eb7t \u0111\u01b0\u1ee3c.", capacity: "S\u1ee9c ch\u1ee9a", bed: "Lo\u1ea1i gi\u01b0\u1eddng", size: "Di\u1ec7n t\u00edch", goodFor: "Ph\u00f9 h\u1ee3p" },
    gallery: { title: "Kh\u00f4ng gian", rooms: "Ph\u00f2ng", common: "Kh\u00f4ng gian chung", tour: "Tour trong ng\u00e0y", tourPlaceholder: "\u1ea2nh tour s\u1ebd c\u1eadp nh\u1eadt s\u1edbm" },
    footer: { telegram: "Telegram", whatsapp: "WhatsApp", messenger: "Messenger" },
    bookingForm: { checkin: "Ng\u00e0y \u0111\u1ebfn", checkout: "Ng\u00e0y \u0111i", guests: "S\u1ed1 kh\u00e1ch", roomType: "Lo\u1ea1i ph\u00f2ng", fullName: "H\u1ecd t\u00ean", phone: "S\u1ed1 \u0111i\u1ec7n tho\u1ea1i", email: "Email", note: "Ghi ch\u00fa", notePlaceholder: "Nh\u1eadn ph\u00f2ng s\u1edbm, \u1edf d\u00e0i ng\u00e0y, th\u00eam tr\u1ebb em...", phonePlaceholder: "0902 96 97 98", fullNamePlaceholder: "Nguy\u1ec5n V\u0103n A", submit: "G\u1eedi y\u00eau c\u1ea7u \u0111\u1eb7t ph\u00f2ng", pending: "\u0110ang g\u1eedi...", compactCommitment: "K2 s\u1ebd ph\u1ea3n h\u1ed3i s\u1edbm qua \u0111i\u1ec7n tho\u1ea1i ho\u1eb7c Zalo." },
  },
  en: {
    localeLabel: "EN", altLocaleLabel: "VI",
    nav: { rooms: "Rooms", reviews: "Reviews", contact: "Contact" },
    cta: { book: "Book now", zalo: "Chat on Zalo", call: "Call now", callShort: "Call", viewRoom: "View room", seeAll: "See all" },
    home: { metaTitle: "K2 Homestay Can Tho \u2013 Clean rooms, fair price, central", metaDescription: "K2 Homestay Can Tho \u2013 single room, family room and dorm near the city center.", eyebrow: "K2 Homestay \u00b7 Ninh Kieu \u00b7 Can Tho", title: "Stay in central Ninh Kieu, move around easily.", subtitle: "Pick a room fast and book directly by Zalo, phone or form.", heroStat1: "3 room types, clear pricing", heroStat2: "Call or message on Zalo to book fast", whyTitle: "Why K2", whyHeading: "4 things guests need to know", reviewsTitle: "GUEST REVIEWS", reviewsHeading: "What guests say about K2 Homestay", reviewsSubtext: "A few real comments from guests who stayed at K2 Homestay.", reviewsMore: "See original reviews", reviewsPlatformLabel: "Reviews from multiple platforms", bookingEyebrow: "Quick booking", bookingHeading: "Book fast by Zalo or form", bookingCommitment: "K2 will reply soon by phone or Zalo." },
    rooms: { title: "Rooms", heading: "See price fast, choose fast", subtitle: "3 clear options for solo guests, families and small groups.", listEyebrow: "Room types", listHeading: "Choose the right room fast", priceFrom: "From" },
    roomDetail: { quickInfo: "Quick info", amenities: "Main amenities", contactEyebrow: "Contact to book", contactHeading: "Choose your contact channel", contactText: "Call or message on Zalo for the fastest booking. Use the form if you want us to hold a room.", contactChannels: { telegram: "Telegram", whatsapp: "WhatsApp", messenger: "Messenger" }, responseLine: "Fast booking by Zalo, quick reply from K2.", decisionLine: "Good for short stays and quick decisions.", capacity: "Guests", bed: "Bed", size: "Size", goodFor: "Best for" },
    gallery: { title: "Gallery", rooms: "Rooms", common: "Shared space", tour: "Day tours", tourPlaceholder: "Tour photos coming soon" },
    footer: { telegram: "Telegram", whatsapp: "WhatsApp", messenger: "Messenger" },
    bookingForm: { checkin: "Check-in", checkout: "Check-out", guests: "Guests", roomType: "Room type", fullName: "Full name", phone: "Phone", email: "Email", note: "Note", notePlaceholder: "Early check-in, long stay, children...", phonePlaceholder: "0902 96 97 98", fullNamePlaceholder: "Nguyen Van A", submit: "Send booking request", pending: "Sending...", compactCommitment: "K2 will reply soon by phone or Zalo." },
  },
} as const;