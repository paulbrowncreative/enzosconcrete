import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { homeBase } from "@/content/areas";
import { business } from "@/content/business";
import { cities, cityPath } from "@/content/cities";
import { services, servicePath } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Areas We Serve in Macomb County, MI",
  description:
    "Enzo’s Concrete LLC serves New Haven, Chesterfield, New Baltimore, Macomb Township, Shelby, Sterling Heights and more across Macomb, Oakland and Wayne counties.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  const sorted = [...cities].sort((a, b) => a.miles - b.miles);
  return (
    <>
      <PageHero crumbs={[{ name: "Service Areas", path: "/service-areas" }]} eyebrow="Service area" title="Concrete contractor serving New Haven and Macomb County">
        <p>
          {homeBase.note} From here we take on residential concrete projects across{" "}
          {business.serviceCounties.join(", ").replace(/, ([^,]*)$/, " and $1")}.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="communities-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">Local pages</p>
              <h2 id="communities-title" className="section-title section-title--sm">
                Communities we serve, closest first
              </h2>
            </div>
            <p className="section-intro">
              Each page covers local considerations, permit pointers and the projects most common in that community.
            </p>
          </div>
          <ul className="city-grid" role="list">
            {sorted.map((c) => (
              <li key={c.slug}>
                <article className="city-card">
                  <p className="city-card__meta">
                    {c.miles === 0 ? "Home base" : `About ${c.miles} mi away`} · {c.county} County
                  </p>
                  <h3>
                    <Link className="stretched-link" href={cityPath(c.slug)}>
                      Concrete contractor in {c.name}
                    </Link>
                  </h3>
                  <p>{c.focus.map((f) => services.find((s) => s.slug === f.service)!.label).join(" · ")}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="counties-title">
        <div className="container">
          <h2 id="counties-title" className="section-title section-title--sm">
            Counties we serve
          </h2>
          <ul className="county-grid" role="list">
            <li className="county">
              <h3>Macomb County</h3>
              <p>
                Home turf. New Haven sits in Lenox Township in the north of the county, and every community with its own
                page above is in Macomb County.
              </p>
            </li>
            <li className="county">
              <h3>Oakland County</h3>
              <p>
                We take on residential projects in Oakland County. Call to confirm availability and scheduling for your
                community.
              </p>
            </li>
            <li className="county">
              <h3>Wayne County</h3>
              <p>
                We also serve homeowners in Wayne County. Tell us where your project is when you request an estimate.
              </p>
            </li>
          </ul>
          <p className="fine-print">
            Don’t see your town? Call <a href={business.phone.href}>{business.phone.display}</a> or include your city on
            the <Link href="/contact">estimate form</Link>.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="area-services-title">
        <div className="container">
          <h2 id="area-services-title" className="section-title section-title--sm">
            Services available across our area
          </h2>
          <ul className="link-grid" role="list">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={servicePath(s.slug)}>
                  <strong>{s.name}</strong>
                  <span>{s.summary}</span>
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand location="areas_final" />
    </>
  );
}
