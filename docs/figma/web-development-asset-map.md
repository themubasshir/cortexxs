# Web Development page — asset map

Blank image policy: every Figma `IMAGE` fill on this page becomes an empty, styled placeholder container with the
Figma geometry (size/aspect ratio, radius, border, background). No stock photos, mockups or invented screenshots.
The only raster images on the page come from shared, already-approved components (header logo, testimonial partial,
footer).

## Extracted vector assets

Exported from Figma `fillGeometry` / `strokeGeometry` (outlined strokes) into
`public/assets/images/web-development/figma-*.svg`, original colours preserved.

| File | Node | Size | Used in |
|---|---|---|---|
| `figma-nav-home.svg` | `1030:225` | 15.5 | Hero card sidebar (active) |
| `figma-nav-cashier.svg` | `1030:229` | 15.5 | Hero card sidebar |
| `figma-nav-flow.svg` | `1030:236` | 15.5 | Hero card sidebar |
| `figma-nav-work.svg` | `1030:241` | 15.5 | Hero card sidebar |
| `figma-nav-repair.svg` | `1030:246` | 15.5 | Hero card sidebar |
| `figma-nav-settings.svg` | `1030:252` | 15.5 | Hero card sidebar |
| `figma-nav-help.svg` | `1030:256` | 15.5 | Hero card sidebar |
| `figma-nav-logout.svg` | `1030:260` | 15.5 | Hero card sidebar |
| `figma-card-tv.svg` | `1030:321` | 20.3 | Article "Software Transformation" |
| `figma-card-gitbook.svg` | `1030:334` | 20.3 | Article "Prompt Center" |
| `figma-card-game.svg` | `1030:346` | 20.3 | Article "Platform" |
| `figma-arrow-small.svg` | `1030:331` | 9.7 | Article "More" buttons |
| `figma-submit-arrow.svg` | `1030:310` | 13.2 | Form submit button |
| `figma-chip-folder.svg` | `1030:291` | 10.3 | "Project: Medium" chip |
| `figma-chip-flow.svg` | `1030:297` | 10.3 | "Workflow: select" chip |
| `figma-play-circle.svg` | `1030:186` | 16 | "View Work" button |
| `figma-compare-arrows.svg` | `1030:1206` | 25 | Before/after divider handle |
| `figma-arrow-46.svg` | `1030:384` | 46 | Work card arrows |
| `figma-svc-app-window.svg` | `1030:1082` | 30 | Accordion: Website Design |
| `figma-svc-api.svg` | `1030:1102` | 30 | Accordion: Web Development |
| `figma-svc-percent.svg` | `1030:1124` | 30 | Accordion: Conversion Rate |
| `figma-svc-ai-expand.svg` | `1030:1146` | 30 | Accordion: SEO and AI Search |
| `figma-svc-robotic.svg` | `1030:1165` | 30 | Accordion: AI and Automation |

Small primitives rebuilt as CSS/HTML from node geometry (no vector paths in file): voice bars (`1030:216…220`,
1.7px bars), mic glyph in voice-prompt button (`1030:307`, stroked frames), pause bars (`1030:361/362`), chip
chevrons (`1030:295/303`, rotated stroked squares).

## Reused project assets

| Asset | Source | Where |
|---|---|---|
| `logo-dark.png` | header partial | Header + Cortexx chip in hero card (Figma `JPG 2` `1030:318`, which is the Cortexx logo raster) |
| Testimonial photos, brand and recognition SVGs | homepage partial | Trusted & Featured section |
| Footer logos | footer partial | Footer |

## Blank image regions

| Region | Node | Geometry | Placeholder |
|---|---|---|---|
| Featured "Before" | `1030:1202` | 520×550, drop shadow 0 7 30 #000@0.2 | `.wd-blank` panel |
| Featured "After" | `1030:1203` | 520×550 | `.wd-blank` panel |
| Featured image field | `1030:1199` | 1240×562, r16, fallback fill #f2f2f2 | card media bg #f2f2f2 |
| Work "Nexora" | `1030:379` | 604×500, r16 16 0 0 | `.wd-blank` |
| Work "Haven" | `1030:389` | 604×500, r16 16 0 0 | `.wd-blank` |
| Hero circuit masks | `1030:119/122/126/133/136/140/143` | 600×549 @10% opacity | omitted (decorative, at 10% opacity; gradients kept) |
| Hero/Process connected-device art | `1030:425` | op 0 | not rendered |
| Hero social avatars | `1030:191…195` | HIDDEN | not rendered |

## Unresolved

- `Button icon` instances in the accordion (`1030:1090`, `…1109`, `…1131`, `…1152`, `…1176`) reference a symbol that is
  not present in this file. Figma renders an empty 40px circle; the implementation keeps the empty circle and adds a
  CSS-only state indicator (rotating hairline plus) so the control is understandable. This is the one intentional
  addition and is marked in the code.
- SF Pro (hero card) replaced by Manrope.
- Gradient transforms (angle/handle positions) are approximated; the decoder exposes stops but the renderer
  approximates orientation.
