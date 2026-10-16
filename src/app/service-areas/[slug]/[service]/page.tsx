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
import { cities, cityBySlug, cityPath, type City } from "@/content/cities";
import {
  cityServicePath,
  cityTraits,
  distancePhrase,
  localCopy,
  macombRulesFor,
  touchesRoad,
  traitNotes,
} from "@/content/localServices";
import { projectById, projectsFor } from "@/content/projects";
import { serviceBySlug, servicePath, services, type Service } from "@/content/services";
import { localServiceSchema, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string; service: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.flatMap((c) => services.map((s) => ({ slug: c.slug, service: s.slug })));
}

function resolve(slug: string, serviceSlug: string) {
  const city = cityBySlug(slug);
  const service = serviceBySlug(serviceSlug);
  return city && service ? { city, service } : null;
}

function titleFor(city: City, service: Service) {
  const base = `${localCopy[service.slug].keyword} in ${city.name}, MI`;
  // Add the brand only when it still fits in a typical search-result title.
  return base.length + 18 <= 65 ? `${base} | Enzo’s Concrete` : base;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const r = resolve(p.slug, p.service);
  if (!r) return {};
  return pageMetadata({
    title: titleFor(r.city, r.service),
    absoluteTitle: true,
    description: localCopy[r.service.slug].meta(r.city),
    path: cityServicePath(r.city.slug, r.service.slug),
  });
}

