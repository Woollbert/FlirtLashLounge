"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

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

  // Escape closes, and Tab cycles within the drawer. Without the trap, tabbing
  // past the last drawer link walks into the page behind it — which is still
  // rendered and still scrollable-to, so a keyboard user ends up interacting
  // with content they cannot see under an opaque overlay.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = [
        triggerRef.current,
        ...panel.querySelectorAll<HTMLElement>("a[href], button"),
      ].filter((el): el is HTMLElement => Boolean(el));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (active === first || !panel.contains(active) && active !== triggerRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    {/* Always solid. The first draft faded the bar in over a dark hero; the
        hero is now ivory-veiled, so cream-on-photo would have disappeared and
        the transparent state bought nothing but a contrast gamble. */}
    <header
      className="fixed inset-x-0 top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-line"
      style={{ height: "var(--nav-h)" }}
    >
      <nav
        className="container-wide h-full flex items-center justify-between gap-6"
        aria-label="Primary"
      >
        <Link href="/" className="block" aria-label={`${site.name} — home`}>
          <Logo />
        </Link>

        <ul
          className="hidden lg:flex items-center gap-9 text-espresso"
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
            className="hidden lg:inline-block link-underline font-sans text-[0.7rem] uppercase tracking-wide2 text-espresso"
          >
            {site.phone}
          </a>
          <Link
            href="/book"
            className="hidden sm:inline-flex btn !py-3 !px-6 btn-ink"
          >
            Book Now
          </Link>

          <button
            type="button"
            ref={triggerRef}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden -mr-2 p-2 text-ink"
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

    </header>

      {/* Mobile drawer. Rendered always and translated off-screen so the
          open/close both animate; `hidden` would skip the exit transition.

          It is a SIBLING of <header>, not a child, and that is load-bearing.
          The header carries `backdrop-blur-md` once it goes solid, and
          backdrop-filter makes an element a containing block for fixed-position
          descendants. Nested inside, the drawer resolved top/bottom against the
          76px-tall header instead of the viewport and computed to height 0 —
          so the menu opened to nothing on every route except the top of the
          homepage, which is the one place the blur class is not applied.

          The closed offset is -100% MINUS the navbar height, not -100%. The
          panel starts at top:var(--nav-h), so translating by exactly its own
          height leaves its bottom edge resting at y=nav-h — a visible strip
          under the bar. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "translate-y-0"
            : "-translate-y-[calc(100%_+_var(--nav-h))] pointer-events-none"
        }`}
        style={{ top: "var(--nav-h)" }}
        aria-hidden={!open}
      >
        {/* The fixed call/book bar sits over the bottom of this panel, so the
            padding has to clear it or the address underneath is cut in half. */}
        <div
          className="container-wide h-full flex flex-col justify-between pt-10 overflow-y-auto"
          style={{ paddingBottom: "calc(5.5rem + env(safe-area-inset-bottom))" }}
        >
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
    </>
  );
}
