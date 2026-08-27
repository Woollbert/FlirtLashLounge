import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";

function Stars() {
  return (
    <span className="inline-flex gap-[3px]" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="M6 0.6l1.6 3.3 3.6.5-2.6 2.6.6 3.6L6 8.9l-3.2 1.7.6-3.6L0.8 4.4l3.6-.5z"
            fill="var(--color-shell)"
          />
        </svg>
      ))}
    </span>
  );
}

/**
 * Quote-led, not card-led. Three bordered boxes side by side turned the most
 * persuasive copy on the site into a comparison table. These are long, real
 * reviews, so they are set as running text on the open ground with a hairline
 * between them — closer to a page of press quotes than a testimonial widget.
 */
export default function Testimonials({
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
  const single = shown.length === 1;

  return (
    <section className="section bg-sand">
      <div className="container-wide">
        <Reveal>
          <div className="flex items-baseline gap-6">
            <p className="eyebrow whitespace-nowrap">{copy.eyebrow}</p>
            <span className="h-px flex-1 bg-shell/60" aria-hidden="true" />
            <p className="font-sans text-[0.62rem] uppercase tracking-wide2 text-mute whitespace-nowrap">
              {copy.intro}
            </p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="display-lg mt-8 max-w-3xl">
            {copy.headlineLine1}{" "}
            <span className="italic text-clay">{copy.headlineScript}</span>
          </h2>
        </Reveal>

        <ul
          className={`mt-16 grid gap-x-12 gap-y-14 ${
            single ? "max-w-3xl" : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {shown.map((t) => (
            <Reveal as="li" key={t.author}>
              <figure className="h-full flex flex-col border-t border-shell/50 pt-7">
                <Stars />
                <blockquote className="mt-5 flex-1">
                  <p className="text-[0.97rem] leading-[1.9] text-espresso">
                    {t.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-7">
                  <span className="block font-display italic text-xl text-ink">
                    {t.author}
                  </span>
                  <span className="block mt-1.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-clay">
                    {t.service}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16">
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
