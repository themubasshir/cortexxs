# V4 mobile services visual review

Source: `mobile_updated.fig`, 390px canvas. This is a local review only; nothing was pushed or deployed.

## Geometry

| Measurement | Figma | Local |
| --- | ---: | ---: |
| Services section height | 833px | 943px |
| Shared image preview | 241 × 167px | 241 × 167px |
| Preview left edge | 127px | 127px |
| Service row height | 88px inactive, 202px AI active | 88px each, plus one fixed 72px description area |

The 110px section-height difference comes from giving the shared image and active description their own non-overlapping, fixed-height space. Figma layers the image over the row area. Reproducing that overlap would obstruct service text while the image switches. At 360px the local section is 967px because the fixed description area needs one more line.

Final 390px visual review: the Web Development title now fits on one line with tighter mobile-only letter spacing. The four refreshed screenshots show the preview clear of every service row and the active title, arrow, and description visible. The section remains 110px taller than Figma; reducing it to 833px with this composition would require the shared image to occupy service-row space and obscure headings.

## Results

- Three downward/upward cycles and rapid scrolling at 360×780, 390×844, and 430×932, in normal and reduced-motion modes.
- Zero negative scroll deltas from downward gestures; document and section heights stayed constant through activation changes.
- All four services activated in forward and reverse order, with exactly one active image and description.
- No blocked service headings, horizontal overflow, or browser errors.
- Touch navigation reached all four service routes on one tap.
- Desktop grids at 1280px and 1440px retained four 190px-high cards and showed no mobile composition.

`report.json` contains the full result summary. `trace-390.csv` records before, immediate-after, and settled scroll positions for each gesture. The four PNGs show each active service at 390px.
