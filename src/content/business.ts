/**
 * Single source of truth for business facts (NAP, credentials, service area).
 * Only verified details live here — see docs/IMPLEMENTATION-REPORT.md for sources
 * and the items that still need owner confirmation.
 */

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const business = {
  name: "Enzo’s Concrete LLC",
  shortName: "Enzo’s Concrete",
  siteUrl,
  phone: {
    display: "(586) 231-4217",
    href: "tel:+15862314217",
    e164: "+15862314217",
  },
  email: "Enzosconcretellc@gmail.com",
  address: {
    locality: "New Haven",
    region: "MI",
    regionName: "Michigan",
    postalCode: "48048",
    country: "US",
  },
  yearsExperience: "15+",
  familyOwned: true,
  bbb: {
    accredited: true,
    accreditedSince: "2026-02-12",
    rating: "A+",
    profileUrl:
      "https://www.bbb.org/us/mi/lenox/profile/concrete-contractors/enzos-concrete-llc-0372-90068622",
  },
  /** Counties listed in the company's BBB service-area profile. */
  serviceCounties: ["Macomb County", "Oakland County", "Wayne County"],
  /**
   * Business hours on the previous site (Mon–Fri 9am–10pm, Sat 9–6, Sun 9–12)
   * looked like builder defaults and are unverified, so they are intentionally
   * not published. Add confirmed hours here and they will render in the footer
   * and structured data.
   */
  hours: null as null | { days: string; opens: string; closes: string }[],
  /** Verified third-party reviews only. Empty = the reviews section stays hidden. */
  reviews: [] as { quote: string; author: string; source: string; url: string }[],
} as const;

export const absoluteUrl = (path = "/") => `${business.siteUrl}${path === "/" ? "/" : path}`;
