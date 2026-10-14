import Link from "next/link";
import { Icon } from "@/components/Icon";
import { business } from "@/content/business";
import { services, servicePath } from "@/content/services";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow eyebrow--light">404</p>
        <h1 className="page-hero__title">This page has been poured over.</h1>
        <p className="not-found__lede">
          The page you’re looking for doesn’t exist or has moved. Try one of these, or call us at{" "}
          <a href={business.phone.href}>{business.phone.display}</a>.
        </p>
        <div className="hero__actions">
          <Link className="btn btn--primary" href="/">
            Back to home
          </Link>
          <Link className="btn btn--ghost-light" href="/contact">
            Request an Estimate
          </Link>
        </div>
        <ul className="not-found__links" role="list">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={servicePath(s.slug)}>
                {s.name} <Icon name="arrow" size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
