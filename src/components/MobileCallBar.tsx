import Link from "next/link";
import { business } from "@/content/business";
import { Icon } from "./Icon";

/** Persistent thumb-reach actions on small screens (hidden ≥ 768px via CSS). */
export function MobileCallBar() {
  return (
    <nav className="mobile-bar" aria-label="Quick contact">
      <a className="mobile-bar__btn mobile-bar__btn--call" href={business.phone.href}>
        <Icon name="phone" size={18} />
        Call Now
      </a>
      <Link className="mobile-bar__btn mobile-bar__btn--quote" href="/contact" data-track="cta_estimate" data-track-location="mobile_bar">
        Get an Estimate
      </Link>
    </nav>
  );
}
