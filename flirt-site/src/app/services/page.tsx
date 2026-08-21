import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { ServiceCard } from "@/components/ServicesGrid";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import { servicesByCategory } from "@/data/services";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eyelash extensions, lash lifts, brow lamination, permanent makeup, facials, waxing, nails, and bridal at Flirt Lash Lounge & Day Spa in Oceanside, CA.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Menu"
        title="Guests come for the service and"
        script="stay for the experience"
        intro="Every artist at Flirt runs an independent book, and every treatment is customized on the day. Below is what the lounge offers — pricing and live availability sit on the booking calendar."
      />

      <div className="section">
        <div className="container-wide space-y-20 md:space-y-24">
          {servicesByCategory.map(({ category, items }) => (
            <section key={category}>
              <Reveal>
                <div className="flex items-baseline gap-5 mb-10">
                  <h2 className="display-md">{category}</h2>
                  <span className="flex-1 h-px bg-line" />
                  <span className="font-sans text-[0.62rem] uppercase tracking-wide2 text-mute shrink-0">
                    {items.length} {items.length === 1 ? "service" : "services"}
                  </span>
                </div>
              </Reveal>

              <ul className="grid gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service, i) => (
                  <ServiceCard key={service.slug} service={service} index={i} />
                ))}
              </ul>
            </section>
          ))}

          <Reveal>
            <div className="bg-sand/50 border border-line p-9 md:p-12 text-center">
              <h2 className="display-md">Not sure what to book?</h2>
              <p className="lede mt-5 max-w-xl mx-auto">
                Call the lounge and describe what you are after. We will point you at
                the artist who does that particular thing best.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${site.phoneTel}`} className="btn btn-ink">
                  Call {site.phone}
                </a>
                <Link href="/book" className="btn btn-outline">
                  Book online
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <CtaBanner />
    </>
  );
}
