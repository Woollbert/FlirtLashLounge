import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";
import { services, priceLabel, type Service } from "@/data/services";

export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <Reveal as="li" delay={(index % 3) * 90}>
      <Link
        href={`/services/${service.slug}`}
        className="group block h-full bg-ivory border border-line hover:border-taupe transition-colors duration-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.imageUrl}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
            quality={88}
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </div>

        <div className="p-7 md:p-8">
          <p className="eyebrow">{service.category}</p>
          <h3 className="display-md !text-[1.6rem] mt-3">{service.name}</h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">
            {service.short}
          </p>

          <div className="mt-6 pt-5 border-t border-line flex items-center justify-between">
            <span className="font-sans text-[0.68rem] uppercase tracking-wide2 text-clay">
              {priceLabel(service)}
            </span>
            <span
              className="font-sans text-[0.68rem] uppercase tracking-wide2 text-ink inline-flex items-center gap-2"
              aria-hidden="true"
            >
              Details
              <span className="block w-5 h-px bg-ink transition-all duration-500 group-hover:w-8" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function ServicesGrid({
  /** The homepage shows a curated six; /services shows everything. */
  limit,
  withHeading = true,
}: {
  limit?: number;
  withHeading?: boolean;
}) {
  const copy = site.sections.services;
  const shown = limit ? services.slice(0, limit) : services;

  return (
    <section className="section bg-cream">
      <div className="container-wide">
        {withHeading && (
          <SectionHeading
            eyebrow={copy.eyebrow}
            line1={copy.headlineLine1}
            script={copy.headlineScript}
            accent="italic"
            intro={copy.intro}
          />
        )}

        <ul className="mt-16 grid gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </ul>

        {limit && limit < services.length && (
          <Reveal className="mt-14 text-center">
            <Link href="/services" className="btn btn-outline">
              {copy.ctaLabel}
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
