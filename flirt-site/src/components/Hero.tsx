import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export default function Hero() {
  const hero = site.hero;

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* The photograph. `priority` because this is the LCP element on the
          highest-traffic page — without it Next lazy-loads it and the hero
          paints as a blank cream box for a beat. */}
      <Image
        src={hero.bgImage}
        alt={hero.bgImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_38%] animate-drift motion-reduce:animate-none"
      />

      {/* Three overlays, each doing a different job.

          The bottom-weighted scrim handles the general case. On its own it was
          not enough: this photograph is brightest exactly where the eyebrow
          and headline sit, so the left-to-right scrim anchors the text column
          specifically — the copy is left-aligned, and darkening the whole
          frame to fix one corner would flatten the photo everywhere else.
          The warm wash then pulls any cool cast back toward cream/sand. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(27,23,20,0.80) 0%, rgba(27,23,20,0.62) 26%, rgba(27,23,20,0.34) 52%, rgba(27,23,20,0.14) 74%, rgba(27,23,20,0.30) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(27,23,20,0.58) 0%, rgba(27,23,20,0.30) 38%, rgba(27,23,20,0) 68%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{ backgroundColor: "var(--color-oat)", opacity: 0.35 }}
        aria-hidden="true"
      />

      <div className="relative container-wide pb-24 md:pb-28 pt-40 w-full">
        <div className="max-w-3xl">
          <p
            className="eyebrow !text-cream/85 opacity-0 animate-fadeUp"
            style={{ animationDelay: "120ms" }}
          >
            {hero.eyebrow}
          </p>

          <h1
            className="display-xl text-cream mt-6 opacity-0 animate-fadeUp"
            style={{ animationDelay: "240ms" }}
          >
            {hero.headlineLine1}{" "}
            <span className="script-accent !text-cream">{hero.headlineScript}</span>
          </h1>

          <p
            className="lede !text-cream/85 mt-8 max-w-xl opacity-0 animate-fadeUp"
            style={{ animationDelay: "380ms" }}
          >
            {hero.subhead}
          </p>

          <div
            className="mt-11 flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeUp"
            style={{ animationDelay: "520ms" }}
          >
            <Link href="/book" className="btn btn-light !bg-cream !text-ink !border-cream hover:!bg-taupe hover:!border-taupe">
              {hero.ctaPrimaryLabel}
            </Link>
            <Link href="/services" className="btn btn-light">
              {hero.ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue. Hidden from assistive tech — it is decoration, and the
          content below is reachable without it. */}
      <div
        className="absolute bottom-7 right-6 md:right-10 hidden md:flex items-center gap-3 text-cream/70"
        aria-hidden="true"
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-luxe">
          {hero.scrollLabel}
        </span>
        <span className="block h-10 w-px bg-cream/30 overflow-hidden">
          <span className="block h-3 w-px bg-cream animate-scrollcue motion-reduce:animate-none" />
        </span>
      </div>
    </section>
  );
}
