"use client";

import { useEffect, useState } from "react";

/**
 * LegalTOC — the sticky policy table of contents, with a scroll-spy.
 *
 * An IntersectionObserver tracks which section owns the reading band (the
 * upper third of the viewport) and lifts a minted-gold tick beside its entry,
 * warming the label to brand blue. No height math, no scroll math — the
 * observer keeps it honest. Purely a reading aid: the anchors work with JS off,
 * and the active state simply never lights up.
 */
export default function LegalTOC({
  items,
}: {
  items: { id: string; heading: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (inBand[0]) setActive(inBand[0].target.id);
      },
      // Reading band: from 22% down to 68% of the viewport height.
      { rootMargin: "-22% 0px -68% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="relative flex flex-col gap-2.5 border-l border-line pl-4">
      {items.map((it) => {
        const on = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            aria-current={on ? "location" : undefined}
            className={`relative text-sm transition-colors duration-300 ease-[var(--ease-rkb)] ${
              on ? "text-accent" : "text-ink-soft hover:text-accent"
            }`}
          >
            <span
              aria-hidden
              className={`absolute -left-4 top-1/2 h-4 w-[2px] -translate-y-1/2 origin-center rounded-full bg-gold transition-transform duration-300 ease-[var(--ease-rkb)] ${
                on ? "scale-y-100" : "scale-y-0"
              }`}
            />
            {it.heading}
          </a>
        );
      })}
    </nav>
  );
}
