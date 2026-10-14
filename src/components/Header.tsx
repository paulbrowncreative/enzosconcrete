"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business } from "@/content/business";
import { services, servicePath } from "@/content/services";
import { Brand } from "./Brand";
import { Icon } from "./Icon";
import { primaryNav } from "./nav";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu after navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header" data-open={open || undefined}>
      <div className="container site-header__inner">
        <Brand />

        <nav
          className="primary-nav"
          id="primary-nav"
          aria-label="Main"
          // Also close when tapping a link to the page you're already on.
          onClick={(e) => (e.target as Element).closest("a") && setOpen(false)}
        >
          <ul className="primary-nav__list">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="primary-nav__link"
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="primary-nav__services" aria-label="Services">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={servicePath(s.slug)}>{s.name}</Link>
              </li>
            ))}
          </ul>
          <Link className="btn btn--primary btn--block primary-nav__cta" href="/contact" data-track="cta_estimate" data-track-location="mobile_menu">
            Request an Estimate
          </Link>
        </nav>

        <div className="site-header__actions">
          <a className="header-phone" href={business.phone.href}>
            <Icon name="phone" size={18} />
            <span className="header-phone__num">{business.phone.display}</span>
            <span className="visually-hidden header-phone__sr">Call {business.phone.display}</span>
          </a>
          <Link className="btn btn--primary btn--sm header-cta" href="/contact" data-track="cta_estimate" data-track-location="header">
            Request an Estimate
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
