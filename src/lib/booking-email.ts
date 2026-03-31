import { Resend } from "resend";
import type { Locale } from "@/lib/i18n";
import type { BookingDraft } from "@/lib/booking-formatters";
import { roomTypes } from "@/lib/k2-content";

type BookingEmailConfig = {
  apiKey: string;
  toEmail: string;
  fromEmail: string;
};

export type SendBookingEmailResult =
  | { ok: true; subject: string }
  | {
      ok: false;
      reason: "missing_env" | "provider_error";
      subject: string;
      missingEnv?: string[];
      error?: string;
      configLog: {
        hasApiKey: boolean;
        fromEmail: string;
        toEmail: string;
      };
    };

const emailCopy = {
  vi: {
    subjectPrefix: "[K2 Booking]",
    roomType: "Lo\u1ea1i ph\u00f2ng",
    roomQuantity: "S\u1ed1 l\u01b0\u1ee3ng ph\u00f2ng",
    guestName: "H\u1ecd t\u00ean kh\u00e1ch",
    phone: "S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",
    email: "Email",
    checkin: "Ng\u00e0y \u0111\u1ebfn",
    checkout: "Ng\u00e0y \u0111i",
    guests: "S\u1ed1 kh\u00e1ch",
    note: "Ghi ch\u00fa",
    source: "Ngu\u1ed3n g\u1eedi",
    locale: "Ng\u00f4n ng\u1eef ng\u01b0\u1eddi d\u00f9ng",
    sourcePage: "Trang g\u1eedi",
    websiteSource: "Website K2",
    noNote: "Kh\u00f4ng c\u00f3",
  },
  en: {
    subjectPrefix: "[K2 Booking]",
    roomType: "Room type",
    roomQuantity: "Number of rooms",
    guestName: "Guest name",
    phone: "Phone",
    email: "Email",
    checkin: "Check-in",
    checkout: "Check-out",
    guests: "Guests",
    note: "Note",
    source: "Source",
    locale: "User language",
    sourcePage: "Source page",
    websiteSource: "K2 Website",
    noNote: "None",
  },
} as const;

function formatDisplayDate(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) {
    return date;
  }

  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

function getBookingEmailConfig(): { ok: true; config: BookingEmailConfig } | { ok: false; missingEnv: string[]; configLog: { hasApiKey: boolean; fromEmail: string; toEmail: string } } {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const toEmail = process.env.BOOKING_TO_EMAIL?.trim() ?? "";
  const fromEmail = process.env.BOOKING_FROM_EMAIL?.trim() ?? "";
  const missingEnv = [
    !apiKey ? "RESEND_API_KEY" : "",
    !toEmail ? "BOOKING_TO_EMAIL" : "",
    !fromEmail ? "BOOKING_FROM_EMAIL" : "",
  ].filter(Boolean);
  const configLog = {
    hasApiKey: Boolean(apiKey),
    fromEmail,
    toEmail,
  };

  if (missingEnv.length > 0) {
    return { ok: false, missingEnv, configLog };
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
  return `${copy.subjectPrefix} ${draft.fullName} - ${roomLabel} x ${draft.roomQuantity} - ${formatDisplayDate(draft.checkin)}`;
}

function buildBookingEmailText(draft: BookingDraft, locale: Locale) {
  const copy = emailCopy[locale];
  const roomLabel = getRoomLabel(draft.roomType, locale);

  return [
    `${copy.guestName}: ${draft.fullName}`,
    `${copy.phone}: ${draft.phone}`,
    `${copy.email}: ${draft.email || "-"}`,
    `${copy.checkin}: ${formatDisplayDate(draft.checkin)}`,
    `${copy.checkout}: ${formatDisplayDate(draft.checkout)}`,
    `${copy.guests}: ${draft.guests}`,
    `${copy.roomType}: ${roomLabel}`,
    `${copy.roomQuantity}: ${draft.roomQuantity}`,
    `${copy.note}: ${draft.note || copy.noNote}`,
    `${copy.source}: ${copy.websiteSource}`,
    `${copy.locale}: ${locale.toUpperCase()}`,
    `${copy.sourcePage}: ${draft.sourcePage}`,
  ].join("\n");
}

function buildBookingEmailHtml(draft: BookingDraft, locale: Locale) {
  const copy = emailCopy[locale];
  const roomLabel = getRoomLabel(draft.roomType, locale);
  const rows = [
    [copy.guestName, draft.fullName],
    [copy.phone, draft.phone],
    [copy.email, draft.email || "-"],
    [copy.checkin, formatDisplayDate(draft.checkin)],
    [copy.checkout, formatDisplayDate(draft.checkout)],
    [copy.guests, String(draft.guests)],
    [copy.roomType, roomLabel],
    [copy.roomQuantity, String(draft.roomQuantity)],
    [copy.note, draft.note || copy.noNote],
    [copy.source, copy.websiteSource],
    [copy.locale, locale.toUpperCase()],
    [copy.sourcePage, draft.sourcePage],
  ];

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f1a17">
      <h2 style="margin:0 0 16px">${copy.subjectPrefix} ${draft.fullName}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding:8px 12px;border:1px solid #e8ded1;font-weight:600;background:#faf5ee;width:220px">${label}</td>
                  <td style="padding:8px 12px;border:1px solid #e8ded1">${value}</td>
                </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

export async function sendBookingEmail(draft: BookingDraft, locale: Locale): Promise<SendBookingEmailResult> {
  const subject = buildBookingEmailSubject(draft, locale);
  const configResult = getBookingEmailConfig();

  if (!configResult.ok) {
    return {
      ok: false,
      reason: "missing_env",
      missingEnv: configResult.missingEnv,
      subject,
      configLog: configResult.configLog,
    };
  }

  const { config } = configResult;
  const resend = new Resend(config.apiKey);

  try {
    const { error } = await resend.emails.send({
      from: config.fromEmail,
      to: [config.toEmail],
      subject,
      text: buildBookingEmailText(draft, locale),
      html: buildBookingEmailHtml(draft, locale),
      replyTo: draft.email || undefined,
    });

    if (error) {
      return {
        ok: false,
        reason: "provider_error",
        subject,
        error: error.message,
        configLog: {
          hasApiKey: true,
          fromEmail: config.fromEmail,
          toEmail: config.toEmail,
        },
      };
    }

    return { ok: true, subject };
  } catch (error) {
    return {
      ok: false,
      reason: "provider_error",
      subject,
      error: error instanceof Error ? error.message : "Unknown Resend error",
      configLog: {
        hasApiKey: true,
        fromEmail: config.fromEmail,
        toEmail: config.toEmail,
      },
    };
  }
}
