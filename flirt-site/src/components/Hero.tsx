import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/**
 * Light, airy, washed. The first draft put the copy on a solid espresso panel;
 * Brooklyn's note was that she did not want the dark styling at all, and the
 * references she sent (SOLÉA STUDIO, the Coastal Cove palette) are ivory and
 * sand throughout with draped fabric as the only texture.
 *
 * So the photograph now sits under an ivory veil rather than a dark scrim —
 * the picture reads as sunlit rather than shadowed, and the type sits on it in
 * espresso. The veil is doing real work: it is what guarantees the headline's
 * contrast regardless of what part of the room is behind it, which a
 * transparent overlay could not.
 */
export default function Hero() {
  const hero = site.hero;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-cream">
      <Image
        src={hero.bgImage}
        alt={hero.bgImageAlt}
        fill
        priority
        sizes="100vw"
        quality={92}
        className="object-cover object-[58%_42%] animate-drift motion-reduce:animate-none"
      />

      {/* Ivory veil. Heavier on the left, where the copy sits, easing off to
          the right so the room itself stays visible rather than being washed
          out to a flat tint. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(247,243,238,0.94) 0%, rgba(247,243,238,0.88) 34%, rgba(247,243,238,0.62) 62%, rgba(247,243,238,0.40) 100%)",
        }}
        aria-hidden="true"
      />
      {/* A breath of warmth over the whole frame, so the veil reads as sunlight
          on plaster rather than as white paint. */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: "var(--color-sand)", opacity: 0.18 }}
        aria-hidden="true"
      />

      <div className="relative container-wide w-full pt-32 pb-24 lg:py-28">
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

          {/* Hairline rule, the one structural mark in the hero. */}
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
