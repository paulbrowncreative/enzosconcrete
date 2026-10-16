# Enzo’s Concrete LLC: implementation report

_Prepared 2026-10-14. Covers the audit of the existing B12 site, the strategy, the build, the testing that was actually run, and what still needs the owner._

---

## 1. Audit of the existing site

**Crawled:** `https://enzos-concrete-llc.b12sites.com/`: `robots.txt`, `sitemap.xml` and all 12 sitemap URLs (all returned HTTP 200).

| Old URL | Content | New home |
|---|---|---|
| `/` | Hero, about blurb, 6 service cards, contact form, hours, BBB badge | `/` |
| `/cement-driveways` | ~110 words + 1 photo | `/services/concrete-driveways` (308) |
| `/custom-concrete-patios` | Short copy + 1 photo | `/services/concrete-patios` (308) |
| `/concrete-walkways-and-pathways` | Short copy + 1 photo | `/services/concrete-walkways` (308) |
| `/retaining-walls` | Short copy + 1 photo | `/services/retaining-walls` (308) |
| `/driveway-expansions` | Short copy + 1 photo | `/services/driveway-expansions` (308) |
| `/pool-deck` | ~95 words + 1 photo | `/services/pool-decks` (308) |
| `/intake-form`, `/scheduling`, `/reschedule-appointment`, `/cancel-appointment` | B12 booking/intake utilities | `/contact` (308) |
| `/privacy-policy` | 1 paragraph | `/privacy-policy` (rewritten for the real form) |

**SEO problems found on the old site:** no H1 on any service page; homepage H1 was a trust line with no service keyword; generic titles with no location ("Pool deck"); ~160 words per service page, navigation included; no structured data; booking utility pages in the sitemap with no meta descriptions; ~380 KB homepage HTML; hosted on a B12 subdomain.

## 2. Verified business facts

