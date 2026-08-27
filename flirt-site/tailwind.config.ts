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
        // Coastal sand, from the two palettes Brooklyn sent: SOLEA STUDIO
        // (Ivory Mist / Soft Sand / Stone Taupe / Cocoa / Espresso) and the
        // Coastal Cove strip (Salted Sand / Cove Drift / Seaside Oak).
        //
        // There is deliberately no black in this file. The deepest value is
        // espresso #43352D — a warm brown that reads as depth without the
        // hard, cold edge she rejected in the first draft.
        cream: "#F7F3EE", // Ivory Mist — primary background
        ivory: "#FCFAF7", // lifted cards and panels
        sand: "#E8DED2", // Soft Sand — alternating band
        oat: "#D9D3C5", // Salted Sand — image mats, deeper band
        shell: "#BCAE98", // Cove Drift — decorative rules and fills
        taupe: "#B6A796", // Stone Taupe — decorative
        ink: "#43352D", // Espresso — headings, buttons, the one deep tone
        espresso: "#52443A", // body copy on light (AA on every ground)
        mute: "#5E5145", // secondary copy (AA on every ground)
        clay: "#6A5540", // Seaside Oak — small-caps accent (AA everywhere)
        rose: "#C9A493", // soft blush, used very sparingly
        line: "#E2DACE", // hairline borders
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
