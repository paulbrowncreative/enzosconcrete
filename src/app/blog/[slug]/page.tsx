import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { RichText } from "@/components/RichText";
import { formatDate, postBySlug, postPath, posts, readingMinutes, wordCount, type Block, type BlogPost } from "@/content/blog";
import { business } from "@/content/business";
import { cities } from "@/content/cities";
import { cityServicePath } from "@/content/localServices";
import { projectById } from "@/content/projects";
import { serviceBySlug, servicePath, type ServiceSlug } from "@/content/services";
import { blogPostingSchema, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

/** Singular, natural phrasing for CTAs ("your driveway project"), keyed by service. */
const projectNoun: Record<ServiceSlug, string> = {
  "concrete-driveways": "driveway",
  "concrete-patios": "patio",
  "concrete-walkways": "walkway",
  "retaining-walls": "retaining wall",
  "driveway-expansions": "driveway expansion",
  "pool-decks": "pool deck",
  "concrete-sealing": "concrete sealing",
  "concrete-slabs": "pole barn floor or slab",
};
const titleCase = (s: string) => s.replace(/\b(?!or\b)\w/g, (c) => c.toUpperCase());

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = postBySlug((await params).slug);
  if (!post) return {};
  const hero = projectById(post.heroProject);
  const service = serviceBySlug(post.service)!;
  return pageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: postPath(post.slug),
    article: {
      publishedTime: post.published,
      modifiedTime: post.updated,
      section: service.name,
      tags: post.keywords,
      image: { url: hero.image.src, width: hero.image.width, height: hero.image.height, alt: hero.alt },
    },
  });
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List>
          {block.items.map((item) => (
            <li key={item.slice(0, 40)}>
              <RichText text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "callout":
      return (
        <div className="post-callout" role="note" aria-label={block.title}>
          <p className="post-callout__title">{block.title}</p>
          <p>
            <RichText text={block.text} />
          </p>
        </div>
      );
    case "image": {
      const project = projectById(block.project);
      return (
        <figure className="post-figure">
          <Image src={project.image} alt={project.alt} placeholder="blur" sizes="(min-width: 1024px) 44rem, 100vw" />
          <figcaption>
            <span>Our work</span> {block.caption ?? project.title}
          </figcaption>
        </figure>
      );
    }
  }
}

function Toc({ post }: { post: BlogPost }) {
  return (
    <ol className="post-toc__list">
      {post.sections.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`}>{s.heading}</a>
        </li>
      ))}
      {post.faqs.length > 0 && (
        <li>
          <a href="#faq">Frequently Asked Questions</a>
        </li>
      )}
    </ol>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();

  const service = serviceBySlug(post.service)!;
  const hero = projectById(post.heroProject);
  const minutes = readingMinutes(post);
  const estimateHref = `/contact?service=${service.slug}`;
  const noun = projectNoun[service.slug];
  const Noun = titleCase(noun);
  const midpoint = Math.ceil(post.sections.length / 2);
  // Related: posts for this service's related services first, then the rest.
  const related = [
    ...service.related.map((slug) => posts.find((p) => p.service === slug)),
    ...posts,
  ]
    .filter((p): p is BlogPost => Boolean(p) && p!.slug !== post.slug)
    .filter((p, i, all) => all.indexOf(p) === i)
    .slice(0, 3);

  return (
    <>
      <section className="page-hero post-hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Blog", path: "/blog" },
              { name: post.title, path: postPath(post.slug) },
            ]}
          />
          <p className="eyebrow eyebrow--light">
            <span>
              <Link href={servicePath(service.slug)}>{service.name}</Link> · Homeowner Guide
            </span>
          </p>
          <h1 className="page-hero__title post-hero__title">{post.title}</h1>
          <p className="page-hero__lede">{post.excerpt}</p>
          <p className="post-meta">
            <span>By {business.name}</span>
            <span>
              {post.updated ? "Updated " : "Published "}
              <time dateTime={post.updated ?? post.published}>{formatDate(post.updated ?? post.published)}</time>
            </span>
            <span>{minutes} min read</span>
          </p>
        </div>
      </section>

      <div className="container post-feature">
        <figure className="post-feature__media">
          <Image
            src={hero.image}
            alt={hero.alt}
            priority
            fetchPriority="high"
            placeholder="blur"
            sizes="(min-width: 1280px) 78rem, 100vw"
            className="cover"
            fill
            style={{ objectPosition: hero.focus }}
          />
          <figcaption className="photo-tag">
            <span>Our work</span> {hero.title}
          </figcaption>
        </figure>
      </div>

      <div className="container post-layout">
        <article className="post-body">

          <section className="post-takeaways" aria-labelledby="takeaways-title">
            <h2 id="takeaways-title">Key Takeaways</h2>
            <ul>
              {post.takeaways.map((t) => (
                <li key={t.slice(0, 40)}>
                  <RichText text={t} />
                </li>
              ))}
            </ul>
          </section>

          <details className="post-toc post-toc--inline">
            <summary>In This Guide</summary>
            <Toc post={post} />
          </details>

          {post.intro.map((p) => (
            <p key={p.slice(0, 40)} className="post-intro">
              <RichText text={p} />
            </p>
          ))}

          {post.sections.map((section, i) => (
            <Fragment key={section.id}>
              <section aria-labelledby={section.id}>
                <h2 id={section.id}>{section.heading}</h2>
                {section.blocks.map((block, j) => (
                  <BlockView key={`${section.id}-${j}`} block={block} />
                ))}
              </section>
              {i + 1 === midpoint && (
                <aside className="post-cta" aria-label="Request an estimate">
                  <p className="post-cta__title">Planning a {noun} project in Macomb County?</p>
                  <p>
                    Enzo’s Concrete is a licensed, insured, family-owned contractor based in New Haven. Tell us about
                    your project and we’ll set up a free estimate.
                  </p>
                  <div className="post-cta__actions">
                    <Link className="btn btn--primary" href={estimateHref} data-track="cta_estimate" data-track-location={`blog_mid_${post.slug}`}>
                      Request a Free Estimate <Icon name="arrow" size={18} />
                    </Link>
                    <a className="btn btn--ghost-light" href={business.phone.href} data-track-location={`blog_mid_${post.slug}`}>
                      <Icon name="phone" size={18} /> {business.phone.display}
                    </a>
                  </div>
                </aside>
              )}
            </Fragment>
          ))}

          {post.faqs.length > 0 && (
            <section aria-labelledby="faq" className="post-faq">
              <h2 id="faq">Frequently Asked Questions</h2>
              <dl>
                {post.faqs.map((f) => (
                  <div key={f.q}>
                    <dt>{f.q}</dt>
                    <dd>
                      <RichText text={f.a} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="post-next" aria-labelledby="next-title">
            <h2 id="next-title">Ready for Your Own {Noun} Project?</h2>
            <p>
              See finished work and what to expect on our <Link href={servicePath(service.slug)}>{service.name.toLowerCase()} page</Link>,
              browse the <Link href="/our-work">project gallery</Link>, or call or text{" "}
              <a href={business.phone.href}>{business.phone.display}</a> to talk through your plans.
            </p>
          </section>
        </article>

        <aside className="post-aside">
          <nav className="post-toc post-toc--side" aria-labelledby="toc-title">
            <p id="toc-title" className="post-toc__heading">
              In This Guide
            </p>
            <Toc post={post} />
          </nav>
          <div className="quote-card" role="region" aria-labelledby="post-quote-title">
            <h2 id="post-quote-title">Get a Free {Noun} Estimate</h2>
            <p>Licensed, insured and family owned in New Haven, MI.</p>
            <Link className="btn btn--primary btn--block" href={estimateHref} data-track="cta_estimate" data-track-location={`blog_aside_${post.slug}`}>
              Request a Free Estimate
            </Link>
            <a className="quote-card__phone" href={business.phone.href}>
              <Icon name="phone" size={18} /> Or call {business.phone.display}
            </a>
            <a className="quote-card__phone quote-card__phone--tight" href={business.phone.sms} data-track-location={`blog_aside_${post.slug}`}>
              <Icon name="message" size={18} /> Or text {business.phone.display}
            </a>
          </div>
        </aside>
      </div>

      <section className="section section--tight section--stone" aria-labelledby="local-title">
        <div className="container">
          <h2 id="local-title" className="area__heading">
            {service.name} Near You
          </h2>
          <ul className="chips chips--dark" role="list">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={cityServicePath(c.slug, service.slug)}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="more-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="more-title" className="section-title section-title--sm">
              More Concrete Guides
            </h2>
            <Link className="text-link" href="/blog">
              All guides <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="post-grid">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Talk to Us About Your ${Noun} Project`}
        body="Tell us what you have in mind and where the project is. We’ll follow up to talk through options, timing and your free estimate."
        estimateHref={estimateHref}
        location={`blog_final_${post.slug}`}
      />
      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          description: post.metaDescription,
          path: postPath(post.slug),
          published: post.published,
          updated: post.updated,
          image: { url: hero.image.src, width: hero.image.width, height: hero.image.height },
          keywords: post.keywords,
          wordCount: wordCount(post),
          section: service.name,
          servicePath: servicePath(service.slug),
        })}
      />
    </>
  );
}
