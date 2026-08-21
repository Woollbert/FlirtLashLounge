import Image from "next/image";
import Reveal from "@/components/Reveal";
import { gallery, type GalleryItem } from "@/data/gallery";

/**
 * Editorial masonry. Rather than a JS masonry library, every tile is a fixed
 * aspect ratio — 4:5 normally, 4:6 for the `tall` ones — inside a plain CSS
 * grid. The heights therefore differ per column without any measurement pass,
 * which means no layout shift after hydration and no client JS at all.
 */
export default function GalleryGrid({ items = gallery }: { items?: GalleryItem[] }) {
  return (
    <ul className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal as="li" key={item.src} delay={(i % 3) * 90}>
          <figure className="group relative overflow-hidden bg-sand">
            <div className={`relative ${item.tall ? "aspect-[4/6]" : "aspect-[4/5]"}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
            </div>
            <figcaption
              className="absolute inset-x-0 bottom-0 p-5 opacity-0 translate-y-2 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:translate-y-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(27,23,20,0.75), rgba(27,23,20,0))",
              }}
            >
              <span className="eyebrow eyebrow-light">{item.category}</span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
