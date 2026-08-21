import teamJson from "@/content/team.json";
import offersJson from "@/content/offers.json";
import faqJson from "@/content/faq.json";
import trainingJson from "@/content/training.json";
import joinJson from "@/content/join.json";
import type { Faq } from "@/data/services";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  image: string;
  imageAlt: string;
  instagram: string | null;
  bookingUrl: string | null;
};

export const team: TeamMember[] = teamJson.members as TeamMember[];

export type MembershipTier = {
  slug: string;
  name: string;
  price: number | null;
  cadence: string;
  tagline: string;
  includes: string[];
  featured: boolean;
};

export const giftCards = offersJson.giftCards;
export const memberships = offersJson.memberships as {
  eyebrow: string;
  headlineLine1: string;
  headlineScript: string;
  intro: string;
  tiers: MembershipTier[];
  finePrint: string[];
};

export const faqs: Faq[] = faqJson.items as Faq[];

export type Course = {
  slug: string;
  name: string;
  price: number | null;
  duration: string;
  summary: string;
  featured: boolean;
};

export const training = trainingJson as typeof trainingJson & { courses: Course[] };
export const join = joinJson;

/** "$899" once a price exists, an invitation to ask until then. */
export function money(value: number | null): string {
  return value == null ? "Ask about pricing" : `$${value.toLocaleString("en-US")}`;
}
