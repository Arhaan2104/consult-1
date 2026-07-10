"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

export type QA = { q: string; a: string };

/**
 * Accessible disclosure accordion (WAI-ARIA pattern):
 * - each question is a real heading (<h3>) wrapping its toggle button, so screen
 *   readers can jump between questions by heading;
 * - the button carries aria-expanded + aria-controls, and the answer panel is a
 *   labelled region (role="region" + aria-labelledby) tied back to the button;
 * - the "+" glyph is aria-hidden (the button text is the accessible name);
 * - honours prefers-reduced-motion (no height sweep, just a fade);
 * - the site-wide :focus-visible ring applies to the full-width toggle.
 */
export default function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-btn-${i}`;
        const panelId = `${uid}-panel-${i}`;
        return (
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
                <motion.div
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
