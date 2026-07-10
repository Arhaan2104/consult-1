/**
 * generate-brand-assets.mjs — one-shot generator for the RKB favicon / OG suite.
 *
 * Everything is authored as SVG with ALL text converted to vector outlines
 * (fontkit), so the rendered pixels are identical on every machine — no
 * fontconfig, no system-font fallbacks. Rasterised with sharp (libvips/rsvg).
 *
 * Outputs:
 *   app/favicon.ico            16 + 32 + 48, 32-bit BMP entries (max legacy compat)
 *   app/icon.svg               vector favicon, path-only (no font dependency)
 *   app/apple-icon.png         180×180 full-bleed (iOS applies its own mask)
 *   app/opengraph-image.png    1200×630, rendered @2× and downscaled
 *   app/twitter-image.png      same art, explicit twitter card image
 *   public/icon-192.png        manifest icon (any)
 *   public/icon-512.png        manifest icon (any)
 *   public/icon-192-maskable.png / public/icon-512-maskable.png
 *
 * Usage: node scripts/generate-brand-assets.mjs [--preview <dir>]
 *   --preview renders everything into <dir> instead of app/ + public/.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const fontkit = createRequire(import.meta.url)("fontkit");
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const previewIdx = process.argv.indexOf("--preview");
const PREVIEW_DIR = previewIdx > -1 ? process.argv[previewIdx + 1] : null;

const out = (rel) =>
  PREVIEW_DIR ? path.join(PREVIEW_DIR, path.basename(rel)) : path.join(ROOT, rel);

/* ---------------------------------------------------------------- palette */
// Mirrors globals.css — the navy vault + minted-gold register.
const C = {
  vault: "#081c38",
  deep: "#0b2447",
  deep2: "#0f2c54",
  litNavy: "#17396d",
  goldDeep: "#b88624",
  gold: "#d9a53f",
  goldHi: "#e9c368",
  ivory: "#e8eef7",
  ivorySoft: "#9fb2cd",
};

/* ------------------------------------------------------------------ fonts */
// Variable TTFs (OFL) fetched on demand from the google/fonts repo — the dir
// is gitignored; the woff2 subsets Next ships can't be parsed for outlines.
const FONT_SOURCES = {
  "PlusJakartaSans.ttf":
    "https://raw.githubusercontent.com/google/fonts/main/ofl/plusjakartasans/PlusJakartaSans%5Bwght%5D.ttf",
  "EBGaramond.ttf":
    "https://raw.githubusercontent.com/google/fonts/main/ofl/ebgaramond/EBGaramond%5Bwght%5D.ttf",
};

async function ensureFonts() {
  const dir = path.join(ROOT, "scripts/fonts");
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, url] of Object.entries(FONT_SOURCES)) {
    const dest = path.join(dir, name);
    if (fs.existsSync(dest)) continue;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`font fetch failed: ${url} → ${res.status}`);
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  }
}
await ensureFonts();

const jakarta = fontkit.openSync(path.join(ROOT, "scripts/fonts/PlusJakartaSans.ttf"));
const garamond = fontkit.openSync(path.join(ROOT, "scripts/fonts/EBGaramond.ttf"));
const jakartaX = (wght) => jakarta.getVariation({ wght });
const garamondX = (wght) => garamond.getVariation({ wght });

/**
 * Convert a text run to positioned SVG <path> elements.
 * Returns { svg, width } — width in target px, including letterSpacing.
 */
function textPaths(font, text, size, { letterSpacing = 0, fill = "#000" } = {}) {
  const s = size / font.unitsPerEm;
  const run = font.layout(text);
  let x = 0;
  let svg = "";
  run.glyphs.forEach((glyph, i) => {
    const pos = run.positions[i];
    const d = glyph.path.toSVG();
    if (d) {
      const gx = (x + pos.xOffset * s).toFixed(2);
      const gy = (-pos.yOffset * s).toFixed(2);
      svg += `<path transform="translate(${gx} ${gy}) scale(${s} ${-s})" d="${d}" fill="${fill}"/>`;
    }
    x += pos.xAdvance * s + letterSpacing;
  });
  return { svg, width: x - (text.length ? letterSpacing : 0) };
}

/**
 * The ₹ coin glyph as a centred path (EB Garamond — the engraved serif of the
 * seal). Centred optically on its ink bounding box around (0,0).
 */
