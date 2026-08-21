import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import { serviceCities, getServiceCity, cities } from "@/data/cities";
import { site, fullAddress } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

/**
 * Local landing pages: /eyelash-extensions-carlsbad and friends.
 *
 * This catch-all sits at the root so the URLs read as plain keyword phrases
 * rather than /areas/carlsbad/eyelash-extensions. Because it would otherwise
 * swallow every unmatched path, it is fully static — generateStaticParams
 * enumerates the whole matrix and dynamicParams=false makes anything else a
 * 404 instead of a runtime miss.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceCities.map((sc) => ({ slug: sc.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const sc = getServiceCity(slug);
  if (!sc) return {};

  const title = `${sc.service.name} in ${sc.city.name}, CA`;
  // Kept under ~160 chars. Appending service.short pushed these past 190 and
  // Google was cutting them mid-sentence.
  const description = `${sc.service.name} for ${sc.city.name} guests — ${sc.city.driveTime} from ${site.address.city} at ${site.name}. Book online or call ${site.phone}.`;

  return {
    title,
    description,
    alternates: { canonical: `/${sc.slug}` },
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description,
      images: [{ url: sc.service.imageUrl, alt: sc.service.imageAlt }],
    },
  };
}

export default async function ServiceCityPage({ params }: Params) {
  const { slug } = await params;
  const sc = getServiceCity(slug);
  if (!sc) notFound();

  const { service, city } = sc;

  // Other cities for this same service — internal links that keep the local
  // cluster connected without pointing at a different service.
  const siblings = cities.filter((c) => c.slug !== city.slug);
  // Rotates which review is shown, so the same quote is not repeated verbatim
  // across every local page.
  const cityIndex = cities.findIndex((c) => c.slug === city.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}, CA`,
    description: service.short,
    serviceType: service.name,
    provider: { "@id": `${site.url.replace(/\/$/, "")}/#business` },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: "San Diego County, CA" },
    },
    ...(service.priceFrom == null
      ? {}
      : {
          offers: {
            "@type": "Offer",
            price: service.priceFrom,
            priceCurrency: "USD",
          },
        }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow={`Serving ${city.name}`}
        title={`${service.name} in`}
        script={city.name}
        intro={`${city.blurb} We are ${city.driveTime} away, ${city.direction}.`}
      />

      <section className="section">
        <div className="container-wide grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
          <Reveal className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <div className="relative arch aspect-[4/5] w-full">
              <Image
                src={service.imageUrl}
                alt={service.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 92vw"
                quality={88}
                className="object-cover"
              />
            </div>

            <dl className="mt-8 border border-line divide-y divide-line">
              <div className="px-6 py-4">
                <dt className="font-sans text-[0.62rem] uppercase tracking-wide2 text-mute">
                  From {city.name}
                </dt>
                <dd className="font-display text-lg text-ink mt-1">
                  {city.driveTime} {city.direction}
                </dd>
              </div>
              <div className="px-6 py-4">
                <dt className="font-sans text-[0.62rem] uppercase tracking-wide2 text-mute">
                  Find us
                </dt>
                <dd className="mt-1">
                  <a
                    href={site.address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-display text-lg text-ink"
                  >
                    {fullAddress}
                  </a>
                </dd>
              </div>
            </dl>

            <Link href="/book" className="btn btn-ink w-full mt-6">
              Book from {city.name}
            </Link>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="display-md">
                What {city.name} guests book us for
              </h2>
              <p className="mt-6 text-[1.02rem] leading-[1.9] text-espresso">
                {service.description}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <section className="mt-12">
                <h2 className="display-md !text-[1.6rem]">
                  Getting here from {city.name}
                </h2>
                <p className="mt-5 text-[0.98rem] leading-[1.85] text-mute">
                  We are at {fullAddress} — {city.driveTime} {city.direction} if you
                  are coming from {city.landmarks.slice(0, 2).join(" or ")}. Parking
                  is free and directly outside the suite, so there is no hunting for a
                  spot before an appointment.
                </p>
                <p className="mt-5 text-[0.98rem] leading-[1.85] text-mute">
                  {city.localNote}
                </p>
              </section>
            </Reveal>

            {service.features.length > 0 && (
              <Reveal delay={130}>
                <section className="mt-12">
                  <h2 className="display-md !text-[1.6rem]">
                    What&rsquo;s included
                  </h2>
                  <ul className="mt-6 space-y-3.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex gap-3 items-start">
                        <span
                          className="mt-[0.65em] shrink-0 w-3 h-px bg-taupe"
                          aria-hidden="true"
                        />
                        <span className="text-[0.95rem] leading-relaxed text-mute">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            )}

            <Reveal delay={200}>
              <p className="mt-12 text-[0.95rem] text-mute">
                Looking for the full treatment menu instead?{" "}
                <Link href={`/services/${service.slug}`} className="link-underline text-ink">
                  See {service.name}
                </Link>{" "}
                or{" "}
                <Link href="/services" className="link-underline text-ink">
                  browse everything
                </Link>
                .
              </p>
            </Reveal>

            <Reveal delay={230}>
              <nav className="mt-12 pt-8 border-t border-line" aria-label="Nearby areas">
                <h2 className="font-sans text-[0.62rem] uppercase tracking-luxe text-clay">
                  {service.name} elsewhere in North County
                </h2>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                  {siblings.map((c) => (
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
          </div>
        </div>
      </section>

      <Testimonials limit={1} offset={cityIndex} />
      <CtaBanner />
    </>
  );
}
