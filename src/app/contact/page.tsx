import { EstimateForm } from "@/components/EstimateForm";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Concrete Estimate",
  description:
    "Request an estimate from Enzo’s Concrete LLC in New Haven, MI. Call (586) 231-4217, email us, or send your project details online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Contact", path: "/contact" }]} eyebrow="Contact" title="Request a concrete estimate">
        <p>Tell us about your project. It takes about two minutes, and we’ll follow up to talk through the details.</p>
      </PageHero>

      <section className="section" aria-label="Estimate request">
        <div className="container contact">
          <div className="contact__form">
            <EstimateForm />
          </div>

          <div className="contact__aside" role="region" aria-labelledby="contact-direct">
            <h2 id="contact-direct" className="contact__heading">
              Prefer to talk?
            </h2>
            <a className="contact__big-link" href={business.phone.href} data-track-location="contact_aside">
              <Icon name="phone" size={22} />
              <span>
                <small>Call</small>
                {business.phone.display}
              </span>
            </a>
            <a className="contact__big-link" href={`mailto:${business.email}`}>
              <Icon name="mail" size={22} />
              <span>
                <small>Email</small>
                <span className="break">{business.email}</span>
              </span>
            </a>
            <p className="contact__line">
              <Icon name="pin" size={20} />
              <span>
                Based in {business.address.locality}, {business.address.region} {business.address.postalCode}
                <br />
                Serving {business.serviceCounties.join(", ").replace(/, ([^,]*)$/, " and $1")}
              </span>
            </p>

            <div className="contact__next">
              <h2 className="contact__heading">What happens next</h2>
              <ol>
                <li>We review your project details.</li>
                <li>We contact you the way you prefer to talk it through.</li>
                <li>You receive an estimate based on your actual project.</li>
              </ol>
            </div>

            <a className="bbb-link bbb-link--light" href={business.bbb.profileUrl} target="_blank" rel="noopener">
              <Icon name="shield" size={22} />
              <span>
                <strong>BBB Accredited Business</strong>
                <span>{business.bbb.rating} rating · View our profile</span>
              </span>
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
