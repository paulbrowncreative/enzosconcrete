import Image from "next/image";
import Link from "next/link";
import { projectById } from "@/content/projects";
import { servicePath, type Service } from "@/content/services";
import { Icon } from "./Icon";

export function ServiceCard({
  service,
  index,
  size = "default",
  headingLevel = 3,
}: {
  service: Service;
  index: number;
  size?: "default" | "large";
  headingLevel?: 2 | 3;
}) {
  const project = projectById(service.leadProject);
  const Heading = `h${headingLevel}` as const;
  return (
    <article className={`service-card service-card--${size}`}>
      <div className="service-card__media">
        <Image
          src={project.image}
          alt=""
          fill
          sizes={size === "large" ? "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          placeholder="blur"
          className="cover"
          style={{ objectPosition: project.focus }}
        />
      </div>
      <div className="service-card__body">
        <span className="service-card__num" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Heading className="service-card__title">
          <Link href={servicePath(service.slug)} className="stretched-link">
            {service.name}
          </Link>
        </Heading>
        <p className="service-card__summary">{service.summary}</p>
        <span className="service-card__more" aria-hidden="true">
          Explore {service.label.toLowerCase()} <Icon name="arrow" size={16} />
        </span>
      </div>
    </article>
  );
}
