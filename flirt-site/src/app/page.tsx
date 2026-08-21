import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import IntroSection from "@/components/IntroSection";
import ServicesGrid from "@/components/ServicesGrid";
import AboutOwner from "@/components/AboutOwner";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { gallery } from "@/data/gallery";

export default function HomePage() {
  const g = site.sections.gallery;

  return (
    <>
      <Hero />
      <Marquee />
      <IntroSection />
      <ServicesGrid limit={6} />
      <AboutOwner />

      <section className="section">
        <div className="container-wide">
          <SectionHeading
            eyebrow={g.eyebrow}
            line1={g.headlineLine1}
            script={g.headlineScript}
            intro={g.intro}
          />
          <div className="mt-16">
            {/* Six on the homepage; the rest live on /gallery. */}
            <GalleryGrid items={gallery.slice(0, 6)} />
          </div>
          <Reveal className="mt-14 text-center">
            <Link href="/gallery" className="btn btn-outline">
              See the full gallery
            </Link>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <CtaBanner />
    </>
  );
}
