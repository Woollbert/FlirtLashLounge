import data from "@/content/testimonials.json";

export type Testimonial = {
  author: string;
  role: string;
  service: string;
  /** False means the wording is a reconstruction, not the reviewer's own text. */
  verbatim: boolean;
  quote: string;
};

export const testimonials: Testimonial[] = data.items as Testimonial[];
export const aggregate = data.aggregate;

/** Only quotes we can stand behind word-for-word belong in Review structured
 *  data — Google treats a review snippet as the reviewer's actual statement,
 *  and so does anyone reading it. Paraphrases still render on the page (they
 *  are accurate in substance) but they stay out of the markup. */
export const verbatimTestimonials: Testimonial[] = testimonials.filter(
  (t) => t.verbatim,
);

// Build-time nag. Runs once per server build, not per request.
if (verbatimTestimonials.length !== testimonials.length) {
  const n = testimonials.length - verbatimTestimonials.length;
  console.warn(
    `\n  [flirt] ${n} testimonial${n === 1 ? " is" : "s are"} still paraphrased ` +
      `(verbatim: false in src/content/testimonials.json).\n` +
      `  Paste the real Yelp text before launch — see NOTES.md.\n`,
  );
}
