import Link from "next/link";
import Logo from "@/components/Logo";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

const YEAR = 2026;

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.4-.12-2.38 0-4 1.45-4 4.11V9.9H7.6V13h2.7v8z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-sand text-mute">
      <div className="container-wide py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-6 script-accent !text-[2.2rem] !text-clay">
              {site.tagline}
            </p>
            <div className="mt-7 flex gap-4">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -m-2 hover:text-ink transition-colors"
                aria-label={`${site.shortName} on Instagram`}
              >
                <IconInstagram />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -m-2 hover:text-ink transition-colors"
                aria-label={`${site.shortName} on Facebook`}
              >
                <IconFacebook />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-[0.62rem] uppercase tracking-luxe text-clay">
              Services
            </h3>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="link-underline text-[0.9rem] hover:text-ink transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[0.62rem] uppercase tracking-luxe text-clay">
              Visit
            </h3>
            <address className="mt-6 not-italic text-[0.9rem] leading-[1.9]">
              <a
                href={site.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-ink transition-colors"
              >
                {site.address.street} {site.address.suite}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </a>
              <br />
              <a
                href={`tel:${site.phoneTel}`}
                className="link-underline mt-3 inline-block hover:text-ink transition-colors"
              >
                {site.phone}
              </a>
            </address>

            <dl className="mt-7 space-y-2 text-[0.85rem]">
              {site.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 max-w-[15rem]">
                  <dt>{h.day}</dt>
                  <dd className="text-mute">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[0.78rem] leading-relaxed text-mute max-w-[16rem]">
              {site.hoursNote}
            </p>
          </div>

          <div>
            <h3 className="font-sans text-[0.62rem] uppercase tracking-luxe text-clay">
              More
            </h3>
            <ul className="mt-6 space-y-3 text-[0.9rem]">
              <li>
                <Link href="/about" className="link-underline hover:text-ink transition-colors">
                  About &amp; Team
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="link-underline hover:text-ink transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="link-underline hover:text-ink transition-colors">
                  Gift Cards &amp; Memberships
                </Link>
              </li>
              <li>
                <Link href="/training" className="link-underline hover:text-ink transition-colors">
                  Lash Training
                </Link>
              </li>
              <li>
                <Link href="/join-our-team" className="link-underline hover:text-ink transition-colors">
                  Join Our Team
                </Link>
              </li>
              <li>
                <Link href="/book" className="link-underline hover:text-ink transition-colors">
                  Book Online
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="link-underline hover:text-ink transition-colors">
                  Service Areas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Service-area links. Crawlable from every page, which is most of
            why the city pages get indexed at all. */}
        <nav className="mt-16 pt-8 border-t border-line" aria-label="Service areas">
          <h3 className="font-sans text-[0.62rem] uppercase tracking-luxe text-clay">
            Proudly serving North County San Diego
          </h3>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/eyelash-extensions-${c.slug}`}
                  className="link-underline inline-block py-1 text-[0.82rem] text-mute hover:text-ink transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 pt-8 border-t border-line flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-[0.78rem] text-mute">
          <p>Thank you for choosing us.</p>
          <p>
            &copy; {YEAR} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
