import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PostCard } from "@/components/PostCard";
import { postForService, postPath, posts } from "@/content/blog";
import { services } from "@/content/services";
import { blogSchema, pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Concrete Guides for Michigan Homeowners | Blog",
    description:
      "Practical concrete guides from Enzo’s Concrete in New Haven, MI: driveways, patios, walkways, retaining walls, pool decks, sealing and pole barn floors.",
    path: "/blog",
  }),
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "Enzo’s Concrete Blog" }] },
  },
};

export default function BlogIndexPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", path: "/blog" }]} eyebrow="Blog" title="Concrete Guides for Michigan Homeowners">
        <p>
          Straight answers about driveways, patios, walkways, walls, pool decks, sealing and pole barn floors, written
          for homeowners in Macomb County and beyond. Each guide covers how the work is done, what to decide before you
          get an estimate, and how to make new concrete last through Michigan winters.
        </p>
      </PageHero>

      <section className="section section--tight" aria-labelledby="topics-title">
        <div className="container">
          <h2 id="topics-title" className="area__heading">
            Browse by Service
          </h2>
          <ul className="chips chips--dark" role="list">
            {services.map((s) => {
              const post = postForService(s.slug);
              return post ? (
                <li key={s.slug}>
                  <Link href={postPath(post.slug)}>{s.label}</Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="latest-title">
        <div className="container">
          <h2 id="latest-title" className="visually-hidden">
            All Guides
          </h2>
          <PostCard post={featured} size="featured" priority />
          <div className="post-grid post-grid--index">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand location="blog_index_final" />
      <JsonLd data={blogSchema(posts.map((p) => ({ title: p.title, path: postPath(p.slug), published: p.published })))} />
    </>
  );
}
