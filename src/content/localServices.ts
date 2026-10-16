import type { City } from "./cities";
import type { ServiceSlug } from "./services";

/**
 * City × service landing pages (/service-areas/[city]/[service]).
 *
 * Each page targets one high-intent local search ("concrete driveway contractor in
 * Shelby Township"). To keep 100+ pages from being near-duplicates, the copy is
 * assembled from: the service's local keyword and lede, notes chosen by each city's
 * documented characteristics (traits below, grounded in the cited facts in cities.ts),
 * that city's permit guidance, and city-specific FAQs. Nothing here claims a past
 * project in any city.
 */

export type Trait =
  | "hometown"
  | "rural"
  | "wetground"
  | "lakeside"
  | "established"
  | "subdivision"
  | "riverside"
  | "snowier";

/** Traits per city, each backed by facts already cited on that city's page. */
export const cityTraits: Record<string, Trait[]> = {
  "new-haven": ["hometown", "riverside"],
  "lenox-township": ["rural", "wetground"],
  "new-baltimore": ["lakeside", "established"],
  "chesterfield-township": ["subdivision", "lakeside"],
  richmond: ["established"],
  "ray-township": ["rural"],
  armada: ["established", "rural"],
  "macomb-township": ["subdivision"],
  "washington-township": ["snowier"],
  "harrison-township": ["lakeside"],
  "clinton-township": ["established", "riverside"],
  "shelby-township": ["subdivision", "riverside"],
  "sterling-heights": ["established", "riverside"],
};

type LocalCopy = {
  /** Search phrase used in the title and H1, e.g. "Concrete Driveway Contractor". */
  keyword: string;
  /** Lower-case noun phrase for sentences, e.g. "a concrete driveway". */
  noun: string;
  /** Verb that fits the noun in "Do you ___ {noun} in {city}?" */
  verb: string;
  lede: (city: City, distance: string) => string;
  meta: (city: City) => string;
};

export const distancePhrase = (city: City) =>
  city.miles === 0
    ? "We’re based right here in New Haven"
    : city.slug === "richmond"
      ? "We’re based in New Haven, about 7 miles south on M-19"
      : `We’re based in New Haven, about ${city.miles} miles away`;

