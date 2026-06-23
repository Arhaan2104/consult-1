# Consult Site — RKB Finance & AVA Finance

Two independent, production-grade marketing websites for two RBI-registered NBFCs.
Same structural skeleton, deliberately distinct visual systems.

```
consult-site/
  rkb-finance/   R.K. Bansal Finance — "Heritage Institutional"
  ava-finance/   AVA Finance        — "Modern Fintech"
```

Each is a standalone **Next.js 16 (App Router) + TypeScript + Tailwind v4** app, with
**Motion** (Framer Motion) for orchestrated reveals/micro-interactions and **Lenis**
for smooth scroll. All animation respects `prefers-reduced-motion`.

## Design directions

| | RKB Finance | AVA Finance |
|---|---|---|
| Mood | Established, institutional, trusted (since 1984) | Fast, smart, modern fintech |
| Canvas / Ink / Accent | `#FBF8F2` ivory / `#0E2A3B` navy / `#9A6B3F` bronze | `#FAFAFC` off-white / `#0B1020` indigo-black / `#4F46E5` indigo |
| Type | Fraunces (serif display) + Geist | Sora (geometric sans) + Plus Jakarta Sans |
| Texture | Paper grain, engraved hairline grid | Gradient mesh, dot grid |
| Dividers | Bronze hairline / engraved / accent diamond | Gradient hairline / accent node |
| Motion | Slow, weighted (~0.85s) | Quick, springy (~0.55s) |

## Content rule

All copy, rates, stats, contact details and legal text are reused from the live
sites (`rkbfinance.in`, `avafinances.com` / `kamakshimoney.com`). Each app keeps a
single source of truth in `content/site.ts` and `content/legal.ts` — nothing is
hardcoded in components, and no claims/figures are invented. AVA reuses the
Kamakshi Money stats and testimonials (same legal entity, AVA Finance Pvt. Ltd.).

## Routes (both apps)

```
/                  Home
/about             About
/products          Short Term Loan detail
/contact           Contact + grievance officer
/legal/[slug]      All RBI-mandated policy pages (shared template, statically generated)
```

## Develop

```bash
cd rkb-finance && npm install && npm run dev     # http://localhost:3000
cd ava-finance && npm install && npm run dev     # run on a second port, e.g. PORT=3001 npm run dev
```

## Build & deploy

```bash
npm run build && npm run start
```

Each app is a static-friendly Next.js project and deploys cleanly to Vercel,
Netlify, or any Node host. Point `rkbfinance.in` at `rkb-finance/` and
`avafinances.com` at `ava-finance/`. Update `metadataBase` in each
`app/layout.tsx` if the production domain changes.

## Notes

- Contact forms are styled and client-validated but not wired to a backend — connect
  them to your CRM / email endpoint before launch.
- Replace `app/favicon.ico` with each brand's favicon, and add an OG image
  (`app/opengraph-image.png`) per brand when ready.
