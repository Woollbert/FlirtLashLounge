# Flirt Lash Lounge — build notes & launch checklist

Built 2026-08-20. Stack matches AviaraDesignCo: Next.js 15 (App Router) +
React 19 + Tailwind 3 + TypeScript, deployed as static pages wherever possible.

The app lives in [`flirt-site/`](flirt-site/). `npm install && npm run dev`
serves it on **port 3100** (Aviara uses 3000, so both can run at once).

---

## Where the content came from

The old site's domain was lost, so nothing could be exported from the CMS. Copy
was recovered from two places and is **verbatim** wherever it says so:

| Source | What came from it |
|---|---|
| `~/Downloads/flirtlash-evidence/site-recovery/live/live.json` | Homepage copy, all six service descriptions, Brooklyn's owner letter, all three guest reviews |
| `~/Downloads/flirtlash-evidence/site-recovery/raw/*.html` | Combo Lash Course curriculum + kit contents ($899), Training Kit ($435), gift certificate denominations, booth-rental package |
| `~/Downloads/flirtlash-evidence/site-recovery/export/site/assets/img/` | 65 photos and the gold **Flirt** wordmark |
| flirtluxurylashlounge.com (live) | Current nav structure, service list, Vagaro booking link |

Anything I could **not** verify is marked `TODO_CONFIRM` in the content JSON.
Search for it: `grep -rn TODO_CONFIRM flirt-site/src/content/`

### Photography

`flirt-site/scripts/import-media.mjs` maps the hashed Wix filenames to
meaningful names and writes optimized copies into `public/images`. Re-run it
any time the evidence bundle is updated:

```
cd flirt-site && node scripts/import-media.mjs
```

It also knocks the white background out of the wordmark (→ `logo-wordmark.png`)
and relights the black lash flick to cream for dark sections
(→ `logo-wordmark-light.png`).

**5 slots have generated "PHOTO NEEDED" placeholders** — they are visibly
placeholders on purpose, so nothing ships looking finished when it isn't:

- `service-waxing.jpg` — no waxing photo existed in the library
- `service-bridal.jpg` — likewise. A photo of two women at a brick wall was
  standing in here, which made the card's caption ("a bride having her lashes
  finished") a false statement about the image.
- `team-christina.jpg`, `team-gabriela.jpg`, `team-brooke.jpg` — there are group
  shots, but I can't reliably tell who is who, and captioning the wrong artist's
  face is worse than a placeholder

Drop a real photo at the same path to replace one; nothing else changes —
**except the alt text.** Each placeholder's `imageAlt` currently says
"Placeholder — a portrait of Christina is coming soon", because describing a
photograph that isn't there is a lie to anyone using a screen reader. When you
add the real photo, describe it in the same field.

`brooklyn-owner.jpg` and `team-brooklyn.jpg` are my best identification of
Brooklyn from the library — worth a glance to confirm they are both actually
her before launch.

---

## Launch checklist

### Blockers — do these before the site goes live

1. **Prices.** Every service has `priceFrom: null`, which renders as
   "View pricing". Vagaro's menu isn't scrapeable and I would not invent
   numbers for a real business. Fill in `flirt-site/src/content/services.json`
   (just the digits: `"priceFrom": 145`) and every surface updates at once.
2. **Email address.** `site.json → email` is
   `TODO_CONFIRM_hello@flirtluxurylashlounge.com`. Set the real one.
3. **SMTP for the booking form.** Copy `.env.example` → `.env.local` and set
   the SMTP keys, plus the same in Vercel. Until then `/book`'s form tells
   guests to call instead of silently losing the request.
4. **Memberships are a proposal, not a fact.** No membership program existed
   before — the three tiers on `/gift-cards` are a suggested structure with
   `price: null`. Confirm, price, or delete the section
   (`src/content/offers.json`).
5. **Cancellation & deposit policy.** Two answers in
   `src/content/faq.json` are `TODO_CONFIRM`. Don't publish a policy Brooklyn
   doesn't actually enforce.
6. **Gift card purchase link.** `offers.json → purchaseUrl` needs the Vagaro
   gift certificate URL. Until it's set, the button falls back to "Call to
   purchase" rather than linking nowhere.

