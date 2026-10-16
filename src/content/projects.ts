import type { StaticImageData } from "next/image";
import driveway from "@/assets/projects/concrete-driveway-new-pour-washdown.jpg";
import expansion from "@/assets/projects/driveway-expansion-broom-finish.jpg";
import patio from "@/assets/projects/exposed-aggregate-patio-curved-edge.jpg";
import curvedWalk from "@/assets/projects/exposed-aggregate-walkway-curved-garden.jpg";
import sideWalk from "@/assets/projects/exposed-aggregate-side-walkway-step.jpg";
import frontWalk from "@/assets/projects/exposed-aggregate-front-walk-border.jpg";
import gardenWall from "@/assets/projects/exposed-aggregate-garden-wall.jpg";
import poolDeck from "@/assets/projects/concrete-pool-deck.jpg";
import { facebookProjects } from "./projects-facebook";
import { serviceBySlug, type ServiceSlug } from "./services";

export type ProjectCategory = ServiceSlug;

export type Project = {
  id: string;
  title: string;
  service: ProjectCategory;
  finish: string;
  image: StaticImageData;
  alt: string;
  /** object-position for cropped placements, when the subject isn't centered. */
  focus?: string;
  /** Where the photo came from (see docs/asset-manifest.md). */
  source?: "website" | "facebook";
};

/**
 * Every project photo published on the previous site (see docs/asset-manifest.md).
 * Titles describe only what is visible in each photo — no invented locations or specs.
 */
const websiteProjects: Project[] = [
  {
    id: "curved-patio",
    title: "Curved exposed-aggregate patio",
    service: "concrete-patios",
    finish: "Exposed aggregate with dark aggregate border",
    image: patio,
    alt: "New exposed-aggregate concrete patio with a sweeping curved edge and dark aggregate border behind a two-story home",
  },
  {
    id: "driveway-washdown",
    title: "New concrete driveway",
    service: "concrete-driveways",
    finish: "Broom finish with control joints",
    image: driveway,
    focus: "50% 30%",
    alt: "Worker rinsing down a freshly finished concrete driveway beside a single-story home, safety cone in the foreground",
  },
  {
    id: "curved-walkway",
    title: "Curved garden walkway",
    service: "concrete-walkways",
    finish: "Exposed aggregate",
    image: curvedWalk,
    alt: "Exposed-aggregate concrete walkway curving around a circular garden bed and meeting a new broom-finished sidewalk",
  },
  {
    id: "garden-wall",
    title: "Exposed-aggregate garden wall",
    service: "retaining-walls",
    finish: "Exposed aggregate",
    image: gardenWall,
    alt: "Low exposed-aggregate concrete wall holding a raised hydrangea bed above a lawn along a brick house",
  },
  {
    id: "driveway-expansion",
    title: "Driveway widening",
    service: "driveway-expansions",
    finish: "Broom finish",
    image: expansion,
    alt: "Freshly poured concrete driveway extension running alongside an existing driveway, with an orange safety cone on the new slab",
  },
  {
    id: "side-walkway",
    title: "Side-yard walkway with step",
    service: "concrete-walkways",
    finish: "Exposed aggregate",
    image: sideWalk,
    alt: "Wide exposed-aggregate concrete walkway with a matching curved step at the side door of a home",
  },
  {
    id: "pool-deck",
    title: "Pool deck surround",
    service: "pool-decks",
    finish: "Textured light-gray finish",
    image: poolDeck,
    alt: "Light-gray textured concrete pool deck surrounding a kidney-shaped in-ground pool in a fenced backyard",
  },
  {
    id: "front-walk",
    title: "Front walk with contrasting border",
    service: "concrete-walkways",
    finish: "Exposed aggregate with dark border",
    image: frontWalk,
    alt: "Exposed-aggregate concrete front walk with a darker aggregate border running past a brick entry column",
  },
];

export const projects: Project[] = [...websiteProjects, ...facebookProjects];

export const categoryLabel = (cat: ProjectCategory) => serviceBySlug(cat)!.name;

export const projectsFor = (slug: ServiceSlug) => projects.filter((p) => p.service === slug);
export const projectById = (id: string) => projects.find((p) => p.id === id)!;
