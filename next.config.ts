import type { NextConfig } from "next";

/** Old B12 URLs → new structure, so existing links and any indexed pages carry over. */
const legacyRedirects: [string, string][] = [
  ["/index", "/"],
  ["/cement-driveways", "/services/concrete-driveways"],
  ["/custom-concrete-patios", "/services/concrete-patios"],
  ["/concrete-walkways-and-pathways", "/services/concrete-walkways"],
  ["/retaining-walls", "/services/retaining-walls"],
  ["/driveway-expansions", "/services/driveway-expansions"],
  ["/pool-deck", "/services/pool-decks"],
  ["/intake-form", "/contact"],
  ["/scheduling", "/contact"],
  ["/reschedule-appointment", "/contact"],
  ["/cancel-appointment", "/contact"],
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// Mirrors `indexable` in src/content/business.ts: staging/review deploys send a noindex header.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NETLIFY && (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL)) ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  "localhost";
const indexable = process.env.SITE_NOINDEX !== "true" && !/\.netlify\.app|\.vercel\.app|localhost/.test(siteUrl);
const robotsHeaders = indexable ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 2000],
    qualities: [70, 75],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [{ source: "/:path*", headers: [...securityHeaders, ...robotsHeaders] }];
  },
};

export default nextConfig;
