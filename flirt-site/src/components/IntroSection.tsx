import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export default function IntroSection() {
  const intro = site.sections.intro;

  return (
    <section className="section">
      <div className="container-wide grid lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-center">
        {/* Arched image with an offset frame line — the two moves the
            reference board repeats most. The frame is a sibling rather than a
            border so it can sit outside the arch's clip without being cut by
            it. */}
        <Reveal className="relative">
          <div
            className="absolute -left-4 -bottom-4 w-full h-full arch border border-taupe/45 pointer-events-none hidden sm:block"
            aria-hidden="true"
          />
          <div className="relative arch aspect-[4/5] w-full">
            <Image
              src={intro.image}
              alt={intro.imageAlt}
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              quality={88}
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">{intro.eyebrow}</p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display-lg mt-5">
              {intro.headlineLine1}{" "}
              <span className="italic text-clay">{intro.headlineScript}</span>
            </h2>
          </Reveal>

          {intro.body.map((p, i) => (
            <Reveal key={i} delay={160 + i * 80}>
              <p className="lede mt-6">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="btn btn-ink">
                Meet the owner
              </Link>
              <Link href="/services" className="btn btn-outline">
                Explore services
              </Link>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {intro.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl md:text-4xl text-ink">
                      {stat.value}
                    </span>
                    <span className="block mt-2 font-sans text-[0.62rem] uppercase tracking-wide2 text-mute">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
