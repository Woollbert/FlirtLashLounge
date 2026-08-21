import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  // Wrap every `hover:*` utility in `@media (hover: hover)` so iOS Safari
  // doesn't fire hover styles during a tap. Half this site is image cards
  // with slow zoom transforms on hover; without this they run their full
  // animation every time a thumb grazes past during a scroll.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // Warm sand + cream, tuned for lash / skin / spa photography. The
        // whole system is deliberately low-chroma so the only real color on
        // a page comes from skin tones in the imagery.
        cream: "#F7F2EB", // primary background
        ivory: "#FCFAF7", // cards, raised surfaces
        sand: "#EAE0D2", // alternating band, image mats
        oat: "#DCCFBC", // deeper sand, arch fills
        ink: "#1B1714", // near-black, headings + dark sections
        espresso: "#2C2521", // body text on light (AAA)
        mute: "#6A5E53", // secondary body text (AA on cream)
        taupe: "#B79A7C", // decorative accent — rules, borders, large type
        clay: "#795E44", // accent safe for small text on light (AA on cream AND sand)
        rose: "#C9A493", // soft blush, used sparingly
        line: "#E3D8C8", // hairline borders
      },
      fontFamily: {
        // High-contrast fashion serif for display, geometric sans for UI,
        // calligraphic script reserved for one or two accent words a page.
        display: ["var(--font-display)", "Didot", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      letterSpacing: {
        luxe: "0.32em",
        wide2: "0.18em",
      },
      borderRadius: {
        // The board's signature shape: a full semicircle on top, square base.
        arch: "50% 50% 0 0 / 34% 34% 0 0",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(27,23,20,0.03), 0 10px 30px rgba(27,23,20,0.05)",
        lift: "0 8px 20px rgba(27,23,20,0.07), 0 28px 56px rgba(27,23,20,0.09)",
      },
      maxWidth: {
        wide: "84rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%": { transform: "scale(1.04)" },
          "100%": { transform: "scale(1.14)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Hero scroll cue: a short bar falling down its track, fading out at
        // both ends so it never appears to hit a stop.
        scrollcue: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "35%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateY(340%)", opacity: "0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
        drift: "drift 22s ease-in-out infinite alternate",
        marquee: "marquee 42s linear infinite",
        scrollcue: "scrollcue 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
