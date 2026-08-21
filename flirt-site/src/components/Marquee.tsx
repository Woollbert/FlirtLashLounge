import { site } from "@/data/site";

/**
 * The service list, running edge to edge as a slow ticker. Purely decorative,
 * so it is hidden from assistive tech — every item in it is a real link in
 * the services grid a screen further down.
 *
 * The track holds the list twice and translates by exactly -50%, which puts
 * the copy where the original started at the moment the animation loops. Any
 * other distance shows a seam.
 */
export default function Marquee() {
  const items = site.marquee;

  return (
    <div
      className="border-y border-line bg-sand/60 py-5 overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center shrink-0">
            {items.map((item, i) => (
              <li key={`${copy}-${i}`} className="flex items-center">
                <span className="font-display italic text-xl md:text-2xl text-ink whitespace-nowrap px-8">
                  {item}
                </span>
                <span className="h-1 w-1 rounded-full bg-taupe shrink-0" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
