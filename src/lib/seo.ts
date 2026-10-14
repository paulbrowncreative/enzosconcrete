import type { Metadata } from "next";
import { absoluteUrl, business } from "@/content/business";
import type { Service } from "@/content/services";

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
};

export function pageMetadata({ title, description, path, absoluteTitle, noindex }: PageMeta): Metadata {
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
      type: "website",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
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
      "Family-owned residential concrete contractor in New Haven, Michigan: driveways, patios, walkways, retaining walls, driveway expansions and pool decks.",
    address: {
      "@type": "PostalAddress",
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: business.serviceCounties.map((name) => ({
      "@type": "AdministrativeArea",
      name: `${name}, Michigan`,
    })),
    sameAs: [business.bbb.profileUrl],
    knowsAbout: ["Concrete driveways", "Concrete patios", "Exposed aggregate concrete", "Concrete walkways", "Retaining walls", "Pool decks"],
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
