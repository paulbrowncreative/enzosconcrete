# Enzo’s Concrete LLC: website

Marketing and lead-generation site for Enzo’s Concrete LLC, a family-owned residential concrete
contractor in New Haven, Michigan.

- **Stack:** Next.js 16 (App Router, static generation) · React 19 · TypeScript · plain CSS with design tokens. No UI or CSS framework.
- **Runtime dependencies:** `next`, `react`, `react-dom`. That's all.
- **Report:** [`docs/IMPLEMENTATION-REPORT.md`](docs/IMPLEMENTATION-REPORT.md) covers the audit, strategy, testing and open items. [`docs/asset-manifest.md`](docs/asset-manifest.md) covers the image migration.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values as needed
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck
```

Requires Node 20.9+.

## Where things live

| Path | What it is |
|---|---|
| `src/content/business.ts` | **Business facts**: name, phone, email, location, BBB details, service counties, hours, reviews. Edit here and it updates everywhere, structured data included. |
| `src/content/services.ts` | All service-page copy, meta titles and descriptions, FAQs and related services |
| `src/content/projects.ts` | Project photos, titles, alt text and service mapping |
| `src/content/cities.ts` | Local service-area pages (`/service-areas/[slug]`): local context, permit pointers, FAQs, nearby links, sources |
| `src/content/areas.ts` | Service-area hub copy |
| `src/app/` | Routes (one folder per page), `sitemap.ts`, `robots.ts`, favicons |
| `src/app/api/estimate/route.ts` | Estimate-form endpoint (validation, spam checks, email delivery) |
| `src/components/` | Header, footer, gallery and lightbox, estimate form, CTA band, etc. |
| `src/lib/` | SEO metadata and JSON-LD builders, form validation shared by client and server, analytics helper |
| `src/app/globals.css` | Design system: tokens at the top, then components |

### Common edits
- **Add a project photo:** drop a JPEG (≤2000px long edge) in `src/assets/projects/`, import it in `src/content/projects.ts` and add an entry. It appears in the gallery, and on its service page when it's mapped to that service.
- **Add verified reviews:** add them to `business.reviews`. The homepage reviews section renders automatically. Only add real reviews, and link each one to its source.
- **Add or improve a city page:** add an entry to `src/content/cities.ts`. The page, sitemap entry, hub card, footer link, service-page links and schema are generated automatically. Only use facts you can cite, and never copy another city's paragraphs. Adding real local projects, photos or reviews is the best upgrade a city page can get.
- **Publish business hours:** set `business.hours` (for example `[{ days: "Monday-Friday", opens: "08:00", closes: "17:00" }]`). They appear in the footer and in the structured data.

## Deployment (Vercel recommended)

1. Import the repository into Vercel (framework preset: Next.js). No build settings need changing.
2. Set the environment variables below for **Production**.
3. Add the custom domain, then set `NEXT_PUBLIC_SITE_URL` to it (e.g. `https://www.example.com`) and redeploy. Canonicals, the sitemap and structured data use it.
4. HTTPS is automatic on Vercel. Security headers (HSTS, nosniff, frame and referrer policy) are set in `next.config.ts`.

Any Node host that runs `next start` also works (Netlify, Render, a VPS). The estimate form needs a server, so a pure static export isn't supported.

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** (production) | Canonical origin, e.g. `https://www.yourdomain.com`. |
| `RESEND_API_KEY` | **Yes**, for the form | API key from [resend.com](https://resend.com). Server-only. |
| `LEAD_TO_EMAIL` | **Yes**, for the form | Where estimate requests go (comma-separate multiple addresses). |
| `LEAD_FROM_EMAIL` | **Yes**, for the form | Sender on a domain verified in Resend, e.g. `Website <estimates@yourdomain.com>`. |
| `NEXT_PUBLIC_GA_ID` | Optional | GA4 measurement ID. When unset, no analytics script loads. The privacy policy adjusts automatically. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional | Google Search Console HTML-tag token. |

Until the three form variables are set, the form validates input but returns a clear "temporarily
unavailable, please call" message. It never shows a fake success.

### Old-URL redirects
The old B12 URLs (`/cement-driveways`, `/pool-deck`, `/intake-form`, etc.) 308-redirect to their new
equivalents (see `next.config.ts`). These only take effect for traffic that reaches the new site, so
point the domain that hosted the old site at this deployment.

### Analytics events
When `NEXT_PUBLIC_GA_ID` (or a GTM `dataLayer`) is present, these events fire:

| Event | When |
|---|---|
| `generate_lead` | Estimate form delivered successfully (server confirmed) |
| `phone_click` | Any `tel:` link |
| `email_click` | Any `mailto:` link |
| `cta_estimate` | Any "Request an Estimate" button (`link_location` says which one) |

In GA4, mark `generate_lead` and `phone_click` as key events.
