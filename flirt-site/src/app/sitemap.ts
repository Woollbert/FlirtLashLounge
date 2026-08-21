import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { serviceCities } from "@/data/cities";

const base = site.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  // Static rather than new Date(): a lastModified that changes on every build
  // trains crawlers to ignore the field. Bump it when content actually moves.
  const lastModified = new Date("2026-08-20");

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/book", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/gallery", priority: 0.7 },
    { path: "/gift-cards", priority: 0.7 },
    { path: "/training", priority: 0.7 },
    { path: "/join-our-team", priority: 0.5 },
    { path: "/service-areas", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...serviceCities.map((sc) => ({
      url: `${base}/${sc.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
