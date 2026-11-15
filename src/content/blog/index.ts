import type { ServiceSlug } from "../services";
import { drivewayReplacement } from "./posts/concrete-driveway-replacement-guide";
import { drivewayExpansionVsReplacement } from "./posts/driveway-expansion-vs-replacement";
import { patioFinishes } from "./posts/concrete-patio-finishes";
import { walkwayGuide } from "./posts/concrete-walkway-and-steps-guide";
import { retainingWallGuide } from "./posts/concrete-retaining-wall-guide";
import { poolDeckGuide } from "./posts/concrete-pool-deck-guide";
import { sealingGuide } from "./posts/how-often-to-seal-concrete";
import { poleBarnFloorGuide } from "./posts/pole-barn-concrete-floor-guide";
import type { BlogPost, Block } from "./types";

export type { BlogPost, Block, BlogSection } from "./types";

/** Newest first; ties keep this order. */
export const posts: BlogPost[] = [
  drivewayReplacement,
  patioFinishes,
  sealingGuide,
  poleBarnFloorGuide,
  drivewayExpansionVsReplacement,
  walkwayGuide,
  poolDeckGuide,
  retainingWallGuide,
].sort((a, b) => b.published.localeCompare(a.published));

export const postPath = (slug: string) => `/blog/${slug}`;
export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const postForService = (service: ServiceSlug) => posts.find((p) => p.service === service);

/** Strips the inline link/bold marks so text can be counted or used in plain-text contexts. */
export const plainText = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

function blockText(b: Block): string {
  switch (b.type) {
    case "p":
    case "h3":
      return b.text;
    case "ul":
    case "ol":
      return b.items.join(" ");
    case "callout":
      return `${b.title} ${b.text}`;
    case "image":
      return b.caption ?? "";
  }
}

export function wordCount(post: BlogPost) {
  const text = [
    ...post.takeaways,
    ...post.intro,
    ...post.sections.flatMap((s) => [s.heading, ...s.blocks.map(blockText)]),
    ...post.faqs.flatMap((f) => [f.q, f.a]),
  ]
    .map(plainText)
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** Minutes at ~225 words per minute, rounded up. */
export const readingMinutes = (post: BlogPost) => Math.max(1, Math.ceil(wordCount(post) / 225));

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));
