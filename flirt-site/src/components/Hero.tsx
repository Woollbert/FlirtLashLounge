import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/**
 * Every photograph in the library is a phone portrait — roughly 3:4. A
 * full-bleed hero is roughly 3:2 the other way, so `cover` was throwing away
 * most of the frame and leaving a band of cushions that read as an abstract
 * close-up rather than a room.
 *
 * Rather than hunting for a landscape photo that does not exist, the layout
 * gives the picture a shape it actually fits:
 *
 *   phones  — full-bleed under an ivory veil. A portrait photo on a portrait
 *             screen needs no cropping, and this is the one case where it works.
 *   lg and  — split, with the photograph in a tall arch. The arch is the same
 *   wider    move as the "Welcome to Flirt" section Brooklyn kept, and it means
 *            the frame is 3:4 — the photo's own ratio, so nothing is lost.
 */
export default function Hero() {
  const hero = site.hero;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-cream">
      {/* Phones: the photograph fills the screen behind everything. From lg up
          it is hidden, and the arch below takes over. */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src={hero.bgImage}
          alt={hero.bgImageAlt}
          fill
          priority
          sizes="100vw"
          quality={92}
          className="object-cover object-[54%_38%] animate-drift motion-reduce:animate-none"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(247,243,238,0.90) 0%, rgba(247,243,238,0.82) 42%, rgba(247,243,238,0.70) 72%, rgba(247,243,238,0.86) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative container-wide w-full pt-32 pb-24 lg:py-28">
        <div className="lg:grid lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:items-center">
          <div className="max-w-2xl">
            <p
              className="eyebrow opacity-0 animate-fadeUp"
              style={{ animationDelay: "120ms" }}
            >
              {hero.eyebrow}
            </p>

            <h1
              className="display-xl text-ink mt-7 opacity-0 animate-fadeUp"
              style={{ animationDelay: "240ms" }}
            >
              {hero.headlineLine1}{" "}
              <span className="script-accent">{hero.headlineScript}</span>
            </h1>

            <span
              className="block h-px w-24 bg-shell mt-9 opacity-0 animate-fadeUp"
              style={{ animationDelay: "340ms" }}
              aria-hidden="true"
            />

            <p
              className="lede mt-8 max-w-lg opacity-0 animate-fadeUp"
              style={{ animationDelay: "400ms" }}
            >
              {hero.subhead}
            </p>

            <div
              className="mt-11 flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeUp"
              style={{ animationDelay: "520ms" }}
            >
              <Link href="/book" className="btn btn-ink">
                {hero.ctaPrimaryLabel}
              </Link>
              <Link href="/services" className="btn btn-outline">
                {hero.ctaSecondaryLabel}
              </Link>
            </div>
          </div>

          {/* The arch. Offset hairline frame behind it, same as the section
              below — it ties the top of the page to the one Brooklyn kept. */}
          <div
            className="hidden lg:block relative opacity-0 animate-fadeUp"
            style={{ animationDelay: "300ms" }}
          >
            <div
              className="absolute -left-5 -bottom-5 w-full h-full arch border border-shell pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative arch aspect-[3/4] w-full">
              <Image
                src={hero.bgImage}
                alt={hero.bgImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 92vw"
                quality={92}
                className="object-cover object-[54%_45%]"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-7 right-6 md:right-10 hidden md:flex items-center gap-3 text-clay"
        aria-hidden="true"
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-luxe">
          {hero.scrollLabel}
        </span>
        <span className="block h-10 w-px bg-shell/60 overflow-hidden">
          <span className="block h-3 w-px bg-clay animate-scrollcue motion-reduce:animate-none" />
        </span>
      </div>
    </section>
  );
}