export const localCopy: Record<ServiceSlug, LocalCopy> = {
  "concrete-driveways": {
    keyword: "Concrete Driveway Contractor",
    noun: "a concrete driveway",
    verb: "install",
    lede: (c, d) =>
      `Need a new or replacement concrete driveway in ${c.name}? ${d}. We tear out worn, cracked driveways and pour new concrete built for daily traffic, snow shovels and Michigan freeze-thaw cycles.`,
    meta: (c) =>
      `Concrete driveway replacement and installation in ${c.name}, MI. Family-owned, BBB A+ contractor based in New Haven. Call (586) 231-4217 for an estimate.`,
  },
  "concrete-patios": {
    keyword: "Concrete Patio Contractor",
    noun: "a concrete patio",
    verb: "install",
    lede: (c, d) =>
      `Planning a patio in ${c.name}? ${d}. We pour custom concrete patios, from clean broom finishes to exposed aggregate and stamped concrete, shaped around how you use your yard.`,
    meta: (c) =>
      `Custom concrete patios in ${c.name}, MI: exposed aggregate, stamped and broom finish. Family-owned, BBB A+ contractor in New Haven. Request an estimate.`,
  },
  "concrete-walkways": {
    keyword: "Concrete Walkways & Steps",
    noun: "a concrete walkway or steps",
    verb: "install",
    lede: (c, d) =>
      `Replacing a cracked front walk or worn steps in ${c.name}? ${d}. We pour walkways, steps and garden paths that are level, safe underfoot and finished to suit the house.`,
    meta: (c) =>
      `Concrete walkways, front steps and garden paths in ${c.name}, MI. Family-owned, BBB A+ contractor based in New Haven. Call (586) 231-4217.`,
  },
  "retaining-walls": {
    keyword: "Concrete Retaining Walls",
    noun: "a concrete retaining wall",
    verb: "build",
    lede: (c, d) =>
      `Need to hold back a slope or define a garden bed in ${c.name}? ${d}. We build concrete garden and retaining walls that can be finished to match your patio or walkway.`,
    meta: (c) =>
      `Concrete retaining and garden walls in ${c.name}, MI, finished to match your patio or walkway. Family-owned, BBB A+ contractor based in New Haven.`,
  },
  "driveway-expansions": {
    keyword: "Driveway Extensions & Widening",
    noun: "a driveway extension",
    verb: "build",
    lede: (c, d) =>
      `Out of parking space in ${c.name}? ${d}. We widen and extend concrete driveways for an extra vehicle, a trailer or simply easier parking, tied neatly into your existing slab.`,
    meta: (c) =>
      `Driveway widening and extensions in ${c.name}, MI. Room for another car, a boat or a trailer. Family-owned, BBB A+ contractor based in New Haven.`,
  },
  "pool-decks": {
    keyword: "Concrete Pool Decks",
    noun: "a concrete pool deck",
    verb: "install",
    lede: (c, d) =>
      `Installing or replacing a pool deck in ${c.name}? ${d}. We pour textured, slip-conscious concrete pool surrounds that shed water and frame the pool.`,
    meta: (c) =>
      `Concrete pool decks and pool surrounds in ${c.name}, MI with textured, slip-conscious finishes. Family-owned, BBB A+ contractor based in New Haven.`,
  },
  "concrete-sealing": {
    keyword: "Concrete Sealing & Power Washing",
    noun: "concrete cleaning and sealing",
    verb: "offer",
    lede: (c, d) =>
      `Protect your concrete in ${c.name} from salt and weather. ${d}. We pressure wash and seal driveways, stamped patios and exposed aggregate to help guard the surface and bring back its color.`,
    meta: (c) =>
      `Concrete power washing and sealing in ${c.name}, MI for driveways, stamped patios and exposed aggregate. Family-owned, BBB A+ contractor in New Haven.`,
  },
  "concrete-slabs": {
    keyword: "Pole Barn Floors & Concrete Slabs",
    noun: "a pole barn floor or slab",
    verb: "pour",
    lede: (c, d) =>
      `Need a pole barn floor, shed pad or porch slab in ${c.name}? ${d}. We pour flat, durable slabs planned around what they’ll carry, finished smooth inside and textured outside.`,
    meta: (c) =>
      `Pole barn floors, shed pads and concrete slabs in ${c.name}, MI. Flat, durable slabs from a family-owned, BBB A+ contractor based in New Haven.`,
  },
};

