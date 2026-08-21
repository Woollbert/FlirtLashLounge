import Reveal from "@/components/Reveal";

type Props = {
  eyebrow?: string;
  /** The roman-serif part of the headline. */
  line1: string;
  /** The calligraphic word that lands under it. Optional — not every heading
   *  should carry one; used everywhere, the move stops meaning anything. */
  script?: string;
  intro?: string;
  align?: "left" | "center";
  /** Inverts colors for use on the near-black sections. */
  tone?: "dark" | "light";
  size?: "lg" | "md";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  line1,
  script,
  intro,
  align = "center",
  tone = "dark",
  size = "lg",
  className = "",
}: Props) {
  const centered = align === "center";
  const light = tone === "light";

  return (
    <div
      className={`${centered ? "text-center mx-auto max-w-2xl" : "text-left max-w-xl"} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>
        </Reveal>
      )}

      <Reveal delay={80}>
        <h2
          className={`${size === "lg" ? "display-lg" : "display-md"} mt-5 ${
            light ? "text-cream" : "text-ink"
          }`}
        >
          {line1}
          {script && (
            <>
              {" "}
              <span
                className="script-accent"
                style={light ? { color: "var(--color-taupe)" } : undefined}
              >
                {script}
              </span>
            </>
          )}
        </h2>
      </Reveal>

      {intro && (
        <Reveal delay={160}>
          <p
            className={`lede mt-6 ${centered ? "mx-auto" : ""} ${
              light ? "text-cream/70" : ""
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
