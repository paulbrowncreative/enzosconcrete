import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Gallery } from "@/components/Gallery";
import { Icon } from "@/components/Icon";
import { ServiceCard } from "@/components/ServiceCard";
import { business } from "@/content/business";
import { cities, cityPath } from "@/content/cities";
import { projectById, projects } from "@/content/projects";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `New Haven & Macomb County Concrete Contractor | ${business.shortName}`,
  absoluteTitle: true,
  description:
    "Family-owned concrete contractor in New Haven, MI. Driveways, patios, walkways, retaining walls and pool decks across Macomb County. BBB A+ accredited. Call (586) 231-4217.",
  path: "/",
});

const heroProject = projectById("curved-patio");
const featured = ["curved-walkway", "driveway-washdown", "garden-wall", "side-walkway", "pool-deck", "driveway-expansion"].map(
  projectById,
);

const reasons = [
  {
    title: "Family owned and local",
    body: "We’re a family business based in New Haven. Our reputation is built on the driveways, patios and walkways our neighbors look at every day.",
  },
  {
    title: `${business.yearsExperience} years of concrete experience`,
    body: "More than fifteen years of residential concrete work. We know how good concrete gets prepared, poured and finished to last through Michigan winters.",
  },
  {
    title: `BBB accredited, ${business.bbb.rating} rated`,
    body: "Enzo’s Concrete LLC is a BBB Accredited Business with an A+ rating from BBB of Michigan. You can check our profile before you call.",
    link: { href: business.bbb.profileUrl, label: "View our BBB profile", external: true },
  },
  {
    title: "Finishing details you can see",
    body: "Contrasting aggregate borders, smooth curves, matching steps and clean joints. Every photo on this site shows our own work, so look closely.",
    link: { href: "/our-work", label: "See the project gallery" },
  },
];

