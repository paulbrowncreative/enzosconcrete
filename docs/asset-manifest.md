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

## Facebook project photos (52 migrated)

Source: five screenshots of the Enzo’s Concrete Facebook photo grid supplied by the owner (2026-10-14),
150 tiles in total. Tiles were sliced automatically along the grid gutters, trimmed to remove the rounded
corners, and upscaled 4× with the EDSR super-resolution model (OpenCV `dnn_superres`), then lightly
sharpened and saved at ≤1200px in `src/assets/projects/fb/`. Tile IDs below are `screenshot-rowcolumn`.

**Quality note:** the source tiles are only ~318px, so super-resolution makes them sharper than a plain
resize but cannot recover real detail. They look fine at gallery size but are softer than the original
website photos. **Replacing them with the full-size originals from Facebook (or the phone camera roll)
is recommended**; keep the same filenames and nothing else needs to change.

| Tile | Local file | Category | Title |
|---|---|---|---|
| 1-46 | `fb/driveway-two-car-garage.jpg` | Driveways | Driveway at a two-car garage |
| 1-44 | `fb/driveway-apron-garage.jpg` | Driveways | Driveway pour at the garage |
| 1-22 | `fb/long-driveway-detached-garage.jpg` | Driveways | Long driveway to a detached garage |
| 1-24 | `fb/driveway-slab-caution-tape.jpg` | Driveways | Fresh driveway slab |
| 1-45 | `fb/driveway-pour-caution-tape.jpg` | Driveways | Driveway replacement |
| 3-43 | `fb/side-driveway-tan-house.jpg` | Driveways | Side driveway along the house |
| 5-23 | `fb/long-driveway-single-story.jpg` | Driveways | Long driveway, finished |
| 5-22 | `fb/driveway-wide-view-cones.jpg` | Driveways | Driveway pour, wide view |
| 3-44 | `fb/parking-pad-beside-house.jpg` | Driveway expansions | Parking pad beside the house |
| 3-42 | `fb/new-section-tied-into-existing.jpg` | Driveway expansions | New section tied into existing concrete |
| 1-35 | `fb/curved-patio-matching-step.jpg` | Patios | Curved patio with matching step |
| 1-34 | `fb/exposed-aggregate-patio-two-story.jpg` | Patios | Patio across the back of the home |
| 5-13 | `fb/stamped-patio-fire-pit.jpg` | Patios | Stamped patio with fire-pit inset |
| 4-52 | `fb/stamped-patio-wide-view.jpg` | Patios | Stamped patio, wide view |
| 4-51 | `fb/curved-patio-planter-in-progress.jpg` | Patios | Curved patio around a planter |
| 5-11 | `fb/circular-planter-cutout.jpg` | Patios | Circular planter cut-out |
| 2-15 | `fb/large-backyard-patio.jpg` | Patios | Large backyard patio |
| 2-16 | `fb/rinsing-new-patio.jpg` | Patios | Rinsing a new patio |
| 2-22 | `fb/patio-edge-control-joints.jpg` | Patios | Patio edge detail |
| 3-41 | `fb/patio-trowelled-border.jpg` | Patios | Patio with a trowelled border |
| 3-54 | `fb/slab-white-sided-house.jpg` | Patios | Patio slab beside the house |
| 4-26 | `fb/backyard-patio-control-joints.jpg` | Patios | Backyard patio |
| 4-22 | `fb/bull-floating-patio.jpg` | Patios | Finishing a fresh pour |
| 4-21 | `fb/edging-patio-pour.jpg` | Patios | Edging a patio pour |
| 5-35 | `fb/patio-pour-brick-ranch.jpg` | Patios | Patio pour behind a brick ranch |
| 5-44 | `fb/finished-patio-brick-ranch.jpg` | Patios | Finished patio at the back door |
| 5-41 | `fb/hosing-patio-brick-ranch.jpg` | Patios | Curing a new patio |
| 4-15 | `fb/covered-porch-slab.jpg` | Patios | Covered porch slab |
| 2-12 | `fb/pool-deck-kidney-pool.jpg` | Pool decks | Pool deck surround |
| 2-11 | `fb/pool-deck-walkway.jpg` | Pool decks | Walkway to the pool deck |
| 1-11 | `fb/front-steps-brick-porch.jpg` | Walkways & steps | Front steps replacement |
| 3-12 | `fb/rebuilt-porch-steps.jpg` | Walkways & steps | Rebuilt porch steps |
| 3-31 | `fb/porch-steps-front-walk.jpg` | Walkways & steps | Porch steps and front walk |
| 3-26 | `fb/porch-steps-side-view.jpg` | Walkways & steps | Porch steps, side view |
| 2-42 | `fb/steps-along-brick-home.jpg` | Walkways & steps | Steps along a brick home |
| 3-23 | `fb/stepped-walkway-slope.jpg` | Walkways & steps | Stepped walkway down a slope |
| 1-41 | `fb/side-steps-and-landing.jpg` | Walkways & steps | Side-yard steps and landing |
| 1-42 | `fb/long-side-walkway.jpg` | Walkways & steps | Long side-yard walkway |
| 1-32 | `fb/aggregate-side-walk-border.jpg` | Walkways & steps | Side walk with contrasting border |
| 1-31 | `fb/aggregate-walkway-new-build.jpg` | Walkways & steps | Side walkway at a new build |
| 2-46 | `fb/front-walk-aggregate-borders.jpg` | Walkways & steps | Front walk with aggregate borders |
| 3-21 | `fb/walkway-border-detail.jpg` | Walkways & steps | Walkway border detail |
| 3-36 | `fb/curved-garden-sidewalk.jpg` | Walkways & steps | Curved garden sidewalk |
| 2-52 | `fb/walk-along-brick-wall.jpg` | Walkways & steps | Walk along a brick wall |
| 5-56 | `fb/aggregate-front-walk-lawn.jpg` | Walkways & steps | Exposed-aggregate front walk |
| 5-55 | `fb/back-door-walk-curved-landing.jpg` | Walkways & steps | Back-door walk with curved landing |
| 2-24 | `fb/pole-barn-floor-finishing.jpg` | Slabs & floors | Pole barn floor |
| 2-31 | `fb/pole-barn-floor-wide.jpg` | Slabs & floors | Pole barn floor, wide view |
| 2-36 | `fb/pole-barn-floor-smooth.jpg` | Slabs & floors | Smooth barn floor |
| 2-25 | `fb/pole-barn-porch-slab.jpg` | Slabs & floors | Pole barn porch slab |
| 2-43 | `fb/shed-pad-backyard.jpg` | Slabs & floors | Shed pad |
| 2-44 | `fb/shed-pad-landscaped-yard.jpg` | Slabs & floors | Shed pad in a landscaped yard |

