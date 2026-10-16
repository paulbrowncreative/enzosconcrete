export type ServiceSlug =
  | "concrete-driveways"
  | "concrete-patios"
  | "concrete-walkways"
  | "retaining-walls"
  | "driveway-expansions"
  | "pool-decks"
  | "concrete-sealing"
  | "concrete-slabs";

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Short label for cards and nav. */
  label: string;
  /** One-line benefit used on cards. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  /** Project id used as the page's lead image. */
  leadProject: string;
  /** "Why it's worth it" — customer outcomes. */
  benefits: { title: string; body: string }[];
  /** Practical, honest guidance for homeowners planning the work. */
  planning: { heading: string; paragraphs: string[] };
  faqs: { q: string; a: string }[];
  related: ServiceSlug[];
};

export const services: Service[] = [
  {
    slug: "concrete-driveways",
    name: "Concrete Driveways",
    label: "Driveways",
    summary: "New and replacement driveways poured to handle daily traffic and Michigan winters.",
    metaTitle: "Concrete Driveway Contractor in Macomb County, MI",
    metaDescription:
      "New and replacement concrete driveways in New Haven, MI and across Macomb County. Family-owned, BBB A+ accredited. Call (586) 231-4217 for an estimate.",
    h1: "Concrete driveways built for daily use and Michigan winters",
    lede: "Your driveway takes more abuse than any other surface on your property: vehicles, snow shovels, salt and freeze-thaw cycles. We tear out tired, cracked driveways and pour new concrete that looks sharp from the street and holds up season after season.",
    leadProject: "driveway-washdown",
    benefits: [
      {
        title: "Curb appeal you notice from the street",
        body: "A clean, evenly finished driveway with straight edges and neatly placed control joints changes the whole look of a home.",
      },
      {
        title: "Built on proper preparation",
        body: "Most driveway failures start underneath the concrete, so the base and drainage are planned before anything is poured.",
      },
      {
        title: "Replacement without the guesswork",
        body: "We look at your existing driveway with you and explain what needs to come out, and why, before any work begins.",
      },
    ],
    planning: {
      heading: "Planning a driveway replacement",
      paragraphs: [
        "Most concrete driveway projects follow the same path: removal of the old surface, grading and base preparation, forming, the pour and finish, then a curing period before the driveway carries vehicles. The exact timeline depends on the size of the driveway, site access and the weather.",
        "Concrete gains strength over time. General industry guidance is to keep foot traffic off a new driveway for at least a day or two and to wait roughly a week before driving on it. We will give you specific timing for your project so you can plan where to park.",
        "If your driveway is cracked but structurally sound, you may be weighing replacement against a widening or extension. Our driveway expansions page explains when adding on makes sense and when a full replacement is the smarter long-term spend.",
      ],
    },
    faqs: [
      {
        q: "How long does a new concrete driveway take?",
        a: "The removal and pour for a typical residential driveway are usually handled over a few working days, followed by a curing period before you drive on it. Size, access and weather all affect the schedule, and we will give you a realistic timeline with your estimate.",
      },
      {
        q: "What affects the cost of a concrete driveway?",
        a: "The main factors are square footage, removal of the existing surface, how much base preparation and grading the site needs, the finish you choose and access for equipment. We price each project after seeing it, so your estimate reflects your actual driveway.",
      },
      {
        q: "Can you pour a driveway in cold weather?",
        a: "Concrete can be placed in cool weather with the right precautions, but freezing temperatures during the early curing period can damage a new slab. We schedule pours around the forecast to protect the work.",
      },
      {
        q: "How do I care for a new concrete driveway?",
        a: "Avoid heavy vehicles and sharp turns on fresh concrete, clear snow with plastic-edged shovels where you can, and go easy on de-icing salts, especially during the first winter. Periodic cleaning and sealing help protect the surface from moisture and salt.",
      },
    ],
    related: ["driveway-expansions", "concrete-walkways", "concrete-patios"],
  },
  {
    slug: "concrete-patios",
    name: "Custom Concrete Patios",
    label: "Patios",
    summary: "Custom-shaped patios, including exposed aggregate, sized for the way you use your yard.",
    metaTitle: "Custom Concrete Patios in Macomb County, MI",
    metaDescription:
      "Custom concrete and exposed-aggregate patios for homes in New Haven and Macomb County, MI. Curved edges, borders and real project photos. Request an estimate.",
    h1: "Custom concrete patios shaped around the way you live outside",
    lede: "A patio should fit your yard and the way you actually use it. Room for the grill, a table that seats everyone, a curve that follows the garden. We pour custom concrete patios, including the exposed-aggregate finishes you see throughout our work.",
    leadProject: "curved-patio",
    benefits: [
      {
        title: "Shapes that suit your yard",
        body: "Sweeping curves, clean rectangles or a patio that wraps a corner of the house. The layout follows how you plan to use the space.",
      },
      {
        title: "Exposed aggregate with real texture",
        body: "Exposed aggregate reveals the natural stone in the mix for a textured, slip-resistant surface. A contrasting border, like the one in our curved patio project, adds a finished edge.",
      },
      {
        title: "Low maintenance once it’s in",
        body: "Concrete doesn’t need boards replaced or joints re-sanded. Regular cleaning and periodic sealing keep it looking its best.",
      },
    ],
    planning: {
      heading: "What to decide before your patio estimate",
      paragraphs: [
        "Start with how you will use the space. A table for six with chairs pulled out needs more room than most people expect, and a grill station or fire area needs clearance of its own. Measuring your furniture before the estimate helps us recommend a size that won’t feel cramped.",
        "Think about where the patio meets the house, existing walkways and the lawn. Matching or connecting to a walkway, adding a step at a door, or finishing the edge with a contrasting border are all details worth discussing up front.",
        "Drainage matters too. A patio needs a slight slope away from the house so water runs off rather than pooling at the foundation. We will look at the grade during the estimate visit.",
      ],
    },
    faqs: [
      {
        q: "What is exposed aggregate concrete?",
        a: "Exposed aggregate is concrete where the top layer of cement paste is removed during finishing to reveal the stone in the mix. The result is a textured, natural-looking surface with good traction. Several of the projects in our gallery use this finish.",
      },
      {
        q: "How big should my patio be?",
        a: "It depends on what you want to fit. A small bistro set needs far less room than a dining table, grill and lounge chairs. Bring your wish list to the estimate and we will help size the patio around it.",
      },
      {
        q: "Can a new patio connect to my existing walkway or steps?",
        a: "Usually, yes. Tying a new patio into existing concrete is common. We will look at the condition and height of what’s there and explain the options during your estimate.",
      },
    ],
    related: ["concrete-walkways", "pool-decks", "retaining-walls"],
  },
  {
    slug: "concrete-walkways",
    name: "Concrete Walkways & Pathways",
    label: "Walkways",
    summary: "Front walks, steps, side-yard paths and garden pathways that connect your property.",
    metaTitle: "Concrete Walkways & Steps in Macomb County, MI",
    metaDescription:
      "Concrete and exposed-aggregate walkways, front walks and garden paths in New Haven and Macomb County, MI. See real project photos. Call (586) 231-4217.",
    h1: "Concrete walkways and pathways that connect your property",
    lede: "A good walkway does two jobs. It gets people safely from the driveway to the door, and it ties the house, garden and yard together. From straight front walks to curving garden paths, our walkway work is some of the most distinctive in our portfolio.",
    leadProject: "curved-walkway",
    benefits: [
      {
        title: "Safer footing in every season",
        body: "Replacing heaved, cracked or sunken sections removes trip hazards. Textured finishes like broom and exposed aggregate give better grip when it’s wet.",
      },
      {
        title: "Paths that follow the landscape",
        body: "Walkways don’t have to be straight. Curves that bend around garden beds and planters, like several projects in our gallery, make a yard feel designed.",
      },
      {
        title: "Details that finish the job",
        body: "Matching steps at side doors, contrasting borders and clean transitions to existing sidewalks are what make a walkway look like it was always there.",
      },
    ],
    planning: {
      heading: "Planning a new walkway",
      paragraphs: [
        "Walk the route you actually use. People cut corners, and a path that ignores the natural route usually ends up with a worn trail in the grass beside it. Width matters too: a front walk that two people can use side by side feels far more welcoming than a narrow strip.",
        "Consider what the walkway meets at each end: the driveway, the porch, a side door, a patio. Steps and transitions are where walkways most often look improvised, so we plan them as part of the job rather than an afterthought.",
        "Finish choice affects both looks and traction. Broom finish is clean and practical, while exposed aggregate adds texture and color from the stone in the mix.",
      ],
    },
    faqs: [
      {
        q: "Can you replace just part of a walkway?",
        a: "Often, yes. If only a few sections have heaved or cracked, replacing those panels can make sense. If most of the walkway is failing, full replacement usually gives a better-looking, longer-lasting result. We will tell you which applies after seeing it.",
      },
      {
        q: "Do curved walkways cost more than straight ones?",
        a: "Curves take more forming time than straight runs, so they can add some cost. For many homeowners the finished look is worth it, and we will price both options if you’re undecided.",
      },
      {
        q: "Can a walkway include steps?",
        a: "Yes. Our side-yard walkway project includes a matching curved step at the door. Step height and layout are planned around your entry so the walk and steps feel like one piece.",
      },
    ],
    related: ["concrete-patios", "concrete-driveways", "retaining-walls"],
  },
  {
    slug: "retaining-walls",
    name: "Retaining Walls",
    label: "Retaining Walls",
    summary: "Concrete walls that hold back soil, define garden beds and level out slopes.",
    metaTitle: "Concrete Retaining Walls in Macomb County, MI",
    metaDescription:
      "Concrete retaining and garden walls for homes in New Haven and Macomb County, MI. Hold back soil, define beds and add structure to your yard. Get an estimate.",
    h1: "Concrete retaining walls that bring structure to your yard",
    lede: "A well-built concrete wall holds soil where it belongs, creates level space for planting and gives a landscape crisp, permanent lines. Our garden wall project shows how an exposed-aggregate wall can frame a planting bed and look good doing it.",
    leadProject: "garden-wall",
    benefits: [
      {
        title: "Control soil and erosion",
        body: "Raised beds and grade changes stay put instead of washing onto the lawn or against the house.",
      },
      {
        title: "Defined, low-maintenance edges",
        body: "A solid concrete edge keeps mulch in and grass out, so beds stay neat with less trimming.",
      },
      {
        title: "A finish that matches your flatwork",
        body: "Walls can be finished to complement your patio or walkway, including exposed aggregate, so the whole yard reads as one design.",
      },
    ],
    planning: {
      heading: "Before you build a retaining wall",
      paragraphs: [
        "The height of the wall and the amount of soil it holds back drive the design. Low garden and landscape walls are very different projects from walls that retain a significant slope. Taller walls can require engineering and permits, depending on local rules.",
        "Water is the biggest enemy of any retaining wall. Soil that gets saturated pushes hard against the wall, so drainage behind and around it is part of planning the job, not an extra.",
        "Tell us what you want the wall to do: hold a slope, create a raised bed, define a patio edge or provide seating. That shapes the recommendation in your estimate.",
      ],
    },
    faqs: [
      {
        q: "Do I need a permit for a retaining wall?",
        a: "It depends on the wall’s height, location and your municipality’s rules. Low landscape walls often don’t, while taller walls may. Check with your local building department. We can discuss what typically applies when we see the site.",
      },
      {
        q: "Can a concrete wall match my patio or walkway?",
        a: "Yes. Finishing the wall to complement nearby flatwork, such as exposed aggregate, is a common way to make a landscape look cohesive.",
      },
    ],
    related: ["concrete-patios", "concrete-walkways", "pool-decks"],
  },
  {
    slug: "driveway-expansions",
    name: "Driveway Expansions & Extensions",
    label: "Driveway Expansions",
    summary: "Widen or extend your driveway for an extra car, a boat or easier parking.",
    metaTitle: "Driveway Extensions & Widening in Macomb County, MI",
    metaDescription:
      "Widen or extend your concrete driveway in New Haven and Macomb County, MI. Room for another vehicle, trailer or easier parking. Call (586) 231-4217.",
    h1: "Driveway expansions for the space you actually need",
    lede: "One more car, a teenager’s first vehicle, a trailer or simply room to open doors without stepping on the lawn. Widening or extending your driveway is often the most practical upgrade you can make to a home, and usually far less disruptive than a full replacement.",
    leadProject: "driveway-expansion",
    benefits: [
      {
        title: "Park without the shuffle",
        body: "Extra width means no more moving cars around in the morning or parking on the street.",
      },
      {
        title: "Keep what’s still good",
        body: "If your existing driveway is in solid shape, an expansion adds space without paying to tear out and replace concrete that has years left in it.",
      },
      {
        title: "A clean tie-in",
        body: "Where the new concrete meets the old is what people notice. We plan the joint and finish so the addition looks intentional.",
      },
    ],
    planning: {
      heading: "Expansion or full replacement?",
      paragraphs: [
        "An expansion makes sense when your existing driveway is structurally sound: no major settling, heaving or widespread cracking. In that case adding width or length gives you the space you need at a lower cost.",
        "If the existing driveway is already failing, pouring new concrete beside it usually means paying for the expansion now and the replacement soon after. Replacing everything at once can be the better value, and gives you a uniform surface.",
        "New concrete next to old will not be a perfect color match at first, since concrete weathers over time. We are upfront about this during your estimate so you know what to expect.",
      ],
    },
    faqs: [
      {
        q: "Will the new section match my existing driveway?",
        a: "New concrete starts out lighter than weathered concrete and blends in as it ages, but it won’t be identical on day one. A well-placed joint and a consistent finish help the addition look intentional.",
      },
      {
        q: "Do I need a permit to widen my driveway?",
        a: "Some municipalities require a permit for driveway work, especially near the street or sidewalk. Check with your city or township. We can talk through what’s typically involved when we see your project.",
      },
      {
        q: "How wide can my driveway be?",
        a: "That depends on your lot, setbacks and local rules. We will look at the space you have and what you want to park, then recommend a practical width.",
      },
    ],
    related: ["concrete-driveways", "concrete-walkways", "concrete-patios"],
  },
  {
    slug: "pool-decks",
    name: "Concrete Pool Decks",
    label: "Pool Decks",
    summary: "Slip-conscious concrete surrounds that frame your pool and handle splash and sun.",
    metaTitle: "Concrete Pool Decks in Macomb County, MI",
    metaDescription:
      "Concrete pool decks and pool surrounds for homes in New Haven and Macomb County, MI. Textured, comfortable and built around your pool. Request an estimate.",
    h1: "Concrete pool decks that frame your pool and your summer",
    lede: "The deck around a pool gets wet feet, sun, chairs and constant splashing. A properly finished concrete deck gives you a textured, comfortable surface that frames the pool and connects it to the rest of the yard.",
    leadProject: "pool-deck",
    benefits: [
      {
        title: "Better footing around the water",
        body: "A textured finish gives more grip than smooth concrete when the deck is wet. That matters most where kids are running.",
      },
      {
        title: "Room to actually use",
        body: "Plan space for loungers, a table and walking paths around the pool so the deck doesn’t feel crowded on a busy day.",
      },
      {
        title: "A clean frame for the pool",
        body: "Consistent finish and clean lines around the coping make the pool the centerpiece of the yard.",
      },
    ],
    planning: {
      heading: "Planning a pool deck",
      paragraphs: [
        "Decide how much deck you want on each side of the pool. Most people want one generous area for chairs and a table, with narrower walkways elsewhere. Think about where the sun is in the afternoon.",
        "Drainage is critical around pools. The deck should shed water away from the pool and the house, not toward either.",
        "Finish choice is about comfort as much as looks. Textured finishes provide traction for wet feet, and lighter colors stay cooler in direct sun than dark surfaces.",
      ],
    },
    faqs: [
      {
        q: "What concrete finish is best around a pool?",
        a: "A textured finish is the usual choice because it gives better traction when wet. Lighter tones also tend to stay cooler underfoot. We will show you options during the estimate.",
      },
      {
        q: "Can you replace the deck around an existing pool?",
        a: "Replacing an existing pool deck is a common project. The condition of the pool, its coping and the surrounding grade all affect the approach, so we assess it on site.",
      },
    ],
    related: ["concrete-patios", "concrete-walkways", "retaining-walls"],
  },
  {
    slug: "concrete-sealing",
    name: "Concrete Cleaning & Sealing",
    label: "Cleaning & Sealing",
    summary: "Pressure washing and sealing that protects stamped, exposed-aggregate and broom-finished concrete.",
    metaTitle: "Concrete Sealing & Cleaning in Macomb County, MI",
    metaDescription:
      "Concrete pressure washing and sealing for stamped patios, exposed aggregate and driveways in New Haven and Macomb County, MI. Protect against salt and weather.",
    h1: "Concrete cleaning and sealing that protects what you’ve invested in",
    lede: "Michigan winters are hard on concrete: road salt, de-icers, freeze-thaw cycles and months of moisture. A thorough cleaning followed by a quality sealer helps protect the surface and brings back the color of stamped and exposed-aggregate finishes.",
    leadProject: "fb-sealed-stamped-patio",
    benefits: [
      {
        title: "A barrier against salt and moisture",
        body: "Sealer helps keep water, de-icing salts and stains from soaking into the surface, the main culprits behind flaking and pitting.",
      },
      {
        title: "Color and texture that pop again",
        body: "Stamped and colored concrete fades and dulls with weather. Sealing deepens the color and shows off the pattern, as you can see in our sealed stamped patio photos.",
      },
      {
        title: "Clean before it’s sealed",
        body: "Sealer only works on a clean surface. Dirt, mildew and old residue are pressure washed off first, so the sealer bonds to the concrete, not the grime.",
      },
    ],
    planning: {
      heading: "When and how often to seal concrete",
      paragraphs: [
        "New concrete needs time to cure before it’s sealed. A common guideline is to wait about a month after the pour, but the right timing depends on the mix, the weather and the sealer, so we’ll recommend timing for your slab.",
        "Sealing is weather-dependent. The surface has to be dry, and temperatures need to stay within the sealer’s working range during application and drying, so most sealing happens in the warmer, drier months.",
        "How often to reseal depends on the sealer, the sun exposure and how much traffic and salt the surface sees. Driveways that get salted every winter usually need it more often than a shaded patio. Water that no longer beads on the surface is a good sign it’s time.",
      ],
    },
    faqs: [
      {
        q: "Should I seal stamped concrete?",
        a: "Stamped and colored concrete is usually sealed to protect the color and pattern and make it easier to clean. Resealing periodically keeps it looking its best.",
      },
      {
        q: "Can you seal exposed-aggregate concrete?",
        a: "Yes. Sealing exposed aggregate helps hold the stones in place, enriches their color and makes the surface easier to keep clean. Several of our sealing photos show exposed-aggregate patios.",
      },
      {
        q: "Will sealer make my concrete slippery?",
        a: "Some sealers can make smooth surfaces slicker when wet. Texture matters, and we’ll talk about options for steps, walkways and pool areas where traction is important.",
      },
      {
        q: "Do you clean concrete without sealing it?",
        a: "Tell us what you have in mind. Pressure washing is part of preparing a surface for sealing, and we’ll discuss what makes sense for your concrete.",
      },
    ],
    related: ["concrete-patios", "concrete-driveways", "concrete-walkways"],
  },
  {
    slug: "concrete-slabs",
    name: "Pole Barn Floors & Concrete Slabs",
    label: "Slabs & Barn Floors",
    summary: "Pole barn and garage-style floors, shed pads and porch slabs poured flat, solid and ready to use.",
    metaTitle: "Pole Barn Floors & Slabs in Macomb County, MI",
    metaDescription:
      "Concrete pole barn floors, shed pads and porch slabs in New Haven and Macomb County, MI. Flat, durable slabs from a family-owned, BBB A+ contractor.",
    h1: "Pole barn floors, shed pads and concrete slabs",
    lede: "Whether it’s a pole barn that needs a real floor, a shed that needs a level pad, or a covered porch that needs a slab, a flat, well-built slab makes the space usable for decades. You can see pole barn floors and shed pads in our project gallery.",
    leadProject: "fb-pole-barn-floor-finishing",
    benefits: [
      {
        title: "Flat, usable floors",
        body: "A properly placed and finished slab gives you a level surface for vehicles, equipment, storage or a workshop, instead of gravel or dirt.",
      },
      {
        title: "Planned for what it carries",
        body: "A shed pad, a workshop floor and a slab that holds a tractor are different jobs. Tell us what the slab will hold, and the base and slab are planned for it.",
      },
      {
        title: "The right finish for the space",
        body: "Smooth trowel finishes are easy to sweep inside a barn or garage, while broom finishes give outdoor pads and porch slabs better traction.",
      },
    ],
    planning: {
      heading: "Planning a pole barn floor or slab",
      paragraphs: [
        "Start with how the space will be used. Vehicles and heavy equipment, a workshop, or simple storage each call for different slab and base planning, and that’s the biggest factor in the estimate.",
        "Access matters for larger floors. Ready-mix trucks need a route to the building, so we’ll look at how the site can be reached before the pour is scheduled.",
        "Slabs for new buildings may be part of a permitted project. Check with your township about permits for the building and slab, especially for new pole barns and accessory structures.",
      ],
    },
    faqs: [
      {
        q: "Can you pour a floor in an existing pole barn?",
        a: "Often, yes, as long as the concrete trucks can reach the building or the concrete can be moved into place. We’ll look at access and the existing grade during the estimate.",
      },
      {
        q: "What finish is best for a barn or garage floor?",
        a: "Inside, a smooth trowel finish is easy to sweep and clean. Outdoors, or where traction matters, a broom finish is usually the better choice.",
      },
      {
        q: "Do you pour shed pads?",
        a: "Yes. A concrete pad gives a shed a level, solid base that keeps it off the ground. Our gallery includes several shed pads.",
      },
    ],
    related: ["driveway-expansions", "concrete-driveways", "concrete-sealing"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicePath = (slug: ServiceSlug) => `/services/${slug}`;
