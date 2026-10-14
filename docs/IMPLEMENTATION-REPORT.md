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
| `/` | concrete contractor New Haven MI · concrete company New Haven Michigan | Concrete Contractor in New Haven, MI \| Enzo’s Concrete LLC |
| `/services` | residential concrete services New Haven / Macomb County | Residential Concrete Services in New Haven, MI |
| `/services/concrete-driveways` | concrete driveway contractor / replacement near New Haven MI | Concrete Driveway Contractor in New Haven, MI |
| `/services/concrete-patios` | concrete patio contractor · exposed aggregate patio Macomb County | Custom Concrete Patios in New Haven, MI |
| `/services/concrete-walkways` | concrete walkway installation · front walk replacement | Concrete Walkways & Pathways in New Haven, MI |
| `/services/retaining-walls` | concrete retaining wall contractor | Concrete Retaining Walls in New Haven, MI |
| `/services/driveway-expansions` | driveway extension / widening contractor | Driveway Expansions & Extensions in New Haven, MI |
| `/services/pool-decks` | concrete pool deck contractor | Concrete Pool Decks in New Haven, MI |
| `/our-work` | concrete contractor photos / portfolio (trust) | Our Work: Concrete Project Gallery |
| `/about` | navigational / trust | About Us \| Family-Owned Concrete Contractor |
| `/service-areas` | local coverage | Service Area: New Haven & Southeast Michigan |
| `/contact` | transactional | Request a Concrete Estimate |

The query clusters are hypotheses based on the services, the location and the competitor review. No keyword
tool (volume or difficulty data) was available, so none is claimed. Validate with Search Console data after launch.

**Location pages:** intentionally **not** created. There's no verified project history by city, and
city-swapped pages would be thin or doorway content. One substantive `/service-areas` hub covers the
counties (from BBB) and nearby communities, clearly labeled as geography rather than claimed jobs. Add
city pages only when there are real projects, photos and local detail for that city.

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

## 7. Owner checklist (needed before or at launch)

1. **Domain:** which domain will the site live on? Set `NEXT_PUBLIC_SITE_URL` and point DNS at the deployment.
2. **Form delivery:** create a Resend account, verify the sending domain, then set `RESEND_API_KEY`, `LEAD_TO_EMAIL` and `LEAD_FROM_EMAIL`. Send one real test request.
3. **Confirm or correct these facts:** years in business (15+ vs. BBB's 1974), business hours, whether estimates are free (the site says "Request an Estimate", not "free"), whether you take texts (the form offers "Text message" as a contact preference), and "Foundations" / "Decorative concrete" as services.
4. **Confirm the copy commitments** written in your voice: looking at the existing driveway with the customer before work; scheduling pours around the forecast; that every photo on the site is your own work; that you discuss the site in person. Edit any that don't match how you work (`src/content/services.ts`, `src/app/page.tsx`).
5. **License and insurance:** if you hold a Michigan residential builder or M&A license and liability insurance, send the details. They're strong trust signals competitors use.
6. **Locality:** choose "New Haven" or "Lenox" and make Google Business Profile, BBB and the site match.

## 8. Prioritized opportunities

1. **Google Business Profile:** claim and verify it as a service-area business (hide the street address, list the counties and towns you serve), use the same name, phone and locality as the site, set the website URL to the new domain and the category to "Concrete contractor". This drives local pack rankings more than anything else.
2. **Reviews:** ask every completed customer for a Google review (and BBB). Then add verified quotes to `business.reviews` with source links. This is the largest competitive gap.
3. **More project photos:** add wide shots plus before/after pairs, tagged by service and (with permission) city. More photos strengthen every service page. City-tagged projects are the legitimate basis for future city pages.
4. **Search Console + GA4:** verify the property, submit `sitemap.xml`, set `NEXT_PUBLIC_GA_ID`, and mark `generate_lead` and `phone_click` as key events. If you run Google Ads, add the Ads conversion tag through GA4 or GTM.
5. **Citations:** make sure the name, phone and locality match exactly on BBB, Yelp, Angi/HomeAdvisor, Houzz, Nextdoor and Facebook. Link each one to the new site.
6. **Helpful articles** (only when they can be written accurately with the owner's input): driveway replacement vs. expansion; preparing for a driveway pour; exposed aggregate vs. broom finish; caring for new concrete through a Michigan winter; what drives concrete project cost. Link each to its service page.
7. **Official BBB seal:** add BBB's dynamic seal code from the accredited-business portal.
8. **Optional photo upload on the form:** it needs object storage (e.g. Vercel Blob or S3) with size and type limits. Not built, to keep the form secure and simple.
