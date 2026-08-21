import data from "@/content/cities.json";
import { getService, type Service } from "@/data/services";

export type City = {
  slug: string;
  name: string;
  driveTime: string;
  direction: string;
  landmarks: string[];
  /** Genuinely city-specific copy. Exists to keep the generated pages from
   *  collapsing into near-duplicates of each other. */
  localNote: string;
  blurb: string;
};

export const cities: City[] = data.cities as City[];
export const cityServiceSlugs: string[] = data.serviceSlugs;

export type ServiceCity = {
  /** URL segment: "eyelash-extensions-carlsbad" */
  slug: string;
  service: Service;
  city: City;
};

/** The full local-SEO matrix: every listed service crossed with every city in
 *  the service area. Kept as one flat list so [slug]/page.tsx can resolve a
 *  route with a single find() and generateStaticParams can map it directly. */
export const serviceCities: ServiceCity[] = cityServiceSlugs.flatMap((serviceSlug) => {
  const service = getService(serviceSlug);
  if (!service) {
    throw new Error(
      `cities.json lists serviceSlug "${serviceSlug}", which has no matching ` +
        `entry in services.json. Add the service or remove the slug.`,
    );
  }
  return cities.map((city) => ({
    slug: `${serviceSlug}-${city.slug}`,
    service,
    city,
  }));
});

export function getServiceCity(slug: string): ServiceCity | undefined {
  return serviceCities.find((sc) => sc.slug === slug);
}

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
