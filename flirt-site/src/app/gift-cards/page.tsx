import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBanner from "@/components/CtaBanner";
import { giftCards, memberships, money } from "@/data/misc";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gift Cards & Memberships",
  description:
    "Gift certificates from $50 to $300, redeemable on any service at Flirt Lash Lounge & Day Spa in Oceanside, CA. Plus monthly memberships for regulars.",
  alternates: { canonical: "/gift-cards" },
};

// The purchase link is still a placeholder in the content file. Rather than
// render a dead button, fall back to the phone number until it is filled in.
const purchaseReady = !giftCards.purchaseUrl.startsWith("TODO_CONFIRM");

export default function GiftCardsPage() {
  return (
    <>
      <PageHeader
        eyebrow={giftCards.eyebrow}
        title={giftCards.headlineLine1}
        script={giftCards.headlineScript}
        intro={giftCards.intro}
      />

      <section className="section">
        <div className="container-wide grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-center">
          <Reveal className="relative">
            <div
              className="absolute -left-4 -bottom-4 w-full h-full border border-taupe/45 pointer-events-none hidden sm:block"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] w-full bg-sand">
              <Image
                src={giftCards.image}
                alt={giftCards.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-contain p-6"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">Choose an amount</p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-7 grid grid-cols-3 gap-3">
                {giftCards.amounts.map((amount) => (
                  <li key={amount}>
                    <div className="border border-line bg-ivory text-center py-6 font-display text-2xl text-ink">
                      ${amount}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-9 space-y-3.5">
                {giftCards.notes.map((note) => (
                  <li key={note} className="flex gap-3 items-start">
                    <span
                      className="mt-[0.65em] shrink-0 w-3 h-px bg-taupe"
                      aria-hidden="true"
                    />
                    <span className="text-[0.95rem] leading-relaxed text-espresso">
                      {note}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                {purchaseReady ? (
                  <a
                    href={giftCards.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ink"
                  >
                    Buy a gift card
                  </a>
                ) : (
                  <a href={`tel:${site.phoneTel}`} className="btn btn-ink">
                    Call to purchase
                  </a>
                )}
                <a
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Pick one up in the lounge
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-sand/40 border-y border-line">
        <div className="container-wide">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">{memberships.eyebrow}</p>
            <h2 className="display-lg mt-5">
              {memberships.headlineLine1}{" "}
              <span className="script-accent">{memberships.headlineScript}</span>
            </h2>
            <p className="lede mt-6">{memberships.intro}</p>
          </Reveal>

          <ul className="mt-16 grid gap-6 lg:grid-cols-3 items-stretch">
            {memberships.tiers.map((tier, i) => (
              <Reveal as="li" key={tier.slug} delay={i * 110}>
                <article
                  className={`h-full flex flex-col p-8 md:p-9 border ${
                    tier.featured
                      ? "bg-oat border-shell"
                      : "bg-ivory border-line"
                  }`}
                >
                  {tier.featured && (
                    <p className="eyebrow mb-4">Most popular</p>
                  )}
                  <h3 className="display-md !text-[1.6rem]">
                    {tier.name}
                  </h3>
                  <p className="mt-3 text-[0.9rem] text-clay">
                    {tier.tagline}
                  </p>

                  <p className="mt-7 font-display text-4xl text-ink">
                    {money(tier.price)}
                    {tier.price != null && (
                      <span className="ml-2 font-sans text-[0.6rem] uppercase tracking-wide2 text-mute">
                        {tier.cadence}
                      </span>
                    )}
                  </p>

                  <ul className={`mt-8 space-y-3.5 flex-1 border-t pt-7 ${tier.featured ? "border-shell" : "border-line"}`}>
                    {tier.includes.map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <span
                          className="mt-[0.65em] shrink-0 w-3 h-px bg-taupe"
                          aria-hidden="true"
                        />
                        <span className="text-[0.92rem] leading-relaxed text-mute">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`tel:${site.phoneTel}`}
                    className={`btn mt-9 w-full ${tier.featured ? "btn-ink" : "btn-outline"}`}
                  >
                    Ask about this
                  </a>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12">
            <ul className="max-w-2xl mx-auto space-y-2 text-center">
              {memberships.finePrint
                .filter((line) => !line.startsWith("TODO_CONFIRM"))
                .map((line) => (
                  <li key={line} className="text-[0.8rem] text-mute">
                    {line}
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
