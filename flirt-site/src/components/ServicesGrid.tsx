import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { services, priceLabel, type Service } from "@/data/services";

/**
 * Borderless. The first draft framed every service in a 1px box with a padded
 * body, which is the shape of a template rather than of an editorial page —
 * and repeating it three across, twice down, was most of why the menu read as
 * a catalogue. Here the photograph is the card: a tall arch, with the name and
 * one line set underneath in the open air.
 */
export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <Reveal as="li" delay={(index % 3) * 110}>
      <Link href={`/services/${service.slug}`} className="group block">
        <div className="relative arch aspect-[3/4] overflow-hidden bg-sand">
          <Image
            src={service.imageUrl}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
            quality={88}
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        </div>

        <div className="pt-7">
          <div className="flex items-baseline gap-3">
            <span className="index-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
            <span className="font-sans text-[0.62rem] uppercase tracking-wide2 text-clay">
              {priceLabel(service)}
            </span>
          </div>

          <h3 className="display-md !text-[1.7rem] mt-4">{service.name}</h3>
          <p className="mt-3 text-[0.95rem] leading-[1.8] text-mute">
            {service.short}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export default function ServicesGrid({
  limit,
  withHeading = true,
}: {
  limit?: number;
  withHeading?: boolean;
}) {
  const copy = site.sections.services;
  const shown = limit ? services.slice(0, limit) : services;

  return (
    <section className="section">
      <div className="container-wide">
        {withHeading && (
          /* Asymmetric, not centred. The eyebrow and headline sit left, the
             standfirst drops to the right column — an editorial masthead
             rather than another centred stack. */
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-20 items-end">
            <div>
              <Reveal>
                <p className="eyebrow">{copy.eyebrow}</p>
              </Reveal>
              <Reveal delay={90}>
                <h2 className="display-lg mt-6">
                  {copy.headlineLine1}{" "}
                  <span className="italic text-clay">{copy.headlineScript}</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <p className="lede lg:pb-3">{copy.intro}</p>
            </Reveal>
          </div>
        )}

        <ul className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </ul>

        {limit && limit < services.length && (
          <Reveal className="mt-20 text-center">
            <Link href="/services" className="btn btn-outline">
              {copy.ctaLabel}
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
