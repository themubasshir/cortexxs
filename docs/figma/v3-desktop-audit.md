# Cortexx V3 desktop Figma audit

Source: `C:\Users\Cyb3r\Downloads\Untitled (4).fig`

## Decode result

- Format: ZIP archive containing `canvas.fig`, `meta.json`, `thumbnail.png`, and 48 image blobs.
- `canvas.fig`: `fig-kiwi`, schema version 106.
- Decoded message: 907 node changes, 661,860 decoded message bytes.
- Root frame: `Landing Page(Updated)`, 1440 × 5568.
- Root page structure recovered from actual canvas data, not thumbnail.
- `meta.json` render canvas: 1440 × 5568.

## Section order and geometry

| Section | Figma frame | Size | Position |
|---|---|---:|---:|
| Hero | `Hero` | 1440 × 952 | 0, 0 |
| Selected Work | `Frame 2147261697` | 1240 × 1301 | 100, 1012 |
| What we do | `Frame 2147261746` | 1241 × 515 | 100, 2413 |
| Case studies | `Frame 2147261747` | 1233 × 797 | 103, 3028 |
| Trusted & Featured | `Frame 2147261744` | 1240 × 791 | 100, 3925 |
| Footer | `Footer` | 1440 × 751.68 | 0, 4816 |

## Hero

- Header: 1000 × 72 at (220, 24), rounded 20px.
- Header logo: 126 × 38 at (240, 41).
- Navigation starts at x=465; links use Manrope Regular 18px.
- Hero content frame: 1240 × 508 at (100, 196).
- Copy column: 550px wide.
- Eyebrow: `Think · Design · Build`, 196 × 39.
- Heading: `We Build Software, Websites, App and AI.`, Manrope ExtraBold 60px, line-height 1.1.
- Description: `Designed around your business Built to move it forward.`, 22px, line-height 1.58.
- CTAs: 170 × 48 and 183 × 48.
- Product preview: 675 × 508 at (665, 196), using image hash `b0cb4145a717c3e25af7c303`.
- Social proof: 42px avatars, `+1k`, five orange stars, `Trusted by 10k+ clients`.
- Trust strip begins at y=784.3, height 116.4.
- Trust statement exact copy: `Trusted by 50,000+ businesses for innovative design and growth.`
- Trust logos: six 151.2 × 50.4 slots, horizontal separators.

## Selected Work

- Section frame: 1240 × 1301 at (100, 1012).
- Intro row: 1240 × 191.
- Eyebrow: `Selected Work`.
- Heading: `Work that moves businesses forward.`, 568 × 136.
- CTA: `Start a Project`.
- Project grid: two columns, four cards, each visual approximately 596 × 419 with 28px horizontal/vertical gap.
- Approved project copy: Aurora / Mobile App; Wstack / Web Platform; Aurora / Saas Platform; Voice AI / AI Mobile App.

## What we do

- Section frame: 1241 × 515 at (100, 2413).
- Intro row: 1241 × 183.
- Eyebrow: `What we do`.
- Heading: `From ideas to impact`.
- CTA: `Start a Project`.
- Service row: three 291px cards at x=415, 729, 1043.
- Desktop card labels: `Websites`, `Apps`, `AI & Automation`.
- Card copy is recovered from node text and must not be replaced with invented copy.

## Case studies

- Section frame: 1233 × 797 at (103, 3028).
- Three overlapping/stacked case-study frames are present at y=3028, 3117, and 3206.
- Each case card geometry: approximately 1233 × 619.
- Main content column begins around x=143 and is 550px wide.
- Visual column begins around x=632 and is approximately 829 × 524.
- Approved copy includes `NextWrold`, `A clearer SaaS platform for better decisions`, `UX/UX - Web Development`, and metrics `+38% Conversion`, `-32% Task Time`, `+46% Engagement`.
- Stack must preserve approved artwork and card order. Do not use arbitrary negative offsets for content.

## Trusted & Featured

- Section frame: 1240 × 791 at (100, 3925).
- Heading row: 1240 × 183.
- Eyebrow at y=3925; heading at y=3980.
- Controls at right, not over eyebrow.
- Carousel viewport: 1240 × 568 at (100, 4148).
- Visible cards are three self-contained 400 × 353 cards at x=100, 520, 940.
- Card inner content inset: 24px.
- Header: 78px avatar/logo row.
- Testimonial body starts around y=4286; stars 24px slots; quote uses 22px typography and 32px line-height.
- Bottom identity row contains client name and role. It remains inside card boundary.
- Approved cards:
  - Vortex — `“Cortexx made our product simple and intuitive”` — Alex Carter — Product Lead, Vortextt.
  - Velocity — `“Thoughtful design and clear communication”` — Carlos Rivera — Design Director, Velocity.
  - Synergy — `“A reliable partner from concept to lanuch”` — Jordan MItchell Rivera — Founder, Synergy.
- Recognition row starts at y=4544. Heading: `Featured and recognized:`. Six approved logos: OYO, FedEx, Amazon, OLA, Microsoft, Walmart.

## Footer

- Footer starts at y=4816, height 751.68, dark fill `#020612`.
- Content uses 1280px width at x=80.
- Newsletter block: 390px wide. Copy exact: `Automate the busywork and give your business more room to grow.`
- Form geometry: 380 × 48; input 255px and CTA 125px.
- Desktop columns: Menu and Contact. Contact includes approved email, phone, and address from Figma.
- Footer artwork/reveal: 1280 × 482 artwork region at x=80, approximately y=4921.
- Bottom legal row at y≈5476: copyright, Privacy Policy, Terms & Conditions.

## Typography and color observations

- Font: Manrope.
- Primary ink: `#1D1D1D` / `#212121`.
- Primary blue: `#0D2DCE`; secondary blue `#4A71FA`.
- Footer: `#020612`.
- Light testimonial card fill: `#F2F2F2`; border: `#E9E5FA`.
- Orange rating stars: `#FDA328`.
- Desktop root uses 100px side margins and 1240px content width. Existing 24px-only container behavior is not authoritative at 1440px.
