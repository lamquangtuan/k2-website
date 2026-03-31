"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { createInitialBookingDraft, type BookingDraft, validateBookingDraft } from "@/lib/booking-formatters";
import { submitBookingRequest } from "@/lib/booking-actions";
import { initialBookingFormState } from "@/lib/booking-form-state";
import { uiCopy, type Locale } from "@/lib/i18n";
import { roomTypes } from "@/lib/k2-content";
import { siteConfig } from "@/lib/site-config";

type BookingRequestFormProps = {
  sourcePage: string;
  defaultRoomSlug?: string;
  variant?: "full" | "compact";
  submitLabel?: string;
  commitmentText?: string;
  helperText?: string;
  locale?: Locale;
};

function SubmitButton({ label, disabled, locale }: { label: string; disabled: boolean; locale: Locale }) {
  const { pending } = useFormStatus();
  const copy = uiCopy[locale].bookingForm;

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(181,95,46,0.28)] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
    >
      {pending ? copy.pending : label}
    </button>
  );
}

function buildDraftFromState(draft: BookingDraft, name: keyof BookingDraft, value: string) {
  if (name === "guests" || name === "roomQuantity") {
    return {
      ...draft,
      [name]: Number(value || 0),
    };
  }

  return {
    ...draft,
    [name]: value,
  };
}

export function BookingRequestForm({
  sourcePage,
  defaultRoomSlug,
  variant = "full",
  submitLabel,
  commitmentText,
  helperText,
  locale = "vi",
}: BookingRequestFormProps) {
  const [state, formAction] = useActionState(submitBookingRequest, initialBookingFormState);
  const [draft, setDraft] = useState<BookingDraft>(createInitialBookingDraft(sourcePage, defaultRoomSlug ?? roomTypes[0].slug));
  const copy = uiCopy[locale].bookingForm;
  const isCompact = variant === "compact";

  const validation = useMemo(() => validateBookingDraft(draft, locale), [draft, locale]);
  const showInlineValidation = !validation.valid && Boolean(draft.fullName || draft.phone || draft.checkin || draft.checkout);

  return (
    <div className="grid gap-3">
      {helperText ? <p className="text-sm leading-5 text-[var(--ink-muted)]">{helperText}</p> : null}
      <form action={formAction} className="grid gap-3 rounded-[22px] border border-white/70 bg-white/92 p-3.5 shadow-sm backdrop-blur sm:grid-cols-2 sm:gap-4 sm:p-4">
        <input type="hidden" name="sourcePage" value={sourcePage} />
        <input type="hidden" name="locale" value={locale} />

        <label className="grid gap-1.5 text-sm font-medium text-[var(--ink-muted)] sm:gap-2">
          {copy.checkin}
          <input type="date" name="checkin" className="field" required value={draft.checkin} onChange={(event) => setDraft((current) => buildDraftFromState(current, "checkin", event.target.value))} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-[var(--ink-muted)] sm:gap-2">
          {copy.checkout}
          <input type="date" name="checkout" className="field" required value={draft.checkout} onChange={(event) => setDraft((current) => buildDraftFromState(current, "checkout", event.target.value))} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-[var(--ink-muted)] sm:gap-2">
          {copy.guests}
          <input type="number" name="guests" min="1" className="field" required value={draft.guests} onChange={(event) => setDraft((current) => buildDraftFromState(current, "guests", event.target.value))} />
        </label>
        <div className="grid gap-3 sm:col-span-2 sm:grid-cols-[minmax(0,1fr)_160px]">
          <label className="grid gap-1.5 text-sm font-medium text-[var(--ink-muted)] sm:gap-2">
            {copy.roomType}
            <select name="roomType" className="field" required value={draft.roomType} onChange={(event) => setDraft((current) => buildDraftFromState(current, "roomType", event.target.value))}>
              {roomTypes.map((room) => (
                <option key={room.slug} value={room.slug}>
                  {room.name[locale]}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-[var(--ink-muted)] sm:gap-2">
            {copy.roomQuantity}
            <select
              name="roomQuantity"
              className="field"
              required
              value={draft.roomQuantity}
              onChange={(event) => setDraft((current) => buildDraftFromState(current, "roomQuantity", event.target.value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="grid gap-1.5 text-sm font-medium text-[var(--ink-muted)] sm:gap-2">
          {copy.fullName}
          <input type="text" name="fullName" placeholder={copy.fullNamePlaceholder} className="field" required value={draft.fullName} onChange={(event) => setDraft((current) => buildDraftFromState(current, "fullName", event.target.value))} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-[var(--ink-muted)] sm:gap-2">
          {copy.phone}
          <input type="tel" name="phone" placeholder={copy.phonePlaceholder} className="field" required value={draft.phone} onChange={(event) => setDraft((current) => buildDraftFromState(current, "phone", event.target.value))} />
        </label>

        {isCompact ? (
          <>
            <input type="hidden" name="email" value={draft.email} />
            <input type="hidden" name="note" value={draft.note} />
          </>
        ) : (
          <>
            <label className="grid gap-1.5 text-sm font-medium text-[var(--ink-muted)] sm:col-span-2 sm:gap-2">
              {copy.email}
              <input type="email" name="email" placeholder="ban@example.com" className="field" value={draft.email} onChange={(event) => setDraft((current) => buildDraftFromState(current, "email", event.target.value))} />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-[var(--ink-muted)] sm:col-span-2 sm:gap-2">
              {copy.note}
              <textarea rows={3} name="note" placeholder={copy.notePlaceholder} className="field resize-none" value={draft.note} onChange={(event) => setDraft((current) => buildDraftFromState(current, "note", event.target.value))} />
            </label>
          </>
        )}

        {state.message ? (
          <div className={`rounded-[18px] px-4 py-3 text-sm sm:col-span-2 ${state.status === "success" ? "bg-[var(--success-soft)] text-[var(--success-ink)]" : state.status === "error" ? "bg-[var(--danger-soft)] text-[var(--danger-ink)]" : "bg-[var(--card-soft)] text-[var(--ink-muted)]"}`}>
            <div>{state.message}</div>
            {state.status === "error" ? (
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={siteConfig.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white"
                >
                  {uiCopy[locale].cta.zalo}
                </a>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-strong)]"
                >
                  {uiCopy[locale].cta.call}
                </a>
                <a
                  href={siteConfig.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ink-strong)]"
                >
                  Messenger
                </a>
              </div>
            ) : null}
          </div>
        ) : null}

        {showInlineValidation ? (
          <div className="rounded-[18px] bg-[var(--card-soft)] px-4 py-3 text-sm leading-5 text-[var(--ink-muted)] sm:col-span-2">
            {validation.errors[0]}
          </div>
        ) : null}

        <SubmitButton label={submitLabel ?? copy.submit} disabled={!validation.valid} locale={locale} />

        {(commitmentText ?? copy.compactCommitment) ? <p className="text-sm leading-5 text-[var(--ink-soft)] sm:col-span-2">{commitmentText ?? copy.compactCommitment}</p> : null}
      </form>
    </div>
  );
}
