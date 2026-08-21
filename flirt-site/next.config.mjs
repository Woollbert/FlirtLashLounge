/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Salon photography is shot for print and arrives huge. AVIF first — a
    // lash close-up is all smooth skin gradients, exactly where AVIF beats
    // WebP by a wide margin — with WebP behind it for older Safari.
    formats: ["image/avif", "image/webp"],
    // 2560 and 3840 exist for the full-bleed hero on large and retina
    // displays. Without them the top of the list was 2048, so a 27" monitor
    // got a 2048px encode stretched across 2560px of viewport.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [96, 160, 256, 384, 512],
    // Next's default delivery quality is 75. That is fine for UI chrome and
    // visibly soft on skin, lashes, and brow hair — which is the entire
    // subject of this site. 88 is the working default; the hero and the
    // full-bleed bands ask for 92 explicitly.
    qualities: [75, 88, 92],
  },
  async headers() {
    return [
      {
        // Any *.vercel.app host is a review deployment, and a review
        // deployment must never be indexed: it still carries placeholder
        // content, and Google finding a second full copy of the site would
        // split ranking signals with the real domain. The canonical host is
        // unaffected, so this can stay in place permanently.
        source: "/:path*",
        has: [{ type: "host", value: "(?<sub>.*)\\.vercel\\.app" }],
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // The Wix site's URLs, kept alive so existing links, the Google
      // listing, and anything printed on a business card still land.
      { source: "/book-online", destination: "/book", permanent: true },
      { source: "/joinourteam", destination: "/join-our-team", permanent: true },
      { source: "/meet-the-owner", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
