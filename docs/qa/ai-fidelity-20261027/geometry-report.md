# AI & Automation Figma fidelity QA — 27 October 2026

Source: decoded `C:\Users\Cyb3r\Downloads\ai automation.fig`, page frame 1440 × 6373. Browser: fresh headless Chrome context through Playwright at `http://localhost/cortexx/services/ai-automation`. The Figma thumbnail was used for visual context; no separate high-resolution target screenshot was supplied.

| Section | Figma top / height | Rendered top / height | Difference |
|---|---:|---:|---:|
| Hero | 0 / 900 | 0 / 900 | 0 / 0 |
| Challenges | 900 / 752 | 900 / 752 | 0 / 0 |
| What We Build | 1652 / 1331 | 1652 / 1331 | 0 / 0 |
| How We Build | 2983 / 898 | 2983 / 898 | 0 / 0 |
| Case Study | 3881 / 799 | 3881 / 799 | 0 / 0 |
| Testimonials | 4680 / 941 | 4680 / 941 | 0 / 0 |
| Footer | 5621 / 752 | 5621 / 752 | 0 / 0 |

Key element boxes at 1440px: hero title Figma (100,339,500,198), rendered (100,340,500,198); description Figma (100,561,500,105), rendered (100,562,500,104); hero artwork Figma (723,197,617,647), rendered (723,196,617,647). Challenge rows start at Figma x753/y1020 and render x752/y1021, each at a 144px cadence. Capability cards render at x100/735, widths 605 and y1953, 2px below Figma; lower cards render x100/523/947, widths 393 and y2442, 2px below Figma. Process steps render x716/y3063 with 128px cadence, matching Figma. Integrated case card renders x100/y4174/w1240/h448, 2px below Figma. Testimonial cards render x100/520/940, y4955/w400/h353, 2px below Figma.

The AI page and homepage now include the same PHP header and footer partials. Homepage header and footer screenshots retain their exact pre-refactor SHA-256 hashes at 1440px and 390px. Shared header link computed color and font are identical on both pages. The raw AI-versus-home element screenshot hashes differ; navigation URLs are page-specific and the captures occur in different document states. The rendered layouts and component source are shared.

Playwright checked 360, 390, 430, 768, 1280 and 1440px. All had document width equal to viewport width, no broken images and no browser console errors. At 1440px, document height remained 6373px through the hero entrance and settled loop. Pause/resume, offscreen pause and the complete reduced-motion static composition passed. The sampled animation frame interval was 17ms maximum across 89 frames in this run. No hero CTA overlapped the artwork. No flicker was observed in initial, mid and settled captures; a video was not recorded.

Homepage regression passed: four desktop service cards, four mobile service links with active preview, stable mobile document height while scrolling, mobile navigation, testimonial advance, footer reveal and invalid newsletter feedback. All four service URLs returned HTTP 200. The three non-AI service pages remain their existing coming-soon pages.

Remaining visual differences: the Figma workflow and capability diagrams are built from many vector nodes. The HTML/SVG/CSS reconstruction matches their main placement and interface structure, while some small vector details, gradients, shadows and labels are approximate. The Figma case study contains placeholder copy and no destination or verified metric; the visible CTA is disabled until a real case study exists. The supplied Figma has a desktop page frame, so mobile layouts are responsive adaptations.

Evidence: `after-ai-full-1440.png`, `after-ai-full-390.png`, `before-report.json`, `after-report.json` in this folder; animation states and full regression data are in `../ai-automation-20261027/`.
