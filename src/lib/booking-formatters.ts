import type { Locale } from "@/lib/i18n";
import { roomTypes } from "@/lib/k2-content";

export type BookingDraft = {
  checkin: string;
  checkout: string;
  guests: number;
  roomType: string;
  fullName: string;
  phone: string;
  email: string;
  note: string;
  sourcePage: string;
};

export type BookingValidationResult = {
  valid: boolean;
  errors: string[];
};

const bookingCopy = {
  vi: {
    missingCheckin: "Ch\u01b0a ch\u1ecdn ng\u00e0y \u0111\u1ebfn.",
    missingCheckout: "Ch\u01b0a ch\u1ecdn ng\u00e0y \u0111i.",
    missingRoomType: "Ch\u01b0a ch\u1ecdn lo\u1ea1i ph\u00f2ng.",
    missingFullName: "Ch\u01b0a nh\u1eadp h\u1ecd t\u00ean.",
    missingPhone: "Ch\u01b0a nh\u1eadp s\u1ed1 \u0111i\u1ec7n tho\u1ea1i.",
    invalidGuests: "S\u1ed1 kh\u00e1ch ph\u1ea3i l\u1edbn h\u01a1n 0.",
    invalidDateRange: "Ng\u00e0y \u0111i ph\u1ea3i sau ng\u00e0y \u0111\u1ebfn.",
    invalidPhone: "S\u1ed1 \u0111i\u1ec7n tho\u1ea1i ch\u01b0a h\u1ee3p l\u1ec7.",
    bookingRequestTitle: "Y\u00eau c\u1ea7u \u0111\u1eb7t ph\u00f2ng K2 Homestay",
    roomType: "Lo\u1ea1i ph\u00f2ng",
    checkin: "Ng\u00e0y \u0111\u1ebfn",
    checkout: "Ng\u00e0y \u0111i",
    guests: "S\u1ed1 kh\u00e1ch",
    fullName: "H\u1ecd t\u00ean",
    phone: "S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",
    email: "Email",
    note: "Ghi ch\u00fa",
    sourcePage: "Ngu\u1ed3n g\u1eedi",
    dateRangeMissing: "Ch\u01b0a ch\u1ecdn \u0111\u1ee7 ng\u00e0y \u1edf",
    missingName: "Ch\u01b0a nh\u1eadp t\u00ean",
    missingPhoneSummary: "Ch\u01b0a nh\u1eadp s\u1ed1 \u0111i\u1ec7n tho\u1ea1i",
  },
  en: {
    missingCheckin: "Please choose a check-in date.",
    missingCheckout: "Please choose a check-out date.",
    missingRoomType: "Please choose a room type.",
    missingFullName: "Please enter your full name.",
    missingPhone: "Please enter your phone number.",
    invalidGuests: "Guest count must be greater than 0.",
    invalidDateRange: "Check-out must be after check-in.",
    invalidPhone: "Phone number looks invalid.",
    bookingRequestTitle: "K2 Homestay booking request",
    roomType: "Room type",
    checkin: "Check-in",
    checkout: "Check-out",
    guests: "Guests",
    fullName: "Full name",
    phone: "Phone",
    email: "Email",
    note: "Note",
    sourcePage: "Source page",
    dateRangeMissing: "Dates not selected yet",
    missingName: "No name yet",
    missingPhoneSummary: "No phone yet",
  },
} as const;

function getRoomLabel(roomType: string, locale: Locale) {
  const room = roomTypes.find((item) => item.slug === roomType);

  if (!room) {
    return roomType;
  }

  return room.name[locale];
}

export function validateBookingDraft(draft: BookingDraft, locale: Locale = "vi"): BookingValidationResult {
  const copy = bookingCopy[locale];
  const errors: string[] = [];

  if (!draft.checkin) errors.push(copy.missingCheckin);
  if (!draft.checkout) errors.push(copy.missingCheckout);
  if (!draft.roomType) errors.push(copy.missingRoomType);
  if (!draft.fullName.trim()) errors.push(copy.missingFullName);
  if (!draft.phone.trim()) errors.push(copy.missingPhone);
  if (draft.guests < 1) errors.push(copy.invalidGuests);
  if (draft.checkin && draft.checkout && draft.checkout <= draft.checkin) errors.push(copy.invalidDateRange);
  if (draft.phone && draft.phone.replace(/\D/g, "").length < 9) errors.push(copy.invalidPhone);

  return { valid: errors.length === 0, errors };
}

export function formatBookingMessage(draft: BookingDraft, locale: Locale = "vi") {
  const copy = bookingCopy[locale];
  const roomLabel = getRoomLabel(draft.roomType, locale);

  return [
    copy.bookingRequestTitle,
    `${copy.roomType}: ${roomLabel}`,
    `${copy.checkin}: ${draft.checkin || "-"}`,
    `${copy.checkout}: ${draft.checkout || "-"}`,
    `${copy.guests}: ${draft.guests || "-"}`,
    `${copy.fullName}: ${draft.fullName || "-"}`,
    `${copy.phone}: ${draft.phone || "-"}`,
    `${copy.email}: ${draft.email || "-"}`,
    `${copy.note}: ${draft.note || "-"}`,
    `${copy.sourcePage}: ${draft.sourcePage || "-"}`,
  ].join("\n");
}

export function buildBookingSummary(draft: BookingDraft, locale: Locale = "vi") {
  const copy = bookingCopy[locale];

  return {
    roomLabel: getRoomLabel(draft.roomType, locale),
    dateRange: draft.checkin && draft.checkout ? `${draft.checkin} \u2192 ${draft.checkout}` : copy.dateRangeMissing,
    contactLine: `${draft.fullName || copy.missingName} \u00b7 ${draft.phone || copy.missingPhoneSummary}`,
  };
}

export function createInitialBookingDraft(sourcePage: string, roomType: string) {
  return {
    checkin: "",
    checkout: "",
    guests: 2,
    roomType,
    fullName: "",
    phone: "",
    email: "",
    note: "",
    sourcePage,
  } satisfies BookingDraft;
}
