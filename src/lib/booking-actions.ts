"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "@/lib/i18n";
import { sendBookingEmail } from "@/lib/booking-email";
import type { BookingDraft } from "@/lib/booking-formatters";
import { validateBookingDraft } from "@/lib/booking-formatters";
import type { BookingFormState } from "@/lib/booking-form-state";

const actionCopy = {
  vi: {
    success: "\u0110\u00e3 g\u1eedi y\u00eau c\u1ea7u th\u00e0nh c\u00f4ng. K2 s\u1ebd ph\u1ea3n h\u1ed3i s\u1edbm qua \u0111i\u1ec7n tho\u1ea1i ho\u1eb7c email.",
    temporaryError:
      "Form ch\u01b0a g\u1eedi \u0111\u01b0\u1ee3c. B\u1ea1n vui l\u00f2ng nh\u1eafn Zalo, Messenger ho\u1eb7c g\u1ecdi tr\u1ef1c ti\u1ebfp \u0111\u1ec3 K2 gi\u1eef ph\u00f2ng nhanh.",
  },
  en: {
    success: "Your request has been sent successfully. K2 will reply soon by phone or email.",
    temporaryError:
      "The form could not be sent yet. Please use Zalo, Messenger, or call directly so K2 can hold your room quickly.",
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
    roomQuantity: Number(formData.get("roomQuantity") ?? 1),
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
        hasResendApiKey: emailResult.configLog.hasApiKey,
        fromEmail: emailResult.configLog.fromEmail,
        toEmail: emailResult.configLog.toEmail,
        subject: emailResult.subject,
        roomType: draft.roomType,
        roomQuantity: draft.roomQuantity,
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
      roomQuantity: draft.roomQuantity,
      sourcePage: draft.sourcePage,
    });

    return {
      status: "error",
      message: copy.temporaryError,
    };
  }
}
