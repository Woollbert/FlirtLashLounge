import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/**
 * The hero photograph is a 2:3 portrait, and the desktop viewport is roughly
 * 2:1. Filling the whole viewport with it meant `cover` scaled it until only a
 * narrow horizontal band survived — the artist's head was cropped off the top
 * and the copy sat over a scrim fighting the picture for contrast.
 *
 * So the layout changes shape with the viewport instead of forcing one crop to
 * work at every ratio:
 *
 *   phones  — full-bleed, which is what a portrait photo wants on a portrait
 *             screen; copy sits at the bottom over a scrim.
 *   lg and  — split. Copy moves onto a solid ink panel (no scrim, no contrast
 *   wider    guesswork) and the photograph gets a tall column whose ratio is
 *            close to its own, so almost nothing is cropped.
 */
export default function Hero() {
  const hero = site.hero;

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden lg:grid lg:grid-cols-2 lg:items-stretch">
      {/* Photograph. Absolute behind everything on phones; a real grid cell on
          desktop, where `lg:relative lg:inset-auto` hands it back to flow so
          `fill` measures against the column instead of the viewport. */}
      <div className="absolute inset-0 lg:relative lg:inset-auto lg:order-2 lg:h-auto">
        <Image
          src={hero.bgImage}
          alt={hero.bgImageAlt}
          fill
          priority
          // Full width on phones, half the viewport once the split kicks in.
          sizes="(min-width: 1024px) 50vw, 100vw"
          quality={92}
          className="object-cover object-[50%_28%] lg:object-[50%_14%] animate-drift motion-reduce:animate-none"
        />
      </div>

      {/* Scrims. Phones only — on desktop the copy has its own opaque panel and
          darkening the photograph there would only flatten it. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(27,23,20,0.80) 0%, rgba(27,23,20,0.62) 26%, rgba(27,23,20,0.34) 52%, rgba(27,23,20,0.14) 74%, rgba(27,23,20,0.30) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 mix-blend-soft-light lg:hidden"
        style={{ backgroundColor: "var(--color-oat)", opacity: 0.35 }}
        aria-hidden="true"
      />

      <div className="relative w-full lg:order-1 lg:bg-ink lg:flex lg:items-center">
        <div className="container-wide lg:!max-w-none lg:!pr-16 lg:!pl-[max(3rem,calc((100vw-84rem)/2+3rem))] pb-24 md:pb-28 pt-40 lg:py-24 w-full">
          <div className="max-w-xl">
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
              className="lede !text-cream/85 mt-8 opacity-0 animate-fadeUp"
              style={{ animationDelay: "380ms" }}
            >
              {hero.subhead}
            </p>

            <div
              className="mt-11 flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeUp"
              style={{ animationDelay: "520ms" }}
            >
              <Link
                href="/book"
                className="btn btn-light !bg-cream !text-ink !border-cream hover:!bg-taupe hover:!border-taupe"
              >
                {hero.ctaPrimaryLabel}
              </Link>
              <Link href="/services" className="btn btn-light">
                {hero.ctaSecondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue. Decoration — the content below is reachable without it. */}
      <div
        className="absolute bottom-7 right-6 md:right-10 hidden md:flex items-center gap-3 text-cream/70 z-10"
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
