# AI & Automation motion V2 — browser QA

## Implementation

The hero SVG and its animation were preserved. The section entrances use one IntersectionObserver that marks each AI section visible once; CSS then reveals challenge rows, the five service cards, the case study, testimonials, and six recognition tiles with opacity and transform only. Content remains visible when JavaScript is disabled.

The process timeline uses one passive scroll listener and one requestAnimationFrame update per paint. JavaScript measures the first and last marker centers and sets the neutral/blue rail position from those centers. The blue rail is a scaleY transform over the visible neutral rail. Progress is:

`clamp((0.72 × viewport height − first marker viewport Y) / (last marker center Y − first marker center Y), 0, 1)`

Each circle activates when its center reaches the same 72% viewport line. Scrolling upward reverses the line and circles. Rows remain in layout throughout; inactive text stays at 68% opacity and moves only 8px. Reduced motion displays a complete six-step timeline.

There are exactly three testimonial entries. Desktop shows all three and arrows rotate their order by one; tablet shows two, mobile shows one. The loop moves the original DOM cards, with no clones or invented entries. The two continuing cards slide horizontally; the wrapped card enters from the outside edge. Clicks are queued so each action advances one position. Arrow buttons, ArrowLeft/ArrowRight on the track, and touch swipe work. No autoplay was added because the desktop view already shows every genuine entry.

## Results

- [Motion report](report.json): HTTP 200; all six forward and reverse timeline states passed at 1440px and 390px; rail and circle centers matched exactly; no horizontal overflow, page-height change, or unexpected scroll movement.
- Carousel next, previous, wrap, keyboard, focus visibility, mobile swipe, three-card data count, mid-transition animation, and settled card clipping passed. Reduced motion advanced instantly with no running card animations.
- Challenge, capability, case, testimonial, and recognition reveals completed once with unchanged document height.
- With JavaScript disabled, challenge and process text remained visible and mobile testimonials remained horizontally scrollable.
- [Hero six-frame sequence](../ai-animation-repair-20261028/v2/sequence.png) from fresh visible Chrome shows the existing entrance and continuous loop. [Hero control report](../ai-animation-repair-20261028/v2-controls/report.json) confirms pause/play, offscreen stop/resume, and reduced-motion static artwork.
- Existing AI QA, homepage self-check, mobile general, mobile scroll, and mobile single-preview checks all passed. The mobile scroll suite found zero negative scroll deltas across 360px, 390px, and 430px in normal and reduced motion. The homepage header and footer code were not modified.
- Responsive carousel checks passed at 360px, 390px, 430px, 768px, 1280px, and 1440px with no clipped quote or author, no page overflow, and no browser console errors in the instrumented runs.

## Captures

- Timeline: `timeline-1440-step-{1,3,6}.png`, `timeline-390-step-{1,3,6}.png`, and `timeline-390-reduced.png`.
- Carousel: `carousel-{1440,390}-{first,mid,next,wrapped}.png`.
- Full page: `../ai-automation-20261027/full-page-1440.png` and `full-page-390.png`.
- Hero: `../ai-animation-repair-20261028/v2/hero-{0,500,1500,3000,6000,12000}ms.png`.

## Content limitation

The three cards are the only genuine testimonial entries in the existing page. Desktop navigation visibly rotates their order; it does not imply additional clients. The existing testimonial copy, including its spelling, was left unchanged for this interaction-only task.
