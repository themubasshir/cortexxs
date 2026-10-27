# AI & Automation page QA — 27 October 2026

Local target: `http://localhost/cortexx/services/ai-automation`. Apache returned HTTP 200 and served the expected URL, title, heading, page stylesheet and JavaScript. The local Apache instance reports PHP 8.2.4; the project requires PHP ≥ 8.1.

The full browser results are in `report.json`. Playwright used a fresh headless Chrome context. It captured the hero on entry, at 950 ms, after settling, and with reduced motion. The page was checked at 360, 390, 430, 768, 1280 and 1440 px. No tested width had horizontal overflow. The hero stayed at a fixed document height of 6478 px throughout the animation, did not overlap its CTAs, paused ambient motion offscreen, and displayed all five cards in reduced-motion mode. An 89-frame sample averaged 17 ms per frame, with a 17 ms maximum gap. No page or browser-console errors were captured, and all images loaded after lazy images were brought into view.

Homepage regression checks passed for HTTP 200, four desktop service cards, four mobile service rows, all four service routes, the mobile menu, testimonial movement, footer reveal and invalid newsletter feedback. A 390 px scroll trace advanced in 180 px increments with an unchanged 5849 px document height; the prior mobile scroll jump was not reproduced. The existing `tests/selfcheck.php` suite passed all 11 checks. PHP and JavaScript syntax checks and `git diff --check` passed.

Screenshots: `hero-initial-1440.png`, `hero-mid-1440.png`, `hero-settled-1440.png`, `hero-reduced-390.png`, `hero-360.png`, `hero-390.png`, `hero-430.png`, `hero-768.png`, `full-page-1440.png`, `full-page-390.png`, `homepage-1440.png`, `homepage-390.png`.

The rendered 1440 px page is 6478 px tall, 105 px above the Figma frame. The hero workflow rectangle is 617 × 647 at x=723, y≈196, matching the decoded Figma geometry. The visual artwork uses reconstructed HTML/SVG/CSS from Figma nodes, so micro-shapes and shadows are approximate. The Figma case study uses placeholder copy and has no full destination or verified metric; that content remains as supplied.
