"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Reveal } from "./Motion";

export type QA = { q: string; a: string };
type Group = { heading: string; items: readonly QA[] };

/**
 * Two-column FAQ where the columns stay locked in vertical registration.
 *
 * Groups are paired left/right. Within a pair the two columns share ONE set of
 * grid row tracks (`grid-template-rows: subgrid`), so every row is sized to the
 * taller of its two cells. That single fact buys us all the alignment we need:
 *
 *  - collapsed questions line up even when one wraps to two lines and its
 *    neighbour is one line;
 *  - opening an answer grows its row and the paired (collapsed) cell stretches
 *    to match, so every question *below* stays aligned across both halves.
 *
 * No height measurement, no resize observers — the browser's grid engine keeps
 * the rows honest. Below `lg` it collapses to a plain stacked column.
 */
export default function FaqColumns({
  groups,
  className = "",
}: {
  groups: readonly Group[];
  className?: string;
}) {
  const pairs: Group[][] = [];
  for (let i = 0; i < groups.length; i += 2) pairs.push(groups.slice(i, i + 2));

  return (
    <div className={`flex flex-col gap-12 ${className}`}>
      {pairs.map((pair, i) => (
        <FaqPair
          key={pair.map((g) => g.heading).join("|")}
          groups={pair}
          delay={i * 0.05}
        />
      ))}
    </div>
  );
}

/** One left/right pair, sharing row tracks so both halves stay in registration. */
function FaqPair({ groups, delay }: { groups: Group[]; delay: number }) {
  // One track for each heading row + the tallest column's questions.
  const rows = 1 + Math.max(...groups.map((g) => g.items.length));

  return (
    <Reveal delay={delay}>
      <div
        className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0"
        style={{ gridTemplateRows: `repeat(${rows}, auto)` }}
      >
        {groups.map((group, col) => (
          <FaqColumn key={group.heading} group={group} col={col} />
        ))}
      </div>
    </Reveal>
  );
}

// Static so Tailwind's extractor keeps the classes.
const COL_START = ["lg:col-start-1", "lg:col-start-2"] as const;

/** A single category column. Owns its own open item (one at a time). */
function FaqColumn({ group, col }: { group: Group; col: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <div
      className={`flex flex-col lg:grid lg:grid-rows-subgrid lg:row-span-full ${COL_START[col] ?? ""}`}
    >
      <p className="eyebrow mb-5 text-ink-faint">{group.heading}</p>

      {group.items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-btn-${i}`;
        const panelId = `${uid}-panel-${i}`;
        return (
          // The row stretches to its neighbour's height; the question stays pinned
          // to the top so every question sits on the same baseline across columns.
          <div key={item.q} className="border-t border-line last:border-b">
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 rounded-sm py-6 text-left"
              >
                <span className="font-display text-xl text-ink sm:text-2xl">
                  {item.q}
                </span>
                <span
                  className={`relative mt-1 h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    duration: reduce ? 0.2 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p className="measure-wide pb-6 text-base leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
