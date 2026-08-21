/**
 * Generates the brand assets that aren't photographs: favicons and the social
 * share card.
 *
 *   node scripts/make-brand-assets.mjs
 *
 * Favicon: the wordmark is a wide script signature and turns to mush below
 * about 48px, so the icon is a monogram instead — the gold F on ink, which is
 * what actually survives at 16px in a browser tab.
 *
 * OG card: the hero photo is a 2:3 portrait. Social platforms crop to 1.91:1,
 * which would have cut the frame down to a band of someone's forearm. This
 * builds a real 1200x630 card: the photo weighted to the faces, an ink scrim,
 * and the wordmark over it.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUB = path.join(process.cwd(), "public");
const IMG = path.join(PUB, "images");

const INK = "#1B1714";
const GOLD = "#E3B778";
const CREAM = "#F7F2EB";

// --------------------------------------------------------------- favicons
// Georgia is present on Windows and macOS and is a close enough cousin of the
// Bodoni display face for a single letterform at icon size. librsvg resolves
// it by name; the serif fallback covers anything else.
function monogramSvg(size) {
  const r = Math.round(size * 0.22);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${INK}"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
          font-family="Georgia, 'Times New Roman', serif" font-style="italic"
          font-size="${Math.round(size * 0.62)}" fill="${GOLD}">F</text>
  </svg>`);
}

const icons = [
  ["favicon-16.png", 16],
  ["favicon-32.png", 32],
  ["favicon-48.png", 48],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["apple-touch-icon.png", 180],
];

for (const [name, size] of icons) {
  await sharp(monogramSvg(size)).png().toFile(path.join(PUB, name));
}

// A real multi-size .ico so search engines and older browsers get something.
// sharp cannot write ICO, so the header is assembled by hand — it is a short,
// well-specified format: 6-byte header, 16 bytes per entry, then the PNG
// payloads (PNG-in-ICO is valid and supported everywhere since IE11).
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(
  icoSizes.map((s) => sharp(monogramSvg(s)).png().toBuffer()),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4);

let offset = 6 + 16 * pngs.length;
const entries = [];
for (let i = 0; i < pngs.length; i++) {
  const e = Buffer.alloc(16);
  e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 0); // width
  e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  entries.push(e);
}
fs.writeFileSync(path.join(PUB, "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));

// --------------------------------------------------------------- OG card
const OG_W = 1200;
const OG_H = 630;

const photo = await sharp(path.join(IMG, "hero-lounge.jpg"))
  .resize(OG_W, OG_H, { fit: "cover", position: "top" })
  .toBuffer();

const scrim = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${INK}" stop-opacity="0.92"/>
      <stop offset="46%" stop-color="${INK}" stop-opacity="0.66"/>
      <stop offset="100%" stop-color="${INK}" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#g)"/>
</svg>`);

const MARK_W = 330;
const MARK_TOP = 132;
const MARK_LEFT = 68;
const wordmark = await sharp(path.join(IMG, "logo-wordmark-light.png"))
  .resize({ width: MARK_W })
  .toBuffer();

// The script's swash and the lash flick both sit inside the mark's bounding
// box, so the first text baseline has to clear the image's real bottom edge —
// measured, not guessed, or the descender crosses the descriptor line.
const markMeta = await sharp(wordmark).metadata();
const markBottom = MARK_TOP + markMeta.height;
const line1 = markBottom + 46;
const line2 = line1 + 56;
const line3 = line2 + 62;

const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <text x="${MARK_LEFT + 4}" y="${line1}" font-family="Georgia, serif" font-size="27"
        letter-spacing="6.5" fill="${CREAM}" opacity="0.92">LASH LOUNGE &amp; DAY SPA</text>
  <text x="${MARK_LEFT + 6}" y="${line2}" font-family="Helvetica, Arial, sans-serif" font-size="19"
        letter-spacing="5" fill="${GOLD}">OCEANSIDE, CALIFORNIA</text>
  <text x="${MARK_LEFT + 6}" y="${line3}" font-family="Georgia, serif" font-size="26"
        fill="${CREAM}" opacity="0.78">Lashes · Brows · Skin · Nails</text>
</svg>`);

await sharp(photo)
  .composite([
    { input: scrim, blend: "over" },
    { input: wordmark, top: MARK_TOP, left: MARK_LEFT },
    { input: text, blend: "over" },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(IMG, "og-card.jpg"));

console.log("\n  wrote favicon.ico + 6 icon sizes -> public/");
console.log("  wrote og-card.jpg (1200x630) -> public/images/\n");
