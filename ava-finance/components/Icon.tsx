import type { ReactNode } from "react";

/**
 * Sleek, consistent line icons (stroke, currentColor) — no emoji, no fills.
 * One visual language across pillars, advantages and product features.
 */
const paths: Record<string, ReactNode> = {
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4 3 7 7 8 4-1 7-4 7-8V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </>
  ),
  "no-fee": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m6 6 12 12" />
    </>
  ),
  "trending-down": (
    <>
      <path d="M22 17 13.5 8.5 8.5 13.5 2 7" />
      <path d="M16 17h6v-6" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 1 1-2.6-6.3L21 8" />
      <path d="M21 3v5h-5" />
    </>
  ),
  unlock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 7.6-1.7" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="m12 13 4-4" />
      <circle cx="12" cy="13" r="1.1" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M3.5 20a6 6 0 0 1 11 0" />
      <path d="M16 5.2a3.4 3.4 0 0 1 0 6.4" />
      <path d="M20.5 20a6 6 0 0 0-4-5.7" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.4 12 2.6 2.6 4.6-5.2" />
    </>
  ),
  coins: (
    <>
      <circle cx="9" cy="9" r="5" />
      <path d="M14.5 6.6a5 5 0 1 1 0 8.8" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  wallet: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M2.5 10h19" />
      <circle cx="17" cy="14" r="1.2" />
    </>
  ),
  support: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="m5 5 2.4 2.4M16.6 16.6 19 19M19 5l-2.4 2.4M7.4 16.6 5 19" />
    </>
  ),
};

export default function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {paths[name] ?? null}
    </svg>
  );
}
