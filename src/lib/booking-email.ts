import type { Locale } from "@/lib/i18n";
import type { BookingDraft } from "@/lib/booking-formatters";
import { roomTypes } from "@/lib/k2-content";

type BookingEmailConfig = {
  apiKey: string;
  toEmail: string;
  fromEmail: string;
};

type SendBookingEmailResult =
  | { ok: true }
  | {
      ok: false;
      reason: "missing_env" | "provider_error";
      missingEnv?: string[];
      error?: string;
    };

const emailCopy = {
  vi: {
    subjectPrefix: "[K2 Booking]",
    roomType: "Lo\u1ea1i ph\u00f2ng",
    guestName: "T\u00ean kh\u00e1ch",
    phone: "S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",
    checkin: "Ng\u00e0y \u0111\u1ebfn",
    checkout: "Ng\u00e0y \u0111i",
    guests: "S\u1ed1 kh\u00e1ch",
    note: "Ghi ch\u00fa",
    source: "Ngu\u1ed3n",
    websiteSource: "website booking form",
    noNote: "Kh\u00f4ng c\u00f3",
  },
  en: {
    subjectPrefix: "[K2 Booking]",
    roomType: "Room type",
    guestName: "Guest name",
    phone: "Phone",
    checkin: "Check-in",
    checkout: "Check-out",
    guests: "Guests",
    note: "Note",
    source: "Source",
    websiteSource: "website booking form",
    noNote: "None",
  },
} as const;

function getBookingEmailConfig(): { ok: true; config: BookingEmailConfig } | { ok: false; missingEnv: string[] } {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const toEmail = process.env.BOOKING_TO_EMAIL?.trim() ?? "";
  const fromEmail = process.env.BOOKING_FROM_EMAIL?.trim() ?? "";
  const missingEnv = [
    !apiKey ? "RESEND_API_KEY" : "",
    !toEmail ? "BOOKING_TO_EMAIL" : "",
    !fromEmail ? "BOOKING_FROM_EMAIL" : "",
  ].filter(Boolean);

  if (missingEnv.length > 0) {
    return { ok: false, missingEnv };
  }

  return {
    ok: true,
    config: {
      apiKey,
      toEmail,
      fromEmail,
    },
  };
}

function getRoomLabel(roomType: string, locale: Locale) {
  const room = roomTypes.find((item) => item.slug === roomType);
  return room ? room.name[locale] : roomType;
}

function buildBookingEmailSubject(draft: BookingDraft, locale: Locale) {
  const copy = emailCopy[locale];
  const roomLabel = getRoomLabel(draft.roomType, locale);
  return `${copy.subjectPrefix} ${roomLabel} | ${draft.fullName} | ${draft.checkin} - ${draft.checkout}`;
}

function buildBookingEmailText(draft: BookingDraft, locale: Locale) {
  const copy = emailCopy[locale];
  const roomLabel = getRoomLabel(draft.roomType, locale);

  return [
    `${copy.guestName}: ${draft.fullName}`,
    `${copy.phone}: ${draft.phone}`,
    `${copy.checkin}: ${draft.checkin}`,
    `${copy.checkout}: ${draft.checkout}`,
    `${copy.guests}: ${draft.guests}`,
    `${copy.roomType}: ${roomLabel}`,
    `${copy.note}: ${draft.note || copy.noNote}`,
    `${copy.source}: ${copy.websiteSource}`,
  ].join("\n");
}

export async function sendBookingEmail(draft: BookingDraft, locale: Locale): Promise<SendBookingEmailResult> {
  const configResult = getBookingEmailConfig();

  if (!configResult.ok) {
    return {
      ok: false,
      reason: "missing_env",
      missingEnv: configResult.missingEnv,
    };
  }

  const { config } = configResult;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [config.toEmail],
      subject: buildBookingEmailSubject(draft, locale),
      text: buildBookingEmailText(draft, locale),
      reply_to: draft.email || undefined,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.text();
    return {
      ok: false,
      reason: "provider_error",
      error,
    };
  }

  return { ok: true };
}
