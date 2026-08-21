"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

/**
 * Fixed call/book bar on phones. Most traffic to a salon site arrives on a
 * phone from a maps listing with one intention, and making them scroll back
 * to a nav to act on it is the single most expensive thing a mobile layout
 * can do.
 *
 * Hidden on /book itself, where it would compete with the page's own form.
 */
export default function MobileBookBar() {
  const pathname = usePathname();
  if (pathname === "/book") return null;

  return (
    <>
      {/* Spacer, in normal flow after the footer, so the bar never covers the
          last line of the page. Lives here rather than as padding on <main>
          so it disappears with the bar on routes that hide it. */}
      <div
        className="lg:hidden"
        style={{ height: "calc(3.5rem + env(safe-area-inset-bottom))" }}
        aria-hidden="true"
      />
      <div
        className="lg:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-cream/95 backdrop-blur-md"
        // Keeps the buttons clear of the iOS home indicator.
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={`tel:${site.phoneTel}`}
          className="btn btn-outline !border-0 !border-r !border-line !py-4 text-ink"
        >
          Call
        </a>
        <Link href="/book" className="btn btn-ink !py-4">
          Book Now
        </Link>
      </div>
    </>
  );
}
