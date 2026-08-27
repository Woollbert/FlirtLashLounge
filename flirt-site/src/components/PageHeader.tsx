import Image from "next/image";
import Reveal from "@/components/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  script?: string;
  intro?: string;
  /** When present the header becomes a split: type left, arch photo right. */
  image?: string;
  imageAlt?: string;
  /** Tailwind object-position utility, for photos whose subject is not
   *  centred — e.g. a group shot where the faces sit high in the frame. */
  imagePosition?: string;
};

/**
 * Two shapes, not one.
 *
 * The first draft used a single centred slab on all ten interior pages, with
 * an optional full-width photo band under it — so every page opened
 * identically and the band cropped portrait photography into a letterbox.
 *
 * With an image, the header is now a split: the type sits left, the photograph
 * takes a tall arch on the right at close to its own ratio. Without one, the
 * type runs left against an open sand ground. Either way it is asymmetric,
 * which is what keeps ten pages from opening the same way.
 */
export default function PageHeader({
  eyebrow,
  title,
  script,
  intro,
  image,
  imageAlt = "",
  imagePosition = "object-center",
}: Props) {
  const split = Boolean(image);

  return (
    <header className="relative bg-cream border-b border-line overflow-hidden">
      <div
        className={`container-wide pt-[calc(var(--nav-h)+5rem)] pb-16 md:pb-24 ${
          split
            ? "lg:grid lg:grid-cols-[1.1fr_0.8fr] lg:gap-20 lg:items-center"
            : ""
        }`}
      >
        <div className={split ? "" : "max-w-3xl"}>
          {eyebrow && (
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
            </Reveal>
          )}
          <Reveal delay={70}>
            <h1 className="display-lg mt-6">
              {title}
              {script && (
                <>
                  {" "}
                  <span className="script-accent">{script}</span>
                </>
              )}
            </h1>
          </Reveal>
          <Reveal delay={130}>
            <span
              className="block h-px w-20 bg-shell mt-8"
              aria-hidden="true"
            />
          </Reveal>
          {intro && (
            <Reveal delay={170}>
              <p className="lede mt-7 max-w-xl">{intro}</p>
            </Reveal>
          )}
        </div>

        {split && (
          <Reveal delay={200} className="hidden lg:block relative mt-0">
            <div
              className="absolute -left-5 -bottom-5 w-full h-full arch border border-shell pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative arch aspect-[3/4] w-full">
              <Image
                src={image!}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 92vw"
                quality={92}
                className={`object-cover ${imagePosition}`}
              />
            </div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