function rupeePath(size, wght = 560, family = "garamond") {
  const f = family === "jakarta" ? jakartaX(wght) : garamondX(wght);
  const s = size / f.unitsPerEm;
  const glyph = f.glyphForCodePoint(0x20b9);
  const b = glyph.path.bbox;
  const cx = ((b.minX + b.maxX) / 2) * s;
  const cy = ((b.minY + b.maxY) / 2) * s;
  return {
    transform: `translate(${(-cx).toFixed(2)} ${cy.toFixed(2)}) scale(${s} ${-s})`,
    d: glyph.path.toSVG(),
  };
}

/* ---------------------------------------------- guilloché geometry (seal) */
const TAU = Math.PI * 2;

/** Superposed rosette — same family as components/HeroSeal.tsx. */
function rosette(k, R1, R2, phase = 0, steps = 720) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU;
    const x = R1 * Math.cos(t) + R2 * Math.cos(k * t + phase);
    const y = R1 * Math.sin(t) + R2 * Math.sin(k * t + phase);
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d + "Z";
}

/** Sinusoidally modulated ring — one strand of a guilloché braid. */
function braid(R, amp, lobes, phase = 0, steps = 720) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU;
    const rr = R + amp * Math.cos(lobes * t + phase);
    d += `${i ? "L" : "M"}${(rr * Math.cos(t)).toFixed(1)} ${(rr * Math.sin(t)).toFixed(1)} `;
  }
  return d + "Z";
}

/** Machined minute-track ticks between radii r0..r1, every `deepEvery` cut deeper. */
function ticks(n, rShallow0, rShallow1, rDeep0, rDeep1, deepEvery = 12, w = 1) {
  let svg = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    const deep = i % deepEvery === 0;
    const r0 = deep ? rDeep0 : rShallow0;
    const r1 = deep ? rDeep1 : rShallow1;
    svg += `<line x1="${(r0 * Math.sin(a)).toFixed(1)}" y1="${(-r0 * Math.cos(a)).toFixed(1)}" x2="${(r1 * Math.sin(a)).toFixed(1)}" y2="${(-r1 * Math.cos(a)).toFixed(1)}" stroke-width="${deep ? w * 1.5 : w}"${deep ? "" : ' opacity="0.7"'}/>`;
  }
  return svg;
}

/* ----------------------------------------------------------- shared defs */
const goldStroke = (id) => `
  <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${C.goldHi}"/>
    <stop offset="0.45" stop-color="${C.gold}"/>
    <stop offset="1" stop-color="${C.goldDeep}"/>
  </linearGradient>`;

/* ------------------------------------------------------------- app icon */
/**
 * The app icon: a minted navy coin-plate. Detail tiers keep it crisp:
 *   large ≥180 — ticks + double ring + rosette + ₹
 *   mid   48–128 — double ring + ₹
 *   small ≤32 — single ring + big ₹
 * Drawn in a 0 0 512 512 viewBox, content centred at 256.
 */
