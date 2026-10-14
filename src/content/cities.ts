import type { ServiceSlug } from "./services";

/**
 * Local landing pages for the communities around our New Haven base.
 *
 * Every local fact below comes from a cited public source (see `sources`), and
 * nothing claims a specific past project in a given city. Distances are
 * straight-line from New Haven's center, rounded. When the owner can supply real
 * jobs, photos or reviews for a city, add them here — that is the single biggest
 * upgrade these pages can get.
 */

export type City = {
  slug: string;
  name: string;
  /** e.g. "charter township", "city", "village" — used in copy. */
  kind: string;
  county: string;
  /** 2020 U.S. Census population, as reported in the cited source. */
  population: number;
  /** Approximate straight-line miles from New Haven. */
  miles: number;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  /** Project id for the page's lead photo (our work; not claimed as this city). */
  leadProject: string;
  snapshot: { label: string; value: string }[];
  context: { heading: string; paragraphs: string[] };
  /** The services most relevant here, each with a locally specific angle. */
  focus: { service: ServiceSlug; body: string }[];
  permits: { heading: string; paragraphs: string[]; list?: string[]; source?: { label: string; url: string } };
  faqs: { q: string; a: string }[];
  nearby: string[];
  sources: { label: string; url: string }[];
};

const countyRoads = {
  label: "Macomb County Department of Roads, Permits",
  url: "https://www.macombgov.org/departments/department-roads/departments-list/permits",
};

/** Verified 2026-10 from the Department of Roads permits page. */
const countyRoadsNote =
  "If the driveway approach sits in the right-of-way of a county road, the Macomb County Department of Roads issues the approach permit. It does not accept electronic residential applications (they are mailed or hand-delivered to 117 South Groesbeck Highway, Mount Clemens), and it requires 48 hours’ notice, by phone at (586) 463-8671, before work starts in the right-of-way.";

const wiki = (title: string) => ({ label: `Wikipedia: ${title.replace(/_/g, " ")}`, url: `https://en.wikipedia.org/wiki/${title}` });

