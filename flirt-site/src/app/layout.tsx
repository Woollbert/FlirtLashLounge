import type { Metadata } from "next";
import { Bodoni_Moda, Jost, Italianno } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site, fullAddress } from "@/data/site";
import { verbatimTestimonials, aggregate } from "@/data/testimonials";
import { services } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBookBar from "@/components/MobileBookBar";

// High-contrast fashion serif for display. The variable optical-size axis
// matters here: at hero sizes Bodoni's hairlines should get thinner, and a
// static cut would either look clumsy large or vanish small.
const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Geometric sans for UI and body — the Futura-adjacent voice the reference
// board uses for every wide-tracked label.
const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

// Calligraphic accent, one or two words a page.
const script = Italianno({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || site.seo.gaMeasurementId || "";
const GSC = process.env.NEXT_PUBLIC_GSC_VERIFICATION || site.seo.gscVerification || "";

const baseUrl = site.url.replace(/\/$/, "");

// BeautySalon is the closest schema.org type — it is the parent of DaySpa and
// NailSalon and covers the lash, brow, and skin work that the more specific
// types would each only half-describe.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${baseUrl}/#business`,
  name: site.name,
  alternateName: site.shortName,
  description: site.description,
  url: baseUrl,
  telephone: site.phoneTel,
  image: `${baseUrl}/images/logo-card-dark.jpg`,
  logo: `${baseUrl}/images/logo-wordmark.png`,
  priceRange: site.seo.priceRange,
  currenciesAccepted: "USD",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.street} ${site.address.suite}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  hasMap: site.address.mapUrl,
  sameAs: [site.social.instagram, site.social.facebook, site.social.yelp].filter(Boolean),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      description: "By appointment",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.short,
        url: `${baseUrl}/services/${s.slug}`,
      },
      ...(s.priceFrom == null
        ? {}
        : { price: s.priceFrom, priceCurrency: "USD" }),
    })),
  },
  // Only word-for-word reviews go in here. A paraphrase presented as a review
  // snippet is a misrepresentation to both Google and the reader — see
  // src/data/testimonials.ts.
  ...(verbatimTestimonials.length > 0
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: aggregate.ratingValue,
          reviewCount: aggregate.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        review: verbatimTestimonials.map((t) => ({
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
          author: { "@type": "Person", name: t.author },
          reviewBody: t.quote,
        })),
      }
    : {}),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  url: baseUrl,
  name: site.name,
  publisher: { "@id": `${baseUrl}/#business` },
  inLanguage: "en-US",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Eyelash Extensions in ${site.address.city}, CA`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-lounge.jpg",
        width: 1200,
        height: 630,
        alt: site.hero.bgImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/images/hero-lounge.jpg"],
  },
  ...(GSC ? { verification: { google: GSC } } : {}),
  other: {
    "geo.region": `US-${site.address.region}`,
    "geo.placename": site.address.city,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${script.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-espresso">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] btn btn-ink"
        >
          Skip to content
        </a>

        <Navbar />
        {/* pb-16 on mobile clears the fixed book/call bar so the last element
            on every page is not sitting underneath it. */}
        <main id="main" className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBookBar />

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
        <span className="sr-only">{fullAddress}</span>
      </body>
    </html>
  );
}
