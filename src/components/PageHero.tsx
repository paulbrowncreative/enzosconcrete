import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** Compact dark header band used by interior pages. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1 className="page-hero__title">{title}</h1>
        {children && <div className="page-hero__lede">{children}</div>}
      </div>
    </section>
  );
}
