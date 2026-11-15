import type { Metadata } from "next";
import { absoluteUrl, business } from "@/content/business";
import type { City } from "@/content/cities";
import { cities } from "@/content/cities";
import { services, type Service } from "@/content/services";

// Child metadata replaces (not merges) openGraph, so every page re-declares the image.
const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Enzo’s Concrete LLC logo beside an exposed-aggregate patio edge",
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Absolute title (skips the site-name template). */
  absoluteTitle?: boolean;
  noindex?: boolean;
  /** Marks the page as an article (blog post) and uses its own share image. */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
    image: { url: string; width: number; height: number; alt: string };
  };
};

export function pageMetadata({ title, description, path, absoluteTitle, noindex, article }: PageMeta): Metadata {
  const image = article?.image ?? ogImage;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: absoluteTitle ? title : `${title} | ${business.name}`,
      description,
      url: path,
      siteName: business.name,
      locale: "en_US",
      images: [image],
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            section: article.section,
            tags: article.tags,
            authors: [business.name],
          }
        : { type: "website" as const }),
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const orgId = absoluteUrl("/#business");

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": orgId,
    name: business.name,
    url: absoluteUrl("/"),
    telephone: business.phone.e164,
    email: business.email,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/og-image.jpg"),
    description:
      "Licensed, insured and family-owned residential concrete contractor in New Haven, Michigan: driveways, patios, walkways and steps, retaining walls, driveway expansions, pool decks, concrete sealing and pole barn floors.",
    address: {
      "@type": "PostalAddress",
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: [
      ...business.serviceCounties.map((name) => ({ "@type": "AdministrativeArea", name: `${name}, Michigan` })),
      ...cities.map((c) => ({ "@type": c.kind === "city" ? "City" : "AdministrativeArea", name: `${c.name}, Michigan` })),
    ],
    sameAs: [business.bbb.profileUrl],
    knowsAbout: ["Concrete driveways", "Concrete patios", "Exposed aggregate concrete", "Concrete walkways", "Retaining walls", "Pool decks", "Concrete sealing", "Stamped concrete", "Pole barn floors"],
    ...(business.hours
      ? {
          openingHoursSpecification: business.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: business.name,
    publisher: { "@id": orgId },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": orgId },
    areaServed: business.serviceCounties.map((name) => ({ "@type": "AdministrativeArea", name: `${name}, Michigan` })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function cityServiceSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/service-areas/${city.slug}#service`),
    name: `Concrete contractor in ${city.name}, MI`,
    serviceType: "Residential concrete contractor",
    description: city.metaDescription,
    url: absoluteUrl(`/service-areas/${city.slug}`),
    provider: { "@id": orgId },
    areaServed: {
      "@type": city.kind === "city" ? "City" : "AdministrativeArea",
      name: `${city.name}, Michigan`,
      containedInPlace: { "@type": "AdministrativeArea", name: `${city.county} County, Michigan` },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Concrete services in ${city.name}`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(`/services/${s.slug}`) },
      })),
    },
  };
}

export function localServiceSchema(city: City, service: Service, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/service-areas/${city.slug}/${service.slug}#service`),
    name,
    serviceType: service.name,
    description,
    url: absoluteUrl(`/service-areas/${city.slug}/${service.slug}`),
    provider: { "@id": orgId },
    areaServed: {
      "@type": city.kind === "city" ? "City" : "AdministrativeArea",
      name: `${city.name}, Michigan`,
      containedInPlace: { "@type": "AdministrativeArea", name: `${city.county} County, Michigan` },
    },
  };
}

type PostForSchema = {
  title: string;
  description: string;
  path: string;
  published: string;
  updated?: string;
  image: { url: string; width: number; height: number };
  keywords: string[];
  wordCount: number;
  section: string;
  servicePath: string;
};

export function blogPostingSchema(post: PostForSchema) {
  const url = absoluteUrl(post.path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: { "@type": "ImageObject", url: absoluteUrl(post.image.url), width: post.image.width, height: post.image.height },
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    isPartOf: { "@id": absoluteUrl("/blog#blog") },
    articleSection: post.section,
    keywords: post.keywords.join(", "),
    wordCount: post.wordCount,
    inLanguage: "en-US",
    about: { "@type": "Service", name: post.section, url: absoluteUrl(post.servicePath), provider: { "@id": orgId } },
  };
}

export function blogSchema(items: { title: string; path: string; published: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog#blog"),
    name: `${business.shortName} Blog`,
    url: absoluteUrl("/blog"),
    publisher: { "@id": orgId },
    inLanguage: "en-US",
    blogPost: items.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(p.path),
      datePublished: p.published,
    })),
  };
}
