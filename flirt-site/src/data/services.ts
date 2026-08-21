import data from "@/content/services.json";

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  category: string;
  short: string;
  /** Dollars, whole number. null until Brooklyn confirms the real menu price. */
  priceFrom: number | null;
  durationMin: number | null;
  description: string;
  features: string[];
  aftercare: string[];
  faqs: Faq[];
  imageUrl: string;
  imageAlt: string;
};

export const services: Service[] = data.items as Service[];
export const serviceCategories: string[] = data.categories;

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** "From $145" once a price exists, a booking nudge until then. Centralized so
 *  filling in `priceFrom` in the JSON flips every surface at once. */
export function priceLabel(service: Service): string {
  return service.priceFrom == null ? "View pricing" : `From $${service.priceFrom}`;
}

export function durationLabel(service: Service): string | null {
  const m = service.durationMin;
  if (m == null) return null;
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest === 0 ? `${h} hr` : `${h} hr ${rest} min`;
}

export const servicesByCategory: { category: string; items: Service[] }[] =
  serviceCategories.map((category) => ({
    category,
    items: services.filter((s) => s.category === category),
  }));
