# Software Development page: asset map

Blank image policy: every Figma `IMAGE` fill that holds project or photo content becomes an empty, styled container
with the Figma geometry (size, radius, border, background, shadow). No stock photos, mockups, thumbnails or invented
screenshots, and no `<img>` without a real file. Decorative vectors, icons and the hero illustration are rendered.

## Extracted vector assets

Exported from Figma `fillGeometry` / `strokeGeometry` by `scripts/extract-software-art.cjs` into
`public/assets/images/software/figma-*.svg`, original colours preserved.

| File | Node | Used in |
|---|---|---|
| `figma-icon-webhook.svg` | `1038:171` | Hero workflow card icon |
| `figma-icon-shrink-dot.svg` | `1038:345` | Hero "Enterprise Software" card icon |
| `figma-app-zenkit.svg` | `1038:355` | Hero enterprise orbit app icon |
| `figma-app-budget.svg` | `1038:358` | Hero enterprise orbit app icon |
| `figma-app-xing.svg` | `1038:361` | Hero enterprise orbit app icon |
| `figma-app-yoyo.svg` | `1038:364` | Hero enterprise orbit app icon |
| `figma-chart-icon.svg` | `1038:311` | Hero chart card |
| `figma-chart-line.svg` | `1038:325` | Hero chart line (clip-drawn) |
| `figma-chart-tooltip.svg` | `1038:327` | Hero chart tooltip |
| `figma-art-project.svg` | `1038:662` | Build card 1 "Projects" panel |
| `figma-art-members.svg` | `1038:682` | Build card 1 "Members" panel |
| `figma-art-schedule.svg` | `1038:720` | Build card 2 "Schedule" pill |
| `figma-art-hub.svg` | `1038:725` | Build card 2 centre hub |
| `figma-art-check.svg` | `1038:728` | Build card 2 "Completed" pill |
| `figma-art-builder.svg` | `1038:756` | Build card 3 builder chip |
| `figma-art-cloud.svg` | `1038:802` | Build card 4 cloud tile |
| `figma-art-database.svg` | `1038:805` | Build card 4 database tile |
| `figma-art-code.svg` | `1038:813` | Build card 4 code tile |

Rebuilt in HTML/CSS from node geometry (no whole-card SVG export): rings, glows, axis hairlines, orbit dots,
skeleton bars, progress bar (`1038:836`), build-app button (`1038:769`), Ready check circle (`1038:844`, reuses
`figma-art-check.svg`), Talk bars, pause bars, tilted workflow pills, code card text.

## Reused project assets

| Asset | Source | Where |
|---|---|---|
| `web-development/figma-nav-*.svg` | WD export | Hero rail icons (same symbols in both files) |
| `web-development/figma-chip-folder.svg`, `figma-chip-flow.svg` | WD export | Hero prompt chips |
| `web-development/figma-submit-arrow.svg` | WD export | Hero prompt submit |
| `web-development/figma-arrow-small.svg` | WD export | Hero "More" button |
| `web-development/figma-play-circle.svg` | WD export | "View Work" CTA |
| `web-development/figma-compare-arrows.svg` | WD export | Compare handle (`1038:990`) |
| `web-development/figma-arrow-46.svg` | WD export | Work card arrows |
| `logo-icon.png` | site logo | Small logo circles `1038:369` (18×19), `678` (55×56), `766` (34×35), `811` (41×42) |
| Testimonial avatars, brand logos, recognition SVGs | shared testimonial data | Trusted & Featured |
| Header / footer logos | shared partials | Header, footer |

Logo choice: Figma stretches the square full-wordmark raster `b0cb4145…jpg` (1500×1500, mostly whitespace) into
those small circles, which renders as an unreadable smudge. The icon-only mark `logo-icon.png` (221×240) is used
instead at the same box size. This is a deliberate deviation from the file.

## Blank image slots

| Slot | Node | Geometry | Implementation |
|---|---|---|---|
| Featured compare image | `1038:983` | 713.4×441 at local 263.3,60 in a 1240×562 `#f2f2f2` media, r16, shadow 0 7 30 #000/0.2 | `.sw-blank` panel, split by the range divider |

## User-provided images

| Slot | Node | File | Implementation |
|---|---|---|---|
| Work card Cr media | `1038:588` | `software-cr.png` (604×500, from `Downloads\cr.png`) | `<img>` fills the 604×500 media, `object-fit:cover` |
| Work card ReadPlots media | `1038:597/599` | `software-readplots.png` (619×484, from `Downloads\readplots.png`) | The PNG already contains the `#ebeced`-style frame and shadow, so it fills the 604×500 media with `object-fit:cover`; about 9px of white margin is cropped per side |
| Build card members | `1038:691/693/695` | `software-member-1..3.png` (41×41, from `Downloads\Image1..3.png`), left to right | 31×31 circles, r15.5, stroke #fff, shadow 0 2 5 #18224a/0.14, `object-fit:cover` |

## Omitted

| Node | Reason |
|---|---|
| Hero circuit webps `1038:53…` (masks at op 0.1) | Decorative raster at 10% opacity; omitted as on WD. Radial whites kept. |
| `1038:860` connected-device article (portrait `1038:873`, `JPG 2` `1038:871`) | op 0 in Figma |
| `1038:385` testimonial arrows | op 0; the carousel's own controls are used |
| `1038:579` "Start a Project" link | op 0 |

## Unresolved

- Real image for the featured compare slot.
- SF Pro (illustration UI) and Fira Code (code card) are not loaded; Manrope and the system monospace stack are used.
- Gradient orientations are approximated from stops.
