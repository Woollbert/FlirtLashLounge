import type { Faq } from "@/data/services";

/**
 * FAQ list built on <details>/<summary>.
 *
 * No state, no client bundle, and it stays open/closed correctly with JS
 * disabled — and browser in-page find ("find on page") can reach text inside
 * a collapsed <details>, which it cannot inside a div toggled by React state.
 */
export default function FaqAccordion({ items }: { items: Faq[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((faq) => (
        <li key={faq.q}>
          <details className="group">
            <summary className="flex items-start justify-between gap-6 cursor-pointer list-none py-6 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-lg md:text-xl text-ink pr-2">
                {faq.q}
              </h3>
              {/* Plus that becomes a minus: two bars, one of which rotates
                  out of sight when the item opens. */}
              <span
                className="relative shrink-0 mt-2 w-3.5 h-3.5 text-clay"
                aria-hidden="true"
              >
                <span className="absolute top-1/2 left-0 w-full h-px bg-current -translate-y-1/2" />
                <span className="absolute top-1/2 left-0 w-full h-px bg-current -translate-y-1/2 rotate-90 transition-transform duration-300 group-open:rotate-0" />
              </span>
            </summary>
            <p className="pb-7 -mt-1 pr-10 text-[0.95rem] leading-[1.8] text-mute">
              {faq.a}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}
