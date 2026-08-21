import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Lash sets, brow transformations, permanent makeup, and nails from the artists at Flirt Lash Lounge & Day Spa in Oceanside, CA.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const g = site.sections.gallery;

  return (
    <>
      <PageHeader
        eyebrow={g.eyebrow}
        title={g.headlineLine1}
        script={g.headlineScript}
        intro={g.intro}
      />

      <section className="section">
        <div className="container-wide">
          <GalleryGrid />

          <Reveal className="mt-16 text-center">
            <p className="lede max-w-xl mx-auto">
              New work goes up on Instagram first.
            </p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-7"
            >
              Follow {site.social.instagramHandle}
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
