import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";

function Stars() {
  return (
    <span className="inline-flex gap-1" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="M6 0.6l1.6 3.3 3.6.5-2.6 2.6.6 3.6L6 8.9l-3.2 1.7.6-3.6L0.8 4.4l3.6-.5z"
            fill="var(--color-taupe)"
          />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials({
  /** Show fewer than all — the local pages take one, so 24 URLs do not each
   *  repeat the same several hundred words of review copy. */
  limit,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
} = {}) {
  const copy = site.sections.testimonials;
  const shown = limit
    ? Array.from({ length: Math.min(limit, testimonials.length) }, (_, i) =>
        testimonials[(offset + i) % testimonials.length],
      )
    : testimonials;

  return (
    <section className="section bg-sand/50">
      <div className="container-wide">
        <SectionHeading
          eyebrow={copy.eyebrow}
          line1={copy.headlineLine1}
          script={copy.headlineScript}
          accent="italic"
          intro={copy.intro}
        />

        <ul
          className={`mt-16 grid gap-6 items-start ${
            shown.length === 1 ? "max-w-2xl mx-auto" : "lg:grid-cols-3"
          }`}
        >
          {shown.map((t, i) => (
            <Reveal as="li" key={t.author} delay={i * 110}>
              <figure className="h-full bg-ivory border border-line p-8 md:p-9 flex flex-col">
                <Stars />
                {/* Full reviews, not trimmed to a pull quote. They are the most
                    persuasive copy on the site and the specifics — three
                    rooms, the music, the artist's name — are what make them
                    read as real. */}
                <blockquote className="mt-6 flex-1">
                  <p className="text-[0.95rem] leading-[1.85] text-espresso">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-7 pt-6 border-t border-line">
                  <span className="block font-display text-xl text-ink">
                    {t.author}
                  </span>
                  <span className="block mt-1 font-sans text-[0.62rem] uppercase tracking-wide2 text-mute">
                    {t.service}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 text-center">
          <a
            href={site.social.yelp}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-block py-2 font-sans text-[0.7rem] uppercase tracking-wide2 text-clay"
          >
            Read every review on Yelp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