export default async function CityServicePage({ params }: Props) {
  const p = await params;
  const r = resolve(p.slug, p.service);
  if (!r) notFound();
  const { city, service } = r;
  const copy = localCopy[service.slug];
  const cityIndex = cities.indexOf(city);
  const h1 = `${copy.keyword} in ${city.name}, MI`;

  // Rotate the lead photo by city so the same service doesn't show an identical hero everywhere.
  // Hero photos come from the full-resolution website originals when the service has any;
  // the smaller Facebook photos are better suited to the gallery grid.
  const photos = projectsFor(service.slug);
  const heroPool = photos.filter((ph) => ph.source !== "facebook");
  const pool = heroPool.length ? heroPool : photos;
  const lead = pool.length ? pool[cityIndex % pool.length] : projectById(service.leadProject);
  const gallery = photos.filter((ph) => ph.id !== lead.id);
  const offset = cityIndex % Math.max(gallery.length, 1);
  const galleryShown = [...gallery.slice(offset), ...gallery.slice(0, offset)].slice(0, 6);

  const notes = (cityTraits[city.slug] ?? []).map((t) => traitNotes[t][service.slug]).filter(Boolean) as string[];
  const focus = city.focus.find((f) => f.service === service.slug);
  const rules = city.permits.list ? macombRulesFor(service.slug, city.permits.list) : [];
  const muniRaw = city.snapshot[0]?.value.split(",")[0] ?? city.name;
  const muni = /^(City|Village|Charter Township) of/.test(muniRaw) ? `the ${muniRaw}` : muniRaw;
  const permitParagraphs =
    city.permits.list && rules.length === 0
      ? [
          `Check with ${muni} about permit requirements for ${copy.noun}. The township’s published flatwork requirements cover driveways, sidewalks and patios, so walls and building slabs may fall under different rules.`,
        ]
      : touchesRoad(service.slug)
        ? city.permits.paragraphs
        : city.permits.paragraphs.slice(0, 1);
  const serviceFaq = service.faqs[cityIndex % service.faqs.length];
  const nearby = city.nearby.map((s) => cityBySlug(s)!).filter(Boolean);
  const others = services.filter((s) => s.slug !== service.slug);
  const estimateHref = `/contact?service=${service.slug}&city=${encodeURIComponent(city.name)}`;
  const where = city.miles === 0 ? "right here in New Haven" : `about ${city.slug === "richmond" ? 7 : city.miles} miles from ${city.name}`;

  const faqs = [
    {
      q: `Do you ${copy.verb} ${copy.noun} in ${city.name}?`,
      a: `Yes. Enzo’s Concrete LLC is a family-owned contractor based ${where}, and ${city.name} is part of the ${city.county} County area we serve. Send your project details or call ${business.phone.display} to set up an estimate.`,
    },
    service.slug === "concrete-sealing"
      ? {
          q: `When is the best time to seal concrete in ${city.name}?`,
          a: "Sealing needs a dry surface and mild temperatures during application and drying, so most sealing happens in the warmer, drier months. New concrete also needs time to cure first. We’ll recommend timing for your surface.",
        }
      : {
          q: `Do I need a permit for ${copy.noun} in ${city.name}?`,
          a: rules.length
            ? `${city.name} publishes concrete requirements that apply to this kind of work, summarized on this page. Confirm current rules with the township’s Building Department before work begins.`
            : `Requirements vary by municipality and project. Check with ${muni} before work begins${touchesRoad(service.slug) ? ", and remember that work at the road approach may need a separate right-of-way permit" : ""}.`,
        },
    serviceFaq,
  ];

  return (
    <>
      <section className="service-hero">
        <div className="container service-hero__grid">
          <div className="service-hero__copy">
            <Breadcrumbs
              items={[
                { name: "Service Areas", path: "/service-areas" },
                { name: city.name, path: cityPath(city.slug) },
                { name: service.name, path: cityServicePath(city.slug, service.slug) },
              ]}
            />
            <p className="eyebrow eyebrow--light">
              {service.name} · {city.name}, MI
            </p>
            <h1 className="service-hero__title">{h1}</h1>
            <p className="service-hero__lede">{copy.lede(city, distancePhrase(city))}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary btn--lg" href={estimateHref} data-track="cta_estimate" data-track-location={`local_hero_${city.slug}_${service.slug}`}>
                Request an Estimate <Icon name="arrow" size={18} />
              </Link>
              <a className="btn btn--ghost-light btn--lg" href={business.phone.href}>
                <Icon name="phone" size={18} /> {business.phone.display}
              </a>
            </div>
            <ul className="hero__proof" role="list">
              <li>
                <Icon name="pin" size={18} /> {city.miles === 0 ? "Based in New Haven" : `About ${city.slug === "richmond" ? 7 : city.miles} mi from our base`}
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

      <section className="section" aria-labelledby="local-title">
        <div className="container planning">
          <div className="prose">
            <p className="eyebrow">Local know-how</p>
            <h2 id="local-title" className="section-title section-title--sm">
              {service.name} in {city.name}: what to plan for
            </h2>
            {focus && <p>{focus.body}</p>}
            {notes.map((n) => (
              <p key={n.slice(0, 40)}>{n}</p>
            ))}
            <p>{city.context.paragraphs[0]}</p>
            <p>
              <Link className="text-link" href={servicePath(service.slug)}>
                How we approach {service.name.toLowerCase()} <Icon name="arrow" size={16} />
              </Link>
            </p>
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
            <Link className="btn btn--primary btn--block" href={estimateHref} data-track="cta_estimate" data-track-location={`local_snapshot_${city.slug}_${service.slug}`}>
              Get your {city.name} estimate
            </Link>
          </div>
        </div>
      </section>


      <section className="section section--stone" aria-labelledby="permits-title">
        <div className="container">
          <div className="prose">
            <p className="eyebrow">Before you start</p>
            <h2 id="permits-title" className="section-title section-title--sm">
              {service.slug === "concrete-sealing" ? `Timing a sealing project in ${city.name}` : `Permits and planning in ${city.name}`}
            </h2>
            {service.slug === "concrete-sealing" ? (
              <p>{service.planning.paragraphs[1]}</p>
            ) : (
              <>
                {permitParagraphs.map((t) => (
                  <p key={t.slice(0, 32)}>{t}</p>
                ))}
                {rules.length > 0 && (
                  <ul className="ticks ticks--plain" role="list">
                    {rules.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {(rules.length > 0 || touchesRoad(service.slug)) && city.permits.source && (
                  <p className="fine-print">
                    Source:{" "}
                    <a href={city.permits.source.url} target="_blank" rel="noopener">
                      {city.permits.source.label}
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                    . Requirements change, so always confirm current rules with the municipality before work begins.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {galleryShown.length > 0 && (
        <section className="section" aria-labelledby="work-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow">Project photos</p>
                <h2 id="work-title" className="section-title section-title--sm">
                  {service.name}: recent projects
                </h2>
              </div>
              <Link className="text-link" href="/our-work">
                See all projects <Icon name="arrow" size={16} />
              </Link>
            </div>
            <Gallery projects={galleryShown} />
          </div>
        </section>
      )}

      <section className="section section--stone" aria-labelledby="faq-title">
        <div className="container faq">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="section-title section-title--sm">
              {service.name} in {city.name}: FAQ
            </h2>
            <p>
              Something else on your mind? Call <a href={business.phone.href}>{business.phone.display}</a>.
            </p>
          </div>
          <dl className="faq__list">
            {faqs.map((f) => (
              <div key={f.q} className="faq__item">
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="links-title">
        <div className="container">
          <h2 id="links-title" className="section-title section-title--sm">
            {service.name} near {city.name}
          </h2>
          <ul className="link-grid" role="list">
            {nearby.map((c) => (
              <li key={c.slug}>
                <Link href={cityServicePath(c.slug, service.slug)}>
                  <strong>
                    {service.label} in {c.name}
                  </strong>
                  <span>{c.miles === 0 ? "Our home base" : `About ${c.slug === "richmond" ? 7 : c.miles} miles from New Haven`}</span>
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="area__heading other-services-title">More concrete services in {city.name}</h2>
          <ul className="chips chips--dark" role="list">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={cityServicePath(city.slug, s.slug)}>{s.name}</Link>
              </li>
            ))}
          </ul>
          <p className="section-foot section-foot--start">
            <Link className="text-link" href={cityPath(city.slug)}>
              Everything we do in {city.name} <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title={`Ready to talk about your ${city.name} project?`}
        body={`Tell us about the ${service.label.toLowerCase()} work you have in mind. We’ll follow up to talk through options, timing and your estimate.`}
        estimateHref={estimateHref}
        location={`local_final_${city.slug}_${service.slug}`}
      />
      <JsonLd data={localServiceSchema(city, service, h1, copy.meta(city))} />
    </>
  );
}
