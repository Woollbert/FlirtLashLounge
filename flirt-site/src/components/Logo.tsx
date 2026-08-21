import Image from "next/image";

type Props = {
  className?: string;
  /** Use the relit mark on ink-colored sections, where the black lash flick
   *  in the original artwork would otherwise disappear. */
  tone?: "dark" | "light";
  /** Drops the descriptor line — for tight spots like the mobile bar. */
  compact?: boolean;
};

// Intrinsic size of the trimmed artwork (scripts/import-media.mjs trims the
// white canvas away, so this is the mark's own bounding box).
const W = 650;
const H = 382;

/**
 * Brooklyn's actual wordmark — the gold script with the lash flick — recovered
 * from the old site's media library. The descriptor line underneath is set in
 * type rather than baked into the image so it stays crisp at any size and
 * inherits the surrounding text color.
 */
export default function Logo({ className = "", tone = "dark", compact = false }: Props) {
  const light = tone === "light";

  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <Image
        src={light ? "/images/logo-wordmark-light.png" : "/images/logo-wordmark.png"}
        alt="Flirt"
        width={W}
        height={H}
        // In the navbar on every route — never lazy-load it, or it pops in
        // after first paint.
        priority
        className="h-[2.05rem] md:h-[2.3rem] w-auto"
      />
      {!compact && (
        <span
          className={`font-sans text-[0.47rem] md:text-[0.5rem] uppercase tracking-luxe mt-[0.45em] ml-[0.15em] ${
            light ? "text-cream/75" : "text-espresso/70"
          }`}
        >
          Lash Lounge &amp; Day Spa
        </span>
      )}
    </span>
  );
}