| Fact | Value used | Source | Status |
|---|---|---|---|
| Name | Enzo’s Concrete LLC | Old site, BBB | ✅ Verified |
| Phone | (586) 231-4217 | Old site, BBB | ✅ Verified (matches) |
| Email | Enzosconcretellc@gmail.com | Old site | ✅ From old site |
| Location | New Haven, MI 48048 | Old site | ✅. BBB lists the city as **Lenox, MI 48048-2971**. The Village of New Haven is inside Lenox Township, so both are accurate, but **pick one locality and use it everywhere** (Google Business Profile, BBB, directories, site). |
| Family owned, 15+ years | Used | Old site | ✅ From old site. BBB shows a "business started" date of 1974, which conflicts. **Owner to confirm.** |
| BBB accreditation | Accredited since 2026-02-12, A+ rating, 0 complaints | [BBB profile](https://www.bbb.org/us/mi/lenox/profile/concrete-contractors/enzos-concrete-llc-0372-90068622) | ✅ Verified |
| Service area | Macomb, Oakland, Wayne counties | BBB service-area listing | ✅ Verified (self-reported to BBB) |
| Services | Driveways, patios, walkways, retaining walls, driveway expansions, pool decks | Old site | ✅ From old site |
| Hours | Not published | Old site listed Mon–Fri 9am–10pm, Sat 9–6, Sun 9–12 | ⚠️ Looks like builder defaults. **Owner to confirm**, then set `business.hours`. |
| Owner name | Not published | BBB lists a principal | Not used without the owner’s OK |
| "Foundations", "Decorative Concrete" | Not added | Only appeared as old intake-form checkboxes | ⚠️ **Owner to confirm** before adding service pages |
| Reviews / testimonials | None published | None on the old site; BBB shows 0 reviews; web searches found no third-party reviews (Google Business Profile not checked directly) | Reviews section is built but stays hidden until real reviews are added |
| "Top Rated Contractor" award graphic | Removed | Generic graphic, no verifiable award | ❌ Not used |

## 3. Strategy

**Primary conversion:** estimate request (form or phone). **Secondary:** phone call, email.

**Positioning:** a family-owned, BBB A+ contractor whose own photos show **exposed-aggregate craftsmanship** (contrasting borders, curved edges, matching steps). The site makes those photos the centerpiece of every service page.

### Site architecture and keyword mapping

| Page | Primary intent / target query cluster | Title |
|---|---|---|
| `/` | concrete contractor Macomb County · brand | New Haven & Macomb County Concrete Contractor \| Enzo’s Concrete |
| `/services` | residential concrete services New Haven / Macomb County | Residential Concrete Services in New Haven, MI |
| `/services/concrete-driveways` | concrete driveway contractor / replacement near New Haven MI | Concrete Driveway Contractor in New Haven, MI |
| `/services/concrete-patios` | concrete patio contractor · exposed aggregate patio Macomb County | Custom Concrete Patios in New Haven, MI |
| `/services/concrete-walkways` | concrete walkway installation · front walk replacement | Concrete Walkways & Pathways in New Haven, MI |
| `/services/retaining-walls` | concrete retaining wall contractor | Concrete Retaining Walls in New Haven, MI |
| `/services/driveway-expansions` | driveway extension / widening contractor | Driveway Expansions & Extensions in New Haven, MI |
| `/services/pool-decks` | concrete pool deck contractor | Concrete Pool Decks in New Haven, MI |
| `/our-work` | concrete contractor photos / portfolio (trust) | Our Work: Concrete Project Gallery |
| `/about` | navigational / trust | About Us \| Family-Owned Concrete Contractor |
| `/service-areas` | local coverage hub | Service Areas: Concrete Contractor in Macomb County, MI |
| `/contact` | transactional | Request a Concrete Estimate |
| `/service-areas/{city}` ×13 | concrete contractor {city} MI · concrete driveway/patio {city} | e.g. Concrete Contractor in Macomb Township, MI |

The query clusters are hypotheses based on the services, the location and the competitor review. No keyword
tool (volume or difficulty data) was available, so none is claimed. Validate with Search Console data after launch.

**Location pages (added in a second pass):** 13 local landing pages at `/service-areas/[slug]`: New Haven, Lenox Township, New Baltimore, Chesterfield Township, Richmond, Ray Township, Armada, Macomb Township, Washington Township, Harrison Township, Clinton Township, Shelby Township and Sterling Heights. These are the Macomb County communities closest to the New Haven base. To avoid doorway pages, each one is built from researched, cited local facts and has its own:
- **Title, meta description, H1 and lede**, aligned to "concrete contractor in {city}" intent and to that community's most likely projects
- **Local context**: geography, growth and housing history, water and drainage factors (Wikipedia, citing the 2020 Census). Sources are recorded per city in `src/content/cities.ts`
- **Services ranked by local relevance**, with city-specific reasoning, plus links to every service page
- **Permit and planning guidance:** Macomb Township's published concrete requirements (driveway widths, setbacks, base and rebar, inspections) and the Macomb County Department of Roads approach-permit process are quoted from official sources. Where a city's rules couldn't be verified, the page tells homeowners to check with that municipality rather than inventing requirements
- **City-specific FAQs**, a project gallery ordered to match local priorities, links to 4 nearby communities, and a CTA that pre-fills the city on the estimate form
- **`Service` JSON-LD** with `areaServed` set to that city (inside Macomb County) and an offer catalog of every service. The business schema's `areaServed` also lists every city

What the pages deliberately do **not** do: claim past projects, reviews or customers in any city (none are verified), or publish permit fees or rules that weren't confirmed. **Oakland and Wayne counties** get county-level coverage only. Together they contain dozens of municipalities, many of them farther from New Haven, and pages for them would be thin until there are real local projects to show.

**Best upgrade for these pages:** add real jobs, with photos, the neighborhood and a review, to the matching city entry. Local proof is what separates a ranking city page from a template.

### Competitor review (public listings, not independently verified)

| Competitor | Base | What they emphasize | Opportunity for Enzo’s |
|---|---|---|---|
| Biondo Cement Co. | Shelby Twp | 30+ yrs, "leader in exposed aggregate", 3D patio renderings | Compete on real exposed-aggregate photos and faster, clearer estimate flow |
| Unique Cement | Clinton Twp | Family owned, decorative and exposed aggregate since 1978 | Similar story. Differentiate on BBB A+ and modern, mobile-first UX |
| RML Decorative Concrete | Shelby Twp | Stamped and exposed aggregate, "licensed and insured" | Publish license and insurance once confirmed (see open items) |
| Bonnici Concrete | Utica | Macomb/Oakland/Wayne, driveway replacements | Same counties. Win with service-specific pages and FAQs |
| Bedrock Construction | Chesterfield | Lists New Haven in its service area | Closest geographic competitor. Enzo’s is actually based in New Haven |
| Construction Fleet LLC | Van Dyke Ave (HomeAdvisor) | Very high review volume (597 on HomeAdvisor) | **Reviews are the biggest gap.** See the priorities below |

Sources: Houzz, Yext, BuildZoom, HomeGuide and HomeAdvisor listings found via search on 2026-10-14.

## 4. Design system

- **Palette:** charcoal `#151515`, warm concrete neutrals (`#f7f5f1`→`#cfc8bc`) and a safety-orange accent `#e8590c`, taken from the cones in the company’s own job photos. Orange text on light backgrounds uses `#a63a0b` (≥4.85:1).
- **Type:** Archivo (variable width; expanded headlines echo the logo’s wide "ENZO’S") plus Source Serif 4 italic for the "Concrete LLC" lockup, echoing the logo’s serif.
- **Motifs:** a faint scored-slab grid in dark headers, numbered spec-sheet sections, heavy rule lines and "OUR WORK" photo tags.
- **Logo:** the existing mark, converted to transparent light and dark versions plus a horizontal header lockup. The brand identity is preserved.

## 5. Build summary

- 14 routes: 12 indexable pages + 404 + the estimate API. All pages are statically generated (crawlable HTML, no client-rendered content).
- **SEO:** unique titles and descriptions, self-canonicals, Open Graph and Twitter cards with a branded 1200×630 image, `sitemap.xml` (12 URLs), `robots.txt`, breadcrumbs, 308 redirects for every old URL, and descriptive internal links (service ↔ related services ↔ gallery ↔ contact).
- **Structured data (JSON-LD):** `GeneralContractor` (name, phone, email, locality and ZIP, `areaServed` counties, BBB `sameAs`, no fabricated geo coordinates, hours or ratings), `WebSite`, `Service` (per service page) and `BreadcrumbList`.
- **Estimate form:** name, phone, optional email, city, service (preselected from the service page you came from), details and preferred contact method. Client and server share one validation module. Spam protection: a honeypot, a minimum fill time and a per-instance rate limit. Delivery goes through the Resend API (server-side key). HTML in submissions is escaped, and the customer's email is set as reply-to.
- **Conversion:** sticky header CTA and phone link, a mobile bottom action bar (Call / Estimate), CTAs in every hero, a sticky estimate card on service pages and a closing CTA band on each page.
- **Accessibility:** skip link, landmarks, one H1 per page, visible focus, an error summary with linked inline errors and `aria-invalid`, a native `<dialog>` lightbox with keyboard navigation, `prefers-reduced-motion` support and ≥44px touch targets.

## 6. Testing actually performed

All tests ran against a production build (`next build && next start`) on localhost.

| Check | Result |
|---|---|
| `next build` + TypeScript | ✅ Pass, no warnings |
| All 12 pages + 404 at 390, 768, 1024, 1440 and 1920px (Playwright) | ✅ HTTP 200 (404 page returns 404), no horizontal overflow, no broken images, no console errors, exactly one H1 per page |
| axe-core (WCAG 2.0/2.1/2.2 A/AA + best practice), all pages at 390px | ✅ 0 violations, after fixing contrast and landmark issues found in the first pass |
| Mobile menu: open, Escape closes, closes on navigation | ✅ |
| Gallery lightbox: open, arrow keys, Escape | ✅ |
| Form: empty submit shows error summary and moves focus; `aria-invalid` set; service preselect via `?service=` | ✅ |
| Form without email configured | ✅ Returns 503 and shows a "call us" message. No fake success |
| Form → Resend with an invalid API key | ✅ Request reached the Resend API (401 logged server-side); user sees an error. **A real delivery has not been tested yet:** it needs the production key and a verified sender domain |
| API: invalid input → 422 with field errors; honeypot or too-fast submissions → silently dropped | ✅ |
| All 11 legacy URLs | ✅ 308 to the correct new URL |
| Security headers | ✅ HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy |
| Lighthouse (mobile, simulated throttling) | Home 89 · Driveways 91 · Our Work 88 · About 95 · Service Areas 96 · Contact 98 performance. **Accessibility, Best Practices and SEO = 100 on every page tested.** CLS 0 everywhere |
| Lighthouse home (mobile, devtools/applied throttling) | Performance 92, **LCP 1.9 s**, CLS 0.011. The simulated-throttling estimate for LCP is 3.8 s (text LCP waiting on the web font under Lighthouse's model) |

Not measured yet: real-user Core Web Vitals (they need production traffic in CrUX or Search Console), Google's Rich Results Test against the live URL, and actual Google indexing.

### Local pages QA (second pass)
| Check | Result |
|---|---|
| All 27 URLs (26 sitemap URLs + the 404) at 390, 768 and 1440px | ✅ 200s, no overflow, no broken images, one H1 each, **0 axe violations**, no duplicate titles |
| City prefill: city page CTA → `/contact?city=New Baltimore` fills the city field | ✅ |
| City `Service` schema parses, `areaServed` correct | ✅ |
| Lighthouse (mobile, simulated): Macomb Township page / hub | 84 / 96 performance; **100 accessibility, best practices and SEO** on both |

### Expansion pass (2026-10-16): new services, city × service pages, deployment QA

**Added**
- Two service pages, confirmed by the owner and backed by Facebook project photos: **Concrete Cleaning & Sealing** (`/services/concrete-sealing`) and **Pole Barn Floors & Concrete Slabs** (`/services/concrete-slabs`). There are now 8 services.
- **104 city × service landing pages** at `/service-areas/{city}/{service}`: every one of the 13 communities × 8 services, each targeting a high-intent local search, e.g. "Concrete Driveway Contractor in Shelby Township, MI" or "Concrete Sealing & Power Washing in New Baltimore, MI". Content is assembled in `src/content/localServices.ts` from:
  - the service's local keyword and lede
  - notes chosen by each city's documented traits (lakeside, rural, established, subdivision, riverside, snowier, wet ground, hometown)
  - that city's researched context and permit guidance (Macomb Township's published rules are filtered to the ones relevant to each service, and the county road approach permit appears only on driveway pages)
  - city-specific FAQs, a rotating hero photo and gallery, links to the same service in nearby communities, and links to every other service in that city
- `Service` JSON-LD on each local page with `areaServed` set to the city (inside Macomb County).
- Keyword split to avoid cannibalization: main service pages target **Macomb County**, the New Haven local pages target **New Haven**, and the homepage targets **New Haven & Macomb County**.

**Duplicate-content control:** pages for the same service across cities were measured with 5-word shingle overlap, with city names normalized out. After the shared service lede and benefits were swapped for city-specific context, mean overlap is **35–50%** (max 49–63%). The remaining overlap is mostly navigation, CTAs and photo captions. These pages will still rank best once real local projects, photos and reviews are added per city. They are local landing pages, not a substitute for local proof.

**Deployment QA (all run against a production build)**
| Check | Result |
|---|---|
| Production build + TypeScript | ✅ 0 errors, 0 warnings; 132 URLs in sitemap, all statically generated |
| SEO crawl of all 132 URLs | ✅ HTTP 200, unique title and meta description on every page (titles ≤70 chars, descriptions 70–165), self-referencing canonical, one H1, OG image, valid JSON-LD, no `noindex`, no images without alt, no references to the old B12 site |
| Internal links | ✅ 132 distinct internal link targets, **0 broken**, **0 orphan pages**; every page has ≥11 inbound internal links |
| Browser QA, 132 pages × 390px and 1440px (266 loads) | ✅ **0 axe violations** (WCAG 2.0–2.2 A/AA + best practice), 0 horizontal overflow, 0 broken images, 0 console errors (except the intentional 404 test) |
| Functional | ✅ Mobile menu (8 services), Escape/close; city+service CTA pre-fills the form; form validation, error summary and focus; email-preference rule; honest 503 when email isn't configured; gallery filter (75 photos, 8 cleaning & sealing) |
| API hardening | ✅ malformed JSON → 400, invalid fields → 422, honeypot → silent 200, GET → 405, oversized body → 413 |
| Routing | ✅ legacy B12 URLs → 308 to new pages; unknown pages, cities and services → 404 |
| Security headers | ✅ HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy |
| Production domain build (`NEXT_PUBLIC_SITE_URL` set) | ✅ sitemap, robots, canonicals, Open Graph and JSON-LD all use the production domain; 0 `localhost` references |
| `npm audit --omit=dev` | ✅ 0 vulnerabilities |
| Lighthouse mobile (simulated) | Home 89 · Shelby patios page 89 · Sealing service 96 · Our Work 89 · Contact 95. **Accessibility, Best Practices and SEO 100 on all.** CLS 0 |

## 7. Owner checklist (needed before or at launch)

0. **Review the local pages:** each of the 13 communities now has 8 service pages saying Enzo’s serves that town for that service. If there are towns or services (e.g. sealing in a far-off town) you don’t want to advertise, say so and they can be removed.
1. **Domain:** which domain will the site live on? Set `NEXT_PUBLIC_SITE_URL` and point DNS at the deployment.
2. **Form delivery:** create a Resend account, verify the sending domain, then set `RESEND_API_KEY`, `LEAD_TO_EMAIL` and `LEAD_FROM_EMAIL`. Send one real test request.
3. **Confirm or correct these facts:** years in business (15+ vs. BBB's 1974), business hours, whether estimates are free (the site says "Request an Estimate", not "free"), whether you take texts (the form offers "Text message" as a contact preference), and "Foundations" / "Decorative concrete" as services.
4. **Confirm the copy commitments** written in your voice: looking at the existing driveway with the customer before work; scheduling pours around the forecast; that every photo on the site is your own work; that you discuss the site in person. Edit any that don't match how you work (`src/content/services.ts`, `src/app/page.tsx`).
5. **License and insurance:** if you hold a Michigan residential builder or M&A license and liability insurance, send the details. They're strong trust signals competitors use.
6. **Locality:** choose "New Haven" or "Lenox" and make Google Business Profile, BBB and the site match.

## 8. Prioritized opportunities

1. **Google Business Profile service areas:** list the same 13 communities (plus counties) as service areas in GBP, so the profile and the city pages reinforce each other.
   **Google Business Profile setup:** claim and verify it as a service-area business (hide the street address, list the counties and towns you serve), use the same name, phone and locality as the site, set the website URL to the new domain and the category to "Concrete contractor". This drives local pack rankings more than anything else.
2. **Reviews:** ask every completed customer for a Google review (and BBB). Then add verified quotes to `business.reviews` with source links. This is the largest competitive gap.
3. **More project photos:** add wide shots plus before/after pairs, tagged by service and (with permission) city. More photos strengthen every service page. City-tagged projects are the legitimate basis for future city pages.
4. **Search Console + GA4:** verify the property, submit `sitemap.xml`, set `NEXT_PUBLIC_GA_ID`, and mark `generate_lead` and `phone_click` as key events. If you run Google Ads, add the Ads conversion tag through GA4 or GTM.
5. **Citations:** make sure the name, phone and locality match exactly on BBB, Yelp, Angi/HomeAdvisor, Houzz, Nextdoor and Facebook. Link each one to the new site.
6. **Helpful articles** (only when they can be written accurately with the owner's input): driveway replacement vs. expansion; preparing for a driveway pour; exposed aggregate vs. broom finish; caring for new concrete through a Michigan winter; what drives concrete project cost. Link each to its service page.
7. **Official BBB seal:** add BBB's dynamic seal code from the accredited-business portal.
8. **Optional photo upload on the form:** it needs object storage (e.g. Vercel Blob or S3) with size and type limits. Not built, to keep the form secure and simple.
