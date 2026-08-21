import siteJson from "@/content/site.json";

export type Hours = { day: string; time: string };

export type Address = {
  street: string;
  suite: string;
  city: string;
  region: string;
  postalCode: string;
  mapUrl: string;
};

export type Site = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  foundedYear: number;
  phone: string;
  phoneTel: string;
  email: string;
  bookingUrl: string;
  address: Address;
  geo: { lat: number; lng: number };
  hours: Hours[];
  hoursNote: string;
  social: {
    instagram: string;
    facebook: string;
    yelp: string;
    instagramHandle: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineScript: string;
    subhead: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
    bgImage: string;
    bgImageAlt: string;
    scrollLabel: string;
  };
  marquee: string[];
  sections: {
    intro: {
      eyebrow: string;
      headlineLine1: string;
      headlineScript: string;
      body: string[];
      image: string;
      imageAlt: string;
      stats: { value: string; label: string }[];
    };
    services: {
      eyebrow: string;
      headlineLine1: string;
      headlineScript: string;
      intro: string;
      ctaLabel: string;
    };
    about: {
      eyebrow: string;
      headlineLine1: string;
      headlineScript: string;
      role: string;
      body: string[];
      image: string;
      imageAlt: string;
      signature: string;
    };
    gallery: {
      eyebrow: string;
      headlineLine1: string;
      headlineScript: string;
      intro: string;
    };
    testimonials: {
      eyebrow: string;
      headlineLine1: string;
      headlineScript: string;
      intro: string;
    };
    cta: {
      eyebrow: string;
      headlineLine1: string;
      headlineScript: string;
      body: string;
      image: string;
      imageAlt: string;
    };
  };
  seo: {
    gaMeasurementId: string;
    gscVerification: string;
    priceRange: string;
  };
};

export const site = siteJson as unknown as Site;

/** "1906 Oceanside Blvd Ste Q, Oceanside, CA 92054" */
export const fullAddress = `${site.address.street} ${site.address.suite}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

/** Anything in the content files still carrying a TODO marker is not launch
 *  ready. Surfaced at build time rather than silently shipped — see NOTES.md
 *  for the full checklist. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return typeof value === "string" && value.startsWith("TODO_CONFIRM");
}
