import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/brand/logo-light.png";
import { business } from "@/content/business";
import { services, servicePath } from "@/content/services";
import { Icon } from "./Icon";
import { primaryNav } from "./nav";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Image src={logo} alt="Enzo’s Concrete LLC" width={140} height={138} />
          <p>
            Family-owned residential concrete contractor based in New Haven, Michigan, with {business.yearsExperience} years
            of experience.
          </p>
          <a className="bbb-link" href={business.bbb.profileUrl} rel="noopener" target="_blank">
            <Icon name="shield" size={22} />
            <span>
              <strong>BBB Accredited Business</strong>
              <span>{business.bbb.rating} rating · View our BBB profile</span>
            </span>
            <span className="visually-hidden">(opens in a new tab)</span>
          </a>
        </div>

        <div>
          <h2 className="site-footer__heading">Contact</h2>
          <ul className="site-footer__contact">
            <li>
              <Icon name="phone" size={16} />
              <a href={business.phone.href}>{business.phone.display}</a>
            </li>
            <li>
              <Icon name="mail" size={16} />
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </li>
            <li>
              <Icon name="pin" size={16} />
              <span>
                {business.address.locality}, {business.address.region} {business.address.postalCode}
              </span>
            </li>
            {business.hours?.map((h) => (
              <li key={h.days}>
                <Icon name="clock" size={16} />
                <span>
                  {h.days}: {h.opens}–{h.closes}
                </span>
              </li>
            ))}
          </ul>
          <Link className="btn btn--primary btn--sm" href="/contact" data-track="cta_estimate" data-track-location="footer">
            Request an Estimate
          </Link>
        </div>

        <nav aria-labelledby="footer-services">
          <h2 className="site-footer__heading" id="footer-services">
            Services
          </h2>
          <ul className="site-footer__links">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={servicePath(s.slug)}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 className="site-footer__heading" id="footer-company">
            Company
          </h2>
          <ul className="site-footer__links">
            <li>
              <Link href="/">Home</Link>
            </li>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container site-footer__base">
        <p>
          © {year} {business.name}. All rights reserved.
        </p>
        <p>Serving {business.serviceCounties.join(", ").replace(/, ([^,]*)$/, " and $1")}, Michigan.</p>
      </div>
    </footer>
  );
}
