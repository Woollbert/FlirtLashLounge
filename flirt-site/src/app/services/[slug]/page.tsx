import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import { ServiceCard } from "@/components/ServicesGrid";
import { services, getService, priceLabel, durationLabel } from "@/data/services";
import { cities, cityServiceSlugs } from "@/data/cities";
import { site } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: `${service.name} in ${site.address.city}, CA`,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${site.shortName}`,
      description: service.short,
      images: [{ url: service.imageUrl, alt: service.imageAlt }],
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const duration = durationLabel(service);
  // Only services that actually have city pages get the local links block.
  const hasCityPages = cityServiceSlugs.includes(service.slug);

  const faqJsonLd =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <PageHeader eyebrow={service.category} title={service.name} />

      <article className="section">
        <div className="container-wide grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
          <Reveal className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <div className="relative arch aspect-[4/5] w-full">
              <Image
                src={service.imageUrl}
                alt={service.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover"
              />
            </div>

            <dl className="mt-8 border border-line divide-y divide-line">
              <div className="flex justify-between gap-4 px-6 py-4">
                <dt className="font-sans text-[0.65rem] uppercase tracking-wide2 text-mute">
                  Pricing
                </dt>
                <dd className="font-display text-lg text-ink">{priceLabel(service)}</dd>
              </div>
              {duration && (
                <div className="flex justify-between gap-4 px-6 py-4">
                  <dt className="font-sans text-[0.65rem] uppercase tracking-wide2 text-mute">
                    Duration
                  </dt>
                  <dd className="font-display text-lg text-ink">{duration}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4 px-6 py-4">
                <dt className="font-sans text-[0.65rem] uppercase tracking-wide2 text-mute">
                  Where
                </dt>
                <dd className="font-display text-lg text-ink">
                  {site.address.city}, {site.address.region}
                </dd>
              </div>
            </dl>

            <Link href="/book" className="btn btn-ink w-full mt-6">
              Book {service.name}
            </Link>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[1.05rem] leading-[1.9] text-espresso">
                {service.description}
              </p>
            </Reveal>

            {service.features.length > 0 && (
              <Reveal delay={90}>
                <section className="mt-14">
                  <h2 className="display-md !text-[1.7rem]">What&rsquo;s included</h2>
                  <ul className="mt-7 space-y-4">
                    {service.features.map((f) => (
                      <li key={f} className="flex gap-4 items-start">
                        <span
                          className="mt-[0.6em] shrink-0 w-4 h-px bg-taupe"
                          aria-hidden="true"
                        />
                        <span className="text-[0.97rem] leading-relaxed text-mute">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            )}

            {service.aftercare.length > 0 && (
              <Reveal delay={120}>
                <section className="mt-14 bg-sand/50 border border-line p-8 md:p-9">
                  <h2 className="display-md !text-[1.7rem]">Aftercare</h2>
                  <p className="mt-3 text-[0.88rem] text-mute">
                    How well you follow these is most of how long the result lasts.
                  </p>
                  <ol className="mt-6 space-y-4">
                    {service.aftercare.map((a, i) => (
                      <li key={a} className="flex gap-4 items-start">
                        <span className="shrink-0 font-display text-lg text-taupe leading-none mt-[0.15em]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.95rem] leading-relaxed text-espresso">
                          {a}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            )}

            {service.faqs.length > 0 && (
              <Reveal delay={150}>
                <section className="mt-14">
                  <h2 className="display-md !text-[1.7rem] mb-7">
                    Questions we get asked
                  </h2>
                  <FaqAccordion items={service.faqs} />
                </section>
              </Reveal>
            )}

            {hasCityPages && (
              <Reveal delay={180}>
                <nav className="mt-14" aria-label={`${service.name} service areas`}>
                  <h2 className="font-sans text-[0.62rem] uppercase tracking-luxe text-clay">
                    {service.name} near you
                  </h2>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                    {cities.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/${service.slug}-${c.slug}`}
                          className="link-underline inline-block py-1.5 text-[0.85rem] text-mute hover:text-ink transition-colors"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            )}
          </div>
        </div>
      </article>

      <section className="section bg-sand/40 border-t border-line">
        <div className="container-wide">
          <h2 className="display-md text-center">While you&rsquo;re here</h2>
          <ul className="mt-12 grid gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
