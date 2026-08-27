import Image from "next/image";
import Reveal from "@/components/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  script?: string;
  intro?: string;
  /** Optional band photo. Without one the header is a quiet cream slab, which
   *  is the right call on text-led pages like /book. */
  image?: string;
  imageAlt?: string;
  /** Tailwind object-position for the band photo. The band is short and wide,
   *  so `cover` centres on whatever sits mid-frame — which decapitates a group
   *  shot where the faces are near the top. Pass e.g. "object-[50%_25%]". */
  imagePosition?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  script,
  intro,
  image,
  imageAlt = "",
  imagePosition = "",
}: Props) {
  return (
    <header className="relative bg-sand/40 border-b border-line">
      {/* pt clears the fixed navbar; every interior page starts here. */}
      <div className="container-wide pt-[calc(var(--nav-h)+3.5rem)] pb-14 md:pb-20 text-center">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={70}>
          <h1 className="display-lg mt-5">
            {title}
            {script && (
              <>
                {" "}
                <span className="script-accent">{script}</span>
              </>
            )}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={140}>
            <p className="lede mt-6 max-w-2xl mx-auto">{intro}</p>
          </Reveal>
        )}
      </div>

      {image && (
        <div className="relative h-[18rem] md:h-[26rem]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            quality={92}
            className={`object-cover ${imagePosition}`}
          />
        </div>
      )}
    </header>
  );
}
