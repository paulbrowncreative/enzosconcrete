"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { categoryLabel, type Project } from "@/content/projects";
import { serviceBySlug, servicePath } from "@/content/services";
import { Icon } from "./Icon";

/**
 * Masonry project gallery with an accessible <dialog> lightbox.
 * Thumbnails are real buttons; the native dialog handles focus trapping and Escape.
 */
export function Gallery({
  projects,
  headingLevel = 3,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  projects: Project[];
  headingLevel?: 2 | 3;
  sizes?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const Heading = `h${headingLevel}` as const;

  const open = (i: number) => {
    setActive(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + projects.length) % projects.length)),
    [projects.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setActive(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = active === null ? null : projects[active];
  const currentService = current ? serviceBySlug(current.service) : undefined;

  return (
    <>
      <ul className="gallery" role="list">
        {projects.map((p, i) => {
          const service = serviceBySlug(p.service);
          return (
            <li key={p.id} className="gallery__item">
              <figure>
                <button type="button" className="gallery__trigger" onClick={() => open(i)}>
                  <Image
                    src={p.image}
                    alt={p.alt}
                    sizes={sizes}
                    placeholder="blur"
                    className="gallery__img"
                  />
                  <span className="gallery__zoom" aria-hidden="true">
                    <Icon name="expand" size={18} />
                  </span>
                  <span className="visually-hidden">View larger photo</span>
                </button>
                <figcaption className="gallery__caption">
                  <Heading className="gallery__title">{p.title}</Heading>
                  {service ? (
                    <Link href={servicePath(service.slug)} className="gallery__tag">
                      {service.name}
                    </Link>
                  ) : (
                    <span className="gallery__tag">{categoryLabel(p.service)}</span>
                  )}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Project photo viewer"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && (
          <div className="lightbox__inner">
            <div className="lightbox__frame">
              <Image
                key={current.id}
                src={current.image}
                alt={current.alt}
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="lightbox__img"
              />
            </div>
            <div className="lightbox__bar">
              <p className="lightbox__caption">
                <strong>{current.title}</strong>
                <span>
                  {current.finish}
                  {currentService ? (
                    <>
                      {" · "}
                      <Link href={servicePath(currentService.slug)} onClick={close}>
                        {currentService.name}
                      </Link>
                    </>
                  ) : (
                    ` · ${categoryLabel(current.service)}`
                  )}
                </span>
              </p>
              <p className="lightbox__count" aria-live="polite">
                {active! + 1} / {projects.length}
              </p>
              <div className="lightbox__controls">
                <button type="button" className="lightbox__btn" onClick={() => step(-1)}>
                  <Icon name="arrow" size={20} className="flip" />
                  <span className="visually-hidden">Previous photo</span>
                </button>
                <button type="button" className="lightbox__btn" onClick={() => step(1)}>
                  <Icon name="arrow" size={20} />
                  <span className="visually-hidden">Next photo</span>
                </button>
                <button type="button" className="lightbox__btn" onClick={close} autoFocus>
                  <Icon name="close" size={20} />
                  <span className="visually-hidden">Close photo viewer</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
