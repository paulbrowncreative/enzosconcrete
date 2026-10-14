import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/business";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/our-work",
    "/about",
    "/service-areas",
    "/contact",
    "/privacy-policy",
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
