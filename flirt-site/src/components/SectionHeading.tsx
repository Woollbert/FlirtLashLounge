import Reveal from "@/components/Reveal";

type Props = {
  eyebrow?: string;
  /** The roman-serif part of the headline. */
  line1: string;
  /** The accent phrase that lands under line1. */
  script?: string;
  /**
   * How that phrase is set. The calligraphic script is the loudest gesture in
   * the system, so it is rationed: the hero, the founder's name, and the
   * closing tagline. Everything in between uses `italic` — the display serif's
   * own italic, which still marks the phrase as the emphasis without the page
   * reading as a run of identical flourishes.
   */
  accent?: "script" | "italic";
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
  accent = "script",
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
                className={accent === "script" ? "script-accent" : "italic"}
                style={
                  accent === "script"
                    ? light
                      ? { color: "var(--color-taupe)" }
                      : undefined
                    : { color: light ? "var(--color-taupe)" : "var(--color-clay)" }
                }
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
