import type { Locale } from "@/lib/i18n";

export type PricingUnit = "night" | "guest";

export type RoomPricing = {
  priceFromVnd: number;
  pricingUnit: PricingUnit;
};

export const pricingData = {
  single: {
    priceFromVnd: 300000,
    pricingUnit: "night",
  },
  family: {
    priceFromVnd: 420000,
    pricingUnit: "night",
  },
  dorm: {
    priceFromVnd: 120000,
    pricingUnit: "guest",
  },
} as const satisfies Record<"single" | "family" | "dorm", RoomPricing>;

export function formatRoomPrice(locale: Locale, pricing: RoomPricing) {
  const amount =
    locale === "vi"
      ? pricing.priceFromVnd.toLocaleString("vi-VN").replace(/,/g, ".")
      : pricing.priceFromVnd.toLocaleString("en-US");

  if (locale === "vi") {
    const unitLabel = pricing.pricingUnit === "night" ? "\u0111\u00eam" : "kh\u00e1ch";
    return `T\u1eeb ${amount}\u0111/${unitLabel}`;
  }

  const unitLabel = pricing.pricingUnit === "night" ? "night" : "guest";
  return `From ${amount} VND / ${unitLabel}`;
}
