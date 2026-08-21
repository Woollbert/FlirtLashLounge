export type GalleryItem = {
  src: string;
  alt: string;
  /** Drives the masonry row span, so the grid is not a flat wall of squares. */
  tall?: boolean;
  category: string;
};

/**
 * Work from the recovered media library. Alt text is written from what is
 * actually visible in each frame — these are close-ups of real guests' lashes
 * and brows, so the descriptions stay on the work rather than the person.
 *
 * TODO: Brooklyn shoots new sets constantly. Adding one is: drop the file in
 * public/images, add an entry here. Nothing else needs to change.
 */
export const gallery: GalleryItem[] = [
  {
    src: "/images/gallery-01.jpg",
    alt: "A hybrid eyelash extension set with a soft cat-eye shape on a green-eyed guest.",
    category: "Lashes",
    tall: true,
  },
  {
    src: "/images/gallery-10.jpg",
    alt: "A Flirt artist isolating a single natural lash while applying extensions.",
    category: "In the lounge",
  },
  {
    src: "/images/gallery-02.jpg",
    alt: "Natural lashes lifted and tinted, curled upward from the base.",
    category: "Lash Lift",
  },
  {
    src: "/images/gallery-04.jpg",
    alt: "Laminated brows brushed up and set, showing full, even coverage.",
    category: "Brows",
    tall: true,
  },
  {
    src: "/images/gallery-03.jpg",
    alt: "A guest relaxing during a facial treatment.",
    category: "Skin",
  },
  {
    src: "/images/gallery-05.jpg",
    alt: "Healed ombré powder brows with a soft, shaded finish.",
    category: "Permanent Makeup",
    tall: true,
  },
  {
    src: "/images/gallery-06.jpg",
    alt: "A red structured gel manicure with a glossy finish.",
    category: "Nails",
  },
  {
    src: "/images/gallery-07.jpg",
    alt: "A tray of Flirt volume lashes held beside a pastel manicure.",
    category: "Lashes",
  },
  {
    src: "/images/gallery-08.jpg",
    alt: "A lash student practicing isolation technique on a training mannequin.",
    category: "Academy",
    tall: true,
  },
  {
    src: "/images/gallery-11.jpg",
    alt: "Close work in progress on a practice head during a Flirt lash course.",
    category: "Academy",
  },
  {
    src: "/images/gallery-12.jpg",
    alt: "Pigment being worked into a practice pad during permanent makeup training.",
    category: "Academy",
  },
];