### Tiles intentionally not used (98)
- **Duplicates or near-duplicates:** repeated shots of the same project from the same angle (e.g. several frames of the same pool deck, patio, driveway or barn floor), plus tiles that show projects already on the site from the original B12 photos (curved patio 1-13/1-36, pool 1-55/2-13, side walkway 4-41/4-55/5-25, garden wall 5-12, driveway wash-down 5-24).
- **Logo tiles:** 4-43, 5-34 (the logo is already in the site).
- **Close-up texture shots and partial frames:** e.g. 1-15, 2-33, 3-14, 4-33, 4-44, 5-14, 5-32, and frames with the photographer's shadow covering the work (4-31, 4-53, 5-15).
- **A young child:** 3-33, 3-34, 3-35 (sidewalk finishing). Not published, for the child's privacy.
- **Dump truck:** 3-32. It shows another business's signage and a USDOT number, and isn't a finished project.
- **In-progress forms with no finished result:** e.g. 2-53, 3-11, 2-56, 4-36.

### Category: pole barn floors and slabs
These six photos now belong to the **Pole Barn Floors & Concrete Slabs** service page (`/services/concrete-slabs`), added at the owner's request on 2026-10-16.

## Facebook project photos, batch 2 (15 migrated)

Source: a sixth screenshot of the Facebook photo grid (29 tiles), processed the same way (FSRCNN 4×
super-resolution, ≤1200px).

| Tile | Local file | Category | Title |
|---|---|---|---|
| 6-11 | `fb/aggregate-slab-brick-home.jpg` | Patios | Exposed-aggregate slab behind a brick home |
| 6-14 | `fb/stamped-patio-fire-pit-corner.jpg` | Patios | Stamped patio, fire-pit corner |
| 6-44 | `fb/stamped-patio-sealed-wide.jpg` | Patios | Colored stamped patio |
| 6-12 | `fb/aggregate-front-walk-porch-step.jpg` | Walkways & steps | Exposed-aggregate front walk and step |
| 6-23 | `fb/aggregate-side-walk-brick.jpg` | Walkways & steps | Side walkway along a brick home |
| 6-24 | `fb/aggregate-walk-beside-sidewalk.jpg` | Walkways & steps | Walkway beside the public sidewalk |
| 6-25 | `fb/aggregate-walk-hostas.jpg` | Walkways & steps | Front walk through the hostas |
| 6-21 | `fb/pressure-washing-driveway.jpg` | Cleaning & sealing | Pressure washing a driveway |
| 6-32 | `fb/pressure-washing-patio.jpg` | Cleaning & sealing | Pressure washing a patio |
| 6-36 | `fb/washing-driveway-garage.jpg` | Cleaning & sealing | Cleaning a driveway at the garage |
| 6-35 | `fb/cleaned-patio-wet.jpg` | Cleaning & sealing | Freshly cleaned slab |
| 6-41 | `fb/sealed-stamped-patio.jpg` | Cleaning & sealing | Sealed stamped patio |
| 6-43 | `fb/sealed-stamped-patio-lawn.jpg` | Cleaning & sealing | Sealed stamped patio edge |
| 6-52 | `fb/sealing-aggregate-roller.jpg` | Cleaning & sealing | Sealing exposed aggregate |
| 6-55 | `fb/sealing-aggregate-new-home.jpg` | Cleaning & sealing | Sealing a new exposed-aggregate patio |

**Not used (14):** close-up texture shots (6-13, 6-53, 6-54), near-duplicates of photos already on the site
(stamped patio 6-15/6-16, curved patio in progress 6-45, side walkway 6-51, walkway 6-26/6-31, sealed patio
6-42), close-ups of the pressure-washer spray (6-22, 6-33, 6-34), and the "Decorative concrete sealing
BEFORE/AFTER" graphic (6-46). That graphic has overlaid text and may be a stock marketing image; if it shows
your own job, send the original and it can be added.

### Category: cleaning and sealing
These photos now belong to the **Concrete Cleaning & Sealing** service page (`/services/concrete-sealing`), added at the owner's request on 2026-10-16.
