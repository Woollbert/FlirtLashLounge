/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Salon photography is shot for print and arrives huge. AVIF first — a
    // lash close-up is all smooth skin gradients, exactly where AVIF beats
    // WebP by a wide margin — with WebP behind it for older Safari.
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints the layouts actually request, so we don't
    // generate a dozen unused encodes of every gallery shot at build time.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [96, 160, 256, 384, 512],
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
