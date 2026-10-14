import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { projectById } from "@/content/projects";
import { services, servicePath } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Residential Concrete Services in New Haven, MI",
  description:
    "Concrete driveways, patios, walkways, retaining walls, driveway expansions and pool decks for homeowners in New Haven and Macomb County, MI.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Services", path: "/services" }]} eyebrow="Services" title="Residential concrete services in New Haven, MI">
        <p>
          Six services, one standard. Whether it’s a full driveway replacement or a curved garden path, every job gets
          careful preparation, clean forming and a finish we’re proud to photograph.
        </p>
      </PageHero>

      <section className="section" aria-label="All services">
        <div className="container service-rows">
          {services.map((s, i) => {
            const p = projectById(s.leadProject);
            return (
              <article key={s.slug} className="service-row">
                <div className="service-row__media">
                  <Image src={p.image} alt={p.alt} placeholder="blur" sizes="(min-width: 900px) 42vw, 100vw" className="cover" fill style={{ objectPosition: p.focus }} />
                </div>
                <div className="service-row__body">
                  <span className="service-row__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="service-row__title">
                    <Link href={servicePath(s.slug)}>{s.name}</Link>
                  </h2>
                  <p>{s.lede}</p>
                  <ul className="ticks" role="list">
                    {s.benefits.map((b) => (
                      <li key={b.title}>
                        <Icon name="check" size={18} />
                        {b.title}
                      </li>
                    ))}
                  </ul>
                  <div className="service-row__actions">
                    <Link className="btn btn--dark" href={servicePath(s.slug)}>
                      {s.label}: details & FAQs <Icon name="arrow" size={18} />
                    </Link>
                    <Link className="text-link" href={`/contact?service=${s.slug}`} data-track="cta_estimate" data-track-location={`services_${s.slug}`}>
                      Request an estimate
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand location="services_final" />
    </>
  );
}
