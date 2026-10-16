import type { MetadataRoute } from "next";
import { absoluteUrl, indexable } from "@/content/business";

export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    // Review/staging deploy: keep every crawler out.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
