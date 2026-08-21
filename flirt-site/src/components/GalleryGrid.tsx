import Image from "next/image";
import Reveal from "@/components/Reveal";
import { gallery, type GalleryItem } from "@/data/gallery";

/**
 * Editorial masonry, done with CSS multi-column rather than grid.
 *
 * Grid was the first attempt and it does not actually produce masonry: every
 * row is as tall as its tallest tile, so each `tall` item punched a column of
 * dead cream space under its shorter neighbours and the page read as broken
 * rather than editorial. Columns flow tiles continuously and close those gaps
 * with no measurement pass, no layout shift, and no client JS.
 *
 * The trade is reading order — columns run top-to-bottom, not left-to-right.
 * For an unordered set of photographs that costs nothing.
 */
export default function GalleryGrid({ items = gallery }: { items?: GalleryItem[] }) {
  return (
    <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.src}
          delay={(i % 3) * 90}
          // break-inside-avoid stops a column break landing mid-photograph;
          // the bottom margin is the vertical gutter, which `gap` only
          // supplies horizontally in a multi-column layout.
          className="break-inside-avoid mb-4 md:mb-6"
        >
          <figure className="group relative overflow-hidden bg-sand">
            <div className={`relative ${item.tall ? "aspect-[4/6]" : "aspect-[4/5]"}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                quality={88}
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
