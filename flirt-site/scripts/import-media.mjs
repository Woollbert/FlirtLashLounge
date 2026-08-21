/**
 * One-shot importer for the photography recovered from the old Wix site.
 *
 * The source files live in the evidence bundle under hashed Wix filenames
 * (e962b6_0d1730a4...~mv2.jpg), which tell you nothing about what is in them.
 * This maps each hash to the slot it fills on the new site, resizes it to a
 * sane delivery size, and writes it to public/images under a name that says
 * what it is.
 *
 * Re-run it any time the source bundle is updated:
 *   node scripts/import-media.mjs
 *
 * Slots with no recovered photo get a generated sand-toned card carrying the
 * slot name — visibly a placeholder, so nothing ships looking finished when
 * it is not. Drop a real photo at the same path to replace one.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "C:/Users/darre/Downloads/flirtlash-evidence/site-recovery";
const EXPORT_IMG = path.join(SRC, "export/site/assets/img");
const LIVE_IMG = path.join(SRC, "live/img");
const OUT = path.join(process.cwd(), "public/images");

/** dest name -> [source file, width, {fit position}] */
const MAP = {
  // Hero + section imagery
  "hero-lounge.jpg": ["e962b6_0d1730a45ee644bbbc4e676fbd033611_mv2.jpg", 2400],
  "intro-interior.jpg": ["e962b6_e74c38eafb82481e9b6dd914755abfef_mv2.jpg", 1600],
  "brooklyn-owner.jpg": ["e962b6_f9d40324f1d643abb1bd9b60457936d5_mv2.jpg", 1400],
  "cta-lashes.jpg": ["e962b6_b1d5a36215104863a1c7ce38168c5ca8_mv2.jpg", 1800],

  // Service menu
  "service-eyelash-extensions.jpg": [
    "e962b6_b1d5a36215104863a1c7ce38168c5ca8_mv2.jpg",
    1400,
  ],
  "service-lash-lift.jpg": ["e962b6_9bbbe6cbf3c1435dae4bc60af8cf33fc_mv2.jpg", 1400],
  "service-brow-lamination.jpg": ["7_e962b6_eb4ba1d33f09480ea11fc39dd924fc61~mv2.jpg", 1400],
  "service-permanent-makeup.jpg": ["8_e962b6_0c3b0280d1624fd3a45c0aaaf4ebf05f~mv2.jpg", 1400],
  "service-facials.jpg": ["e962b6_ef760cb464254ac1b507929fc924ca4f_mv2.jpg", 1400],
  "service-nails.jpg": ["e962b6_75fc411e797f42fb9cb89094cae549bf_mv2.jpg", 1400],

  // Team
  "team-brooklyn.jpg": ["e962b6_0a652f94f8e34e1a871413785a4f86f5_mv2.jpg", 1000],

  // Training / academy
  "training-class.jpg": ["e962b6_6835740dc0db4c6fbaea40170ef17504_mv2.jpg", 1800],
  "training-graduates.jpg": ["e962b6_e47bfb17a206485aa9f86dad3a94038d_mv2.jpg", 1600],
  "training-practice.jpg": ["e962b6_a15d6d6e152d40ca862d0fa2b41b56eb_mv2.jpg", 1400],

  // Retail / gift
  "gift-card.jpg": ["e962b6_564b536ef2eb4e26941d5bd13352b7e5_mv2.jpg", 1400],
  "gift-for-you.jpg": ["e962b6_6e05d9f8edce42e7a6b3a8a4100100b2_mv2.jpg", 1400],
  "product-lashes.jpg": ["e962b6_871310fb40384e5aabc4180d9156465f_mv2.jpg", 1400],
  "product-jars.jpg": ["e962b6_8ee41297500b4dd5ab51ca37f38a3c1d_mv2.jpg", 1400],
  "product-adhesive.jpg": ["e962b6_2c834ec3fe5d453294910aa1dd46504a_mv2.jpg", 1400],
  "product-candle-luxe.jpg": ["e962b6_fe6c09a9bd264a559d0611a011ccaeba_mv2.jpg", 1200],
  "product-candle-cozy.jpg": ["e962b6_fef3bf67475742eeb2af8eda93853be3_mv2.jpg", 1200],
  "product-tweezers.jpg": ["e962b6_9d35fa13a2784303874a0a282b0f15cf_mv2.jpg", 1200],

  // Team / culture, used across the gallery and join-our-team
  "team-group.jpg": ["e962b6_2c624479e4b44fa09ae0306b4af236a8_mv2.jpg", 1800],
  "team-group-2.jpg": ["e962b6_1ea6742ab1b4421cb30bdc30d4aee538_mv2.jpg", 1800],
  "team-duo.jpg": ["e962b6_b1f4202f597e46d6bf925ae410816485_mv2.jpg", 1400],
  "team-apron.jpg": ["e962b6_731d4667dfc241cf9e56a4d185232878_mv2.jpg", 1400],

  // Gallery — the work itself. Ordered so the grid alternates between a tight
  // macro and something with a face or a room in it.
  "gallery-01.jpg": ["4_e962b6_b1d5a36215104863a1c7ce38168c5ca8~mv2.jpg", 1400],
  "gallery-02.jpg": ["5_e962b6_9bbbe6cbf3c1435dae4bc60af8cf33fc~mv2.jpg", 1400],
  "gallery-03.jpg": ["6_e962b6_ef760cb464254ac1b507929fc924ca4f~mv2.jpg", 1400],
  "gallery-04.jpg": ["7_e962b6_eb4ba1d33f09480ea11fc39dd924fc61~mv2.jpg", 1400],
  "gallery-05.jpg": ["8_e962b6_0c3b0280d1624fd3a45c0aaaf4ebf05f~mv2.jpg", 1400],
  "gallery-06.jpg": ["9_e962b6_75fc411e797f42fb9cb89094cae549bf~mv2.jpg", 1400],
  "gallery-07.jpg": ["e962b6_d5dafbb1a79a4f16a500e44616460948f002.jpg", 1400],
  "gallery-08.jpg": ["e962b6_86c2ca6abdba472b9f3b8f3305548f8d_mv2.jpg", 1400],
  "gallery-10.jpg": ["e962b6_0d1730a45ee644bbbc4e676fbd033611_mv2.jpg", 1800],
  "gallery-11.jpg": ["e962b6_d306ac47cf5444efb29ff1e1b8327388_mv2.jpg", 1400],
  "gallery-12.jpg": ["e962b6_f552a9ac262f4299a463a602cc0280e8_mv2.jpg", 1400],
};

