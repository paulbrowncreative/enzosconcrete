import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/business";
import { cities } from "@/content/cities";
import { cityServicePath } from "@/content/localServices";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/our-work",
    "/about",
    "/service-areas",
    ...cities.map((c) => `/service-areas/${c.slug}`),
    ...cities.flatMap((c) => services.map((s) => cityServicePath(c.slug, s.slug))),
    "/contact",
    "/privacy-policy",
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
