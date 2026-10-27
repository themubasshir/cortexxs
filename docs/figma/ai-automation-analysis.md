# AI & Automation Figma analysis

Source: `C:\Users\Cyb3r\Downloads\ai automation.fig` (decoded from its `fig-kiwi` canvas with `kiwi-schema` and `fzstd`). The archive contains 1,135 node changes. The page frame is **1440 × 6373 px**.

## Section hierarchy at 1440 px

| Section | Figma y | Height | Main content |
|---|---:|---:|---|
| Hero | 1 | 900 | Navigation, headline, workflow art, CTAs, trust proof |
| Your Business Challenges | 900 | 752 | Four challenge rows |
| What We Build | 1652 | 1331 | Five capability cards (2 + 3) |
| How We Build | 2983 | 898 | Connected-device art, six process steps |
| Case Study | 3881 | 799 | Case image and challenge/build/result copy |
| Trusted & Featured | 4680 | 941 | Testimonials and recognition logos |
| Footer | 5621 | 752 | Contact, newsletter, navigation, wordmark |

The navigation frame is 1000 × 72 at x=220, y=24. The main content grid is 1240 px wide with a 100 px side gutter. The hero workflow composition is 617 × 647 at approximately x=723, y=196. The hero headline text box is 500 × 198. The capability cards are 605 × 459 in the first row and about 393 × 483 in the second row, with 30 px row and column gaps.

## Extracted asset map

| Figma image hash | Figma node / role | Local use |
|---|---|---|
| `9c5e1a3bd48b3692c25de5269fa30599db26ef80` | Case study image | `public/assets/images/ai-automation/9c5e1a3bd48b3692c25de5269fa30599db26ef80.png` |
| `11afbb43023213fdba645bde7767e8f2f3a8da18` | Connected account portrait | `public/assets/images/ai-automation/connected-portrait.png` |
| `9ba9fb892d39bd0677fcadf1169e1d6b6ad7fd8b` | Circuit line artwork | Extracted in `public/assets/images/ai-automation/`; not displayed in the final page |
| `53c76027947859f1638597b259ab242aea9ff097` | Circuit component artwork | Extracted in `public/assets/images/ai-automation/`; not displayed in the final page |
| `5fc81f4932e820e1011006fa9eaa65210517a8fb` | Tiny circuit accent | Extracted in `public/assets/images/ai-automation/`; not displayed in the final page |
| `e3183fcce2e2dfd88178944554bf59692a8b6caf` | Additional Figma image | Extracted in `public/assets/images/ai-automation/`; not displayed in the final page |

The page also reuses the existing Cortexx logo, three Figma trust avatars, six recognition logos and the existing homepage's service imagery. The hero and capability compositions are primarily Figma vector and text nodes, so their shapes and interface cards are reconstructed with local HTML, SVG and CSS. No third-party image assets were added.

## Bodhi reference observations

Observed in a real browser at <https://www.publicissapient.com/platforms/bodhi> on 27 October 2026. The reference hero uses a Lottie-generated SVG (`.lf-player-container #lottie`), not a video or canvas. Its artwork shows workflow cards and dotted connection paths; path dash patterns and card transforms change over time. A Pause control is present in the hero. The mobile browser view stacks the text above the art. The reference inspection did not establish pointer-responsive motion, scroll-responsive transformations, a precise loop duration or its reduced-motion behavior, so the Cortexx implementation does not assume those effects.

The Cortexx animation uses a 0.7-second staggered card entrance, 0.9-second connection reveal, a completion state at 1.65 seconds, then a restrained CSS-only loop. `IntersectionObserver` stops ambient motion outside the viewport. The reduced-motion view displays the complete static artwork.

## Remaining Figma differences

- The Figma hero and card artwork consists of many vector and text nodes. The implementation preserves its workflow and interface structure but does not reproduce every vector edge, shadow and micro-label exactly.
- The Figma case study contains placeholder copy and no verified result metric. That copy is retained, and the CTA goes to the site's case-studies anchor until a real case study destination exists.
- The supplied file has only a desktop page frame. Mobile layouts are an adaptation, not an authoritative Figma match.
