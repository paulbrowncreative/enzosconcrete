import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { projects } from "@/content/projects";
import { services, servicePath } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work: Concrete Project Gallery",
  description:
    "Photos of real concrete projects by Enzo’s Concrete LLC: exposed-aggregate patios and walkways, driveways, driveway expansions, garden walls and a pool deck.",
  path: "/our-work",
});

export default function OurWorkPage() {
  const counts = services
    .map((s) => ({ s, n: projects.filter((p) => p.service === s.slug).length }))
    .filter((x) => x.n > 0);

  return (
    <>
      <PageHero crumbs={[{ name: "Our Work", path: "/our-work" }]} eyebrow="Project gallery" title="Our work, photographed on the job">
        <p>
          Every photo here is a project by Enzo’s Concrete LLC. Select any photo to see it larger, or jump to the
          service it belongs to.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="gallery-title">
        <div className="container">
          <h2 id="gallery-title" className="visually-hidden">
            Project photos
          </h2>
          <nav className="filter-links" aria-label="Services shown in the gallery">
            {counts.map(({ s, n }) => (
              <Link key={s.slug} href={servicePath(s.slug)}>
                {s.name} <span>{n}</span>
              </Link>
            ))}
          </nav>
          <Gallery projects={projects} />
        </div>
      </section>

      <CtaBand title="Like what you see?" body="Tell us about your project and we’ll follow up to talk through options and your estimate." location="work_final" />
    </>
  );
}