export const cities: City[] = [
  {
    slug: "new-haven",
    name: "New Haven",
    kind: "village",
    county: "Macomb",
    population: 6097,
    miles: 0,
    metaTitle: "Concrete Driveways & Patios in New Haven, MI",
    metaDescription:
      "Enzo’s Concrete LLC is based in New Haven, MI. Driveways, patios, walkways, retaining walls and pool decks from a family-owned, BBB A+ local contractor.",
    h1: "Your concrete contractor in New Haven, Michigan",
    lede: "New Haven is home. Our family-owned business is based right here in the village, so when you call about a driveway, patio or walkway, you’re talking to a neighbor, not a crew driving in from across Metro Detroit.",
    leadProject: "curved-patio",
    snapshot: [
      { label: "Municipality", value: "Village of New Haven, within Lenox Township" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "6,097" },
      { label: "Distance", value: "Our home base" },
    ],
    context: {
      heading: "Concrete work in New Haven",
      paragraphs: [
        "New Haven has grown quickly. The village counted 1,695 housing units in 2010 and 2,111 in 2020, so newer homes now sit alongside a village center that dates back to an 1869 incorporation and an 1865 railroad depot that still stands as the village museum.",
        "That mix shapes the work. Newer homes often want their first real patio or a wider driveway; older homes nearer the village center tend to need tired driveways, front walks and steps replaced. We do both, and being local means site visits and follow-ups are a short drive away.",
        "The Salt River runs along the east side of the village toward Lake St. Clair. On low-lying lots, grading and drainage deserve extra attention before any slab is poured.",
      ],
    },
    focus: [
      { service: "concrete-patios", body: "First patios for newer homes, sized around how you’ll actually use the yard, including exposed aggregate with a contrasting border." },
      { service: "concrete-driveways", body: "Tear-out and replacement of cracked, settled driveways on established village lots." },
      { service: "driveway-expansions", body: "Extra width for a second car, a trailer or easier parking on growing households’ driveways." },
    ],
    permits: {
      heading: "Permits and planning in New Haven",
      paragraphs: [
        "New Haven is an incorporated village inside Lenox Township, and the two are separate local governments. Before work begins, confirm with the village whether your project needs a permit; we can help you figure out what to ask.",
        "M-19 runs through the east side of the village. Work at a driveway approach on a road owned by the county or state may need a separate right-of-way permit from that road agency.",
      ],
    },
    faqs: [
      {
        q: "Are you actually based in New Haven?",
        a: "Yes. Enzo’s Concrete LLC is a family-owned business based in New Haven, Michigan 48048. It’s our home base for work across Macomb County and beyond.",
      },
      {
        q: "Is New Haven part of Lenox Township?",
        a: "Geographically, yes: the village sits within Lenox Township. But the village is its own incorporated municipality, so check with the village (not just the township) about permits for work at your address.",
      },
      {
        q: "What concrete projects do you do in New Haven?",
        a: "Driveways and driveway expansions, custom patios, walkways and steps, retaining and garden walls, and pool decks. You can see examples on our Our Work page.",
      },
    ],
    nearby: ["lenox-township", "chesterfield-township", "new-baltimore", "richmond"],
    sources: [wiki("New_Haven,_Michigan")],
  },
  {
    slug: "lenox-township",
    name: "Lenox Township",
    kind: "township",
    county: "Macomb",
    population: 12119,
    miles: 1,
    metaTitle: "Concrete Contractor in Lenox Township, MI",
    metaDescription:
      "Concrete driveways, patios and walkways for rural and residential properties in Lenox Township, MI, from a family-owned contractor based in New Haven.",
    h1: "Concrete driveways, patios and walkways in Lenox Township",
    lede: "Lenox Township wraps around our New Haven base, so we know its mix of farmland, wetlands and growing neighborhoods well. Whether you’re on a rural lot off 26 Mile Road or in a newer subdivision, we pour concrete that suits the property.",
    leadProject: "driveway-washdown",
    snapshot: [
      { label: "Municipality", value: "Lenox Township" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "12,119" },
      { label: "Distance", value: "Surrounds our New Haven base" },
    ],
    context: {
      heading: "Concrete work in Lenox Township",
      paragraphs: [
        "Lenox Township covers nearly 39 square miles of mostly flat land made up of farmland, wetlands and pockets of woodland, with development growing along corridors like 26 Mile Road and Gratiot Avenue. Its population rose from 10,470 in 2010 to 12,119 in 2020.",
        "Flat, wet ground is the main thing to plan around. On level lots, water has nowhere obvious to go, so a driveway or patio needs a deliberate slope and a well-prepared base, or it ends up holding puddles and heaving in winter.",
        "Larger rural lots also mean longer driveways and more room for parking pads, which makes widening and extensions a common request.",
      ],
    },
    focus: [
      { service: "concrete-driveways", body: "Long rural driveways and subdivision driveways, with the slope and base planned for flat, wet ground." },
      { service: "driveway-expansions", body: "Parking pads and widened driveways for trucks, trailers and extra vehicles on larger lots." },
      { service: "concrete-walkways", body: "Walkways connecting driveway, porch and yard, so you’re not crossing soggy lawn in spring." },
    ],
    permits: {
      heading: "Permits and planning in Lenox Township",
      paragraphs: [
        "Check with Lenox Township about permit requirements for your project before work starts. If your address is inside the Village of New Haven or the City of Richmond, those municipalities handle their own rules instead.",
        countyRoadsNote,
      ],
      source: countyRoads,
    },
    faqs: [
      {
        q: "Do you work on rural properties in Lenox Township?",
        a: "Yes. Rural lots are close to home for us, and we’re used to longer driveways, parking pads and the drainage planning that flat, low ground needs.",
      },
      {
        q: "My property is flat and gets wet in spring. Can it still have a concrete driveway?",
        a: "Usually, yes, but drainage has to be planned first. That means setting a slope that moves water off the slab and preparing a solid base. We look at how water moves on your lot during the estimate.",
      },
      {
        q: "Who issues permits for work at the road?",
        a: "For a driveway approach on a county road, the Macomb County Department of Roads issues right-of-way permits. For work on your own property, check with Lenox Township.",
      },
    ],
    nearby: ["new-haven", "richmond", "chesterfield-township", "ray-township"],
    sources: [wiki("Lenox_Township,_Michigan"), countyRoads],
  },
  {
    slug: "new-baltimore",
    name: "New Baltimore",
    kind: "city",
    county: "Macomb",
    population: 12117,
    miles: 5,
    metaTitle: "Concrete Contractor in New Baltimore, MI",
    metaDescription:
      "Concrete patios, driveways and walkways for New Baltimore, MI homes near Anchor Bay. Family-owned, BBB A+ contractor based 5 miles away in New Haven.",
    h1: "Concrete patios, driveways and walkways in New Baltimore",
    lede: "New Baltimore homes are built for life on Anchor Bay: summer evenings outside, boats in the driveway, sandy feet on the walk. We pour patios, driveways and walkways that handle all of it, from a family-owned base about five miles away in New Haven.",
    leadProject: "pool-deck",
    snapshot: [
      { label: "Municipality", value: "City of New Baltimore" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "12,117" },
      { label: "Distance", value: "About 5 miles from New Haven" },
    ],
    context: {
      heading: "Concrete work in New Baltimore",
      paragraphs: [
        "New Baltimore sits on the northern shore of Anchor Bay, the northernmost part of Lake St. Clair. Nearly a third of the city’s area is water, and its waterfront park, beach and downtown along M-29 are a big part of why people live here.",
        "Lake living changes what matters in concrete. Patios and pool decks get heavy summer use. Driveways often need room for a boat or trailer. And properties close to the water can sit on wetter ground, which makes grading, base preparation and drainage especially important.",
        "The city was a resort destination for Metro Detroiters as far back as the 1860s, so you’ll find older homes near downtown alongside newer construction. Each comes with different concrete needs.",
      ],
    },
    focus: [
      { service: "concrete-patios", body: "Outdoor living space for lake summers, with textured, slip-conscious finishes like exposed aggregate." },
      { service: "driveway-expansions", body: "Extra width or a parking pad for a boat, trailer or guests’ cars." },
      { service: "pool-decks", body: "Pool surrounds with textured finishes for wet feet and drainage that moves water away." },
    ],
    permits: {
      heading: "Permits and planning in New Baltimore",
      paragraphs: [
        "Check with the City of New Baltimore about permit requirements for driveways, sidewalks and approaches before work begins. Requirements vary by municipality, and we can help you with what to ask.",
        "M-29 (Main Street) is a state highway, so work at an approach on a state or county road may need a separate right-of-way permit from that road agency.",
      ],
    },
    faqs: [
      {
        q: "Is concrete a good choice near the lake?",
        a: "Yes, with the right preparation. Properties near Anchor Bay can have wetter soils, so grading and a well-built base matter more. We look at drainage on your lot before recommending a slab design.",
      },
      {
        q: "Can you widen my driveway to fit a boat or trailer?",
        a: "Driveway widening and parking pads are a common project. We’ll look at your lot, how you need to maneuver, and any local limits on width before recommending a size.",
      },
      {
        q: "How far are you from New Baltimore?",
        a: "We’re based in New Haven, about five miles away, so New Baltimore is close to home for us.",
      },
    ],
    nearby: ["chesterfield-township", "new-haven", "harrison-township", "lenox-township"],
    sources: [wiki("New_Baltimore,_Michigan")],
  },
  {
    slug: "chesterfield-township",
    name: "Chesterfield Township",
    kind: "charter township",
    county: "Macomb",
    population: 45376,
    miles: 4,
    metaTitle: "Concrete Contractor in Chesterfield Township, MI",
    metaDescription:
      "Driveway replacement, widening and custom patios for Chesterfield Township, MI subdivisions. Family-owned, BBB A+ concrete contractor next door in New Haven.",
    h1: "Concrete driveways and patios in Chesterfield Township",
    lede: "Chesterfield Township borders New Haven, so it’s one of the closest communities we serve. From subdivision driveways to backyard patios near Anchor Bay, we help Chesterfield homeowners replace, widen and upgrade their concrete.",
    leadProject: "driveway-expansion",
    snapshot: [
      { label: "Municipality", value: "Charter Township of Chesterfield" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "45,376" },
      { label: "Distance", value: "Borders New Haven, about 4 miles" },
    ],
    context: {
      heading: "Concrete work in Chesterfield Township",
      paragraphs: [
        "With 45,376 residents in 2020, up from 37,405 in 2000, Chesterfield is one of the larger communities in northern Macomb County. Suburban subdivisions and shopping developments now make up much of the township, which also includes communities like Chesterfield, Milton, Lottivue and Anchor Bay Harbor.",
        "In subdivision neighborhoods the most common projects are practical: replacing a driveway that has cracked or settled, widening it for another vehicle, and adding a backyard patio. Getting the finished grade right against the garage, walks and neighbors’ lots matters on tighter suburban parcels.",
        "The township’s southeastern edge runs along Anchor Bay. Closer to the water, wetter ground makes base preparation and drainage a bigger part of the job.",
      ],
    },
    focus: [
      { service: "concrete-driveways", body: "Replacing cracked or settled subdivision driveways with clean joints and a proper base." },
      { service: "driveway-expansions", body: "Widening for a third car or easier parking, tied neatly into the existing slab." },
      { service: "concrete-patios", body: "Backyard patios with curves, borders and exposed-aggregate finishes." },
    ],
    permits: {
      heading: "Permits and planning in Chesterfield Township",
      paragraphs: [
        "Check with Chesterfield Township about permit requirements for driveways, patios and sidewalks before work starts. If you live in a subdivision with an HOA, it’s also worth checking for any rules on driveway width or finish.",
        countyRoadsNote,
      ],
      source: countyRoads,
    },
    faqs: [
      {
        q: "Should I widen my driveway or replace it?",
        a: "If the existing driveway is structurally sound, widening is usually the better value. If it’s already cracked and settling, replacing everything at once gives you a uniform surface and avoids paying twice. Our driveway expansions page explains the trade-offs.",
      },
      {
        q: "Do I need HOA approval for a new driveway or patio?",
        a: "Many subdivisions have rules about driveway width, materials or patio placement. Check your HOA documents before work starts. We can provide dimensions and finish details for an approval request.",
      },
      {
        q: "How close are you to Chesterfield?",
        a: "Very close. Chesterfield Township borders New Haven, where we’re based.",
      },
    ],
    nearby: ["new-haven", "new-baltimore", "macomb-township", "harrison-township"],
    sources: [wiki("Chesterfield_Township,_Michigan"), countyRoads],
  },
  {
    slug: "richmond",
    name: "Richmond",
    kind: "city",
    county: "Macomb",
    population: 5878,
    miles: 7,
    metaTitle: "Concrete Contractor in Richmond, MI",
    metaDescription:
      "Concrete driveways, front walks and patios for Richmond, MI homes. Family-owned, BBB A+ contractor based 7 miles south on M-19 in New Haven.",
    h1: "Concrete driveways, walks and patios in Richmond, MI",
    lede: "Richmond is a straight shot up M-19 from our New Haven base, about seven miles north. We help Richmond homeowners replace worn driveways, rebuild front walks and add patios that fit the city’s established, small-town neighborhoods.",
    leadProject: "front-walk",
    snapshot: [
      { label: "Municipality", value: "City of Richmond" },
      { label: "County", value: "Macomb (small part in St. Clair)" },
      { label: "Population (2020)", value: "5,878" },
      { label: "Distance", value: "About 7 miles up M-19" },
    ],
    context: {
      heading: "Concrete work in Richmond",
      paragraphs: [
        "Richmond grew from Beebe’s Corners, settled in 1835, into a village in 1879 and a city in 1966. Its Main Street is M-19, and it’s the starting point of the 23.5-mile Macomb Orchard Trail. Most of the city is in Macomb County, with a small portion in St. Clair County.",
        "Established neighborhoods mean established concrete: driveways, front walks and porch steps that have been through decades of Michigan winters. Replacing heaved or cracked sections removes trip hazards and does a lot for curb appeal on a walkable small-town street.",
        "For older homes, it’s worth thinking about how the new walk, steps and driveway meet the house and each other. Those transitions are where replacement work most often looks patched together.",
      ],
    },
    focus: [
      { service: "concrete-walkways", body: "Front walks and steps rebuilt level and safe, with clean transitions to the porch and driveway." },
      { service: "concrete-driveways", body: "Replacement of aging driveways on established city lots." },
      { service: "concrete-patios", body: "Backyard patios that make the most of in-town lot sizes." },
    ],
    permits: {
      heading: "Permits and planning in Richmond",
      paragraphs: [
        "Check with the City of Richmond about permit requirements for driveways, sidewalks and approaches before work begins.",
        "M-19 (Main Street) is a state highway, so work at a driveway approach on a state or county road may need a separate right-of-way permit from that road agency. If your property is in the St. Clair County portion of the city, county-level agencies there may differ from Macomb’s.",
      ],
    },
    faqs: [
      {
        q: "Can you replace just my front walk and steps?",
        a: "Yes. Walkway and step replacement is a common standalone project, and we plan the steps around your entry so the walk and steps feel like one piece.",
      },
      {
        q: "Do you serve all of Richmond, including the St. Clair County side?",
        a: "Richmond is about seven miles from our New Haven base. Tell us your address when you request an estimate and we’ll confirm.",
      },
      {
        q: "How long before I can use a new driveway?",
        a: "General guidance is to stay off new concrete on foot for a day or two and wait roughly a week before driving on it. We’ll give you timing specific to your pour.",
      },
    ],
    nearby: ["lenox-township", "new-haven", "armada", "ray-township"],
    sources: [wiki("Richmond,_Michigan")],
  },
  {
    slug: "ray-township",
    name: "Ray Township",
    kind: "township",
    county: "Macomb",
    population: 3780,
    miles: 7,
    metaTitle: "Concrete Contractor in Ray Township, MI",
    metaDescription:
      "Concrete driveways, parking pads and walkways for rural properties in Ray Township, MI. Family-owned, BBB A+ contractor based in nearby New Haven.",
    h1: "Concrete for rural properties in Ray Township",
    lede: "Ray Township is country living in north-central Macomb County, home to Wolcott Mill Metropark and small crossroads communities like Davis, Meade, Ray Center and Wolcott Mills. We pour driveways, parking pads and walkways built for rural properties.",
    leadProject: "driveway-washdown",
    snapshot: [
      { label: "Municipality", value: "Ray Township" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "3,780" },
      { label: "Distance", value: "About 7 miles from New Haven" },
    ],
    context: {
      heading: "Concrete work in Ray Township",
      paragraphs: [
        "With about 3,800 residents across 36.6 square miles, Ray Township is a lightly populated, spread-out community. The 2,625-acre Wolcott Mill Metropark lies entirely within the township, and the whole township drains to the Clinton River watershed.",
        "Rural properties bring their own concrete questions. Driveways run longer and carry heavier vehicles, so slab thickness, base and edges need planning. Many owners consider moving from gravel to concrete for less maintenance and a cleaner approach to the house.",
        "Parking pads for trucks, trailers and equipment, and walkways between the house and outbuildings, are practical upgrades on bigger lots.",
      ],
    },
    focus: [
      { service: "concrete-driveways", body: "Long rural driveways, including gravel-to-concrete conversions, planned for heavier vehicles." },
      { service: "driveway-expansions", body: "Parking pads and wider aprons for trucks, trailers and equipment." },
      { service: "concrete-walkways", body: "Paths between the house, garage and outbuildings that stay usable in mud season." },
    ],
    permits: {
      heading: "Permits and planning in Ray Township",
      paragraphs: ["Check with Ray Township about permit requirements for your project before work starts.", countyRoadsNote],
      source: countyRoads,
    },
    faqs: [
      {
        q: "Is it worth converting a gravel driveway to concrete?",
        a: "For many homeowners, yes. Concrete eliminates regrading and stone top-ups and is easier to plow. The trade-off is upfront cost, which on a long rural driveway depends heavily on length and base preparation. We can price both full and partial options, such as concrete near the house only.",
      },
      {
        q: "Can a concrete driveway handle trucks and trailers?",
        a: "Yes, when it’s designed for the load. Tell us what you’ll park and drive on it so the slab and base can be planned accordingly.",
      },
      {
        q: "Do you travel out to Ray Township?",
        a: "Yes. Ray Township is about seven miles from our base in New Haven.",
      },
    ],
    nearby: ["lenox-township", "armada", "macomb-township", "washington-township"],
    sources: [wiki("Ray_Township,_Michigan"), countyRoads],
  },
  {
    slug: "armada",
    name: "Armada",
    kind: "village",
    county: "Macomb",
    population: 1684,
    miles: 9,
    metaTitle: "Concrete Contractor in Armada, MI",
    metaDescription:
      "Concrete driveways, walkways and patios for homes in and around the Village of Armada, MI. Family-owned, BBB A+ contractor based in New Haven.",
    h1: "Concrete driveways, walks and patios in Armada",
    lede: "Armada, home of the Armada Fair since 1872, is small-town Macomb County at its best. We pour driveways, front walks and patios for homes in the village and on the surrounding country properties, from our family-owned base in New Haven.",
    leadProject: "side-walkway",
    snapshot: [
      { label: "Municipality", value: "Village of Armada, within Armada Township" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "1,684 (village)" },
      { label: "Distance", value: "About 9 miles from New Haven" },
    ],
    context: {
      heading: "Concrete work in Armada",
      paragraphs: [
        "The village dates to 1833 and was voted Reader’s Digest’s “Nicest Place in Michigan” in 2019. It’s a compact village surrounded by the rural countryside of Armada Township, with the East Branch of Coon Creek running through its center.",
        "In the village, projects tend to be front walks, steps and driveways on established lots, where a clean, level walk makes a real difference on a walkable street. On country properties outside the village, longer driveways and parking areas are more common.",
        "Either way, Michigan’s freeze-thaw cycles are hard on older concrete, so replacement work starts with a solid, well-drained base.",
      ],
    },
    focus: [
      { service: "concrete-walkways", body: "Front walks and steps for village homes, replaced level and finished to match the house." },
      { service: "concrete-driveways", body: "Driveway replacement for village lots and longer drives on surrounding country properties." },
      { service: "concrete-patios", body: "Backyard patios, including exposed-aggregate finishes with contrasting borders." },
    ],
    permits: {
      heading: "Permits and planning in Armada",
      paragraphs: [
        "The Village of Armada and Armada Township are separate local governments. Check with whichever one covers your address about permit requirements before work begins.",
        countyRoadsNote,
      ],
      source: countyRoads,
    },
    faqs: [
      {
        q: "Do you serve Armada Township as well as the village?",
        a: "Yes. Tell us your address when you request an estimate, and we’ll confirm the details for your property.",
      },
      {
        q: "Can you match the look of an older home?",
        a: "We’ll talk through finish options, from a classic broom finish to exposed aggregate, and pick what suits the house and street.",
      },
      {
        q: "How far is Armada from you?",
        a: "About nine miles from our New Haven base.",
      },
    ],
    nearby: ["richmond", "ray-township", "washington-township", "lenox-township"],
    sources: [wiki("Armada,_Michigan"), countyRoads],
  },
  {
    slug: "macomb-township",
    name: "Macomb Township",
    kind: "township",
    county: "Macomb",
    population: 91663,
    miles: 9,
    metaTitle: "Concrete Contractor in Macomb Township, MI",
    metaDescription:
      "Driveway replacement, widening and patios in Macomb Township, MI, built to the township’s concrete standards. Family-owned, BBB A+ contractor in New Haven.",
    h1: "Concrete driveways and patios in Macomb Township",
    lede: "Macomb Township is the most populous civil township in Michigan, and much of it was built in a single growth wave. We help homeowners replace, widen and upgrade subdivision driveways and patios, planned around the township’s published concrete requirements.",
    leadProject: "curved-patio",
    snapshot: [
      { label: "Municipality", value: "Macomb Township" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "91,663" },
      { label: "Distance", value: "About 9 miles from New Haven" },
    ],
    context: {
      heading: "Concrete work in Macomb Township",
      paragraphs: [
        "Macomb Township grew from 50,478 residents in 2000 to 91,663 in 2020, including a 48% jump between 2000 and 2008. A large share of its homes were built in that boom, which means many original driveways, walks and patios have now been through two decades of Michigan winters.",
        "That makes driveway replacement and widening, and adding or enlarging a backyard patio, the most common projects here. The township has specific rules on driveway width and patio setbacks (below), so the design has to fit them.",
      ],
    },
    focus: [
      { service: "concrete-driveways", body: "Replacing original subdivision driveways, sized within the township’s width allowances." },
      { service: "driveway-expansions", body: "Widening within the allowed driveway width. Under township rules, ribbons and extensions count toward the total." },
      { service: "concrete-patios", body: "Backyard patios placed to meet the township’s side- and rear-lot setbacks." },
    ],
    permits: {
      heading: "Macomb Township concrete permit requirements",
      paragraphs: [
        "Macomb Township publishes specific requirements for flatwork concrete with no footings: driveways, driveway extensions, sidewalks and patios. A permit application with a plot plan is required. Highlights from the Building Department’s requirements sheet (rev. 12/5/2022):",
      ],
      list: [
        "Driveway width: up to 24 ft for garages 24 ft wide or less; up to the garage width for wider garages, tapering to a 30 ft maximum within 10 ft of the garage. No driveway narrower than 15 ft.",
        "Driveway ribbons and extensions count toward the total allowable width.",
        "Driveways and service walks must be at least 3.5 ft from the side lot line.",
        "Patios must be at least 7.5 ft from the side lot line and 20 ft from the rear lot line.",
        "Minimum 4 in. of concrete on a minimum 4 in. sand/aggregate base, with rebar required within 3 ft of the house or over disturbed soil.",
        "Sand/form and final inspections are required.",
        "Horseshoe or circular drives are prohibited on lots with less than 140 ft of road frontage, unless the abutting road’s speed limit is 35 mph or higher.",
      ],
      source: {
        label: "Macomb Township Building Department: Concrete/Paver Permit Requirements (PDF)",
        url: "https://macomb-mi.gov/DocumentCenter/View/453/ConcretePaver-Requirements-with-No-Footings",
      },
    },
    faqs: [
      {
        q: "How wide can my driveway be in Macomb Township?",
        a: "Under the township’s published requirements, garages 24 ft wide or less are allowed a 24 ft driveway. Wider garages can match the garage width, tapering to 30 ft maximum within 10 ft of the garage, and no driveway may be narrower than 15 ft. Confirm current rules with the Building Department at (586) 992-0710.",
      },
      {
        q: "Do I need a permit for a patio in Macomb Township?",
        a: "The township’s concrete permit requirements cover patios along with driveways, extensions and sidewalks. A patio must sit at least 7.5 ft from the side lot line and 20 ft from the rear lot line.",
      },
      {
        q: "Can I add a ribbon or extension beside my driveway?",
        a: "Yes, but the township counts ribbons and extensions toward the total allowable driveway width, so the combined width has to stay within the limit for your garage size.",
      },
    ],
    nearby: ["chesterfield-township", "clinton-township", "shelby-township", "ray-township"],
    sources: [
      wiki("Macomb_Township,_Michigan"),
      { label: "Macomb Township concrete/paver permit requirements", url: "https://macomb-mi.gov/DocumentCenter/View/453/ConcretePaver-Requirements-with-No-Footings" },
    ],
  },
  {
    slug: "washington-township",
    name: "Washington Township",
    kind: "township",
    county: "Macomb",
    population: 28165,
    miles: 12,
    metaTitle: "Concrete Contractor in Washington Township, MI",
    metaDescription:
      "Concrete driveways, patios and walkways in Washington Township, MI, built for colder, snowier winters. Family-owned, BBB A+ contractor based in New Haven.",
    h1: "Concrete driveways, patios and walkways in Washington Township",
    lede: "In northwestern Macomb County, Washington Township has a mix of established neighborhoods, newer homes and larger country lots. We pour driveways, patios and walkways built for the township’s slightly harsher winters.",
    leadProject: "curved-walkway",
    snapshot: [
      { label: "Municipality", value: "Washington Township" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "28,165" },
      { label: "Distance", value: "About 12 miles from New Haven" },
    ],
    context: {
      heading: "Concrete work in Washington Township",
      paragraphs: [
        "Washington Township borders Oakland County, and its population grew from 25,139 in 2010 to 28,165 in 2020. It includes the communities of Washington, Mount Vernon and Clifton Mills, plus part of the Village of Romeo, with M-53 running just east of Washington.",
        "The township’s weather is generally a few degrees cooler than Detroit’s, with more snow. For concrete, that means more freeze-thaw cycles, more plowing and shoveling, and more de-icing salt, all of which punish a poorly prepared or poorly finished slab.",
        "Good drainage, a solid base and a durable finish matter most here. So does careful aftercare during the first winter.",
      ],
    },
    focus: [
      { service: "concrete-driveways", body: "Driveways prepared and finished to stand up to plowing, salt and freeze-thaw." },
      { service: "concrete-patios", body: "Patios and outdoor living space for larger lots, including exposed aggregate." },
      { service: "concrete-walkways", body: "Walkways with textured finishes for better footing in snowy months." },
    ],
    permits: {
      heading: "Permits and planning in Washington Township",
      paragraphs: [
        "Check with Washington Township about permit requirements for driveways, patios and sidewalks before work starts. If your address is in the Village of Romeo, the village may have its own requirements.",
        countyRoadsNote,
      ],
      source: countyRoads,
    },
    faqs: [
      {
        q: "How do I protect a new driveway through its first winter?",
        a: "Go easy on de-icing salts, especially in the first winter, and use plastic-edged shovels where you can. Cleaning and periodic sealing help protect the surface from moisture and salt. We’ll give you care guidance for your specific finish.",
      },
      {
        q: "Do you serve Romeo?",
        a: "Part of the Village of Romeo lies in Washington Township. Tell us your address when you request an estimate and we’ll confirm.",
      },
    ],
    nearby: ["shelby-township", "ray-township", "armada", "macomb-township"],
    sources: [wiki("Washington_Township,_Macomb_County,_Michigan"), countyRoads],
  },
  {
    slug: "harrison-township",
    name: "Harrison Township",
    kind: "charter township",
    county: "Macomb",
    population: 24314,
    miles: 10,
    metaTitle: "Concrete Contractor in Harrison Township, MI",
    metaDescription:
      "Concrete patios, pool decks and driveways for lakeside homes in Harrison Township, MI on Lake St. Clair. Family-owned, BBB A+ contractor based in New Haven.",
    h1: "Concrete patios, pool decks and driveways in Harrison Township",
    lede: "Harrison Township’s Lake St. Clair shoreline makes outdoor living a priority. We pour patios, pool decks and driveways for lakeside homes, with the extra attention to drainage that properties near the water need.",
    leadProject: "pool-deck",
    snapshot: [
      { label: "Municipality", value: "Charter Township of Harrison" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "24,314" },
      { label: "Distance", value: "About 10 miles from New Haven" },
    ],
    context: {
      heading: "Concrete work in Harrison Township",
      paragraphs: [
        "Harrison Township stretches along the northwestern shore of Lake St. Clair. Water makes up about 9.5 of its 23.8 square miles, the Clinton River empties into the lake within the township, and Lake St. Clair Metropark sits on its shoreline. Selfridge Air National Guard Base occupies much of the township’s north.",
        "Low, lakeside ground is the defining factor for concrete here. Properties near the water can have wetter soils and less room for runoff, so grading, base preparation and slope away from the house deserve extra care.",
        "For many homeowners the payoff is outdoors: patios and pool decks built for long lake summers, and driveways with space for a boat or trailer.",
      ],
    },
    focus: [
      { service: "concrete-patios", body: "Lakeside patios with textured finishes and drainage planned for low ground." },
      { service: "pool-decks", body: "Pool surrounds with slip-conscious finishes that shed water away from the pool and house." },
      { service: "driveway-expansions", body: "Parking pads and wider driveways for boats and trailers." },
    ],
    permits: {
      heading: "Permits and planning in Harrison Township",
      paragraphs: [
        "Check with Harrison Township about permit requirements for your project before work begins. Lakefront and floodplain properties can come with additional rules, so ask about those too.",
        countyRoadsNote,
      ],
      source: countyRoads,
    },
    faqs: [
      {
        q: "My yard is low and near the lake. Can I still have a patio?",
        a: "Usually, yes. The key is planning the slope, base and drainage so water moves away from the slab and the house. We look at grade and drainage during the estimate visit.",
      },
      {
        q: "What finish works best around a pool near the lake?",
        a: "A textured finish, such as exposed aggregate or a broom finish, gives better grip when wet. Lighter tones stay cooler underfoot in summer sun.",
      },
    ],
    nearby: ["clinton-township", "chesterfield-township", "new-baltimore", "macomb-township"],
    sources: [wiki("Harrison_Township,_Michigan"), countyRoads],
  },
  {
    slug: "clinton-township",
    name: "Clinton Township",
    kind: "charter township",
    county: "Macomb",
    population: 100513,
    miles: 12,
    metaTitle: "Concrete Contractor in Clinton Township, MI",
    metaDescription:
      "Driveway replacement, walkways and patios across Clinton Township, MI, Michigan’s most populous township. Family-owned, BBB A+ contractor based in New Haven.",
    h1: "Concrete driveway replacement and patios in Clinton Township",
    lede: "With more than 100,000 residents, Clinton Township is Michigan’s most populous township, and its neighborhoods range from decades-old streets to newer developments. We replace driveways, rebuild walkways and add patios across the township.",
    leadProject: "driveway-washdown",
    snapshot: [
      { label: "Municipality", value: "Charter Township of Clinton" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "100,513" },
      { label: "Distance", value: "About 12 miles from New Haven" },
    ],
    context: {
      heading: "Concrete work in Clinton Township",
      paragraphs: [
        "Clinton Township takes its name from the Clinton River, which forms from three branches within the township before flowing east to Lake St. Clair. It wraps around Mount Clemens, the county seat, on three sides, and its 2020 population of 100,513 makes it the eighth-largest community in Michigan.",
        "A community this size has every kind of concrete need. In established neighborhoods the most common projects are replacing cracked, heaved or sunken driveways and walks. Newer homes more often want widening or a first backyard patio.",
        "Near the river and its branches, lower ground and wetter soils make drainage planning especially important.",
      ],
    },
    focus: [
      { service: "concrete-driveways", body: "Replacement of aging, cracked or settled driveways in established neighborhoods." },
      { service: "concrete-walkways", body: "Front walks and steps rebuilt to remove trip hazards and improve curb appeal." },
      { service: "concrete-patios", body: "Backyard patios with custom shapes and exposed-aggregate finishes." },
    ],
    permits: {
      heading: "Permits and planning in Clinton Township",
      paragraphs: [
        "Check with Clinton Township about permit requirements for driveways, sidewalks and patios before work begins. Some addresses have a Mount Clemens mailing address but sit in the township, so confirm which municipality you’re actually in.",
        countyRoadsNote,
      ],
      source: countyRoads,
    },
    faqs: [
      {
        q: "Can you replace part of a driveway instead of the whole thing?",
        a: "Sometimes. If only a few sections have failed, replacing those panels can make sense. If most of the driveway is cracked or settling, full replacement usually looks better and lasts longer. We’ll tell you which applies after seeing it.",
      },
      {
        q: "My mailing address says Mount Clemens. Which rules apply?",
        a: "Mailing addresses don’t always match municipal boundaries. Check your property tax records or with the township to confirm whether you’re in Clinton Township or the City of Mount Clemens.",
      },
    ],
    nearby: ["macomb-township", "harrison-township", "sterling-heights", "shelby-township"],
    sources: [wiki("Clinton_Township,_Macomb_County,_Michigan"), countyRoads],
  },
  {
    slug: "shelby-township",
    name: "Shelby Township",
    kind: "charter township",
    county: "Macomb",
    population: 79408,
    miles: 13,
    metaTitle: "Concrete Contractor in Shelby Township, MI",
    metaDescription:
      "Custom exposed-aggregate patios, pool decks and driveways in Shelby Township, MI. Family-owned, BBB A+ concrete contractor based in New Haven.",
    h1: "Custom concrete patios, pool decks and driveways in Shelby Township",
    lede: "Shelby Township homeowners invest in their outdoor spaces, and it shows. We pour custom patios, pool decks and driveways with finishing details like exposed aggregate, contrasting borders and smooth curves.",
    leadProject: "curved-patio",
    snapshot: [
      { label: "Municipality", value: "Charter Township of Shelby" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "79,408" },
      { label: "Distance", value: "About 13 miles from New Haven" },
    ],
    context: {
      heading: "Concrete work in Shelby Township",
      paragraphs: [
        "Shelby Township is one of the fastest-growing communities in Metro Detroit, growing from 73,804 residents in 2010 to 79,408 in 2020. It borders Rochester Hills to the west and Utica and Sterling Heights to the south, and it’s home to the 600-acre Riverbend Park and part of Stony Creek Metropark.",
        "Many projects here are about upgrading outdoor living: a larger patio with a custom shape, a pool deck, or a front walk that matches the quality of the house. Finishing details matter, and exposed aggregate with a contrasting border is one of our specialties.",
        "The Clinton River drains the township, and lots near it and its tributaries need careful grading so water moves away from new slabs.",
      ],
    },
    focus: [
      { service: "concrete-patios", body: "Custom patios with curves, borders and exposed-aggregate finishes." },
      { service: "pool-decks", body: "Pool surrounds with textured, cooler-underfoot finishes." },
      { service: "retaining-walls", body: "Garden and retaining walls that define beds and level out slopes, finished to match your patio." },
    ],
    permits: {
      heading: "Permits and planning in Shelby Township",
      paragraphs: [
        "Check with the Shelby Township Building Department about permit requirements for your project before work starts. The township’s published outline for single-family construction lists an approach permit from the county road agency among outside approvals that may apply.",
        countyRoadsNote,
      ],
      source: countyRoads,
    },
    faqs: [
      {
        q: "Can a patio and garden wall be finished to match?",
        a: "Yes. Finishing a garden or retaining wall in the same exposed aggregate as the patio is a great way to make a backyard look designed. See our garden wall project for an example.",
      },
      {
        q: "How far is Shelby Township from you?",
        a: "About 13 miles from our New Haven base. Shelby is well within the area we serve.",
      },
    ],
    nearby: ["washington-township", "macomb-township", "sterling-heights", "clinton-township"],
    sources: [
      wiki("Shelby_Charter_Township,_Michigan"),
      { label: "Shelby Township single-family permit outline", url: "https://shelbytwp.org/home/showpublisheddocument/554/637770705282900000" },
      countyRoads,
    ],
  },
  {
    slug: "sterling-heights",
    name: "Sterling Heights",
    kind: "city",
    county: "Macomb",
    population: 134346,
    miles: 16,
    metaTitle: "Concrete Contractor in Sterling Heights, MI",
    metaDescription:
      "Driveway replacement, walkways and patios for Sterling Heights, MI homes. Family-owned, BBB A+ concrete contractor based in New Haven. Request an estimate.",
    h1: "Concrete driveway replacement, walkways and patios in Sterling Heights",
    lede: "Sterling Heights is Michigan’s fourth-largest city, and many of its homes were built for the region’s auto workers decades ago. That means a lot of original driveways and walks ready for replacement. We help homeowners replace them and add patios.",
    leadProject: "driveway-expansion",
    snapshot: [
      { label: "Municipality", value: "City of Sterling Heights" },
      { label: "County", value: "Macomb" },
      { label: "Population (2020)", value: "134,346" },
      { label: "Distance", value: "About 16 miles from New Haven" },
    ],
    context: {
      heading: "Concrete work in Sterling Heights",
      paragraphs: [
        "Sterling Heights was farmland, once known for rhubarb, before suburban homes were built for workers in Detroit’s auto industry. Sterling Township incorporated as a city in 1968, and by 2020 it had 134,346 residents, making it the fourth-most populous city in Michigan.",
        "Decades-old neighborhoods mean decades-old concrete. Driveways, approaches and front walks that have been through many Michigan winters develop cracks, heaving and sunken sections. Replacing them improves safety, drainage and curb appeal.",
        "The Clinton River crosses the northeast part of the city, where lower ground near the river makes drainage planning worth extra attention.",
      ],
    },
    focus: [
      { service: "concrete-driveways", body: "Tear-out and replacement of original driveways on established city lots." },
      { service: "concrete-walkways", body: "Front walks and steps replaced level, with clean transitions to the driveway and porch." },
      { service: "driveway-expansions", body: "Widening for growing households with more vehicles than the original driveway was built for." },
    ],
    permits: {
      heading: "Permits and planning in Sterling Heights",
      paragraphs: [
        "Check with the City of Sterling Heights about permit requirements before work begins, especially for work at the driveway approach, sidewalk or curb, which is in the public right-of-way. Requirements for widening can differ from a same-footprint replacement.",
        "Major roads such as M-53 (Van Dyke) and M-59 (Hall Road) are state highways, and approach work on state or county roads may need a permit from that road agency.",
      ],
    },
    faqs: [
      {
        q: "Does replacing my driveway include the approach to the street?",
        a: "It can. The approach between the sidewalk and the street is usually in the public right-of-way, so it may need a separate permit. We’ll talk through the full scope at your estimate.",
      },
      {
        q: "Do you work as far south as Sterling Heights?",
        a: "Yes. Sterling Heights is about 16 miles from our New Haven base and within the Macomb County area we serve.",
      },
    ],
    nearby: ["shelby-township", "clinton-township", "macomb-township", "washington-township"],
    sources: [wiki("Sterling_Heights,_Michigan")],
  },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const cityPath = (slug: string) => `/service-areas/${slug}`;
