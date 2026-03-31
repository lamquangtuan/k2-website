"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "@/lib/i18n";
import { sendBookingEmail } from "@/lib/booking-email";
import type { BookingDraft } from "@/lib/booking-formatters";
import { validateBookingDraft } from "@/lib/booking-formatters";
import type { BookingFormState } from "@/lib/booking-form-state";

const actionCopy = {
  vi: {
    success: "K2 \u0111\u00e3 nh\u1eadn y\u00eau c\u1ea7u \u0111\u1eb7t ph\u00f2ng v\u00e0 s\u1ebd ph\u1ea3n h\u1ed3i s\u1edbm qua \u0111i\u1ec7n tho\u1ea1i ho\u1eb7c Zalo.",
    temporaryError: "G\u1eedi form t\u1ea1m th\u1eddi ch\u01b0a th\u00e0nh c\u00f4ng. Vui l\u00f2ng nh\u1eafn Zalo ho\u1eb7c g\u1ecdi tr\u1ef1c ti\u1ebfp.",
  },
  en: {
    success: "K2 received your booking request and will reply soon by phone or Zalo.",
    temporaryError: "The form could not be sent right now. Please message on Zalo or call directly.",
  },
} as const;

export async function submitBookingRequest(
  _prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const locale = getLocale(String(formData.get("locale") ?? "vi"));
  const copy = actionCopy[locale];
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

  const validation = validateBookingDraft(draft, locale);
  if (!validation.valid) {
    return {
      status: "error",
      message: validation.errors[0],
    };
  }

  try {
    const emailResult = await sendBookingEmail(draft, locale);

    if (!emailResult.ok) {
      console.error("[booking] email delivery failed", {
        reason: emailResult.reason,
        missingEnv: emailResult.missingEnv,
        providerError: emailResult.error,
        roomType: draft.roomType,
        sourcePage: draft.sourcePage,
      });

      return {
        status: "error",
        message: copy.temporaryError,
      };
    }

    revalidatePath("/");
    revalidatePath("/booking");
    revalidatePath("/contact");

    return {
      status: "success",
      message: copy.success,
    };
  } catch (error) {
    console.error("[booking] submit failed", {
      message: error instanceof Error ? error.message : "Unknown error",
      roomType: draft.roomType,
      sourcePage: draft.sourcePage,
    });

    return {
      status: "error",
      message: copy.temporaryError,
    };
  }
}
