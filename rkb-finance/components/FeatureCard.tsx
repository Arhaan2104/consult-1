import LineIcon from "@/components/LineIcon";

/**
 * FeatureCard — the house benefit / feature card.
 *
 * A minted icon seat (or engraved index) anchors the TOP, then the title, a
 * short engraved-gold rule and the body stack directly beneath it. Everything
 * is TOP-anchored on purpose: within a row the grid stretches all cards to one
 * height, so a bottom-anchored composition would let cards with shorter body
 * copy float their titles to a different line than their neighbours — the exact
 * misalignment that reads as sloppy. Top-anchoring keeps the icon, the
 * two-line-reserved title, the rule and the first body line all on a shared
 * baseline across the row, no matter how the (still-placeholder) copy wraps.
 * Any surplus height the grid hands a shorter card falls quietly to its base.
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
      className={`card-crisp group flex h-full flex-col gap-6 rounded-2xl p-6 sm:p-7 ${className}`}
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
          className={`flex flex-col justify-end font-display leading-snug text-ink sm:min-h-[2.75em] ${titleClassName}`}
        >
          {title}
        </span>
        <span className="title-rule" aria-hidden />
        <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
      </div>
    </article>
  );
}
