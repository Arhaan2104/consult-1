// RKB Finance — logo concept generator
// Emits 5 concept marks (dark + light variants) as standalone SVGs and an
// index.html presentation board with lockups and reduction tests.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = dirname(fileURLToPath(import.meta.url));

// ---- palette (from rkb-finance/app/globals.css) ----
const NAVY = "#112f5b";
const VAULT = "#081c38";
const DEEP2 = "#0f2c54";
const GOLD = "#b88624";
const GOLDB = "#d9a53f";
const IVORY = "#fbf8f2";
const ONDARK = "#e8eef7";

const JAK = `'Plus Jakarta Sans', system-ui, sans-serif`;
const GAR = `'EB Garamond', Georgia, serif`;

// userSpaceOnUse: bounding-box gradient units are undefined on zero-area
// elements (horizontal/vertical gradient-stroked lines vanish in Chromium)
const goldGrad = (id) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">` +
  `<stop offset="0" stop-color="#dfb763"/><stop offset=".45" stop-color="#c99e46"/>` +
  `<stop offset="1" stop-color="#97711f"/></linearGradient>`;

const beadGrad = (id) =>
  `<radialGradient id="${id}" cx=".35" cy=".28" r=".95">` +
  `<stop offset="0" stop-color="#fdeecb"/><stop offset=".45" stop-color="#edc465"/>` +
  `<stop offset=".8" stop-color="#cf9a30"/><stop offset="1" stop-color="#9c7420"/></radialGradient>`;

function ticks(n, r1, r2, stroke, sw, op = 1, longEvery = 0, r1L = r1, r2L = r2) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = (i * 2 * Math.PI) / n - Math.PI / 2;
    const lng = longEvery && i % longEvery === 0;
    const ra = lng ? r1L : r1, rb = lng ? r2L : r2;
    const c = Math.cos(a), si = Math.sin(a);
    s += `<line x1="${(60 + ra * c).toFixed(2)}" y1="${(60 + ra * si).toFixed(2)}" x2="${(60 + rb * c).toFixed(2)}" y2="${(60 + rb * si).toFixed(2)}" stroke="${stroke}" stroke-width="${sw}" opacity="${op}"/>`;
  }
  return s;
}

