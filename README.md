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
| `src/content/blog/` | Blog posts (`posts/*.ts`, one file per post), the post list and helpers (`index.ts`) |
| `src/content/localServices.ts` | City × service landing pages (`/service-areas/[city]/[service]`): local keywords, ledes, trait-based notes, permit filtering |
| `src/app/` | Routes (one folder per page), `sitemap.ts`, `robots.ts`, favicons |
| `src/app/api/estimate/route.ts` | Estimate-form endpoint (validation, spam checks, email delivery) |
| `src/components/` | Header, footer, gallery and lightbox, estimate form, CTA band, etc. |
| `src/lib/` | SEO metadata and JSON-LD builders, form validation shared by client and server, analytics helper |
| `src/app/globals.css` | Design system: tokens at the top, then components |

### Copy style
- **Headings, subheads, card titles, photo titles and buttons use AP-style title case.** Capitalize every word, including both parts of hyphenated words ("Exposed-Aggregate"). Lowercase articles, conjunctions and prepositions of three letters or fewer (a, an, the, and, but, or, for, as, at, by, in, of, on, to, via) unless they are the first or last word or follow a colon. Keep abbreviations as written (MI, BBB, LLC, FAQ). Headings don't end with a period; questions keep their question mark.
- **FAQ questions, body copy and inline text links use sentence case.**
- Hyphenate compound modifiers before a noun ("exposed-aggregate patio", "family-owned business"), but not after it ("family owned").
- Use curly apostrophes and quotes (’ “ ”) in visible text.
- Local service-area pages describe the area served (“We serve homeowners throughout {city} and the rest of {county} County”, via `serviceArea()` in `src/content/localServices.ts`). They don’t mention mileage or distance from New Haven.

### Common edits
- **Add a project photo:** drop a JPEG (≤2000px long edge) in `src/assets/projects/`, import it in `src/content/projects.ts` and add an entry. It appears in the gallery, and on its service page when it's mapped to that service.
- **Add verified reviews:** add them to `business.reviews`. The homepage reviews section renders automatically. Only add real reviews, and link each one to its source.
- **Add or improve a city page:** add an entry to `src/content/cities.ts`. The page, sitemap entry, hub card, footer link, service-page links and schema are generated automatically. Only use facts you can cite, and never copy another city's paragraphs. Adding real local projects, photos or reviews is the best upgrade a city page can get.
- **Add a blog post:** copy a file in `src/content/blog/posts/`, change the slug, service, title, meta and content, then add it to the `posts` list in `src/content/blog/index.ts`. The post page, blog index, sitemap, RSS feed (`/blog/rss.xml`), structured data and the "Read the full guide" links on its service pages are generated automatically. Inline text supports `[link text](/path)` and `**bold**`. Use project ids from `projects.ts` for images. Keep `metaTitle` under about 50 characters (the site name is appended) and `metaDescription` between 140 and 158 characters. Only publish facts you can stand behind: no invented prices, statistics or project stories.
- **Publish business hours:** set `business.hours` (for example `[{ days: "Monday-Friday", opens: "08:00", closes: "17:00" }]`). They appear in the footer and in the structured data.

## Deploying to Netlify (client review)

`netlify.toml` is included. Netlify detects Next.js and applies its Next.js runtime automatically:
the estimate API becomes a Netlify Function, and `next/image` uses the Netlify Image CDN.
A local `netlify build` with `@netlify/plugin-nextjs` 5.16.2 completes cleanly.

1. **Add new site → Import an existing project →** pick this repo and branch (`claude/site-crawlability-check-ytaz72`, or `main` once merged).
2. Leave the build settings as detected (build `npm run build`, publish `.next`, Node 22 via `netlify.toml`).
3. Deploy. The review URL will look like `https://<name>.netlify.app`.

