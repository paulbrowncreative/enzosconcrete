"use client";

import { useEffect, useRef, useState } from "react";
import { categoryLabel, type Project, type ProjectCategory } from "@/content/projects";
import { Gallery } from "./Gallery";

const PAGE = 24;

/**
 * Project gallery with category filters and a "show more" button. Rendering a couple dozen
 * photos at first keeps the page quick on phones; the rest load on request.
 */
export function WorkGallery({ projects, order }: { projects: Project[]; order: ProjectCategory[] }) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const [limit, setLimit] = useState(PAGE);
  const focusFrom = useRef<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  const counts = new Map<ProjectCategory, number>();
  for (const p of projects) counts.set(p.service, (counts.get(p.service) ?? 0) + 1);
  const cats = order.filter((c) => counts.get(c));
  const matching = active === "all" ? projects : projects.filter((p) => p.service === active);
  const shown = matching.slice(0, limit);
  const remaining = matching.length - shown.length;

  // After "Show more", move keyboard focus to the first newly revealed photo.
  useEffect(() => {
    if (focusFrom.current === null) return;
    wrap.current?.querySelectorAll<HTMLButtonElement>(".gallery__trigger")[focusFrom.current]?.focus();
    focusFrom.current = null;
  }, [limit]);

  const pick = (c: ProjectCategory | "all") => {
    setActive(c);
    setLimit(PAGE);
  };

  return (
    <>
      <div className="filter-links" role="group" aria-label="Filter projects by type">
        <button type="button" aria-pressed={active === "all"} onClick={() => pick("all")}>
          All projects <span>{projects.length}</span>
        </button>
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={active === c} onClick={() => pick(c)}>
            {categoryLabel(c)} <span>{counts.get(c)}</span>
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        Showing {shown.length} of {matching.length}{" "}
        {active === "all" ? "projects" : categoryLabel(active).toLowerCase() + " projects"}
      </p>
      <div ref={wrap}>
        <Gallery key={active} projects={shown} eagerCount={3} />
      </div>
      {remaining > 0 && (
        <div className="section-foot">
          <button
            type="button"
            className="btn btn--dark"
            onClick={() => {
              focusFrom.current = shown.length;
              setLimit((n) => n + PAGE);
            }}
          >
            Show more photos <span className="gallery-more__count">({remaining} more)</span>
          </button>
        </div>
      )}
    </>
  );
}
