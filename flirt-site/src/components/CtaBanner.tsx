import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

/**
 * Closing call to action. Full-bleed photo with the copy in a cream panel
 * that overlaps it — the panel keeps the type on a solid, high-contrast
 * ground instead of relying on a scrim over whatever the photo happens to be
 * doing behind it.
 */
export default function CtaBanner() {
  const cta = site.sections.cta;

  return (
    <section className="relative">
      <div className="relative h-[26rem] md:h-[34rem]">
        <Image
          src={cta.image}
          alt={cta.imageAlt}
          fill
          sizes="100vw"
          quality={92}
          // The source is a 2400x3000 portrait and the band is a ~2.65:1 slice
          // of it. Dead-centre landed on the tray's "PICK" row labels; 35%
          // frames the branded gold label instead.
          className="object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-cream/30" aria-hidden="true" />
      </div>

      <div className="container-wide">
        <Reveal className="relative -mt-24 md:-mt-32 mb-0">
          <div className="bg-ivory border border-line px-7 py-12 md:px-16 md:py-16 max-w-3xl mx-auto text-center shadow-soft">
            <p className="eyebrow">{cta.eyebrow}</p>
            <h2 className="display-lg mt-5">
              {cta.headlineLine1}{" "}
              <span className="script-accent">{cta.headlineScript}</span>
            </h2>
            <p className="lede mt-6 max-w-xl mx-auto">{cta.body}</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="btn btn-ink">
                Book an appointment
              </Link>
              <a href={`tel:${site.phoneTel}`} className="btn btn-outline">
                Call {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