/** Short, general-but-relevant guidance for a service in a community with a given trait. */
export const traitNotes: Record<Trait, Partial<Record<ServiceSlug, string>>> = {
  hometown: {
    "concrete-driveways": "Being based in the village means estimate visits, follow-ups and any questions after the pour are a short drive away.",
    "concrete-patios": "Newer homes in and around the village often need a first real patio, and older homes near the village center often need a tired slab replaced. We do both, close to home.",
    "concrete-walkways": "Front walks and steps on the village’s older homes have seen decades of winters, and replacing heaved sections is one of the most practical safety upgrades.",
    "retaining-walls": "Local projects mean we can look at the grade and drainage on your lot quickly, before recommending a wall design.",
    "driveway-expansions": "As households grow, a second parking spot is often the most useful upgrade on village lots. We look at your lot and recommend a width that fits.",
    "pool-decks": "Being local makes it easy to schedule site visits around your pool opening and closing season.",
    "concrete-sealing": "Village driveways and walks take a beating from winter salt. Regular cleaning and sealing help them last longer.",
    "concrete-slabs": "Shed pads and porch slabs are quick local jobs for us, and we’re nearby if you need anything after the pour.",
  },
  rural: {
    "concrete-driveways": "Rural driveways run longer and often carry heavier vehicles, so slab thickness, base preparation and edges deserve extra planning. Many owners also consider moving from gravel to concrete.",
    "concrete-patios": "Bigger lots leave room for bigger patios. Plan the size around furniture, a grill area and how far the patio sits from the house and outbuildings.",
    "concrete-walkways": "On larger properties, paths between the house, garage and outbuildings keep you out of the mud in spring and fall.",
    "retaining-walls": "Rural lots with changes in grade can use concrete walls to create level space and keep soil and runoff where they belong.",
    "driveway-expansions": "Parking pads and wider aprons for trucks, trailers and equipment are practical upgrades on rural properties.",
    "pool-decks": "With more room to work with, a pool deck can include generous lounging space and a connected path to the house.",
    "concrete-sealing": "Long driveways and large slabs are a big investment. Cleaning and sealing helps protect them from moisture and salt.",
    "concrete-slabs": "Pole barns, workshops and equipment storage are common on larger properties, and a concrete floor turns them into usable space.",
  },
  wetground: {
    "concrete-driveways": "On flat, low ground, water has nowhere obvious to go, so the driveway needs a deliberate slope and a well-prepared base, or it will hold puddles and heave in winter.",
    "concrete-patios": "On flat, wet lots, a patio must be sloped away from the house so water runs off instead of pooling against the foundation.",
    "concrete-walkways": "Walkways on low ground benefit from a raised, well-drained base, so they don’t settle or stay wet.",
    "retaining-walls": "Saturated soil pushes hard on walls, so drainage behind any wall is essential on wet ground.",
    "driveway-expansions": "New concrete must drain as well as the existing slab, so the extension’s grade is planned with water flow in mind.",
    "pool-decks": "On flat ground, the deck needs a deliberate slope to shed water away from the pool and the house.",
    "concrete-sealing": "Concrete that stays damp for long stretches benefits from a sealer that limits how much water soaks in.",
    "concrete-slabs": "On wet, flat ground, base preparation and drainage around the building are key to a slab that stays level.",
  },
  lakeside: {
    "concrete-driveways": "Properties near the water can sit on wetter soils, which makes grading and base preparation especially important for a driveway that lasts.",
    "concrete-patios": "Lake living means patios get heavy summer use. Textured finishes like exposed aggregate give better grip for wet feet, and drainage is planned for low ground.",
    "concrete-walkways": "Near the water, textured walkway finishes help with traction, and a solid base helps walks stay level on softer ground.",
    "retaining-walls": "Low, waterside lots can use walls to manage grade changes and keep soil in place. Drainage behind the wall matters even more near the water.",
    "driveway-expansions": "Boats and trailers need room. A widened driveway or parking pad keeps them off the lawn and the street.",
    "pool-decks": "Near the lake, wetter soils and low ground make it especially important that the deck sheds water away from the pool and house.",
    "concrete-sealing": "Moist lakeside air and wet winters are hard on concrete. Sealing helps limit moisture and salt damage.",
    "concrete-slabs": "Low ground near the water calls for careful base preparation so slabs and pads stay level.",
  },
  established: {
    "concrete-driveways": "In established neighborhoods, many original driveways have been through decades of Michigan winters. Replacing cracked, heaved or sunken sections improves safety, drainage and curb appeal.",
    "concrete-patios": "Older homes often have small or worn-out slabs. A new patio can be sized for how families use their yards today.",
    "concrete-walkways": "Front walks, steps and porch approaches on older homes are where heaving and trip hazards show up first, and where new concrete makes the biggest difference.",
    "retaining-walls": "Older landscapes often have failing timber or block edging that a solid concrete wall can replace for good.",
    "driveway-expansions": "Older driveways were often built for one car. Widening adds parking without replacing a driveway that’s still sound.",
    "pool-decks": "Older pool decks often crack and settle around the coping, and a replacement deck can freshen the whole backyard.",
    "concrete-sealing": "Older concrete that’s still structurally sound can often be cleaned and sealed to slow wear, instead of replaced.",
    "concrete-slabs": "Replacing an old, cracked garage or shed slab is often simpler than people expect, once the old concrete is out.",
  },
  subdivision: {
    "concrete-driveways": "In subdivisions, the new driveway has to meet the garage, walks and neighboring lots at the right grades. Getting the finished elevation right is as important as the pour.",
    "concrete-patios": "Subdivision backyards are perfect for a patio sized for your table and grill. Check setbacks and any HOA rules on placement and materials before you start.",
    "concrete-walkways": "Front walks in newer subdivisions often settle as the soil around the house compacts. Replacing them with a well-based walk solves the problem.",
    "retaining-walls": "Graded subdivision lots often have slopes that a low concrete wall can turn into level, usable space.",
    "driveway-expansions": "A third car, a teenager’s first vehicle or a work truck can outgrow a builder-grade driveway, and widening is the practical fix. Check any HOA rules on driveway width first.",
    "pool-decks": "Pool decks on subdivision lots have to fit setbacks and drain away from the house and neighboring yards.",
    "concrete-sealing": "Stamped and exposed-aggregate patios in newer neighborhoods keep their color and texture longer with periodic sealing.",
    "concrete-slabs": "Shed pads in subdivisions need to fit setback rules and sit level for the shed’s life.",
  },
  riverside: {
    "concrete-driveways": "Lower ground near the river and its branches can mean wetter soils, so drainage and base preparation are planned carefully.",
    "concrete-patios": "On lower lots near the river, sloping the patio away from the house keeps water off the foundation.",
    "concrete-walkways": "Lower, wetter ground near waterways calls for a solid, well-drained base so walks don’t settle.",
    "retaining-walls": "Grade changes on lots near the river are common, and a properly drained concrete wall can hold them in place.",
    "driveway-expansions": "Extensions on lower ground need to drain as well as the existing driveway, so the grade is planned with that in mind.",
    "pool-decks": "Near waterways, wetter soils make a deck that sheds water away from the pool and house especially important.",
    "concrete-sealing": "Concrete on damp, low ground benefits from sealing that limits how much moisture soaks in.",
    "concrete-slabs": "On low ground, base preparation and drainage keep slabs and pads level.",
  },
  snowier: {
    "concrete-driveways": "Slightly colder, snowier winters mean more plowing, shoveling and de-icing salt. A well-prepared base and durable finish matter most here.",
    "concrete-patios": "More freeze-thaw cycles make drainage and a good base essential, so water doesn’t sit under the slab and heave it.",
    "concrete-walkways": "With more snow, textured walkway finishes give better footing, and plastic-edged shovels are kinder to the surface.",
    "retaining-walls": "Frost and saturated soil push hardest on walls in colder areas, so drainage behind the wall is essential.",
    "driveway-expansions": "Extensions should drain well and match the existing slab, so plowing doesn’t catch an uneven joint.",
    "pool-decks": "Colder winters are hard on pool decks. Drainage and sealing help protect them between swim seasons.",
    "concrete-sealing": "Extra snow and de-icer use make sealing one of the best ways to protect driveways and walks here.",
    "concrete-slabs": "Frost can move poorly prepared slabs, so base preparation and drainage are the priority.",
  },
};

/** Macomb Township's published requirement lines (cities.ts) relevant to each service. */
export const macombRulesFor = (service: ServiceSlug, list: string[]) => {
  const match: Partial<Record<ServiceSlug, RegExp>> = {
    "concrete-driveways": /riveway|Horseshoe|Minimum 4 in|inspections/,
    "driveway-expansions": /riveway|Horseshoe|Minimum 4 in|inspections/,
    "concrete-patios": /Patios|Minimum 4 in|inspections/,
    "pool-decks": /Patios|Minimum 4 in|inspections/,
    "concrete-walkways": /service walks|Minimum 4 in|inspections/,
  };
  const re = match[service];
  return re ? list.filter((item) => re.test(item)) : [];
};

/** Driveway-type work touches the road right-of-way; other services don't. */
export const touchesRoad = (service: ServiceSlug) => service === "concrete-driveways" || service === "driveway-expansions";

export const cityServicePath = (citySlug: string, serviceSlug: ServiceSlug) => `/service-areas/${citySlug}/${serviceSlug}`;
