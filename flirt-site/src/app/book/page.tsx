import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm.client";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { faqs } from "@/data/misc";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: `Book online with Flirt Lash Lounge & Day Spa in Oceanside, CA, or send a request and we'll find you a time. Call ${site.phone}.`,
  alternates: { canonical: "/book" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHeader
        eyebrow="Appointments"
        title="Let us pamper you."
        script="You deserve it."
        intro="The fastest route is the live calendar — every artist's real availability, often including same-day. Prefer to talk it through first? Send a request and we will reply within one business day."
      />

      <section className="section">
        <div className="container-wide grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-start">
          {/* Booking rail. Sticky on desktop so the primary CTA is on screen
              no matter how far down the form the guest has scrolled. */}
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] space-y-6">
            <Reveal>
              <div className="bg-ink text-cream p-8 md:p-9">
                <p className="eyebrow eyebrow-light">Fastest</p>
                <h2 className="display-md !text-[1.75rem] mt-4 text-cream">
                  Book online
                </h2>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-cream/70">
                  Live availability for every artist, 24 hours a day. Choose your
                  artist first, then the service.
                </p>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light w-full mt-7"
                >
                  Open the calendar
                </a>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="border border-line p-8 md:p-9">
                <p className="eyebrow">Or just call</p>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="link-underline block font-display text-3xl text-ink mt-4"
                >
                  {site.phone}
                </a>

                <dl className="mt-8 space-y-2.5 text-[0.88rem]">
                  {site.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <dt className="text-espresso">{h.day}</dt>
                      <dd className="text-mute">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-[0.8rem] leading-relaxed text-mute">
                  {site.hoursNote}
                </p>

                <address className="not-italic mt-7 pt-6 border-t border-line text-[0.9rem] leading-relaxed">
                  <a
                    href={site.address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-espresso"
                  >
                    {site.address.street} {site.address.suite}
                    <br />
                    {site.address.city}, {site.address.region} {site.address.postalCode}
                  </a>
                  <span className="block mt-3 text-mute text-[0.82rem]">
                    Free parking directly outside the suite.
                  </span>
                </address>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h2 className="display-md">Send a request</h2>
              <p className="lede mt-4 mb-10">
                Good for consultations, bridal parties, big events, or if you simply
                are not sure what to book.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <BookingForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-sand/40 border-t border-line">
        <div className="container-narrow">
          <h2 className="display-md text-center mb-12">Before you book</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
