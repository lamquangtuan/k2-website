import { SafeImage } from "@/components/safe-image";
import { getRoomMedia } from "@/lib/media-data";
import type { RoomType } from "@/lib/k2-content";

export function RoomGallery({ room }: { room: RoomType }) {
  const media = getRoomMedia(room.slug);

  return (
    <section className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm sm:p-5">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
        {media.gallery.map((item, index) => (
          <article
            key={`${item.src}-${index}`}
            className={`relative snap-start overflow-hidden rounded-[20px] ${index === 0 ? "min-h-[260px] min-w-[88%] sm:min-h-[320px] sm:min-w-[70%] lg:min-w-[52%]" : "min-h-[260px] min-w-[78%] sm:min-h-[320px] sm:min-w-[48%] lg:min-w-[36%]"}`}
          >
            <SafeImage
              src={item.src}
              alt={item.alt}
              sizes="(min-width: 1024px) 52vw, 88vw"
              className="object-cover"
              position={item.position}
              scale={item.scale}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
