# Putting a review link in Brooklyn's hands

The app lives in `flirt-site/`, not at the repo root. That is the one setting
that trips up a first deploy — everything else is already configured.

## Fastest route: import the repo (about two minutes)

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in with GitHub.
2. Import **`Woollbert/FlirtLashLounge`**.
3. Set **Root Directory** to **`flirt-site`**. Click *Edit* next to Root
   Directory and pick the folder — do not leave it at the repo root.
4. Leave Framework (Next.js), build command, and output directory alone; Vercel
   detects them once the root is right.
5. **No environment variables are needed to deploy.** The booking form detects
   that SMTP is unset and tells guests to call instead of silently dropping the
   request, and analytics simply don't render without an ID.
6. Deploy. You get a URL like `flirt-lash-lounge.vercel.app` — send that to
   Brooklyn. It works on phones and laptops with no login.

Every push to `main` redeploys automatically from then on.

## If you'd rather use the CLI

The CLI on this machine isn't logged in, so this needs one interactive step:

```bash
vercel login          # opens a browser
cd flirt-site
vercel                # answer the prompts; it's a Next.js app
vercel --prod         # when you want the stable URL
```

Running from inside `flirt-site` means you don't need the root-directory
setting at all.

## Before you share the link

Nothing here blocks a *review* deployment, but Brooklyn will see them:

- prices read "Varies by artist"
- five images are visible "PHOTO NEEDED" placeholders
- membership tiers are a proposal, not a real programme
- the cancellation and deposit answers are placeholder wording

That's arguably the point of sending it — those are exactly the things you need
her to fill in. See `NOTES.md` for the full list.

## Indexing

Any `*.vercel.app` host serves `X-Robots-Tag: noindex, nofollow`
(`flirt-site/next.config.mjs`). A review deployment carrying placeholder copy
must not get indexed, and a second complete copy of the site would split
ranking signals with the real domain. The rule keys off the hostname, so it
stays inert once a custom domain is attached — you don't need to remember to
remove it.

## When it goes to the real domain

1. Add `flirtluxurylashlounge.com` in **Project → Settings → Domains**.
2. Point DNS at Vercel.
3. Set the environment variables from `flirt-site/.env.example` — SMTP for the
   booking form, and the GA4 / Search Console IDs.
4. `site.json → url` is already the canonical domain, so sitemap, canonicals,
   and structured data need no change.
