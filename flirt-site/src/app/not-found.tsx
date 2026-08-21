import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <section className="min-h-[70svh] flex items-center">
      <div className="container-narrow text-center py-24">
        <p className="script-accent !text-[5rem] !text-taupe leading-none">Oops</p>
        <h1 className="display-lg mt-4">This page has grown out.</h1>
        <p className="lede mt-6 max-w-md mx-auto">
          Like a lash that has reached the end of its cycle, whatever was here is
          gone. Let&rsquo;s get you booked instead.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/book" className="btn btn-ink">
            Book an appointment
          </Link>
          <Link href="/services" className="btn btn-outline">
            View services
          </Link>
        </div>

        <p className="mt-10 text-[0.85rem] text-mute">
          Or call the lounge at{" "}
          <a href={`tel:${site.phoneTel}`} className="link-underline text-ink">
            {site.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
