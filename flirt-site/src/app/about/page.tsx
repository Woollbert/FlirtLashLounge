import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import AboutOwner from "@/components/AboutOwner";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import { team } from "@/data/misc";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About & Team",
  description:
    "Meet Brooklyn James and the team of independent beauty professionals behind Flirt Lash Lounge & Day Spa in Oceanside, California.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Since 2019"
        title="A collective of North County's"
        script="best artists"
        intro={site.description}
        image="/images/team-group.jpg"
        imageAlt="The Flirt Lash Lounge team photographed together."
        imagePosition="object-[50%_25%]"
      />

      <AboutOwner showCta={false} />

      <section className="section">
        <div className="container-wide">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">The Artists</p>
            <h2 className="display-lg mt-5">
              Independent, licensed, and{" "}
              <span className="script-accent">yours</span>
            </h2>
            <p className="lede mt-6">
              Every artist at Flirt runs their own book and sets their own menu. You
              book the person, not the salon — which is why you are never handed off
              to whoever happens to be free.
            </p>
          </Reveal>

          <ul className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal as="li" key={member.slug} delay={(i % 4) * 90}>
                <article className="group h-full flex flex-col">
                  <div className="relative arch aspect-[4/5] overflow-hidden bg-sand">
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                      quality={88}
                      className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="pt-6 flex-1 flex flex-col">
                    <h3 className="display-md !text-[1.5rem]">{member.name}</h3>
                    <p className="mt-2 font-sans text-[0.6rem] uppercase tracking-wide2 text-clay">
                      {member.role}
                    </p>
                    <p className="mt-4 text-[0.9rem] leading-relaxed text-mute flex-1">
                      {member.bio.replace(/^TODO_CONFIRM - /, "")}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {member.specialties.map((s) => (
                        <li
                          key={s}
                          className="border border-line px-3 py-1.5 text-[0.62rem] uppercase tracking-wide2 text-mute"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-16 text-center">
            <p className="lede max-w-xl mx-auto">
              Interested in renting a station and joining the collective?
            </p>
            <Link href="/join-our-team" className="btn btn-outline mt-7">
              Join our team
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-sand/40 border-y border-line">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative arch aspect-[4/5] w-full">
              <Image
                src="/images/team-group-2.jpg"
                alt="The Flirt team together in matching white and denim."
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">The Space</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-lg mt-5">
                Three rooms, and not one of them{" "}
                <span className="script-accent">rushed</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede mt-6">
                Guests are always surprised by how much room there is once they are
                inside — three treatment rooms, luxury recliners, and enough space
                between stations that nothing feels claustrophobic.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="lede mt-5">
                Good music instead of the sleepy spa jazz. And if you fall asleep
                mid-appointment, you would not be the first.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <address className="not-italic mt-9 pt-8 border-t border-line">
                <a
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-display text-xl text-ink"
                >
                  {site.address.street} {site.address.suite}, {site.address.city}
                </a>
                <p className="mt-3 text-[0.9rem] text-mute">{site.hoursNote}</p>
              </address>
            </Reveal>
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBanner />
    </>
  );
}
