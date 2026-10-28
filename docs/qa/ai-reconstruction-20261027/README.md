# AI & Automation Figma reconstruction QA

Source: `C:\Users\Cyb3r\Downloads\ai automation.fig` (fig-kiwi archive, 1440 × 6373 desktop canvas). References were rendered at 1440px from decoded nodes and glyph outlines. The renderer preserves node geometry, vector paths and embedded image data. Figma gradient transforms, effects, image crop modes and unresolved component instances remain approximate, so the references are not official Figma exports.

## Section comparisons

Each `compare-*.png` is a native-scale, side-by-side crop: decoded reference on the left and browser render on the right. The page was loaded in a fresh Playwright browser context at `http://localhost/cortexx/services/ai-automation` with reduced motion for stable visual comparison.

| Section | Figma frame | Browser section | Corrections and remaining differences |
| --- | --- | --- | --- |
| Header + hero | y 0–900; copy x100 w500; workflow art x708 y142 w632 h702 | y 0–900 | Replaced generic gradient card, floating boxes and dashed links with extracted source circle, tool rail, canvas, cards, ports and connectors. Hero headline remains live Manrope CSS, with minor glyph and button styling differences. Shared homepage header deliberately differs from the Figma header. |
| Business challenges | y 900–1652; left x100 w521, right x753 w588 | y 900–1696 | Restored three-line title, bottom-aligned description, four source vector icons and row geometry. The action arrow is an unexpanded Figma instance and uses a live glyph. Browser copy weight and spacing still differ slightly. |
| What We Build | y 1652–2983; 2 cards at y1952, 3 at y2441 | y 1696–3069 | Replaced all five generic circle illustrations with their decoded vector groups at source frame sizes (603×309 and 392×309). Card text is live CSS and differs slightly in wrapping and weight. |
| How We Build | y 2983–3881 | y 3069–4017 | Removed the large process graphic because its Figma node is hidden. Reworked the six-step timeline with active first indicator and hollow later indicators. Timeline circles and connector are CSS approximations of the source. |
| Case study | y 3881–4680; image x720 y4172 w620 h448 | y 4017–4858 | Retained the original extracted case image, integrated text and image in one card, and used the source dark CTA treatment. Text wrap and internal spacing remain slightly different. The CTA stays disabled because no case-study destination exists. |
| Testimonials + recognition | y 4680–5621; three 400×353 cards | y 4858–5801 | Corrected avatar mapping, card typography and spacing. Approved existing company and recognition SVGs are used because the six recognition tiles are unexpanded Figma component instances. Their appearance cannot be proven from the decoded reference crop. |
| Footer | y 5621–6373 | y 5801–6553 | Uses the unchanged shared homepage footer partial and CSS. This is intentionally different from the Figma footer. Homepage and AI footer screenshots show the same appearance, apart from a one-pixel capture rounding difference at 1440px. |

Frame boundaries are listed for orientation only; total page height was not used as an acceptance metric. The later browser sections start lower because content uses natural height rather than fixed heights or compensating space.

## Original versus approximated artwork

- **Extracted source vectors:** hero composition, five service card diagrams, and four challenge icons. `scripts/render-ai-figma.cjs` decodes the original archive; `scripts/extract-ai-art.cjs` isolates the visible groups into SVG assets.
- **Original raster assets already in the project:** case-study image and testimonial portraits.
- **Approved existing SVG assets:** Vortex, Velocity, Synergy, OYO, FedEx, Amazon, OLA, Microsoft, Walmart.
- **Live CSS / remaining approximations:** section text rendering, process timeline strokes and circles, challenge action glyph, small shadows and gradient transforms. Figma INSTANCE contents for recognition tiles and challenge action icons are not available in the decoded node tree.

## Browser and regression evidence

`tests/ai-section-compare.cjs` captures all seven section pairs. `tests/ai-automation-qa.cjs` records initial, mid, settled and reduced-motion hero states; checks visible artwork, stable height, no CTA overlap, offscreen pause, no overflow, image loading, navigation, testimonial, footer and newsletter behavior; and covers 360, 390, 430, 768, 1280 and 1440px. Its result is in `../ai-automation-20261027/report.json`. The homepage mobile scroll and single-preview suites cover repeated wheel gestures, four activations, and unchanged document height.

No recording was captured. The screenshot states and browser instrumentation provide the animation evidence.
