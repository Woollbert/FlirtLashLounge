"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { site } from "@/data/site";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/training", label: "Training" },
];

export default function Navbar() {
  const pathname = usePathname();
  // Only the homepage puts a full-bleed photo behind the bar; every other
  // route starts with a cream page header, so the bar is opaque from the top.
  const overlay = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    // Flip once the hero has scrolled far enough that cream-on-photo would
    // start landing on the pale lower half of the image.
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  // Close the drawer on navigation — Next keeps the layout mounted across
  // route changes, so nothing else would.
  useEffect(() => setOpen(false), [pathname]);

  // Lock the page behind the open drawer. Without this, scrolling the drawer
  // past its end scroll-chains into the page underneath on iOS.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = !overlay || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        solid
          ? "bg-cream/95 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ height: "var(--nav-h)" }}
    >
      <nav
        className="container-wide h-full flex items-center justify-between gap-6"
        aria-label="Primary"
      >
        <Link href="/" className="block" aria-label={`${site.name} — home`}>
          <Logo tone={solid ? "dark" : "light"} />
        </Link>

        <ul
          className={`hidden lg:flex items-center gap-9 transition-colors duration-500 ${
            solid ? "text-espresso" : "text-cream"
          }`}
        >
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-active={pathname.startsWith(item.href)}
                className="link-underline font-sans text-[0.7rem] uppercase tracking-wide2"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneTel}`}
            className={`hidden lg:inline-block link-underline font-sans text-[0.7rem] uppercase tracking-wide2 transition-colors duration-500 ${
              solid ? "text-espresso" : "text-cream"
            }`}
          >
            {site.phone}
          </a>
          <Link
            href="/book"
            className={`hidden sm:inline-flex btn !py-3 !px-6 ${
              solid ? "btn-ink" : "btn-light"
            }`}
          >
            Book Now
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden -mr-2 p-2 transition-colors duration-500 ${
              solid ? "text-ink" : "text-cream"
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden="true">
              <line
                x1="0"
                y1="1"
                x2="26"
                y2="1"
                stroke="currentColor"
                strokeWidth="1.2"
                className="origin-left transition-transform duration-300"
                style={open ? { transform: "rotate(9deg)" } : undefined}
              />
              <line
                x1="0"
                y1="13"
                x2="26"
                y2="13"
                stroke="currentColor"
                strokeWidth="1.2"
                className="origin-left transition-transform duration-300"
                style={open ? { transform: "rotate(-9deg)" } : undefined}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer. Rendered always and translated off-screen so the
          open/close both animate; `hidden` would skip the exit transition.

          The closed offset is -100% MINUS the navbar height, not -100%. The
          panel starts at top:var(--nav-h), so translating by exactly its own
          height leaves its bottom edge resting at y=nav-h — a strip of the
          drawer visible under the bar, painting over the logo (it is a later
          sibling inside the same header, so it wins the stacking order). */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 bottom-0 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "translate-y-0"
            : "-translate-y-[calc(100%_+_var(--nav-h))] pointer-events-none"
        }`}
        style={{ top: "var(--nav-h)" }}
        aria-hidden={!open}
      >
        <div className="container-wide h-full flex flex-col justify-between py-10 overflow-y-auto">
          <ul className="space-y-1">
            {NAV.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  className="block font-display text-4xl py-3 text-ink"
                  style={{
                    transitionDelay: `${i * 40}ms`,
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/join-our-team"
                tabIndex={open ? 0 : -1}
                className="block font-display text-4xl py-3 text-ink"
              >
                Join Our Team
              </Link>
            </li>
          </ul>

          <div className="pt-10 space-y-4">
            <Link
              href="/book"
              tabIndex={open ? 0 : -1}
              className="btn btn-ink w-full"
            >
              Book an appointment
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              tabIndex={open ? 0 : -1}
              className="btn btn-outline w-full"
            >
              Call {site.phone}
            </a>
            <p className="text-center text-sm text-mute pt-2">
              {site.address.street} {site.address.suite}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