/** Brand marks. The gold wordmark ships on a white background, which shows as
 *  a white box on every cream section — so the near-white is knocked out to
 *  alpha on the way in. Done here rather than in CSS because no filter can
 *  recover transparency from a flattened JPEG. */
const LOGOS = {
  "logo-wordmark.png": ["e962b6_6eb8d042c27947a789fc9097f3aa0483_mv2.jpg", 900],
  // Same mark for dark sections: the lash flick is drawn in near-black, which
  // vanishes against the ink background, so it is relit to cream. The gold
  // script is left exactly as it is — that is the brand color.
  "logo-wordmark-light.png": [
    "e962b6_6eb8d042c27947a789fc9097f3aa0483_mv2.jpg",
    900,
    { relightDark: true },
  ],
  "logo-card-dark.jpg": ["e962b6_2772f15833d84cc691cabe58ceb00aea_mv2.jpeg", 1200],
  // Aviara Beauty Academy. Ships as a pale beige disc on a white square, and
  // that square reads as a lighter box against the ivory band it sits on.
  "aviara-academy-logo.png": [
    "e962b6_e9fa858a1bf94574beb150bc8cb0b5a1_mv2.png",
    700,
    { cut: 251, ramp: 8 },
  ],
};

async function knockOutWhite(src, dest, width, opts = {}) {
  const { data, info } = await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = info.width * info.height;
  for (let i = 0; i < px; i++) {
    const o = i * 4;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    // Fully transparent above the threshold, then a soft ramp through the
    // antialiased edge pixels so the script's thin strokes keep clean edges
    // instead of picking up a white fringe.
    // `cut` is where the background is considered fully gone and `ramp` is how
    // far below that the antialiased edge is feathered. The default pair suits
    // artwork whose own ink is dark. The academy mark is a pale beige disc
    // sitting only ~30 levels below white, so it needs a much tighter window —
    // the default would have made the disc itself half transparent.
    const cut = opts.cut ?? 246;
    const ramp = opts.ramp ?? 31;
    const lum = (r + g + b) / 3;
    if (lum > cut) data[o + 3] = 0;
    else if (lum > cut - ramp)
      data[o + 3] = Math.round(255 * (1 - (lum - (cut - ramp)) / ramp));

    // Repaint only the genuinely dark, desaturated ink — the lash flick.
    // The gold script is both lighter and strongly warm, so the saturation
    // test keeps it out of this branch.
    if (opts.relightDark && lum < 110 && Math.max(r, g, b) - Math.min(r, g, b) < 40) {
      data[o] = 0xf7;
      data[o + 1] = 0xf2;
      data[o + 2] = 0xeb;
    }
  }

  // The source art floats in a large white canvas. Once that canvas is
  // transparent, trim it away so the mark's own bounding box is the image —
  // otherwise every layout is really positioning invisible padding.
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .trim({ threshold: 1 })
    .toFile(dest);
}

