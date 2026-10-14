import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Gallery } from "@/components/Gallery";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCard } from "@/components/ServiceCard";
import { business } from "@/content/business";
import { projectById, projects, projectsFor } from "@/content/projects";
import { serviceBySlug, services } from "@/content/services";
import { pageMetadata, serviceSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = serviceBySlug((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();

  const lead = projectById(service.leadProject);
  const own = projectsFor(service.slug);
  // Show this service's photos first, then related work so every page has visual proof.
  const gallery = [...own, ...projects.filter((p) => p.service !== service.slug)].slice(0, 3);
  const related = service.related.map((slug) => serviceBySlug(slug)!);
  const estimateHref = `/contact?service=${service.slug}`;

  return (
    <>
      <section className="service-hero">
        <div className="container service-hero__grid">
          <div className="service-hero__copy">
            <Breadcrumbs
              items={[
                { name: "Services", path: "/services" },
                { name: service.name, path: `/services/${service.slug}` },
              ]}
            />
            <p className="eyebrow eyebrow--light">{service.name} · New Haven, MI</p>
            <h1 className="service-hero__title">{service.h1}</h1>
            <p className="service-hero__lede">{service.lede}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary btn--lg" href={estimateHref} data-track="cta_estimate" data-track-location={`service_hero_${service.slug}`}>
                Request an Estimate <Icon name="arrow" size={18} />
              </Link>
              <a className="btn btn--ghost-light btn--lg" href={business.phone.href}>
                <Icon name="phone" size={18} /> {business.phone.display}
              </a>
            </div>
          </div>
          <figure className="service-hero__media">
            <Image src={lead.image} alt={lead.alt} priority fetchPriority="high" placeholder="blur" fill sizes="(min-width: 1024px) 42vw, 100vw" className="cover" style={{ objectPosition: lead.focus }} />
            <figcaption className="photo-tag">
              <span>Our work</span> {lead.title}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="benefits-title">
        <div className="container">
          <h2 id="benefits-title" className="section-title section-title--sm">
            What you get with {service.name.toLowerCase()} from Enzo’s
          </h2>
          <ul className="benefits" role="list">
            {service.benefits.map((b, i) => (
              <li key={b.title} className="benefits__item">
                <span className="benefits__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="planning-title">
        <div className="container planning">
          <div className="prose">
            <p className="eyebrow">Plan ahead</p>
            <h2 id="planning-title" className="section-title section-title--sm">
              {service.planning.heading}
            </h2>
            {service.planning.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            {service.slug === "concrete-driveways" && (
              <p>
                <Link className="text-link" href="/services/driveway-expansions">
                  Compare driveway expansions <Icon name="arrow" size={16} />
                </Link>
              </p>
            )}
          </div>
          <div className="quote-card" role="region" aria-labelledby="quote-card-title">
            <h2 id="quote-card-title">Get an estimate for your project</h2>
            <p>Send a few details and we’ll follow up to talk through your project.</p>
            <Link className="btn btn--primary btn--block" href={estimateHref} data-track="cta_estimate" data-track-location={`service_aside_${service.slug}`}>
              Request an Estimate
            </Link>
            <a className="quote-card__phone" href={business.phone.href}>
              <Icon name="phone" size={18} /> Or call {business.phone.display}
            </a>
            <a className="quote-card__bbb" href={business.bbb.profileUrl} target="_blank" rel="noopener">
              <Icon name="shield" size={18} /> BBB Accredited · {business.bbb.rating} rating
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">Project photos</p>
              <h2 id="work-title" className="section-title section-title--sm">
                From our project gallery
              </h2>
            </div>
            <Link className="text-link" href="/our-work">
              See all projects <Icon name="arrow" size={16} />
            </Link>
          </div>
          <Gallery projects={gallery} />
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="faq-title">
        <div className="container faq">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="section-title section-title--sm">
              {service.name}: common questions
            </h2>
            <p>
              Have a question that isn’t answered here? Call{" "}
              <a href={business.phone.href}>{business.phone.display}</a>.
            </p>
          </div>
          <dl className="faq__list">
            {service.faqs.map((f) => (
              <div key={f.q} className="faq__item">
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="related-title">
        <div className="container">
          <h2 id="related-title" className="section-title section-title--sm">
            Related services
          </h2>
          <div className="service-grid service-grid--three">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to talk about your project?"
        body={`Tell us what you have in mind and where the project is. We’ll follow up to talk through ${service.label.toLowerCase()} options, timing and your estimate.`}
        estimateHref={estimateHref}
        location={`service_final_${service.slug}`}
      />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
