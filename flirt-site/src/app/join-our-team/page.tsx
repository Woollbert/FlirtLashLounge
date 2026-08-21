import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { join } from "@/data/misc";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Join Our Team | Booth Rental",
  description:
    "Booth rental and private suites for licensed beauty professionals at Flirt Lash Lounge & Day Spa in Oceanside, CA. Set your own schedule and prices.",
  alternates: { canonical: "/join-our-team" },
};

export default function JoinPage() {
  return (
    <>
      <PageHeader
        eyebrow={join.eyebrow}
        title={join.headlineLine1}
        script={join.headlineScript}
        intro={join.intro}
      />

      <section className="section">
        <div className="container-wide grid lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-center">
          <Reveal>
            <div className="relative arch aspect-[4/5] w-full">
              <Image
                src={join.image}
                alt={join.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="lede">{join.pitch}</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-10 border border-line p-8">
                <h2 className="font-sans text-[0.62rem] uppercase tracking-luxe text-clay">
                  What we ask
                </h2>
                <ul className="mt-6 space-y-3.5">
                  {join.requirements.map((r) => (
                    <li key={r} className="flex gap-3 items-start">
                      <span
                        className="mt-[0.65em] shrink-0 w-3 h-px bg-taupe"
                        aria-hidden="true"
                      />
                      <span className="text-[0.93rem] leading-relaxed text-espresso">
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={`tel:${site.phoneTel}`} className="btn btn-ink">
                  {join.ctaLabel}
                </a>
              </div>
              <p className="mt-5 text-[0.85rem] text-mute max-w-sm">{join.ctaNote}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-ink text-cream">
        <div className="container-wide">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="eyebrow eyebrow-light">The package</p>
            <h2 className="display-lg mt-5 text-cream">
              Everything you need, <span className="script-accent !text-taupe">included</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {join.includes.map((group, i) => (
              <Reveal key={group.title} delay={i * 110}>
                <div className="border-t border-cream/20 pt-7">
                  <h3 className="display-md !text-[1.4rem] text-cream">
                    {group.title}
                  </h3>
                  <ul className="mt-6 space-y-3.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <span
                          className="mt-[0.65em] shrink-0 w-3 h-px bg-taupe"
                          aria-hidden="true"
                        />
                        <span className="text-[0.92rem] leading-relaxed text-cream/70">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 text-center">
            <a href={`tel:${site.phoneTel}`} className="btn btn-light">
              Call {site.phone}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
