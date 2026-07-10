import { sourcingPartners, sourcingPartnerCount } from "@/content/site";

/**
 * PartnerMarquee — the sourcing network in motion. The 8 named partners
 * stream past with a closing count; the track is duplicated so the CSS
 * -50% translation loops seamlessly. Pauses on hover; freezes at a full
 * static row under prefers-reduced-motion (global CSS rule).
 */
export default function PartnerMarquee({ className = "" }: { className?: string }) {
  const items = [
    ...sourcingPartners,
    `+ ${sourcingPartnerCount - sourcingPartners.length} more partners`,
  ];

  return (
    <div className={`marquee ${className}`} aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-14">
            {items.map((p) => (
              <span
                key={`${copy}-${p}`}
                className="flex items-center gap-14 whitespace-nowrap font-display text-xl text-ink-soft/80"
              >
                {p}
                <span className="mint-mark h-1.5 w-1.5" aria-hidden />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
