import Image from "next/image";
import Link from "next/link";
import { formatDate, postPath, readingMinutes, type BlogPost } from "@/content/blog";
import { projectById } from "@/content/projects";
import { serviceBySlug } from "@/content/services";
import { Icon } from "./Icon";

export function PostCard({
  post,
  size = "default",
  headingLevel = 3,
  priority = false,
}: {
  post: BlogPost;
  size?: "default" | "featured";
  headingLevel?: 2 | 3;
  priority?: boolean;
}) {
  const project = projectById(post.heroProject);
  const service = serviceBySlug(post.service)!;
  const Heading = `h${headingLevel}` as const;
  return (
    <article className={`post-card post-card--${size}`}>
      <div className="post-card__media">
        <Image
          src={project.image}
          alt=""
          fill
          priority={priority}
          sizes={size === "featured" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"}
          placeholder="blur"
          className="cover"
          style={{ objectPosition: project.focus }}
        />
      </div>
      <div className="post-card__body">
        <p className="post-card__tag">{service.label}</p>
        <Heading className="post-card__title">
          <Link href={postPath(post.slug)} className="stretched-link">
            {post.title}
          </Link>
        </Heading>
        <p className="post-card__excerpt">{post.excerpt}</p>
        <p className="post-card__meta">
          <time dateTime={post.updated ?? post.published}>{formatDate(post.updated ?? post.published)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(post)} min read</span>
          <Icon name="arrow" size={16} />
        </p>
      </div>
    </article>
  );
}
