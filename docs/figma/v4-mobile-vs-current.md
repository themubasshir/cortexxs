# V4 mobile vs current

## Changed

- Header target is 390×72 with 20px/17px logo position and 44px menu target.
- Hero is mobile-first 350px column, 40px heading, two equal 169px CTA buttons, 350×263px media.
- Selected Work expands to four 350×340 cards with 242px media and 98px metadata.
- Services changes from four equal cards to four horizontal rows with rule separators, 30px titles, active preview behavior, and expanded AI copy.
- Case Study is an 801.81px mobile region containing repeated 657.9px visual panels.
- Trusted & Featured is 1683.57px with stacked 350×321 testimonial cards.
- Recognition uses 60px-high horizontal logos rather than desktop six-column cards.
- Footer target is 390×981, starting at y6329.78.

## Preserved

- Desktop layout remains unchanged outside shared service markup.
- Approved full-bleed two-row testimonial carousel behavior remains.
- Footer reveal, newsletter validation, reduced-motion behavior remain.

## Conflict record

Existing desktop testimonial implementation and V4 mobile Figma differ: Figma shows stacked mobile cards; approved carousel requirement says preserve two-row autoplay. Carousel behavior wins functionally; mobile CSS/section spacing follows V4 geometry where compatible.