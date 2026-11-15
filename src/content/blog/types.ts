import type { ServiceSlug } from "../services";

/**
 * Inline text supports two lightweight marks, rendered by <RichText>:
 *   [link text](/internal-path)  or  [link text](https://external.example)
 *   **bold text**
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  /** Highlighted note: a tip, warning or local (Michigan) consideration. */
  | { type: "callout"; title: string; text: string }
  /** A project photo from the gallery, by project id. */
  | { type: "image"; project: string; caption?: string };

export type BlogSection = {
  /** Anchor id for the table of contents. */
  id: string;
  heading: string;
  blocks: Block[];
};

export type BlogPost = {
  slug: string;
  /** The service this guide supports; drives internal links, local links and the CTA. */
  service: ServiceSlug;
  /** H1. */
  title: string;
  /** <title> (the site name is appended by the layout template). Keep under ~60 characters. */
  metaTitle: string;
  /** Meta description. Keep around 140–158 characters. */
  metaDescription: string;
  /** One- or two-sentence summary for the hero and blog cards. */
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated?: string;
  /** Project id for the featured image. */
  heroProject: string;
  /** The main search phrase the post targets, plus close variants (used for schema keywords). */
  keywords: string[];
  takeaways: string[];
  intro: string[];
  sections: BlogSection[];
  faqs: { q: string; a: string }[];
};
