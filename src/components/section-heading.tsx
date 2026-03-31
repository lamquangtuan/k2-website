import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
        {description ? <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ink-muted)]">{description}</p> : null}
      </div>
      {actionLabel && actionHref ? (
        <Link href={actionHref} className="text-sm font-semibold text-[var(--brand)]">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
