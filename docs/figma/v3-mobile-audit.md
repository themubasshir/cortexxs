# Cortexx V3 mobile Figma audit

Source: `C:\Users\Cyb3r\Downloads\mobile.fig`

## Decode result

- Format: ZIP archive containing `canvas.fig`, `meta.json`, `thumbnail.png`, and 48 image blobs.
- `canvas.fig`: `fig-kiwi`, schema version 106.
- Decoded message: 878 node changes, 650,399 decoded message bytes.
- Root frame: `Cortexx landing page · Mobile`, 390 × 5487.43.
- Actual canvas tree decoded. Layout is not a desktop shrink.

## Section order and geometry

| Section | Figma frame | Size | Position |
|---|---|---:|---:|
| Hero | `Hero` | 390 × 987 | 0, 0 |
| Selected work | `Selected work` | 390 × 1563 | 0, 987 |
| What we do | `What we do` | 390 × 1257 | 0, 2550 |
| Featured case study | `Featured case study` | 390 × 285.07 | 0, 3807 |
| Client proof | `Client proof` | 390 × 801.58 | 0, 4092.1 |
| Footer | `Footer` | 390 × 593.78 | 0, 4893.6 |

## Hero

- Navigation: 350 × 58 at (20, 16).
- Hero copy: 350px wide at x=20, beginning y=106.
- Eyebrow text: `Think · Design · Build`.
- Heading: `We Build Software, Websites, App and AI.`, 334 × 176 at x=28, y=171.
- Description: `Designed around your business. Built to move it forward.`, 334 × 44 at x=28, y=363.
- CTA row begins y=443; buttons are approximately 150px wide and 48px high.
- Product preview: 350 × 246 at (20, 563).
- Social proof at y≈509; trust statement at y=841.
- Trust statement exact copy: `Trusted by 50,000+ businesses for innovative design and growth.`
- Hero uses cropped circuit artwork and a separate 390px mobile composition.

## Selected work

- Section begins at y=987.
- Intro: x=20, y=1019, width 350.
- Eyebrow: `Selected Work`.
- Heading: `Work That Moves Businesses Forward.`, 350 × 72.
- CTA: `Start a Project` at y=1166.
- Project list: x=20, y=1214, width 350, height 1304.
- Four stacked cards, each 350 × 314 with approximately 16px vertical separation.
- Approved order and labels:
  1. Aurora — Mobile App
  2. Wstack — Web Platform
  3. Aurora — SaaS Platform
  4. Voice AI — AI Mobile App
- Card image crop and metadata are vertically composed, not two-column desktop cards.

## What we do

- Section begins at y=2550.
- Decorative circular geometry exists at x=-111, y=2873; it is intentionally clipped by section bounds.
- Heading block x=24, y=2582, width 342.
- Eyebrow: `What we do`.
- Heading: `From Ideas To Impact`.
- Service list x=24, y=2701, width 342, height 1074.
- Four stacked cards:
  1. Software — Systems built to simplify and scale.
  2. Websites — Digital experiences that attract and convert.
  3. Apps — Useful products designed around real users.
  4. AI & Automation — Smarter workflows that save time.
- Card heights: approximately 242, 271, 271, and 242px.
- Card content inset is 24px; no desktop four-column grid at mobile.

## Featured case study

- Section begins at y=3807, height 285.07.
- Main visible frame x=24, y=3839, width 342, height 221.07.
- Three case-study visual layers are present, each approximately 342 × 171.7, offset vertically.
- Mobile only shows compact featured artwork; desktop case-study copy stack is not reused at this position.

## Client proof / Trusted & Featured

- Section begins at y=4092.1, height 801.58.
- Intro x=24, y=4124.1, width 342, height 186.08.
- Eyebrow: `Trusted & Featured`.
- Heading: `Real Partners. Real Results.`
- Carousel controls are in separate 342 × 48 row at y=4262.1.
- Carousel viewport begins y=4342.1. It is 892px wide internally, with three 284 × 261.5 cards at x=24, 328, and 632.
- Viewport clips overflow horizontally, but cards keep full internal geometry.
- Card content is self-contained: logo/header, five-star rating, quote, client name, and role.
- Quote cards use approved copy only:
  - `“Cortexx made our product simple and intuitive”` — Alex Carter — Product Lead, Vortextt.
  - `“Thoughtful design and clear communication”` — Carlos Rivera — Design Director, Velocity.
  - `“A reliable partner from concept to lanuch”` — Jordan MItchell Rivera — Founder, Synergy.
- Recognition frame x=24, y=4635.6, width 342, height 194.
- Recognition label: `Featured and recognized:`. Approved six-logo row remains inside this frame.
- No avatars or identity text may escape card bounds.

## Footer

- Footer begins at y=4893.6, height 593.78.
- Intro x=24, y=4925.6, width 342, height 208.
- Footer artwork and newsletter are mobile-specific.
- Social icons x=24, y=5101.6, 115.2 × 32.
- Navigation x=24, y=5198.6, width 342, height 128.
- Menu column x=24; Contact column x=211.
- Bottom legal row x=24, y=5391.6, width 342, height 67.78.
- Copyright and legal links remain accessible. No fixed overlay is implied by Figma.

## Responsive interpolation

- 390px is authoritative.
- 360px: preserve 20–24px gutters, reduce card widths through normal container sizing, keep carousel card width and clipping intentional.
- 430px: retain 24px section gutters; do not stretch typography to desktop values.
- Tablet: derive two-column work/service layouts only after mobile-to-desktop breakpoint, not by shrinking desktop geometry.
- `overflow-x` must remain hidden only at page boundary; carousel viewport owns intentional clipping.