function iconSVG({ px, fullBleed = false, safeZone = false }) {
  const tier = px >= 180 ? "large" : px >= 48 ? "mid" : px >= 24 ? "small" : "tiny";
  const k = 512 / px; // 1 viewBox unit = 1/k device px — scale hairlines by k
  const rx = fullBleed ? 0 : 116; // ≈22.6% — iOS-adjacent superellipse feel
  // Maskable icons must survive a centred circle crop of 80% of the canvas.
  const content = safeZone ? 0.72 : 1;

  const defs = `
    <radialGradient id="bg" cx="0.32" cy="0.24" r="1.15">
      <stop offset="0" stop-color="${C.litNavy}"/>
      <stop offset="0.55" stop-color="${C.deep}"/>
      <stop offset="1" stop-color="${C.vault}"/>
    </radialGradient>
    ${goldStroke("au")}
    <linearGradient id="sheen" x1="0" y1="0" x2="0.55" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.13"/>
      <stop offset="0.45" stop-color="#ffffff" stop-opacity="0.03"/>
      <stop offset="0.78" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="${C.goldHi}" stop-opacity="0.9"/>
      <stop offset="0.5" stop-color="${C.goldDeep}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${C.gold}" stop-opacity="0.75"/>
    </linearGradient>`;

  // Ring + glyph geometry per tier (viewBox units). Smaller sizes trade
  // ornament for ink: heavier glyph weight, fewer rings, no border.
  const geo = {
    large: { ring: 176, ring2: 150, rupee: 190, ringW: 5, ring2W: 2.2, wght: 560, border: true },
    mid: { ring: 180, ring2: 152, rupee: 200, ringW: 9, ring2W: 4, wght: 620, border: true },
    // ≤32px: the serif hairlines smudge — switch to the geometric sans ₹.
    small: { ring: 194, ring2: 0, rupee: 244, ringW: 18, ring2W: 0, wght: 800, border: true, family: "jakarta" },
    tiny: { ring: 0, ring2: 0, rupee: 330, ringW: 0, ring2W: 0, wght: 800, border: false, family: "jakarta" },
  }[tier];

  const rupee = rupeePath(geo.rupee, geo.wght, geo.family);

  let art = "";
  if (tier === "large") {
    art += `<g stroke="url(#au)" fill="none" opacity="0.9">${ticks(72, 197, 205, 194, 208, 12, 1.6)}</g>`;
    art += `<g stroke="url(#au)" fill="none" opacity="0.55">
      <path d="${braid(128, 8, 22)}" stroke-width="1"/>
      <path d="${braid(128, 8, 22, Math.PI)}" stroke-width="1"/>
      <path d="${rosette(16, 100, 18)}" stroke-width="1"/>
      <path d="${rosette(16, 100, 18, Math.PI / 16)}" stroke-width="1" opacity="0.7"/>
    </g>`;
  }
  if (geo.ring)
    art += `<circle r="${geo.ring}" fill="none" stroke="url(#au)" stroke-width="${geo.ringW}"/>`;
  if (geo.ring2)
    art += `<circle r="${geo.ring2}" fill="none" stroke="url(#au)" stroke-width="${geo.ring2W}" opacity="0.75"/>`;
  art += `<g transform="${rupee.transform}"><path d="${rupee.d}" fill="url(#au)"/></g>`;

  // Large tiers: a faint dark rim under the gold ring lifts it off the plate.
  const plateShadow =
    tier === "large" || tier === "mid"
      ? `<circle r="${geo.ring}" fill="none" stroke="#04101f" stroke-width="${geo.ringW * 2.4}" opacity="0.35"/>`
      : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${px}" height="${px}">
  <defs>${defs}</defs>
  <rect width="512" height="512" rx="${rx}" fill="url(#bg)"/>
  <g transform="translate(256 256) scale(${content})">
    ${plateShadow}${art}
  </g>
  <rect x="${1.5 * k}" y="${1.5 * k}" width="${512 - 3 * k}" height="${512 - 3 * k}" rx="${Math.max(rx - 1.5 * k, 0)}" fill="none" stroke="url(#edge)" stroke-width="${1.5 * k}" opacity="${fullBleed || !geo.border ? 0 : 0.8}"/>
  <rect width="512" height="512" rx="${rx}" fill="url(#sheen)"/>
</svg>`;
}

/* --------------------------------------------------------------- OG card */
function ogSVG() {
  const W = 1200;
  const H = 630;
  const MX = 92; // left margin
  // Medallion bleeds off the right edge — a coin caught mid-frame.
  const med = { x: 1048, y: 315, R: 252 };

  /* -- text runs, all outlined -- */
  const eyebrow = textPaths(jakartaX(640), "R.K. BANSAL FINANCE PVT. LTD.", 21, {
    letterSpacing: 7.2,
    fill: C.gold,
  });
  const h1a = textPaths(jakartaX(800), "Personal lending", 88, {
    letterSpacing: -1.6,
    fill: C.ivory,
  });
  const h2a = textPaths(jakartaX(800), "since ", 88, { letterSpacing: -1.6, fill: C.ivory });
  const h2b = textPaths(jakartaX(800), "1984.", 88, { letterSpacing: -1.6, fill: "url(#au)" });
  const sub = textPaths(garamondX(520), "Transparent, fully digital · RBI-registered NBFC", 31, {
    letterSpacing: 0.3,
    fill: C.ivorySoft,
  });
  const url = textPaths(jakartaX(600), "rkbfinance.in", 21, {
    letterSpacing: 3.6,
    fill: C.ivorySoft,
  });

  const rupee = rupeePath(96);

  /* -- medallion line-work (local coords, r≈232) -- */
  const medallion = `
  <g transform="translate(${med.x} ${med.y})">
    <circle r="${med.R + 40}" fill="url(#glow)"/>
    <g stroke="url(#au)" fill="none">
      ${ticks(96, med.R - 4.5, med.R - 1, med.R - 6, med.R, 12, 1.1)}
      <circle r="${med.R - 12}" stroke-width="2"/>
      <circle r="${med.R - 24}" stroke-width="0.9" opacity="0.75"/>
      <g opacity="0.8">
        <path d="${braid(196, 9, 26)}" stroke-width="0.8"/>
        <path d="${braid(196, 9, 26, Math.PI)}" stroke-width="0.8"/>
        <path d="${rosette(20, 152, 24)}" stroke-width="0.75"/>
        <path d="${rosette(20, 152, 24, Math.PI / 20)}" stroke-width="0.75" opacity="0.7"/>
        <circle r="118" stroke-width="0.7" opacity="0.8"/>
        <path d="${rosette(24, 88, 16)}" stroke-width="0.75" opacity="0.9"/>
        <path d="${braid(102, 6, 28)}" stroke-width="0.7" opacity="0.8"/>
      </g>
      <circle r="64" stroke-width="2.4"/>
      <circle r="54" stroke-width="1" opacity="0.75"/>
    </g>
    <g transform="${rupee.transform}"><path d="${rupee.d}" fill="url(#au)"/></g>
  </g>`;

  /* -- background engraving field: huge faint rosette behind everything -- */
  const field = `
  <g transform="translate(${med.x} ${med.y})" stroke="${C.gold}" fill="none" opacity="0.05">
    <path d="${rosette(18, 430, 60)}" stroke-width="1"/>
    <path d="${rosette(18, 430, 60, Math.PI / 18)}" stroke-width="1"/>
    <path d="${braid(520, 16, 30)}" stroke-width="1"/>
  </g>`;

  const baselineH1 = 308;
  const baselineH2 = 404;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <radialGradient id="bgLight" cx="0.24" cy="0.18" r="1.25">
      <stop offset="0" stop-color="${C.deep2}"/>
      <stop offset="0.5" stop-color="${C.deep}"/>
      <stop offset="1" stop-color="${C.vault}"/>
    </radialGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${C.gold}" stop-opacity="0.13"/>
      <stop offset="0.75" stop-color="${C.gold}" stop-opacity="0.045"/>
      <stop offset="1" stop-color="${C.gold}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.72">
      <stop offset="0" stop-color="#000000" stop-opacity="0"/>
      <stop offset="0.72" stop-color="#02080f" stop-opacity="0"/>
      <stop offset="1" stop-color="#02080f" stop-opacity="0.5"/>
    </radialGradient>
    ${goldStroke("au")}
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.goldHi}"/>
      <stop offset="1" stop-color="${C.goldDeep}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bgLight)"/>
  ${field}
  ${medallion}

  <!-- eyebrow -->
  <g transform="translate(${MX} 158)">${eyebrow.svg}</g>
  <rect x="${MX + 2}" y="176" width="56" height="2.5" fill="url(#rule)"/>

  <!-- headline -->
  <g transform="translate(${MX} ${baselineH1})">${h1a.svg}</g>
  <g transform="translate(${MX} ${baselineH2})">${h2a.svg}</g>
  <g transform="translate(${MX + h2a.width} ${baselineH2})">${h2b.svg}</g>

  <!-- serif subline -->
  <g transform="translate(${MX + 2} 468)">${sub.svg}</g>

  <!-- footer: rule + url -->
  <rect x="${MX + 2}" y="548" width="44" height="2.5" fill="url(#rule)"/>
  <g transform="translate(${MX + 64} 557)">${url.svg}</g>

  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  <rect x="0.75" y="0.75" width="${W - 1.5}" height="${H - 1.5}" fill="none" stroke="${C.gold}" stroke-opacity="0.28" stroke-width="1.5"/>
</svg>`;
}

