# Software Development page: geometry (1440 frame)

Coordinates are absolute in frame `1038:47` unless marked local. Content column: x 100–1340 (1240 wide), matching
`.sw-container` width `min(1240px, 100% - 48px)`.

## 1 Hero `1038:49`: 0…900, bg #fff

- Header `1038:82`: shared header partial (same 1000×72 container as WD).
- Background: two 732×1184 blurred gradient slabs (`1038:80/81`, op 0.02, blur 230), ellipse 596 at 708,141
  (#d2d2e8 at 35%, blur 122), two 720×389 ellipses at y -269 (#643df3 4%, #10b0d6 2%). Rendered as a faint wash.
- Row `1038:101`: 1240×647 at 100,196.
- Copy column `1038:102`: 500w at y 278.5. Pill 205×39 (`Software • System • AI`, 5px dots #3a55d7), gap 20,
  H1 500×198 (ExtraBold 60, lh 66, ls -1.8), gap 24, paragraph 500×105 (22/34.76, ls -0.22), gap 48, buttons 316×48 gap 12.
  - Start Project 156×48 r12 #0d2dce. View Work 148×48 r12 stroke #d8d8d8, play icon 16.
- Illustration `1038:166`: 617×647 at 723,196. Implementation scales from this design box with `--u = 100cqw / 617`.

### Illustration, local coordinates (origin 723,196)

| Part | Node | Local x,y | Size | Notes |
|---|---|---|---|---|
| Panel | `1038:167` | 111,1 | 503×645 | r18.9, #e4f1ff + linear #e6f1fd→#cfe2fc 56%→#ecf5fe, radial white 28% highlight |
| Rail | `1038:214` | 55.2,-0.8 | 37.9×256.5 | #030303 r21.5, shadow 0 6 10.3 #000/0.17, 8 buttons 29.5 pitch 29.54, first #202025 |
| Prompt block | `1038:255` | 158.7,28.75 | 408.8×203.3 | "Description" SF 34.4/51.6 at y 59.4; form 408.8×94.5 at y 119.6, r10; caption 8px at y 221 |
| Chart card | `1038:308` | 84,264.4 | 218×171 | white/0.8 r10; title bar 83×12 #030303 at +9,+14.8; icon at +198,+13.6 |
| Chart y labels | `1038:321…324` | +5…6.5 | 8px | 75 / 50 / 25 / 0 at +43.3 / +70.3 / +94.8 / +121.3 |
| Chart day labels | `1038:314…320` | y +149.3 | 8px | M T W T F S S at x +20 / 51 / 82.6 / 113.5 / 143.7 / 174.5 / 203.8 |
| Chart line | `1038:325` | +22,+60.4 | 188.6×66.9 | gradient stroke #eaefff→#5e81fb 59%→#4a71fa 68%, 1.83 |
| Chart tooltip | `1038:327` | +139,+35.8 | 32.8×22.2 | #4a71fa, inner bar 14×5.7 #e5e5e5/0.9 |
| Enterprise card | `1038:344` | 314,264 | 176.6×171.8 | white/0.8, stroke #dedbe2/0.85, r10, pad 13.2/12.4 |
| Orbit group | `1038:354` | 353.4,328.8 | 98.5×51.3 | four app icons ≈19–21, centre circle 29.5 white + logo 17.9×18.5 |
| Workflow card | `1038:170` | 124,455 | 176.6×171.8 | white/0.94; pills 17.4h r17.4 #f2f2f2, 8.13px text |
| Pills | `1038:182…190` | — | — | Animation -5.1°, Accessibility +10.4°, Automate -7.5°, Navigation +4.6°, Motion -5.1° (#4a71fa, white) |
| Code card | `1038:198` | 312.6,455.6 | 282.3×170.7 | white, r6.8, backdrop blur; "Seamless Integration" at +11.4,+14; code 9.35/13.74 at +11.4,+38 |
| White tab | `1038:204` | 262,604.1 | 202×42 | #fff |
| Talk button | `1038:205` | 343.7,585.1 | 39.5 circle | #030303, 5 bars 1.72w (6.9/13.75/19.8/13.75/6.9), label 10px below |
| Pause button | `1038:375` | 549,571 | 49.84 circle | white/0.96, shadow 0 2 12.3 #000/0.2, two bars 1.72×11.95 gap 4.3 |

Omitted: hero circuit raster masks (op 0.1) and the two hairline groups `1038:95/98` (op 0.1).

## 2 Featured `1038:970`: 900…1969, pad 120 / 100 / 60

- Head row 1240×183: left 629w (pill 211×39, gap 16, H2 56/64), right 470w at x 870, paragraph 22/34.76 bottom-aligned (y 1133).
- Gap 48. Card `1038:980` 1240×658, r16, white, shadow 0 12 15 #d2d2d2/0.19.
  - Media 1240×562, #f2f2f2 r16, clip.
  - Blank image `1038:983`: 713.4×441 at local 263.3,60, r16, shadow 0 7 30 #000/0.2.
  - Tags 62×24 r3, #f6fcff, stroke #e3e3e3, shadow 0 2 6 #3d362a/0.06, Bold 10 ls 1.52: Before at local 280,76; After at local 898,76.
  - Divider 4×561 white/0.94 at local x 618; handle 49×49 r8 centred, icon 25.
  - Footer 96h, pad 32/20, title Bold 32/32 centred.

## 3 Selected Work `1038:572`: 1969…2956, pad 100 / 100 / 50

- Head: pill 135×39, gap 16, H2 568w Bold 56/68. Gap 48.
- Row: two 604×598, gap 32, r16, white, shadow 0 12 15 #d2d2d2/0.19.
  - Card 1 media 604×500 blank (r16 16 0 0).
  - Card 2 media 604×500 #ebeced, inner blank 551×416 at 26,42, r12, shadow 0 4 34 #000/0.1.
  - Footer 98h, pad 20: title Bold 32/32, gap 10, meta Medium 16/16; arrow 46.

## 4 What We Build `1038:626`: 2966…4327, pad 50 / 100 / 100

- Head centred 568w: pill 134×39, gap 16, H2 Bold 56/68 centred. Gap 48.
- Rows gap 30. Cards white, stroke #f2f2f2, r20, shadow 0 12 34 #d2d2d2/0.14, gap 16 between art and copy.
  - Row 1: two 605×459. Art 603×309 r24 stroke #1f68d8/0.1.
  - Row 2: three 393.33×483. Art 392×309.
  - Copy pad 16/24/24, gap 8: title Bold 28/36 #000, body Medium 16/24 #323232.
- Art composition (card-local, relative to art box):
  - Card 1: rings 98/150/210 centred at 294,155 (#5b56e7/0.12), glows, hairlines; Projects panel 158×144 at 72,87;
    logo circle 84 at 252,98; Members panel 131×112 at 389,90.
  - Card 2: rings 102/152/210 centred at 302,155; Schedule pill 144×70 at 74,121; hub 80 at 262,115 (#4a71fa);
    Completed pill 146×70 at 384,121.
  - Card 3: rings 91/147/203 centred at 143,204; phone 99×166 at 93,73; builder chip 139×55 at 210,85;
    Build app pill 152×53 at 218,167.
  - Card 4: rings 94/151/218 centred at 196,176; cloud tile 91×78 at 151,40; database 94×81 at 21,171;
    logo circle 72 at 160,137; code tile 94×81 at 277,171; orbit dots on 3 short spokes.
  - Card 5: rings 61/115/173 centred at 196,155; Legacy tile 93×84 at 21,117; progress bar 141×13.6 at 131,152
    (segments 49.5 #4a71fa, 36 #7291ff, 55 light); Ready tile 89.5×84 at 278,117.

## 5 How We Build `1038:851`: 4327…5367, bg #fdfdff, pad 80 / 100

- Row gap 48. Left 568w: pill 127×39, gap 16, H2 Bold 56/68, gap 24, paragraph 490w 22/34.76.
- Right 624w at x 716: rail 56w + gap 32 + steps 536w.
  - Active node: 56 circle #0d2dce/0.1 pad 8, inner 40 #0d2dce, numeral Regular 20/24 white.
  - Others: 40 circle stroke #dbdada 3px. Connector lines 3px, lengths 92 / 140 / 113 / 109 / 111 / 59 (first #0d2dce).
  - Steps gap 60: title Bold 28/28 #111, gap 16, body Medium 16/24 #050d17. Heights 92 / 116 / 92 / 92 / 92 / 92.

## 6 Trusted & Featured `1038:378`: 5367…6308, pad 50 / 100 / 100

- Head row: pill 168×39, gap 16, H2 568w Bold 56/64. Gap 40.
- Cards 400×353, gap 20, r16, stroke #e9e5fa, shadow 0 12 15 #d2d2d2/0.19, pad 24, gap 36: avatar 78, brand 162×60 (gap 36),
  stars 24 #fda328 gap 5, quote Medium 24/36 ls -0.72, name Bold 24/29, role Medium 16/24.
- Gap 43. Recognition: label Medium 24/36 centred, 6 tiles 166.67×96 gap 48.
- Implemented with the shared AI carousel partial (controls are the AI ones; Figma arrows are op 0).

## 7 Footer `1038:508`: 6141…6893

Shared footer partial.

## Hero motion

All timings in ms from the moment the hero is in view. The text column is server-rendered and visible; motion only
adds transform and opacity, so nothing is hidden if JS fails (`is-pending` failsafe removes it after 3 s).

| Phase | Time | What moves |
|---|---|---|
| Entrance: columns | 0–1200 | Copy from -40px, illustration from +40px, opacity 0→1, 160ms offset, ease cubic-bezier(.16,1,.3,1) |
| Designed | 300–1300 | Panel, rail, prompt; placeholder types in (steps), workflow card rises, pills drop in on 90ms stagger |
| Connected | 900–1900 | Enterprise card rises; app icons scale in toward the centre logo, connector dashes draw |
| Executed | 1300–2400 | Code card rises, lines reveal top to bottom; chart card rises, line clip-draws, tooltip pops |
| Maintained (settled loop) | 2600 → | Talk bars pulse, rail highlight steps through icons (6 s), caret blinks, chart tooltip and pills float subtly |

- Pause/Play button in the illustration (`aria-pressed`, label switches Pause/Play), same pattern as WD.
- Pause when offscreen (IntersectionObserver) and on `visibilitychange`.
- `prefers-reduced-motion: reduce`: final composed frame, no entrance, no loop.
- No hard-cut loop reset: the build plays once per page view, then only the settled loop runs.

## Breakpoints (implementation)

| Width | Layout |
|---|---|
| ≥1280 | Figma desktop geometry |
| 1024–1279 | Same structure, fluid widths, illustration scaled |
| 768–1023 | Hero stacks (copy then illustration); heads stack; work 2-up; build cards 2-up then 1-up |
| <768 | Single column; cards 1-up; H1 40px; H2 36px; steps titles 22px; illustration scaled to viewport |
