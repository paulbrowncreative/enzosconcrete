# Asset manifest: B12 site → new site

Source: every image referenced by every page in the old site's sitemap (12 URLs), crawled 2026-10-14.
B12 served each project photo twice: a `hero_image` (larger) and a `regular_image` (smaller) copy. The
larger copy was used as the master in every case. Masters live in `src/assets/projects/` (max 2000px,
JPEG q84). Next.js generates AVIF/WebP at responsive widths at request time.

CDN prefix for all rows: `https://cdn.b12.io/client_media/OFRVnD8t/`

## Project photos (8 unique, all migrated)

| # | Original (hero / regular copy) | Local file | Category | Service | Used on | Status |
|---|---|---|---|---|---|---|
| 1 | `d8abc1a4-…-jpeg-hero_image.jpeg` / `d8f673a2-…-regular_image.jpeg` | `exposed-aggregate-patio-curved-edge.jpg` | Project | Concrete patios | Home hero, Patios, About, Our Work, OG image | ✅ Migrated |
| 2 | `bbac953f-…-jpeg-hero_image.jpeg` / `bbd19991-…-regular_image.jpeg` | `concrete-driveway-new-pour-washdown.jpg` | Project | Concrete driveways | Home, Driveways, Our Work | ✅ Migrated |
| 3 | `98fe2d10-…-jpeg-hero_image.jpeg` / `9939052e-…-regular_image.jpeg` | `exposed-aggregate-walkway-curved-garden.jpg` | Project | Walkways | Home, Walkways, Our Work | ✅ Migrated |
| 4 | `bf2513a3-…-jpeg-hero_image.jpeg` / `bf54c56b-…-regular_image.jpeg` | `exposed-aggregate-garden-wall.jpg` | Project | Retaining walls | Home, Retaining Walls, Our Work | ✅ Migrated |
| 5 | `cc2a253b-…-jpeg-hero_image.jpeg` / `cc5d5f97-…-regular_image.jpeg` | `driveway-expansion-broom-finish.jpg` | Project | Driveway expansions | Home, Expansions, Our Work | ✅ Migrated |
| 6 | `77ad4da7-…-jpeg-hero_image.jpeg` (no regular copy) | `exposed-aggregate-side-walkway-step.jpg` | Project | Walkways | Home, About, Our Work | ✅ Migrated |
| 7 | `127517cd-…-jpeg-hero_image.jpeg` / `127efc76-…-regular_image.jpeg` (identical files) | `concrete-pool-deck.jpg` | Project | Pool decks | Home, Pool Decks, Our Work | ✅ Migrated (source is 900×1599, the largest available) |
| 8 | `6c66af02-…-jpeg-hero_image.jpeg` (no regular copy) | `exposed-aggregate-front-walk-border.jpg` | Project | Walkways | Home ("Why"), Our Work | ✅ Migrated, **cropped**: the top 270px showed a customer's house number, removed for the homeowner's privacy |

Alt text for each photo is in `src/content/projects.ts`. It describes only what's visible in the photo.

## Brand and other graphics

| Original | Disposition |
|---|---|
| `16788dd2-…-png-regular_image.png` (logo, white on black, 1024²) | ✅ Migrated. Converted to transparent `src/assets/brand/logo-light.png` / `logo-dark.png`, mark-only `mark-light.png`, `public/logo.png` (schema), `src/app/icon.png` + `apple-icon.png` (favicons), and used in `public/og-image.jpg`. |
| `59a4d443-…-png-regular_image.png` ("Get a Quote from BBB Accredited Business" badge) | ⚠️ Not reused as an image. BBB seals should come from BBB's official dynamic seal code (accredited business portal). Replaced with a text link to the verified BBB profile. |
| `0b9d0d5e-…-jpg-regular_image.jpeg` ("Top Rated Contractor" trophy graphic) | ❌ Intentionally not migrated. It's a generic stock/AI graphic that implies an award we couldn't verify. |
| `d62e38eb-…-jpg-hero_image.jpeg` (plain wall texture, privacy page header) | ❌ Not migrated. Decorative stock texture, not a project. |
| `https://cdn.b12.io/media/e5299dba-…-jpg-hero_image.jpeg` (NYC skyline) | ❌ Not migrated. B12 template stock image unrelated to the business. |

No image was inaccessible: all 19 referenced files downloaded successfully (HTTP 200).
