"use client";

import { useState } from "react";
import { categoryLabel, type Project, type ProjectCategory } from "@/content/projects";
import { Gallery } from "./Gallery";

/** Project gallery with category filter buttons (all photos stay in the HTML for crawlers). */
export function WorkGallery({ projects, order }: { projects: Project[]; order: ProjectCategory[] }) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const counts = new Map<ProjectCategory, number>();
  for (const p of projects) counts.set(p.service, (counts.get(p.service) ?? 0) + 1);
  const cats = order.filter((c) => counts.get(c));
  const shown = active === "all" ? projects : projects.filter((p) => p.service === active);

  return (
    <>
      <div className="filter-links" role="group" aria-label="Filter projects by type">
        <button type="button" aria-pressed={active === "all"} onClick={() => setActive("all")}>
          All projects <span>{projects.length}</span>
        </button>
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={active === c} onClick={() => setActive(c)}>
            {categoryLabel(c)} <span>{counts.get(c)}</span>
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        Showing {shown.length} {active === "all" ? "projects" : categoryLabel(active).toLowerCase() + " projects"}
      </p>
      <Gallery key={active} projects={shown} eagerCount={3} />
    </>
  );
}
