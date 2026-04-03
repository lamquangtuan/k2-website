import Link from "next/link";
import { RoomCard } from "@/components/room-card";
import { roomTypes } from "@/lib/k2-content";
import { uiCopy, withLang, type Locale } from "@/lib/i18n";

export function HomeRoomList({ locale = "vi" }: { locale?: Locale }) {
  const copy = uiCopy[locale];

  return (
    <section id="rooms" className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">{copy.rooms.listEyebrow}</p>
          <h2 className="mt-1 font-display text-xl sm:text-3xl">{copy.rooms.listHeading}</h2>
        </div>
        <Link href={withLang("/rooms", locale)} className="text-sm font-semibold text-[var(--brand)]">
          {copy.cta.seeAll}
        </Link>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        {roomTypes.map((room) => (
          <RoomCard key={room.slug} room={room} locale={locale} />
        ))}
      </div>

      <p className="mt-3 text-center text-sm font-medium text-[var(--ink-muted)]">
        {locale === "vi"
          ? "Giá thay đổi theo ngày – nhắn Zalo để báo giá nhanh"
          : "Prices may vary by date — message on Zalo for a quick quote"}
      </p>
    </section>
  );
}
