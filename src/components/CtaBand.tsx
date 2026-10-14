import Link from "next/link";
import { business } from "@/content/business";
import { Icon } from "./Icon";

export function CtaBand({
  title = "Ready to start your concrete project?",
  body = "Tell us what you’re planning: a new driveway, a patio, a walkway or something else. We’ll follow up to talk through the details and set up your estimate.",
  estimateHref = "/contact",
  location = "cta_band",
}: {
  title?: string;
  body?: string;
  estimateHref?: string;
  location?: string;
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="container cta-band__inner">
        <div>
          <h2 id="cta-band-title" className="cta-band__title">
            {title}
          </h2>
          <p className="cta-band__body">{body}</p>
        </div>
        <div className="cta-band__actions">
          <Link className="btn btn--primary btn--lg" href={estimateHref} data-track="cta_estimate" data-track-location={location}>
            Request an Estimate
            <Icon name="arrow" size={18} />
          </Link>
          <a className="btn btn--ghost-light btn--lg" href={business.phone.href}>
            <Icon name="phone" size={18} />
            Call {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