const steps = [
  {
    title: "Tell us about your project",
    body: "Call, or send the estimate form with what you’re planning and where. Photos and rough measurements help, but aren’t required.",
  },
  {
    title: "Talk through the details",
    body: "We’ll go over size, finish, removal of existing concrete, access and timing, and look at the site.",
  },
  {
    title: "Review your estimate",
    body: "You get an estimate based on your actual project, with the scope explained, so you can compare with confidence.",
  },
  {
    title: "Schedule the work",
    body: "Once you’re ready, we set a date that works with the weather and your plans.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1 className="hero__title">
              <span className="eyebrow eyebrow--light">Residential concrete contractor · New Haven, MI</span>
              Concrete craftsmanship built to&nbsp;last.
            </h1>
            <p className="hero__lede">
              Driveways, patios, walkways, retaining walls and pool decks for homeowners in New Haven and across Macomb
              County. Family owned, with {business.yearsExperience} years of experience and a finish you’ll notice.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary btn--lg" href="/contact" data-track="cta_estimate" data-track-location="hero">
                Request an Estimate
                <Icon name="arrow" size={18} />
              </Link>
              <a className="btn btn--ghost-light btn--lg" href={business.phone.href} data-track-location="hero">
                <Icon name="phone" size={18} />
                {business.phone.display}
              </a>
            </div>
            <ul className="hero__proof" role="list">
              <li>
                <Icon name="shield" size={18} /> BBB Accredited · {business.bbb.rating}
              </li>
              <li>
                <Icon name="home" size={18} /> Family owned
              </li>
              <li>
                <Icon name="check" size={18} /> {business.yearsExperience} years experience
              </li>
            </ul>
          </div>
          <figure className="hero__media">
            <Image
              src={heroProject.image}
              alt={heroProject.alt}
              priority
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="cover"
              fill
            />
            <figcaption className="photo-tag">
              <span>Our work</span> {heroProject.title}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust" aria-label="Why homeowners trust Enzo’s Concrete">
        <ul className="container trust__list" role="list">
          <li>
            <strong>BBB Accredited Business</strong>
            <span>
              {business.bbb.rating} rating ·{" "}
              <a href={business.bbb.profileUrl} target="_blank" rel="noopener">
                view profile<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </span>
          </li>
          <li>
            <strong>Family owned & operated</strong>
            <span>Based in New Haven, MI</span>
          </li>
          <li>
            <strong>{business.yearsExperience} years experience</strong>
            <span>Residential concrete specialists</span>
          </li>
          <li>
            <strong>Real project photos</strong>
            <span>Every photo shown is our own work</span>
          </li>
        </ul>
      </section>

      {/* SERVICES */}
      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">What we pour</p>
              <h2 id="services-title" className="section-title">
                Residential concrete, done properly from base to finish
              </h2>
            </div>
            <p className="section-intro">
              From the driveway you park on every day to the patio where you spend summer evenings, each project gets
              the same attention to preparation, layout and finish.
            </p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} size={i < 2 ? "large" : "default"} />
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="section section--dark" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow eyebrow--light">Our work</p>
              <h2 id="work-title" className="section-title">
                The best proof is in the finish
              </h2>
            </div>
            <p className="section-intro">
              Exposed aggregate with contrasting borders, curves that follow the garden and clean, crisp driveways.
              Here’s a selection of recent projects.
            </p>
          </div>
          <Gallery projects={featured} />
          <div className="section-foot">
            <Link className="btn btn--ghost-light" href="/our-work">
              View all {projects.length} projects <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section" aria-labelledby="why-title">
        <div className="container why">
          <div className="why__intro">
            <p className="eyebrow">Why Enzo’s</p>
            <h2 id="why-title" className="section-title">
              Hiring a concrete contractor shouldn’t feel like a gamble
            </h2>
            <p>
              Concrete is permanent. Once it’s poured, the quality of the preparation and finishing is locked in for
              decades. Here’s what you can check before you hire us.
            </p>
            <figure className="why__photo">
              <Image
                src={projectById("front-walk").image}
                alt={projectById("front-walk").alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 34vw, 100vw"
              />
            </figure>
          </div>
          <ol className="reasons" role="list">
            {reasons.map((r, i) => (
              <li key={r.title} className="reasons__item">
                <span className="reasons__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                  {r.link &&
                    (r.link.external ? (
                      <a className="text-link" href={r.link.href} target="_blank" rel="noopener">
                        {r.link.label}
                        <span className="visually-hidden"> (opens in a new tab)</span> <Icon name="arrow" size={16} />
                      </a>
                    ) : (
                      <Link className="text-link" href={r.link.href}>
                        {r.link.label} <Icon name="arrow" size={16} />
                      </Link>
                    ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section--stone" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How it works</p>
            <h2 id="process-title" className="section-title">
              From first call to finished concrete
            </h2>
          </div>
          <ol className="process" role="list">
            {steps.map((s, i) => (
              <li key={s.title} className="process__step">
                <span className="process__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="fine-print">Every project is different. We’ll confirm the specific steps and timing for yours.</p>
        </div>
      </section>

      {/* REVIEWS: only rendered once verified reviews are added to content/business.ts */}
      {business.reviews.length > 0 && (
        <section className="section" aria-labelledby="reviews-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Reviews</p>
              <h2 id="reviews-title" className="section-title">
                What homeowners say
              </h2>
            </div>
            <ul className="reviews" role="list">
              {business.reviews.map((r) => (
                <li key={r.author + r.quote.slice(0, 12)}>
                  <blockquote>
                    <p>{r.quote}</p>
                  </blockquote>
                  <p className="reviews__cite">
                    {r.author} · <a href={r.url}>{r.source}</a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* AREA */}
      <section className="section" aria-labelledby="area-title">
        <div className="container area">
          <div>
            <p className="eyebrow">Service area</p>
            <h2 id="area-title" className="section-title">
              Based in New Haven, serving Macomb, Oakland and Wayne counties
            </h2>
            <p>
              Our home base is New Haven in northern Macomb County. We take on residential projects throughout{" "}
              {business.serviceCounties.join(", ").replace(/, ([^,]*)$/, " and $1")}.
            </p>
            <Link className="text-link" href="/service-areas">
              See our service area <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="area__panel">
            <h3 className="area__heading">Communities we serve</h3>
            <ul className="chips" role="list">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={cityPath(c.slug)}>{c.name}</Link>
                </li>
              ))}
            </ul>
            <p className="fine-print">
              Don’t see your town? Call <a href={business.phone.href}>{business.phone.display}</a> and ask.
            </p>
          </div>
        </div>
      </section>

      <CtaBand location="home_final" />
    </>
  );
}
