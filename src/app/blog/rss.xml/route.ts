import { absoluteUrl, business } from "@/content/business";
import { postPath, posts } from "@/content/blog";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!);

export function GET() {
  const items = posts
    .map((p) => {
      const url = absoluteUrl(postPath(p.slug));
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(`${p.published}T12:00:00Z`).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(`${business.shortName} Blog`)}</title><link>${absoluteUrl("/blog")}</link><atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml"/><description>Concrete guides for Michigan homeowners from ${esc(business.name)}.</description><language>en-us</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
