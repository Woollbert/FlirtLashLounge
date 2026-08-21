import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import { cities, cityServiceSlugs } from "@/data/cities";
import { getService } from "@/data/services";
import { site, fullAddress } from "@/data/site";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Flirt Lash Lounge & Day Spa serves Oceanside, Carlsbad, Vista, San Marcos, Encinitas, Camp Pendleton, Fallbrook, Escondido, and Solana Beach.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  const linkedServices = cityServiceSlugs
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHeader
        eyebrow="North County San Diego"
        title="Worth the"
        script="short drive"
        intro={`The lounge is at ${fullAddress}, just off the 5 and minutes from the 78 — which puts most of North County inside half an hour.`}
      />

      <section className="section">
        <div className="container-wide">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city, i) => (
              <Reveal as="li" key={city.slug} delay={(i % 3) * 90}>
                <article className="h-full flex flex-col bg-ivory border border-line p-8">
                  <h2 className="display-md !text-[1.6rem]">{city.name}</h2>
                  <p className="mt-2 font-sans text-[0.6rem] uppercase tracking-wide2 text-clay">
                    {city.driveTime} {city.direction}
                  </p>
                  <p className="mt-5 text-[0.92rem] leading-relaxed text-mute flex-1">
                    {city.blurb}
                  </p>

                  <ul className="mt-7 pt-6 border-t border-line space-y-2.5">
                    {linkedServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/${service.slug}-${city.slug}`}
                          className="link-underline inline-block py-1 text-[0.88rem] text-espresso hover:text-ink"
                        >
                          {service.name} in {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-16 text-center">
            <p className="lede max-w-xl mx-auto">
              Somewhere else in San Diego County? Guests drive in from all over —
              call and we will find you a time worth the trip.
            </p>
            <a href={`tel:${site.phoneTel}`} className="btn btn-outline mt-7">
              Call {site.phone}
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