**The review site is hidden from search engines automatically.** While the site runs on a `*.netlify.app` address,
every page sends `noindex, nofollow` (meta tag and `X-Robots-Tag` header) and `robots.txt` blocks all crawlers,
so Google never indexes the review copy. Canonicals, the sitemap and structured data use the Netlify URL
(from Netlify's `URL` / `DEPLOY_PRIME_URL`), so links work while reviewing.

**Going live:** add the client's domain in Netlify, set `NEXT_PUBLIC_SITE_URL=https://www.theirdomain.com`, and
redeploy. Indexing turns on automatically for the real domain. (To keep any deploy private, set `SITE_NOINDEX=true`.)

### Estimate form email (Resend)

Each request is emailed to **Enzosconcretellc@gmail.com**. The visitor sees a confirmation and gets no
automatic reply. Hitting **Reply** in Gmail answers the customer directly, and the email has tap-to-call
and tap-to-text links.

1. Sign up at [resend.com](https://resend.com) **using Enzosconcretellc@gmail.com** (the free plan allows 100 emails/day).
2. In Resend, go to **API Keys → Create API key** with **Sending access** permission, and copy the key (it starts with `re_`).
3. In Netlify, go to **Site configuration → Environment variables → Add a variable**: `RESEND_API_KEY` = the key.
   Scope it to Functions/Runtime and mark it secret.
4. **Deploys → Trigger deploy → Deploy site** (variables apply on the next deploy).
5. Check `https://<site>/api/estimate`. It should show `{"configured":true,...}`.
6. Submit a real test request on `/contact`. It should arrive in the Gmail inbox within a minute. If it's in Spam,
   mark it **Not spam**. Optionally, add a Gmail filter on the subject "New estimate request" with "Never send it to Spam".

That's all launch needs. Until the domain is verified, emails come from Resend's shared test sender
(`onboarding@resend.dev`), which can only deliver to the Resend account's own email. That's why step 1 matters.

**After the domain is live (recommended):** in Resend, add and verify the domain (**Domains → Add domain**, then add
the DNS records it shows). Then set `LEAD_FROM_EMAIL=Enzo's Concrete Website <estimates@theirdomain.com>` and redeploy.
This improves deliverability and lets you add more recipients through `LEAD_TO_EMAIL`.

**If something fails:** the visitor is asked to call, so no lead is silently lost. Netlify's
**Logs → Functions** shows `[estimate] Lead delivered` or the exact Resend error. Resend's **Emails** page shows every
send and its delivery status.

## Deployment (Vercel)

1. Import the repository into Vercel (framework preset: Next.js). No build settings need changing.
2. Set the environment variables below for **Production**.
3. Add the custom domain, then set `NEXT_PUBLIC_SITE_URL` to it (e.g. `https://www.example.com`) and redeploy. Canonicals, the sitemap and structured data use it.
4. HTTPS is automatic on Vercel. Security headers (HSTS, nosniff, frame and referrer policy) are set in `next.config.ts`.

Any Node host that runs `next start` also works (Netlify, Render, a VPS). The estimate form needs a server, so a pure static export isn't supported.

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** (production) | Canonical origin, e.g. `https://www.yourdomain.com`. |
| `RESEND_API_KEY` | **Yes**, for the form | API key from [resend.com](https://resend.com). Server-only. The only setting the form requires. |
| `LEAD_TO_EMAIL` | Optional | Where estimate requests go (comma-separate multiple addresses). Defaults to the email shown on the site. |
| `LEAD_FROM_EMAIL` | Optional | Sender on a domain verified in Resend. Defaults to Resend's test sender (delivers only to the Resend account's email). |
| `NEXT_PUBLIC_GA_ID` | Optional | GA4 measurement ID. When unset, no analytics script loads. The privacy policy adjusts automatically. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional | Google Search Console HTML-tag token. |
| `SITE_NOINDEX` | Optional | `true` forces noindex on any deploy. `*.netlify.app`, `*.vercel.app` and localhost are noindexed automatically. |

Until `RESEND_API_KEY` is set, the form validates input but returns a clear "temporarily
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
| `text_click` | Any `sms:` (text message) link |
| `email_click` | Any `mailto:` link |
| `cta_estimate` | Any "Request a Free Estimate" button (`link_location` says which one) |

In GA4, mark `generate_lead` and `phone_click` as key events.
