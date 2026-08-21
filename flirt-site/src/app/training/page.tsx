import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { training, money } from "@/data/misc";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Lash Training | Aviara Beauty Academy",
  description:
    "Southern California's premier eyelash extension training program, taught by Brooklyn Boris at Flirt Lash Lounge & Day Spa in Oceanside, CA.",
  alternates: { canonical: "/training" },
};

export default function TrainingPage() {
  return (
    <>
      <PageHeader
        eyebrow={training.eyebrow}
        title={training.headlineLine1}
        script={training.headlineScript}
        intro={training.intro}
        image={training.heroImage}
        imageAlt={training.heroImageAlt}
      />

      {/* The academy has its own mark, so it gets its own moment rather than
          being folded silently into the Flirt brand. */}
      <section className="py-14 border-b border-line bg-ivory">
        <div className="container-narrow flex flex-col items-center text-center gap-7">
          <Reveal>
            <Image
              src={training.logo}
              alt={training.brand}
              width={446}
              height={445}
              sizes="192px"
              className="w-40 h-40 md:w-48 md:h-48 object-contain"
            />
          </Reveal>
          <Reveal delay={90}>
            <p className="display-md !text-[1.5rem] md:!text-[1.9rem] max-w-2xl">
              {training.pitch}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">Courses</p>
            <h2 className="display-lg mt-5">
              Start where you <span className="script-accent">are</span>
            </h2>
          </Reveal>

          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {training.courses.map((course, i) => (
              <Reveal as="li" key={course.slug} delay={(i % 4) * 90}>
                <article
                  className={`h-full flex flex-col p-8 border ${
                    course.featured
                      ? "bg-ink text-cream border-ink"
                      : "bg-ivory border-line"
                  }`}
                >
                  {course.featured && (
                    <p className="eyebrow eyebrow-light mb-4">Most complete</p>
                  )}
                  <h3
                    className={`display-md !text-[1.45rem] ${
                      course.featured ? "text-cream" : ""
                    }`}
                  >
                    {course.name}
                  </h3>
                  <p
                    className={`mt-4 text-[0.9rem] leading-relaxed flex-1 ${
                      course.featured ? "text-cream/70" : "text-mute"
                    }`}
                  >
                    {course.summary}
                  </p>
                  <div
                    className={`mt-7 pt-5 border-t ${
                      course.featured ? "border-cream/20" : "border-line"
                    }`}
                  >
                    <p
                      className={`font-display text-2xl ${
                        course.featured ? "text-cream" : "text-ink"
                      }`}
                    >
                      {money(course.price)}
                    </p>
                    {!course.duration.startsWith("TODO") && (
                      <p
                        className={`mt-1 font-sans text-[0.6rem] uppercase tracking-wide2 ${
                          course.featured ? "text-taupe" : "text-mute"
                        }`}
                      >
                        {course.duration}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-sand/40 border-y border-line">
        <div className="container-wide grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display-md">{training.curriculum.title}</h2>
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
                {training.curriculum.items.map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span
                      className="mt-[0.65em] shrink-0 w-3 h-px bg-taupe"
                      aria-hidden="true"
                    />
                    <span className="text-[0.92rem] leading-relaxed text-espresso">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h2 className="display-md">{training.kit.title}</h2>
              <p className="mt-3 text-[0.88rem] text-mute">{training.kit.note}</p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
                {training.kit.items.map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span
                      className="mt-[0.65em] shrink-0 w-3 h-px bg-taupe"
                      aria-hidden="true"
                    />
                    <span className="text-[0.92rem] leading-relaxed text-espresso">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              {training.galleryImages.map((img, i) => (
                <div
                  key={img.src}
                  className={`relative ${i === 0 ? "aspect-[3/4] mt-8" : "aspect-[3/4]"}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, 46vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">Your instructor</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-lg mt-5">
                Taught by <span className="script-accent">Brooklyn</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede mt-6">{training.instructorNote}</p>
            </Reveal>
            <Reveal delay={200}>
              <p className="lede mt-5">{training.ctaNote}</p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href={`tel:${site.phoneTel}`} className="btn btn-ink">
                  {training.ctaLabel}
                </a>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Book online
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