### Your call — third-party names on the training page

The graduates photo now leading `/training` is a genuinely great shot, but at
full resolution the **certificates are legible, including four students' full
names**. It came from Brooklyn's own media library and was presumably used in
her marketing already, but "it was public before" is not the same as consent to
republish. Options, in order of effort: confirm those four are fine with it,
blur the name lines, or swap in `training-class.jpg`. I did not decide this one
either way — it is a real person question, not a design question.

### Should do

7. **Hours.** Listings say Mon–Fri 8am–8pm; the old site only said "hours vary
   depending on artist availability". Both are currently shown. Confirm.
8. **Years of experience.** The recovered owner letter says "over 13 years"
   (written ~2024); the current live training page says 15. The letter is
   verbatim so I left it — update the number if you want it current.
9. **Review count.** Structured data claims 95 reviews (Yelp, July 2026).
   Re-check before launch — `testimonials.json → aggregate`.
10. **Artist bios.** Christina, Gabriela, and Brooke's roles and specialties in
    `team.json` are my reconstruction from review mentions. Brooklyn should
    correct them.
11. **GA4 + Search Console.** Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and
    `NEXT_PUBLIC_GSC_VERIFICATION`.
12. **Exact geo coordinates.** `site.json → geo` is approximate; pull the real
    lat/lng from the Google Business Profile so the map pin is exact.

### Not built (deliberately)

- **The shop.** The old site sold 23 lash-supply products plus courses and gift
  certificates through Wix Stores. That's e-commerce — payments, inventory, tax
  — and wasn't in scope. All the product photos and prices are recovered and
  sitting in the evidence bundle if you want it next.

---

## Domain

`flirtluxurylashlounge.com` is canonical and is what's configured in
`site.json`. The old `flirtlashlounge.com` is **not** linked anywhere on the
site — it currently 301s to an unrelated overseas gambling site after the
2026-05-22 third-party transfer. Full evidence trail is in
`~/Downloads/flirtlash-evidence/`.

`next.config.mjs` redirects the old Wix paths so existing links and printed
material still land:

- `/book-online` → `/book`
- `/joinourteam` → `/join-our-team`
- `/meet-the-owner` → `/about`

---

## Structure

```
flirt-site/src/
  content/     ← ALL editable copy lives here as JSON. Start here.
  data/        ← typed accessors over content/ (+ a few derived helpers)
  components/  ← presentational; no copy hardcoded
  app/         ← routes
```

47 static pages: home, services (+8 detail pages), about, gallery, book,
gift-cards, training, join-our-team, service-areas, and 24 local-SEO pages
(3 services × 8 North County cities) generated from `content/cities.json`.

To add a city: add it to `cities.json` and 3 more pages build themselves.

### Two traps worth knowing

**1. Tailwind arbitrary values need underscores where CSS needs spaces:**
`-translate-y-[calc(100%_+_var(--nav-h))]`, not `calc(100%+var(--nav-h))`.
Writing it the natural way emits invalid CSS that silently takes out a chunk of
the utilities layer — `position: fixed` stopped working site-wide and the
navbar fell into normal flow. It builds clean either way, so it only shows up
in the browser.

**2. `backdrop-filter` creates a containing block for `position: fixed`
children.** The navbar gets `backdrop-blur-md` once it goes solid. While the
mobile drawer was nested inside `<header>`, it resolved `top`/`bottom` against
the 76px-tall header instead of the viewport and computed to **height 0** — the
menu opened to nothing on every route except the top of the homepage, which is
the one place the blur class isn't applied yet. The drawer is now a sibling of
`<header>`, and it must stay one.

## Auditing

`npm run build` catches types, not layout. The checks that actually found
things were run in a headless browser against the production build:

- contrast measured on **computed** colors, compositing translucent layers,
  not on the token values
- image weight measured from `currentSrc`, not the `src` fallback (Next puts
  the *largest* encode in `src`, so reading it makes every image look oversized)
- horizontal overflow and tap-target sizes at 360 / 390 / 768px
- the drawer opened on an **interior** route, not the homepage

If you touch the navbar, the color tokens, or `sizes` on an image, re-run those
four. The last one is the reason the height-0 drawer sat there undetected.