function braidPath(R, A, lobes, phase) {
  const pts = [];
  for (let d = 0; d <= 360; d += 1.5) {
    const t = (d * Math.PI) / 180;
    const r = R + A * Math.sin(lobes * t + phase);
    pts.push(`${(60 + r * Math.cos(t)).toFixed(2)} ${(60 + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M ${pts.join(" L ")} Z`;
}

// ---------- Concept 1 — The Minted Monogram ----------
function mark1(mode, idp) {
  const dark = mode === "dark";
  const main = dark ? `url(#${idp})` : NAVY;
  const acc = dark ? GOLDB : GOLD;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="RKB minted monogram">
<defs>${goldGrad(idp)}</defs>
<circle cx="60" cy="60" r="57" fill="none" stroke="${main}" stroke-width="1.5"/>
<circle cx="60" cy="60" r="53" fill="none" stroke="${main}" stroke-width=".6" opacity=".75"/>
${ticks(72, 53.5, 56.5, acc, 0.6, 0.9, 12, 53.1, 56.9)}
<circle cx="60" cy="60" r="42" fill="none" stroke="${main}" stroke-width="1"/>
<text x="60" y="46.5" text-anchor="middle" font-family="${GAR}" font-weight="500" font-size="12" fill="${acc}">&#8377;</text>
<text x="61.8" y="71" text-anchor="middle" font-family="${GAR}" font-weight="600" font-size="25.5" letter-spacing=".14em" fill="${main}">RKB</text>
<line x1="42" y1="81.5" x2="53.5" y2="81.5" stroke="${main}" stroke-width=".7" opacity=".85"/>
<line x1="66.5" y1="81.5" x2="78" y2="81.5" stroke="${main}" stroke-width=".7" opacity=".85"/>
<circle cx="60" cy="81.5" r="1.7" fill="${acc}"/>
</svg>`;
}

// ---------- Concept 2 — The Keystone ----------
const SHIELD = "M32 27 L60 18.5 L88 27 V58 C88 80.5 76.5 93.5 60 100.5 C43.5 93.5 32 80.5 32 58 Z";
function mark2(mode, idp) {
  const dark = mode === "dark";
  const g = `url(#${idp})`;
  if (dark) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="RKB keystone">
<defs>${goldGrad(idp)}</defs>
<path d="${SHIELD}" fill="none" stroke="${g}" stroke-width="1.7"/>
<path d="${SHIELD}" fill="none" stroke="${g}" stroke-width=".7" opacity=".9" transform="translate(60 60) scale(.865) translate(-60 -60)"/>
<text x="60" y="73.5" text-anchor="middle" font-family="${JAK}" font-weight="700" font-size="37" fill="${g}">&#8377;</text>
</svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="RKB keystone">
<defs>${goldGrad(idp)}</defs>
<path d="${SHIELD}" fill="${NAVY}"/>
<path d="${SHIELD}" fill="none" stroke="${g}" stroke-width="1" transform="translate(60 60) scale(.865) translate(-60 -60)"/>
<text x="60" y="73.5" text-anchor="middle" font-family="${JAK}" font-weight="700" font-size="37" fill="${g}">&#8377;</text>
</svg>`;
}

// ---------- Concept 3 — The Bleed Mark ----------
function mark3(mode, idp) {
  const dark = mode === "dark";
  const tile = dark ? DEEP2 : NAVY;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="RKB bleed mark">
<defs>${goldGrad(idp)}<clipPath id="${idp}c"><rect x="14" y="14" width="92" height="92" rx="24"/></clipPath></defs>
<rect x="14" y="14" width="92" height="92" rx="24" fill="${tile}"/>
${dark ? `<rect x="14.5" y="14.5" width="91" height="91" rx="23.5" fill="none" stroke="rgba(232,238,247,.16)" stroke-width=".75"/>` : ""}
<g clip-path="url(#${idp}c)">
<text x="66" y="112" text-anchor="middle" font-family="${JAK}" font-weight="800" font-size="92" fill="url(#${idp})">&#8377;</text>
</g>
<rect x="19.5" y="19.5" width="81" height="81" rx="19.5" fill="none" stroke="url(#${idp})" stroke-width=".8" opacity=".85"/>
<text x="28" y="39" font-family="${JAK}" font-weight="700" font-size="10" letter-spacing=".3em" fill="${ONDARK}" opacity=".9">RKB</text>
</svg>`;
}

// ---------- Concept 4 — The Ledger Wordmark ----------
function mark4(mode, idp) {
  const dark = mode === "dark";
  const main = dark ? ONDARK : NAVY;
  const sub = dark ? GOLDB : GOLD;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 120" role="img" aria-label="RKB wordmark">
<defs>${beadGrad(idp)}</defs>
<text x="16" y="80" font-family="${JAK}" font-weight="800" font-size="64" letter-spacing="-0.015em" fill="${main}">RKB</text>
<circle cx="153.5" cy="74" r="5.5" fill="url(#${idp})"/>
<text x="17" y="103" font-family="${JAK}" font-weight="650" font-size="10" letter-spacing=".24em" fill="${sub}">R.K. BANSAL FINANCE &#183; 1984</text>
</svg>`;
}

// ---------- Concept 5 — The Guilloché Seal ----------
function mark5(mode, idp) {
  const dark = mode === "dark";
  const main = dark ? `url(#${idp})` : NAVY;
  const acc = dark ? GOLDB : GOLD;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="RKB guilloche seal">
<defs>${goldGrad(idp)}</defs>
<circle cx="60" cy="60" r="57" fill="none" stroke="${main}" stroke-width="1.2"/>
<circle cx="60" cy="60" r="54.5" fill="none" stroke="${main}" stroke-width=".5" opacity=".7"/>
<path d="${braidPath(40, 5.5, 20, 0)}" fill="none" stroke="${main}" stroke-width=".65" opacity=".85"/>
<path d="${braidPath(40, 5.5, 20, Math.PI)}" fill="none" stroke="${main}" stroke-width=".65" opacity=".85"/>
<circle cx="60" cy="60" r="21.5" fill="none" stroke="${main}" stroke-width="1.1"/>
<circle cx="60" cy="60" r="18" fill="none" stroke="${main}" stroke-width=".5" opacity=".65"/>
<text x="60" y="67.5" text-anchor="middle" font-family="${GAR}" font-weight="500" font-size="21" fill="${acc}">&#8377;</text>
</svg>`;
}

// ---------- assembly ----------
const concepts = [
  {
    n: "01", slug: "minted-monogram", name: "The Minted Monogram",
    tag: "Heritage, evolved",
    why: "A direct evolution of the current coin — but struck, not drawn. Machined bezel ticks, the house double-ring, and an engraved Garamond RKB monogram under a small &#8377; crest. Reads as a mint mark on a sovereign: four decades of lending, pressed into metal.",
    mk: mark1, serif: false,
  },
  {
    n: "02", slug: "keystone", name: "The Keystone",
    tag: "Trust &amp; security",
    why: "A peaked shield — part vault door, part keystone — carrying the rupee. The navy plate with an inset gold hairline is the site&rsquo;s double-stroke motif made monumental. The most institutional of the five: RBI-registered, fully secured, no hidden charges, in one shape.",
    mk: mark2, serif: false,
  },
  {
    n: "03", slug: "bleed-mark", name: "The Bleed Mark",
    tag: "Modern &amp; editorial",
    why: "An oversized minted-gold &#8377; cropped by the tile — money bigger than the frame. The crop is the modern move; the gold gradient and inner hairline keep it in the house. Strongest as an app icon and social avatar; instantly ownable at any size.",
    mk: mark3, serif: false,
  },
  {
    n: "04", slug: "ledger-wordmark", name: "The Ledger Wordmark",
    tag: "Swiss &amp; confident",
    why: "No emblem — the name is the mark. Heavy Jakarta grotesque &ldquo;RKB&rdquo; closed by a single minted bead: the full stop is a coin. Underneath, the registrar&rsquo;s line in tracked caps. The most contemporary option; the bead alone becomes the favicon.",
    mk: mark4, serif: false, wide: true,
  },
  {
    n: "05", slug: "guilloche-seal", name: "The Guilloch&eacute; Seal",
    tag: "Banknote cinema",
    why: "The hero seal&rsquo;s security-engraving language distilled into a static mark: a twenty-lobe guilloch&eacute; braid between coin rings, rupee at the core. It is literally the site&rsquo;s motion identity at rest — the strongest brand-system alignment of the five.",
    mk: mark5, serif: true,
  },
];

let uid = 0;
const id = () => `g${(uid++).toString(36)}`;

// standalone SVG files — embed webfont import so the file renders with the
// correct type when opened directly in a browser (final art will outline glyphs)
const FONT_IMPORT = `<style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..800&amp;family=EB+Garamond:wght@500;600&amp;display=swap');</style>`;
const standalone = (svg) => svg.replace("<defs>", `<defs>${FONT_IMPORT}`);
for (const c of concepts) {
  writeFileSync(join(OUT, `rkb-${c.slug}-gold.svg`), standalone(c.mk("dark", id())));
  writeFileSync(join(OUT, `rkb-${c.slug}-navy.svg`), standalone(c.mk("light", id())));
}

const lockupText = (c, dark) => c.wide ? "" : `
  <div class="lk-text">
    <div class="lk-name${c.serif ? " serif" : ""}" style="color:${dark ? ONDARK : NAVY}">${c.serif ? "R.K.&#8202;Bansal Finance" : "R.K. BANSAL"}</div>
    <div class="lk-sub" style="color:${dark ? GOLDB : GOLD}">FINANCE &#183; SINCE 1984</div>
  </div>`;

const card = (c) => `
<section class="concept">
  <header>
    <div class="numline"><span class="num">${c.n}</span><span class="tag">${c.tag}</span></div>
    <h2>${c.name}</h2>
    <p>${c.why}</p>
  </header>
  <div class="grid${c.wide ? " wide" : ""}">
    <figure class="panel dark"><div class="mk ${c.wide ? "mk-wide" : ""}">${c.mk("dark", id())}</div><figcaption>On vault navy</figcaption></figure>
    <figure class="panel light"><div class="mk ${c.wide ? "mk-wide" : ""}">${c.mk("light", id())}</div><figcaption>On warm ivory</figcaption></figure>
    <figure class="panel dark lockup"><div class="lk">${c.wide ? `<div class="mk-wide">${c.mk("dark", id())}</div>` : `<div class="lk-mk">${c.mk("dark", id())}</div>${lockupText(c, true)}`}</div><figcaption>Primary lockup</figcaption></figure>
    <figure class="panel light sizes"><div class="row${c.wide ? " tight" : ""}">
      ${[72, 44, 28, 18].map((s) => `<div style="width:${c.wide ? Math.round(s * 1.3) : s}px">${c.mk("light", id())}</div>`).join("")}
    </div><figcaption>Reduction test &#8212; 72 / 44 / 28 / 18&#8202;px</figcaption></figure>
  </div>
</section>`;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>RKB Finance — Logo Concepts</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..800&family=EB+Garamond:wght@500;600&display=swap" rel="stylesheet"/>
<style>
  :root { color-scheme: dark; }
  * { margin: 0; box-sizing: border-box; }
  body { background: ${VAULT}; color: ${ONDARK}; font-family: ${JAK}; padding: 72px 64px 96px; }
  .head { max-width: 1240px; margin: 0 auto 64px; border-bottom: 1px solid rgba(217,165,63,.32); padding-bottom: 40px; }
  .eyebrow { font-size: 12px; letter-spacing: .3em; font-weight: 700; color: ${GOLDB}; margin-bottom: 18px; }
  h1 { font-size: 52px; font-weight: 760; letter-spacing: -0.025em; line-height: 1.02; }
  .head p { margin-top: 16px; color: #9fb2cd; max-width: 68ch; font-size: 15.5px; line-height: 1.6; }
  .concept { max-width: 1240px; margin: 0 auto 72px; }
  .numline { display: flex; align-items: baseline; gap: 14px; margin-bottom: 10px; }
  .num { font-size: 13px; font-weight: 700; letter-spacing: .2em; color: ${GOLDB}; }
  .tag { font-size: 11px; font-weight: 650; letter-spacing: .24em; text-transform: uppercase; color: #9fb2cd; }
  h2 { font-size: 30px; font-weight: 740; letter-spacing: -0.018em; margin-bottom: 10px; }
  .concept p { color: #9fb2cd; max-width: 78ch; font-size: 14.5px; line-height: 1.62; margin-bottom: 24px; }
  .grid { display: grid; grid-template-columns: 300px 300px 1fr 1fr; gap: 16px; align-items: stretch; }
  .panel { border-radius: 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px 22px 18px; gap: 18px; position: relative; }
  .panel.dark { background: linear-gradient(160deg, #0f2c54, ${VAULT} 70%); box-shadow: inset 0 0 0 1px rgba(221,231,245,.12), inset 0 0 0 7px ${VAULT === "#081c38" ? "transparent" : "transparent"}; outline: 1px solid rgba(217,165,63,.22); outline-offset: -7px; }
  .panel.light { background: linear-gradient(160deg, #ffffff, ${IVORY} 60%); outline: 1px solid rgba(184,134,36,.25); outline-offset: -7px; box-shadow: inset 0 0 0 1px rgba(17,47,91,.16); }
  figcaption { font-size: 10.5px; letter-spacing: .22em; text-transform: uppercase; font-weight: 650; opacity: .62; }
  .panel.light figcaption { color: #5f6d8a; }
  .mk { width: 176px; } .mk svg { display: block; width: 100%; height: auto; }
  .mk-wide { width: 300px; } .mk-wide svg { display: block; width: 100%; height: auto; }
  .row { display: flex; align-items: center; gap: 26px; } .row svg { display: block; width: 100%; height: auto; }
  .row.tight { gap: 14px; }
  .lk { display: flex; align-items: center; gap: 18px; }
  .lk-mk { width: 88px; } .lk-mk svg { display: block; width: 100%; height: auto; }
  .lk-name { font-size: 25px; font-weight: 760; letter-spacing: -0.012em; white-space: nowrap; }
  .lk-name.serif { font-family: ${GAR}; font-weight: 600; letter-spacing: .01em; }
  .lk-sub { font-size: 9.5px; font-weight: 650; letter-spacing: .26em; margin-top: 6px; white-space: nowrap; }
  .foot { max-width: 1240px; margin: 24px auto 0; color: #5f6d8a; font-size: 12.5px; border-top: 1px solid rgba(221,231,245,.16); padding-top: 22px; line-height: 1.6; }
</style></head>
<body>
  <div class="head">
    <div class="eyebrow">IDENTITY EXPLORATION &#183; AUGUST 2026</div>
    <h1>R.K. Bansal Finance<br/>Five marks, one house.</h1>
    <p>Navy ${NAVY} &#183; minted gold ${GOLD}/${GOLDB} &#183; warm ivory ${IVORY}. Every concept keeps the house double-stroke, the minted-gold metal, and the rupee at the center of the story &#8212; they differ in how loudly they speak: from struck-coin heritage to Swiss-modern restraint.</p>
  </div>
  ${concepts.map(card).join("\n")}
  <div class="foot">All marks are vector (SVG), drawn on a 120-grid, and hold at 18&#8202;px. Type set in Plus Jakarta Sans (grotesque) and EB Garamond (engraved serif) per the site&rsquo;s system. Final artwork would outline all glyphs and ship mono / reversed / clear-space specs.</div>
</body></html>`;

writeFileSync(join(OUT, "index.html"), html);
console.log("wrote", concepts.length * 2, "svgs + index.html to", OUT);
