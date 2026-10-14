import { CtaBand } from "@/components/CtaBand";
import { WorkGallery } from "@/components/WorkGallery";
import { PageHero } from "@/components/PageHero";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work: Concrete Project Gallery",
  description:
    "Photos of real concrete projects by Enzo’s Concrete LLC: driveways, exposed-aggregate and stamped patios, walkways and steps, pool decks, pole barn floors and more.",
  path: "/our-work",
});

export default function OurWorkPage() {
  const order = [...services.map((s) => s.slug), "slabs" as const];
  // Round-robin across categories so the "All" view opens with variety, not 15 driveways in a row.
  const queues = order.map((c) => projects.filter((p) => p.service === c));
  const mixed = [];
  for (let i = 0; queues.some((q) => i < q.length); i++) for (const q of queues) if (q[i]) mixed.push(q[i]);
  return (
    <>
      <PageHero crumbs={[{ name: "Our Work", path: "/our-work" }]} eyebrow="Project gallery" title="Our work, photographed on the job">
        <p>
          Every photo here is a project by Enzo’s Concrete LLC. Filter by type, select any photo to see it larger,
          or jump to the service it belongs to.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="gallery-title">
        <div className="container">
          <h2 id="gallery-title" className="visually-hidden">
            Project photos
          </h2>
          <WorkGallery projects={mixed} order={order} />
        </div>
      </section>

      <CtaBand title="Like what you see?" body="Tell us about your project and we’ll follow up to talk through options and your estimate." location="work_final" />
    </>
  );
}
