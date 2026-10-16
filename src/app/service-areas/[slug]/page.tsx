import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Gallery } from "@/components/Gallery";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/content/business";
import { cities, cityBySlug, cityPath } from "@/content/cities";
import { cityServicePath } from "@/content/localServices";
import { projectById, projects } from "@/content/projects";
import { serviceBySlug, services } from "@/content/services";
import { cityServiceSchema, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cityBySlug((await params).slug);
  if (!city) return {};
  return pageMetadata({ title: city.metaTitle, description: city.metaDescription, path: cityPath(city.slug) });
}

export default async function CityPage({ params }: Props) {
  const city = cityBySlug((await params).slug);
  if (!city) notFound();

  const lead = projectById(city.leadProject);
  const focusSlugs: string[] = city.focus.map((f) => f.service);
  // Photos from the services that matter most here, then the rest, so each page leads differently.
  const gallery = [
    ...projects.filter((p) => focusSlugs.includes(p.service) && p.id !== lead.id),
    ...projects.filter((p) => !focusSlugs.includes(p.service) && p.id !== lead.id),
  ].slice(0, 3);
  const nearby = city.nearby.map((slug) => cityBySlug(slug)!).filter(Boolean);
  const estimateHref = `/contact?city=${encodeURIComponent(city.name)}`;

  return (
    <>
      <section className="service-hero">
        <div className="container service-hero__grid">
          <div className="service-hero__copy">
            <Breadcrumbs
              items={[
                { name: "Service Areas", path: "/service-areas" },
                { name: city.name, path: cityPath(city.slug) },
              ]}
            />
            <p className="eyebrow eyebrow--light">
              {city.name}, MI · {city.county} County
            </p>
            <h1 className="service-hero__title">{city.h1}</h1>
            <p className="service-hero__lede">{city.lede}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary btn--lg" href={estimateHref} data-track="cta_estimate" data-track-location={`city_hero_${city.slug}`}>
                Request an Estimate <Icon name="arrow" size={18} />
              </Link>
              <a className="btn btn--ghost-light btn--lg" href={business.phone.href}>
                <Icon name="phone" size={18} /> {business.phone.display}
              </a>
            </div>
            <ul className="hero__proof" role="list">
              <li>
                <Icon name="pin" size={18} /> {city.miles === 0 ? "Based in New Haven" : `About ${city.miles} mi from our base`}
              </li>
              <li>
                <Icon name="shield" size={18} /> BBB Accredited · {business.bbb.rating}
              </li>
              <li>
                <Icon name="home" size={18} /> Family owned
              </li>
            </ul>
          </div>
          <figure className="service-hero__media">
            <Image src={lead.image} alt={lead.alt} priority fetchPriority="high" placeholder="blur" fill sizes="(min-width: 1024px) 42vw, 100vw" className="cover" style={{ objectPosition: lead.focus }} />
            <figcaption className="photo-tag">
              <span>Our work</span> {lead.title}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="context-title">
        <div className="container planning">
          <div className="prose">
            <p className="eyebrow">Local know-how</p>
            <h2 id="context-title" className="section-title section-title--sm">
              {city.context.heading}
            </h2>
            {city.context.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="snapshot" role="region" aria-labelledby="snapshot-title">
            <h2 id="snapshot-title" className="snapshot__title">
              {city.name} at a glance
            </h2>
            <dl>
              {city.snapshot.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            <Link className="btn btn--primary btn--block" href={estimateHref} data-track="cta_estimate" data-track-location={`city_snapshot_${city.slug}`}>
              Get a {city.name} estimate
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="focus-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Popular in {city.name}</p>
            <h2 id="focus-title" className="section-title section-title--sm">
              Concrete services for {city.name} homes
            </h2>
          </div>
          <ul className="benefits" role="list">
            {city.focus.map((f, i) => {
              const s = serviceBySlug(f.service)!;
              return (
                <li key={f.service} className="benefits__item">
                  <span className="benefits__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>
                    <Link className="plain-link" href={cityServicePath(city.slug, s.slug)}>
                      {s.name} in {city.name}
                    </Link>
                  </h3>
                  <p>{f.body}</p>
                  <Link className="text-link" href={cityServicePath(city.slug, s.slug)}>
                    {s.label} in {city.name} <Icon name="arrow" size={16} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="also-available">
            <h3 className="area__heading">All concrete services in {city.name}</h3>
            <ul className="chips chips--dark" role="list">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={cityServicePath(city.slug, s.slug)}>
                    {s.name} in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="permits-title">
        <div className="container">
          <div className="prose">
          <p className="eyebrow">Before you build</p>
          <h2 id="permits-title" className="section-title section-title--sm">
            {city.permits.heading}
          </h2>
          {city.permits.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          {city.permits.list && (
            <ul className="ticks ticks--plain" role="list">
              {city.permits.list.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {city.permits.source && (
            <p className="fine-print">
              Source:{" "}
              <a href={city.permits.source.url} target="_blank" rel="noopener">
                {city.permits.source.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              . Requirements change, so always confirm current rules with the municipality before work begins.
            </p>
          )}
          </div>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">Project photos</p>
              <h2 id="work-title" className="section-title section-title--sm">
                The kind of work we bring to {city.name}
              </h2>
            </div>
            <Link className="text-link" href="/our-work">
              See all projects <Icon name="arrow" size={16} />
            </Link>
          </div>
          <Gallery projects={gallery} />
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container faq">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="section-title section-title--sm">
              {city.name} concrete questions
            </h2>
            <p>
              Something else on your mind? Call <a href={business.phone.href}>{business.phone.display}</a>.
            </p>
          </div>
          <dl className="faq__list">
            {city.faqs.map((f) => (
              <div key={f.q} className="faq__item">
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="nearby-title">
        <div className="container">
          <h2 id="nearby-title" className="section-title section-title--sm">
            Nearby communities we serve
          </h2>
          <ul className="link-grid" role="list">
            {nearby.map((c) => (
              <li key={c.slug}>
                <Link href={cityPath(c.slug)}>
                  <strong>Concrete contractor in {c.name}</strong>
                  <span>{c.miles === 0 ? "Our home base" : `About ${c.miles} miles from New Haven`}</span>
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
          <p className="section-foot section-foot--start">
            <Link className="text-link" href="/service-areas">
              View our full service area <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title={`Planning a concrete project in ${city.name}?`}
        body={`Tell us what you have in mind and where in ${city.name} the project is. We’ll follow up to talk through options, timing and your estimate.`}
        estimateHref={estimateHref}
        location={`city_final_${city.slug}`}
      />
      <JsonLd data={cityServiceSchema(city)} />
    </>
  );
}
