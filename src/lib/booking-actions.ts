"use server";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { type BookingDraft, validateBookingDraft } from "@/lib/booking-formatters";

type BookingFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialBookingFormState: BookingFormState = {
  status: "idle",
  message: "",
};

type BookingRequestRecord = BookingDraft & {
  id: string;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const bookingFile = path.join(dataDir, "booking-requests.json");

async function readRequests() {
  try {
    const raw = await readFile(bookingFile, "utf8");
    return JSON.parse(raw) as BookingRequestRecord[];
  } catch {
    return [];
  }
}

export async function submitBookingRequest(
  _prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const draft: BookingDraft = {
    checkin: String(formData.get("checkin") ?? "").trim(),
    checkout: String(formData.get("checkout") ?? "").trim(),
    guests: Number(formData.get("guests") ?? 0),
    roomType: String(formData.get("roomType") ?? "").trim(),
    fullName: String(formData.get("fullName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    note: String(formData.get("note") ?? "").trim(),
    sourcePage: String(formData.get("sourcePage") ?? "").trim() || "unknown",
  };

  const validation = validateBookingDraft(draft);

  if (!validation.valid) {
    return {
      status: "error",
      message: validation.errors[0],
    };
  }

  const requests = await readRequests();
  const nextRecord: BookingRequestRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...draft,
  };

  await mkdir(dataDir, { recursive: true });
  await writeFile(bookingFile, JSON.stringify([nextRecord, ...requests], null, 2), "utf8");

  revalidatePath("/");
  revalidatePath("/booking");
  revalidatePath("/contact");

  return {
    status: "success",
    message: "Đã ghi nhận yêu cầu đặt phòng. Bạn có thể bấm gửi Zalo ngay bên dưới để chuyển đầy đủ nội dung booking cho K2.",
  };
}
