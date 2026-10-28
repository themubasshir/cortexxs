# AI & Automation repair QA — 28 October 2026

## Root cause and repair

The previous hero rendered its Figma vector as an external `<img>`. Its five workflow groups and connectors were therefore inaccessible to page CSS and JavaScript. The only settled animation moved the whole image by about 2px and slightly changed its brightness. Headful Chrome captures at 6 and 12 seconds were visually identical. See `before/report.json` and `before/hero-*.png`.

The page now embeds the extracted Figma SVG, preserving the original card shapes, positions, labels, and connector paths. Page-scoped CSS staggers the five nodes, reveals the four original connectors, moves small signals through the paths, highlights completion, then runs a restrained loop. The JavaScript switches to the settled state after the entrance completes. See `after/report.json`, `after/sequence.png`, and `after/hero-*.png` for 0, 0.5, 1.5, 3, 6, and 12 second browser captures.

`controls/report.json` records a working pause/play button, offscreen stop and return, reduced-motion static state with all five nodes visible, no horizontal overflow, unchanged document height, and no browser errors. The old externally rendered image is no longer used in the hero. The runtime signal dots and curved route are added SVG shapes; the workflow cards and original connectors are extracted Figma artwork.

## Typography and section review

The renderer now respects Figma per-character style overrides. The browser uses blue on **Systems**, **Understand**, and **More Room**; the process heading has no blue span. The requested testimonial phrase **Proven In Practice.** is entirely blue. The decoded source itself marks only “Proven” blue, so that phrase intentionally follows the explicit repair brief.

At 1440px, `../ai-reconstruction-20261027/` contains native-scale `figma-*`, `current-*`, `compare-*`, `overlay-*`, and `difference-*` images for hero, challenges, capabilities, process, case, testimonials, recognition, and footer. No source or browser section was rescaled; the script pads differences in section height. `comparison-metrics.json` records dimensions. The comparison was inspected section by section:

| Section | Corrected | Remaining visible difference |
| --- | --- | --- |
| Hero | Blue word, headline and CTA positions, original workflow SVG, visible staged motion | Shared approved homepage header differs from the Figma header; its markup and CSS were left unchanged. |
| Challenges | Blue “Understand”, extracted row icons, column and divider alignment | Arrow icons come from a decoded component instance and are still approximated; body line breaks differ slightly. |
| What We Build | Five original vector illustrations, two-over-three card layout, softer card surfaces | Lower card title and body wrapping differ from the decoded render. Some thin blue strokes belong to the extracted Figma artwork. |
| Process | Original six-step layout, active circle and connector styling, neutral heading | Paragraph line breaks and small text/circle details vary slightly. |
| Case study | One rounded text/image container, approved image, integrated shadow | Decoded reference has subtler card separation; small text spacing and arrow differ. The CTA is intentionally disabled because no full case page exists. |
| Testimonials | Avatars, logos, stars, card arrangement and requested blue phrase | Figma style data colors only “Proven”; exact type metrics and some internal spacing differ. |
| Recognition | Six approved SVG logo tiles in the browser | Source `.fig` contains unexpanded component instances; the decoder cannot render their original logos for a direct logo-by-logo comparison. |
| Footer | Existing shared homepage partial | The decoded Figma footer is not the authority for this shared component. |

The section height differences are natural content and spacing results, not compensation to force a page total: challenges +44px, capabilities +42px, process +50px, case +42px, testimonials +2px against decoded section crops. No fixed heights were added to match overall page length.

## Functional checks

- `tests/ai-automation-qa.cjs`: HTTP 200, final route/title/heading, SVG and asset loads, six responsive widths, no overflow, no hero/CTA overlap, stable height, homepage navigation/service links/carousel/footer/newsletter/mobile menu and no console errors.
- `tests/ai-animation-audit.cjs after`: visible six-state headful Chrome sequence, stable 6553px document height at every sample, no console errors.
- `tests/ai-animation-controls.cjs`: pause, resume, offscreen stop/return, reduced-motion complete composition, stable height and no overflow.
- `tests/ai-section-compare.cjs`: all eight native-scale comparison sets generated with HTTP 200 and no console errors.
- `tests/ai-fidelity-qa.cjs`: no broken images, no overflow at 390 or 1440, no browser errors. Its screenshot-hash comparison of shared header/footer is sensitive to page backdrop and animation state; both pages still include the same partials and shared CSS.
- `tests/mobile-single-preview-qa.cjs`: 360, 390, 430 in normal and reduced motion; one active preview, all four links, no overflow or negative scroll deltas.
- `tests/mobile-scroll-qa.cjs`: see its report for long-scroll results.
- `tests/selfcheck.php`: all checks pass.

Screenshots: `../ai-automation-20261027/full-page-1440.png`, `full-page-390.png`, `hero-*.png`, and the section comparison files above. No video was made; the timestamped headful Chrome sequence provides the required movement evidence.
