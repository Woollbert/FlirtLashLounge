import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

/**
 * Brooklyn's letter. Set on the ink background so it reads as an interruption
 * in an otherwise cream page — the one moment on the homepage where the brand
 * speaks in the first person.
 */
export default function AboutOwner({ showCta = true }: { showCta?: boolean }) {
  const about = site.sections.about;

  return (
    <section className="section bg-ink text-cream overflow-hidden">
      <div className="container-wide grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow eyebrow-light">{about.eyebrow}</p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display-lg mt-5 text-cream">
              {about.headlineLine1}{" "}
              <span className="script-accent" style={{ color: "var(--color-taupe)" }}>
                {about.headlineScript}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 font-sans text-[0.65rem] uppercase tracking-wide2 text-taupe">
              {about.role}
            </p>
          </Reveal>

          {about.body.map((p, i) => (
            <Reveal key={i} delay={220 + i * 80}>
              <p className="mt-6 text-[1.02rem] leading-[1.85] text-cream/75">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={480}>
            <p className="script-accent mt-9 !text-[3rem] !text-taupe">
              {about.signature}
            </p>
          </Reveal>

          {showCta && (
            <Reveal delay={540}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/about" className="btn btn-light">
                  Meet the team
                </Link>
                <Link href="/training" className="btn btn-light">
                  Lash training
                </Link>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal className="relative order-1 lg:order-2" delay={120}>
          <div
            className="absolute -right-4 -top-4 w-full h-full arch border border-taupe/35 pointer-events-none hidden sm:block"
            aria-hidden="true"
          />
          <div className="relative arch aspect-[4/5] w-full">
            <Image
              src={about.image}
              alt={about.imageAlt}
              fill
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
