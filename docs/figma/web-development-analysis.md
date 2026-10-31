# Web Development page — Figma analysis

Source: `C:\Users\Cyb3r\Downloads\webdevelopment.fig` (Figma desktop export, `fig-kiwi` archive).
Target route: `/services/web-development`.

## Reading workflow

Figma skills discovered under `~/.codex/.tmp/plugins/plugins/figma/skills/` and read before any code:

- `figma-design-to-code/SKILL.md` — workflow requires `get_design_context` from the Figma MCP server.
- `figma-implement-motion/SKILL.md` — requires `get_motion_context` from the Figma MCP server.

No Figma MCP server is connected in this session (`list_mcp_resources` returned no servers or resources), and the
source is a local `.fig` file with no file key or node URL. `get_design_context` / `get_motion_context` therefore could
not be called. The skills' non-MCP rules were still applied:

- Reuse existing project components and tokens before writing new ones (header, footer, footer-reveal, testimonial carousel, `pill-label`, Manrope, `#0d2dce`).
- Render icons from the design's own vector data, never hand-drawn substitutes (icons exported from Figma `strokeGeometry`/`fillGeometry`, see asset map).
- Do not fabricate motion: the `.fig` carries no prototype/motion data, so the hero motion is an authored layer documented below and kept separate from geometry.
- Honor `prefers-reduced-motion`.

Fallback decoder (same as `docs/figma/decoder.md`): unzip archive, read `canvas.fig`, inflate the kiwi schema,
zstd-decompress the message, decode with `kiwi-schema`, rebuild the parent/child tree from `parentIndex`.
Scripts (temporary, not committed): `%TEMP%/opencode/wd/{decode,tree,texts,icons,render}.cjs`.

## Pages in the file

| Canvas | Node | Use |
|---|---|---|
| Page | `1001:2` | Web Development design (implemented) |
| Page 2 | `1027:109` | AI & Automation layout leftover, 1440×6373 — ignored |

## Section hierarchy (canvas `1001:2`, 1440 wide)

| # | Section | Node | y | h | Implementation |
|---|---|---|---|---|---|
| 1 | Hero (incl. header) | `1030:115` | 0 | 900 | Shared header partial + page hero |
| 2 | Featured Transformation | `1030:1187` | 900 | 1069 | Before/after card, images blank |
| 3 | Selected Website Work | `1030:363` | 1969 | 957 | Two cards, images blank |
| 4 | What we do | `1030:1067` | 2926 | 891 | Five-row accordion |
| 5 | How We Do It | `1030:416` | 3817 | 900 | Six-step timeline |
| 6 | Trusted & Featured | `1030:535` | 4777 | 1187 | Homepage testimonial partial |
| 7 | Footer | `1030:1003` | 6084 | 751.7 | Shared footer partial + reveal |

Hidden/zero-opacity nodes intentionally not implemented: hero social proof `1030:189` (HIDDEN), Slingshot logo
`1030:265` (HIDDEN), Featured alt copy `1030:1195` (HIDDEN), "Start a Project" link `1030:370` (op 0), second work
row `1030:397` (HIDDEN), What-we-do right column `1030:1091…1177` (HIDDEN), Process device art `1030:425` (op 0),
Process "View Full Case Study" buttons (HIDDEN).

## Typography

All page copy is Manrope. Headings use `textCase=TITLE` on h2s (rendered Title Case) and character style
overrides for the blue accent.

| Role | Spec | Accent run (fill) |
|---|---|---|
| Hero h1 `1030:179` | ExtraBold 60 / 1.1, −3%, #212121, 500w | "rust & Drive" #4a71fa (applied to "Trust & Drive") |
| Hero sub `1030:180` | Regular 22 / 1.6, #323232, 500w | — |
| Pill | Medium 16 / 22.4, −0.2px, #1d1d1d @0.8, pad 8/14, r999, bg #4a71fa 8%→0 | — |
| Featured h2 `1030:1193` | Bold 56 / 64, 629w, TITLE | "website changes" #4a71fa |
| Work h2 `1030:369` | Bold 56 / 68, 478w, TITLE | "Real work" #4a71fa |
| What we do h2 `1030:1073` | Bold 56 / 64, 629w, TITLE | "every stage" #4a71fa |
| Process h2 `1030:423` | Bold 56 / 68, 568w, TITLE | "strategy" #0d2dce |
| Testimonials h2 `1030:540` | TITLE | "Results." #4a71fa (homepage partial already matches) |
| Right lede | Regular 22 / 1.6, #323232, 470w | — |
| Card title | Bold 32 / 32, #111111 | — |
| Card meta | Medium 16 / 16, #050d17 | — |
| Accordion title | Bold 32 / 30, −0.7px, #111111 (active #0d2dce) | — |
| Accordion body | Regular 20 / 30, −0.2px, #323232, 489w | — |
| Step title | Bold 28 / 28, #111111 | — |
| Step body | Medium 16 / 24, #050d17 | — |

The hero app card uses SF Pro in Figma; it is implemented with the page font stack (Manrope) because SF Pro is not
licensed for web use in this project. Sizes are preserved.

## Hero motion (authored)

The `.fig` file contains no prototype interactions or Smart Animate data, so `get_motion_context` would have nothing
to return even with MCP. Motion is authored on top of the decoded static layout, following the AI page architecture
(`ai-automation.js`) and behavioural cues from Publicis Sapient Slingshot (staged UI assembly, typing prompt, cards
lifting in, then a calm idle loop). No Slingshot branding or artwork is used; the hidden `SlingshotLogo` node is not
rendered and the visible chip uses the Cortexx logo.

Timeline (≈2.4 s entrance, then settled loop):

1. Card shell fades and rises; sidebar slides in from the left; icons stagger.
2. "Welcome" heading and form appear; placeholder types out.
3. Chips and prompt line fade in; Cortexx chip drops in.
4. Three article cards rise in sequence.
5. Talk and Pause controls appear. Settled loop: active sidebar highlight steps through icons, the voice bars pulse,
   and the article cards breathe subtly. Loop pauses offscreen, when the tab is hidden, or via the Pause button.

Reduced motion: final composition rendered immediately, no loop.

## Implementation notes (deviations from the static frame)

- Accordion: Figma only has body copy for the expanded "Conversion Rate Optimization" row. The other four rows got
  short authored supporting lines so every disclosure has content. Replace them with approved copy when it exists.
- Before/after: the 50% split from Figma is the default. A visually hidden range input lets users drag or
  arrow-key the divider. Both panels stay blank.
- The testimonials section reuses `components/testimonials.php` and keeps the homepage pill style (white, bordered),
  which differs slightly from this page's gradient pill.
- The hero card is built in HTML and scaled with container units (`--u = 100cqw / 617`). Below 617px wide the
  card's decorative text scales down with it. The stage is `aria-hidden`; only the Pause button is exposed.

## Responsive intent

Figma provides desktop only. Mobile behaviour follows the AI page and homepage conventions: single column below
1024px, hero card scaled into its own block below the copy, two-up cards collapse to one column, accordion and
timeline stay single column with reduced type.
