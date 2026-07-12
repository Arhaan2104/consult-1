import LineIcon from "@/components/LineIcon";

/**
 * FeatureCard — the house benefit / feature card.
 *
 * The old cards stacked a small icon, a title and a line of body at the top of
 * a tall porcelain plate, leaving a pool of dead space beneath. This composes
 * the plate deliberately instead: a minted icon seat (or an engraved index)
 * anchors the TOP, the copy sits at the BASE, and a short engraved-gold rule
 * divides title from body. `justify-between` spends the card's height as framed
 * negative space rather than empty air — so every card reads intentional,
 * structured and crisp, at any height the grid hands it.
 *
 * Pure presentation, no motion — it's dropped inside a <StaggerItem> so the
 * reveal lives on the wrapper and the card's own hover (card-crisp) stays clean.
 */
export default function FeatureCard({
  icon,
  index,
  title,
  body,
  titleClassName = "text-lg sm:text-xl",
  className = "",
}: {
  icon?: string;
  index?: string;
  title: string;
  body: string;
  titleClassName?: string;
  className?: string;
}) {
  return (
    <article
      className={`card-crisp group flex h-full flex-col justify-between gap-7 rounded-2xl p-6 sm:p-7 ${className}`}
    >
      {icon ? (
        <span className="icon-plate transition-transform duration-300 ease-[var(--ease-rkb)] group-hover:-translate-y-0.5">
          <LineIcon name={icon} className="w-6 text-gold" />
        </span>
      ) : (
        <span className="font-display text-3xl leading-none text-gold tabular-nums">
          {index}
        </span>
      )}

      <div>
        <span
          className={`flex min-h-[2.75em] flex-col justify-end font-display leading-snug text-ink ${titleClassName}`}
        >
          {title}
        </span>
        <span className="title-rule" aria-hidden />
        <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
      </div>
    </article>
  );
}
