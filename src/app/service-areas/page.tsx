import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { homeBase, nearbyCommunities } from "@/content/areas";
import { business } from "@/content/business";
import { services, servicePath } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Service Area: New Haven & Southeast Michigan",
  description:
    "Enzo’s Concrete LLC is based in New Haven, MI and serves homeowners across Macomb, Oakland and Wayne counties. See nearby communities and request an estimate.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Service Areas", path: "/service-areas" }]} eyebrow="Service area" title="Concrete contractor serving New Haven and Southeast Michigan">
        <p>
          {homeBase.note} From here we take on residential concrete projects across{" "}
          {business.serviceCounties.join(", ").replace(/, ([^,]*)$/, " and $1")}.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="counties-title">
        <div className="container">
          <h2 id="counties-title" className="section-title section-title--sm">
            Counties we serve
          </h2>
          <ul className="county-grid" role="list">
            <li className="county">
              <h3>Macomb County</h3>
              <p>
                Home turf. New Haven sits in Lenox Township in the north of the county, so communities like New
                Baltimore, Chesterfield, Richmond and Macomb Township are close by.
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
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="nearby-title">
        <div className="container area">
          <div>
            <h2 id="nearby-title" className="section-title section-title--sm">
              Communities near our New Haven base
            </h2>
            <p>
              These Macomb County communities are a short drive from New Haven. If your town isn’t listed, it doesn’t
              mean we can’t help. Include your city or township on the estimate form, or give us a call.
            </p>
            <p>
              <a className="text-link" href={business.phone.href}>
                <Icon name="phone" size={16} /> {business.phone.display}
              </a>
            </p>
          </div>
          <div className="area__panel area__panel--light">
            <ul className="chips chips--dark" role="list">
              {nearbyCommunities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
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