/* ------------------------------------------------------------ rasterise */
async function renderPNG(svg, w, h, dest, { supersample = 2 } = {}) {
  const buf = await sharp(Buffer.from(svg), { density: 72 * supersample })
    .resize(w, h, { fit: "fill" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  fs.writeFileSync(dest, buf);
  return buf;
}

/** Raw RGBA pixels for the ICO packer. */
async function renderRaw(svg, size, supersample = 4) {
  return sharp(Buffer.from(svg), { density: 72 * supersample })
    .resize(size, size, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();
}

/* ---------------------------------------------------------- ICO packing */
/** One 32-bit BGRA BMP entry (BITMAPINFOHEADER + bottom-up pixels + AND mask). */
function bmpEntry(rgba, size) {
  const rowMask = Math.ceil(size / 32) * 4; // AND mask row, 32-bit padded
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0); // biSize
  header.writeInt32LE(size, 4); // biWidth
  header.writeInt32LE(size * 2, 8); // biHeight = colour + mask
  header.writeUInt16LE(1, 12); // biPlanes
  header.writeUInt16LE(32, 14); // biBitCount
  header.writeUInt32LE(size * size * 4 + rowMask * size, 20); // biSizeImage

  const px = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    const src = (size - 1 - y) * size * 4; // bottom-up
    for (let x = 0; x < size; x++) {
      const s = src + x * 4;
      const d = (y * size + x) * 4;
      px[d] = rgba[s + 2]; // B
      px[d + 1] = rgba[s + 1]; // G
      px[d + 2] = rgba[s]; // R
      px[d + 3] = rgba[s + 3]; // A
    }
  }
  const mask = Buffer.alloc(rowMask * size); // all-visible; alpha channel rules
  return Buffer.concat([header, px, mask]);
}

function packICO(entries /* [{size, data(bmp)}] */) {
  const dir = Buffer.alloc(6);
  dir.writeUInt16LE(1, 2); // type: icon
  dir.writeUInt16LE(entries.length, 4);
  let offset = 6 + entries.length * 16;
  const heads = [];
  for (const e of entries) {
    const h = Buffer.alloc(16);
    h.writeUInt8(e.size >= 256 ? 0 : e.size, 0);
    h.writeUInt8(e.size >= 256 ? 0 : e.size, 1);
    h.writeUInt16LE(1, 4); // planes
    h.writeUInt16LE(32, 6); // bpp
    h.writeUInt32LE(e.data.length, 8);
    h.writeUInt32LE(offset, 12);
    offset += e.data.length;
    heads.push(h);
  }
  return Buffer.concat([dir, ...heads, ...entries.map((e) => e.data)]);
}

/* ---------------------------------------------------------------- main */
async function main() {
  if (PREVIEW_DIR) fs.mkdirSync(PREVIEW_DIR, { recursive: true });

  // App icons -------------------------------------------------------------
  await renderPNG(iconSVG({ px: 180, fullBleed: true }), 180, 180, out("app/apple-icon.png"), { supersample: 6 });
  await renderPNG(iconSVG({ px: 192 }), 192, 192, out("public/icon-192.png"), { supersample: 6 });
  await renderPNG(iconSVG({ px: 512 }), 512, 512, out("public/icon-512.png"), { supersample: 3 });
  await renderPNG(iconSVG({ px: 192, fullBleed: true, safeZone: true }), 192, 192, out("public/icon-192-maskable.png"), { supersample: 6 });
  await renderPNG(iconSVG({ px: 512, fullBleed: true, safeZone: true }), 512, 512, out("public/icon-512-maskable.png"), { supersample: 3 });

  // icon.svg — vector favicon; browsers show it at tab size, so it uses the
  // small-tier design. All glyphs are outlined: no font dependency.
  fs.writeFileSync(out("app/icon.svg"), iconSVG({ px: 32 }));

  // favicon.ico -----------------------------------------------------------
  const icoEntries = [];
  for (const size of [16, 32, 48]) {
    const rgba = await renderRaw(iconSVG({ px: size }), size, size <= 32 ? 8 : 6);
    icoEntries.push({ size, data: bmpEntry(rgba, size) });
  }
  fs.writeFileSync(out("app/favicon.ico"), packICO(icoEntries));

  // OG / twitter ----------------------------------------------------------
  const og = ogSVG();
  await renderPNG(og, 1200, 630, out("app/opengraph-image.png"), { supersample: 2 });
  fs.copyFileSync(out("app/opengraph-image.png"), out("app/twitter-image.png"));

  console.log("done →", PREVIEW_DIR ?? "app/ + public/");
}

export { iconSVG, ogSVG, renderPNG, renderRaw };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
