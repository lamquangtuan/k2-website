import type { Locale } from "@/lib/i18n";

export const siteConfig = {
  name: "K2 Homestay",
  shortName: "K2",
  phoneDisplay: "0902.96.97.98",
  phoneRaw: "0902969798",
  zaloUrl: "https://zalo.me/0902969798",
  telegramUrl: "https://t.me/84902969798",
  whatsappUrl: "https://wa.me/84902969798",
  messengerUrl: "https://www.facebook.com/K2homestay",
  address: "60 X\u00f4 Vi\u1ebft Ngh\u1ec7 T\u0129nh, Ph\u01b0\u1eddng Ninh Ki\u1ec1u, Th\u00e0nh ph\u1ed1 C\u1ea7n Th\u01a1",
  addressEn: "60 Xo Viet Nghe Tinh Street, Ninh Kieu District, Can Tho",
  mapsUrl:
    "https://maps.google.com/?q=60+X%C3%B4+Vi%E1%BA%BFt+Ngh%E1%BB%87+T%C4%A9nh,+Ph%C6%B0%E1%BB%9Dng+Ninh+Ki%E1%BB%81u,+Th%C3%A0nh+ph%E1%BB%91+C%E1%BA%A7n+Th%C6%A1",
  email: "k2homestaycantho@gmail.com",
  siteUrl: "https://homestayk2.vn",
} as const;

export function getSiteAddress(locale: Locale) {
  return locale === "en" ? siteConfig.addressEn : siteConfig.address;
}