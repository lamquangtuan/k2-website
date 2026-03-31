import { siteConfig } from "@/lib/site-config";
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

export type TelegramBookingConfig = {
  botToken?: string;
  chatId?: string;
};

function getRoomLabel(roomType: string) {
  return roomTypes.find((room) => room.slug === roomType)?.name.vi ?? roomType;
}

export function validateBookingDraft(draft: BookingDraft): BookingValidationResult {
  const errors: string[] = [];

  if (!draft.checkin) errors.push("Chưa chọn ngày đến.");
  if (!draft.checkout) errors.push("Chưa chọn ngày đi.");
  if (!draft.roomType) errors.push("Chưa chọn loại phòng.");
  if (!draft.fullName.trim()) errors.push("Chưa nhập họ tên.");
  if (!draft.phone.trim()) errors.push("Chưa nhập số điện thoại.");
  if (draft.guests < 1) errors.push("Số khách phải lớn hơn 0.");
  if (draft.checkin && draft.checkout && draft.checkout <= draft.checkin) errors.push("Ngày đi phải sau ngày đến.");
  if (draft.phone && draft.phone.replace(/\D/g, "").length < 9) errors.push("Số điện thoại chưa hợp lệ.");

  return { valid: errors.length === 0, errors };
}

export function formatBookingMessage(draft: BookingDraft) {
  const roomLabel = getRoomLabel(draft.roomType);

  return [
    "Yêu cầu đặt phòng K2 Homestay",
    `Loại phòng: ${roomLabel}`,
    `Ngày đến: ${draft.checkin || "-"}`,
    `Ngày đi: ${draft.checkout || "-"}`,
    `Số khách: ${draft.guests || "-"}`,
    `Họ tên: ${draft.fullName || "-"}`,
    `Số điện thoại: ${draft.phone || "-"}`,
    `Email: ${draft.email || "-"}`,
    `Ghi chú: ${draft.note || "-"}`,
    `Nguồn gửi: ${draft.sourcePage || "-"}`,
  ].join("\n");
}

export function buildBookingSummary(draft: BookingDraft) {
  return {
    roomLabel: getRoomLabel(draft.roomType),
    dateRange: draft.checkin && draft.checkout ? `${draft.checkin} → ${draft.checkout}` : "Chưa chọn đủ ngày ở",
    contactLine: `${draft.fullName || "Chưa nhập tên"} · ${draft.phone || "Chưa nhập số điện thoại"}`,
  };
}

export function buildZaloBookingUrl(draft: BookingDraft) {
  const message = encodeURIComponent(formatBookingMessage(draft));
  return `${siteConfig.zaloUrl}?text=${message}`;
}

export function buildTelegramMessage(draft: BookingDraft) {
  return formatBookingMessage(draft);
}

export function buildTelegramPayload(draft: BookingDraft, config?: TelegramBookingConfig) {
  const text = buildTelegramMessage(draft);

  return {
    endpoint: config?.botToken ? `https://api.telegram.org/bot${config.botToken}/sendMessage` : "",
    body: {
      chat_id: config?.chatId ?? "",
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    },
    ready: Boolean(config?.botToken && config?.chatId),
  };
}

export function buildBookingPayload(draft: BookingDraft, telegramConfig?: TelegramBookingConfig) {
  return {
    guest: {
      fullName: draft.fullName.trim(),
      phone: draft.phone.trim(),
      email: draft.email.trim(),
    },
    stay: {
      checkin: draft.checkin,
      checkout: draft.checkout,
      guests: draft.guests,
      roomType: draft.roomType,
      roomLabel: getRoomLabel(draft.roomType),
    },
    note: draft.note.trim(),
    sourcePage: draft.sourcePage,
    delivery: {
      zaloUrl: buildZaloBookingUrl(draft),
      telegramText: buildTelegramMessage(draft),
      telegramPayload: buildTelegramPayload(draft, telegramConfig),
    },
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
