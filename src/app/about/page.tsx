import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { business } from "@/content/business";
import { projectById } from "@/content/projects";
import { services, servicePath } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us | Family-Owned Concrete Contractor",
  description:
    "Enzo’s Concrete LLC is a family-owned residential concrete contractor in New Haven, MI with 15+ years of experience and a BBB A+ accreditation.",
  path: "/about",
});

const values = [
  {
    title: "Preparation first",
    body: "What’s under the concrete decides how long it lasts. Grade, base and drainage are planned before the forms go up.",
  },
  {
    title: "Straight answers",
    body: "If an expansion makes more sense than a replacement, or the other way round, we’ll tell you, and explain why.",
  },
  {
    title: "Finish that holds up to a close look",
    body: "Crisp edges, smooth curves, contrasting borders and clean joints are the details that separate good concrete from great.",
  },
];

export default function AboutPage() {
  const walk = projectById("side-walkway");
  const patio = projectById("curved-patio");
  return (
    <>
      <PageHero crumbs={[{ name: "About", path: "/about" }]} eyebrow="About us" title="A family-owned concrete company in New Haven, Michigan">
        <p>
          Enzo’s Concrete LLC has been pouring residential concrete for more than fifteen years. We focus on the
          projects that make a home work better and look better: driveways, patios, walkways, walls and pool decks.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="story-title">
        <div className="container about">
          <div className="prose">
            <p className="eyebrow">Who we are</p>
            <h2 id="story-title" className="section-title section-title--sm">
              Residential concrete is all we do
            </h2>
            <p>
              We’re a family business based in New Haven, in northern Macomb County. Our focus is homes, so our attention goes to what matters to homeowners: how the finished concrete looks from
              the street, how it feels underfoot and how it holds up through Michigan winters.
            </p>
            <p>
              Exposed aggregate is a big part of our portfolio. It shows the natural stone in the mix, adds texture and
              traction, and pairs well with a darker contrasting border. You’ll see it in the{" "}
              <Link href={servicePath("concrete-patios")}>patios</Link>,{" "}
              <Link href={servicePath("concrete-walkways")}>walkways</Link> and{" "}
              <Link href={servicePath("retaining-walls")}>garden walls</Link> in our gallery, alongside clean
              broom-finished <Link href={servicePath("concrete-driveways")}>driveways</Link>.
            </p>
            <p>
              We’re accredited by the Better Business Bureau and hold an {business.bbb.rating} rating from BBB of
              Michigan. If you’d like to check us out before you call, start with our{" "}
              <a href={business.bbb.profileUrl} target="_blank" rel="noopener">
                BBB profile<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
          <div className="about__photos">
            <Image src={patio.image} alt={patio.alt} placeholder="blur" sizes="(min-width: 900px) 24vw, 50vw" />
            <Image src={walk.image} alt={walk.alt} placeholder="blur" sizes="(min-width: 900px) 24vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="values-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How we work</p>
            <h2 id="values-title" className="section-title section-title--sm">
              What you can expect from us
            </h2>
          </div>
          <ul className="benefits" role="list">
            {values.map((v, i) => (
              <li key={v.title} className="benefits__item">
                <span className="benefits__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="facts-title">
        <div className="container facts">
          <h2 id="facts-title" className="section-title section-title--sm">
            At a glance
          </h2>
          <dl className="facts__list">
            <div>
              <dt>Business</dt>
              <dd>{business.name}</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>
                {business.address.locality}, {business.address.regionName} {business.address.postalCode}
              </dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>{business.yearsExperience} years in residential concrete</dd>
            </div>
            <div>
              <dt>Ownership</dt>
              <dd>Family owned and operated</dd>
            </div>
            <div>
              <dt>BBB</dt>
              <dd>
                Accredited Business, {business.bbb.rating} rating
              </dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>
                <ul className="inline-list" role="list">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={servicePath(s.slug)}>{s.name}</Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Service area</dt>
              <dd>
                {business.serviceCounties.join(", ").replace(/, ([^,]*)$/, " and $1")} ·{" "}
                <Link href="/service-areas">details</Link>
              </dd>
            </div>
          </dl>
          <p>
            <Link className="text-link" href="/our-work">
              See our project gallery <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand location="about_final" />
    </>
  );
}
