"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { frame, cancelFrame } from "motion/react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll, driven by motion's frameloop so motion/react's
 * `useScroll` measures scroll position in the same frame Lenis sets it —
 * this is what keeps scroll-linked transforms from jittering.
 *
 * Disabled under prefers-reduced-motion (ref stays null → native scroll;
 * `useScroll` still works against the window).
 *
 * Exposes the Lenis instance via a ref (for imperative use such as the
 * route-change scroll reset). A ref avoids a mount-time re-render of the
 * whole tree; consumers read `.current` inside effects, by which point the
 * provider's effect has run on any navigation.
 */
type LenisRef = MutableRefObject<Lenis | null>;

const LenisContext = createContext<LenisRef | null>(null);

export const useLenis = (): LenisRef | null => useContext(LenisContext);

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Lenis only smooths WHEEL input — touch scrolling is native either way.
    // On touch-only devices (no fine pointer anywhere) skip it entirely, so
    // phones never pay for its permanent rAF loop.
    const finePointer = window.matchMedia("(any-pointer: fine)").matches;
    if (prefersReduced || !finePointer) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = instance;

    // Drive Lenis from motion's frameloop (keepAlive = true).
    const update = (data: { timestamp: number }) => instance.raf(data.timestamp);
    frame.update(update, true);

    // Lenis's built-in ResizeObserver watches <html>, whose border-box is the
    // viewport — it does NOT fire when document scrollHeight changes. Sections
    // using content-visibility:auto unlock from a 640px placeholder to their
    // real height (FAQ is ~3× that), and accordion panels grow on open; without
    // a body observer Lenis keeps a stale scroll limit and wheel input dies
    // mid-section. Recompute whenever <body> layout height actually changes.
    const onBodyResize = () => instance.resize();
    const bodyResizeObserver = new ResizeObserver(onBodyResize);
    bodyResizeObserver.observe(document.body);

    return () => {
      bodyResizeObserver.disconnect();
      cancelFrame(update);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