/** Slots with no usable recovered photo. Generated as obvious placeholders. */
const PLACEHOLDERS = {
  "service-waxing.jpg": ["Waxing", 1400, 1050],
  // The library has no bridal photograph. The two-women shot that was here
  // depicts nothing bridal, so it made the card's alt text a false statement.
  "service-bridal.jpg": ["Bridal", 1400, 1050],
  "team-christina.jpg": ["Christina", 1000, 1250],
  "team-gabriela.jpg": ["Gabriela", 1000, 1250],
  "team-brooke.jpg": ["Brooke", 1000, 1250],
};

function findSource(name) {
  for (const dir of [EXPORT_IMG, LIVE_IMG]) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function placeholder(dest, label, w, h) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#EAE0D2"/>
        <stop offset="55%" stop-color="#DCCFBC"/>
        <stop offset="100%" stop-color="#C8B79F"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <text x="50%" y="47%" text-anchor="middle" font-family="Georgia, serif"
          font-size="${Math.round(w / 16)}" fill="#8A6C50">${label}</text>
    <text x="50%" y="56%" text-anchor="middle" font-family="Helvetica, sans-serif"
          font-size="${Math.round(w / 46)}" letter-spacing="${w / 260}" fill="#8A6C50"
          opacity="0.75">PHOTO NEEDED</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(dest);
}

let copied = 0;
let missing = [];

fs.mkdirSync(OUT, { recursive: true });

for (const [dest, [srcName, width]] of Object.entries(MAP)) {
  const src = findSource(srcName);
  const outPath = path.join(OUT, dest);
  if (!src) {
    missing.push(`${dest}  (source not found: ${srcName})`);
    continue;
  }
  const pipeline = sharp(src).resize({
    width,
    withoutEnlargement: true,
  });
  if (dest.endsWith(".png")) {
    await pipeline.png({ compressionLevel: 9 }).toFile(outPath);
  } else {
    // mozjpeg at 82 is the knee of the curve for skin — visually lossless at
    // display size, roughly half the bytes of the Wix originals.
    await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(outPath);
  }
  copied++;
}

for (const [dest, [srcName, width, opts]] of Object.entries(LOGOS)) {
  const src = findSource(srcName);
  if (!src) {
    missing.push(`${dest}  (source not found: ${srcName})`);
    continue;
  }
  const outPath = path.join(OUT, dest);
  if (dest.endsWith(".png")) {
    await knockOutWhite(src, outPath, width, opts);
  } else {
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outPath);
  }
  copied++;
}

for (const [dest, [label, w, h]] of Object.entries(PLACEHOLDERS)) {
  await placeholder(path.join(OUT, dest), label, w, h);
}

console.log(`\n  imported ${copied} photos -> public/images`);
console.log(`  generated ${Object.keys(PLACEHOLDERS).length} placeholders (need real photos):`);
for (const p of Object.keys(PLACEHOLDERS)) console.log(`    - ${p}`);
if (missing.length) {
  console.log(`\n  MISSING SOURCES (${missing.length}):`);
  for (const m of missing) console.log(`    - ${m}`);
}
console.log("");
