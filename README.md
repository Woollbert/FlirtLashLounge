# Flirt Lash Lounge & Day Spa

Website for [Flirt Lash Lounge & Day Spa](https://www.flirtluxurylashlounge.com)
— 1906 Oceanside Blvd Ste Q, Oceanside, CA 92054.

## Quick start

```bash
cd flirt-site
npm install
npm run dev        # http://localhost:3100
```

Other scripts:

```bash
npm run build      # production build (47 static pages)
npm start          # serve the production build
node scripts/import-media.mjs   # re-import photography from the evidence bundle
```

## Editing content

**Every piece of copy on the site is in `flirt-site/src/content/*.json`.** You
do not need to touch a component to change text, prices, services, team
members, or service areas.

| File | Controls |
|---|---|
| `site.json` | Business details, hours, hero, and all homepage section copy |
| `services.json` | The service menu — names, descriptions, features, aftercare, FAQs, prices |
| `team.json` | The artists |
| `testimonials.json` | Guest reviews (these feed Google's star ratings) |
| `cities.json` | Service areas — drives the local SEO pages |
| `offers.json` | Gift cards and membership tiers |
| `training.json` | Aviara Beauty Academy courses |
| `join.json` | Booth rental page |
| `faq.json` | Booking FAQ |

Prices are `null` until filled in, and render as "View pricing" rather than a
made-up number.

## Before launching

See **[NOTES.md](NOTES.md)** — it lists what still needs Brooklyn's sign-off,
where the recovered content came from, and which four photos are placeholders.

## Stack

Next.js 15 (App Router) · React 19 · Tailwind CSS 3 · TypeScript · nodemailer.
Same shape as the AviaraDesignCo build, so anything you learned there applies.
