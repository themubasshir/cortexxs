# Web Development page — geometry (1440 frame)

Coordinates are absolute in canvas `1001:2`. Content column: x 100–1340 (1240 wide), matching `.wd-container`
width `min(1240px, 100% - 48px)`.

## 1 Hero `1030:115` — 0…900, bg #fff

- Header container `1030:148`: 1000×72 at 220,24, r20, #fdfdff, shadow 0 12 33 #000@0.06 (shared header).
- Background: two 732×1184 blurred gradient slabs (`1030:146/147`, blur 230) — #fdfdff → #de1c59 → #643df3 → #10b0d6;
  ellipse 596 at 708,141, #d2d2e8@0.3, blur 122. Rendered result is a faint pink/violet wash.
- Row `1030:167`: 1240×647 at 100,196, horizontal, gap 15.
- Copy column `1030:170`: 500w at y 278.5; gaps 20 (pill→h1), 24 (h1→sub), 48 (sub→buttons).
  - Pill 258×39. H1 500×198. Sub 500×105. Buttons row 316×48, gap 12.
  - Start Project 156×48 r12 #0d2dce. View Work 148×48 r12 stroke #d8d8d8, icon 16.
- App card `1030:210`: 617×647 at 723,196.
  - Panel `1030:211`: 503×645 at 834.1,197, r18.9, fill #e4f1ff + linear #e6f1fd→#cfe2fc(56%)→#ecf5fe.
  - Sidebar `1030:223`: 37.9×256.5 at 778.2,205.2, r21.5, #030303, shadow 0 6 10.3 #000@0.17, pad 13.1/7.2; 8 buttons 29.5 (active #202025), icon 15.5.
  - Prompt block `1030:264`: 408.8w at 881.7,224.8. "Welcome" 34.4/51.6 at y 255.4. Form 408.8×94.5 at y 315.6, r8.6, border #dfd8dd@0.8, shadow 0 5.2 8.6 #53394a@0.09; input row 55h; toolbar 37.8h with chips 9px and two 24.1 black circle buttons (gap 5.2). Caption 8px at y 417.
  - Section `1030:315`: 546.2×227.7 at 783.5,483. Cortexx chip 129.7×42.1 r21 white@0.9. Articles 177×171.8 at x 783.1 / 968.3 / 1153.1 (third offset +9.3 y), r7.3, white@0.9, border #dedbe2, shadow 0 4.1 9.7 #463440@0.08, pad 13.2/12.4; icon 20.3; title 11.3/18.2; body 8/10.3; More button 55.8×20.7 r14.6.
  - Talk button 39.5 circle at 1066.8,781.1 + label; white@0.6 tab 202×42 at 985,800.
  - Pause button 49.8 circle at 1272.7,746.9, white, shadow 0 4.3 10.3 #37323e@0.06.
  - Implementation scales the card from its 617×647 design box (`--wd-s`), so all inner values are design px.

## 2 Featured `1030:1187` — 900…1969, pad 120 top / 60 bottom

- Head row 1240×183: left 629w (pill + h2 gap 16), right 470w at x 870, lede bottom-aligned (y 1133).
- Gap 48 → card `1030:1197` 1240×658 at y 1251, r16, white, shadow 0 12 15 #d2d2d2@0.19.
  - Media 1240×562 (#f2f2f2 r16). Compare group 1040×550 at x 200 (two 520 panels).
  - Divider 4×561 white@0.9 at x 718; handle 49 circle centred, icon 25.
  - Tags 62×24 at 20px inset (top-left / top-right), #f6fcff, border #e3e3e3, 10px Bold, ls 1.5, uppercase.
  - Caption bar 96h, Bold 32 centred.

## 3 Selected Work `1030:363` — 1969…2926, pad 60

- Head: pill + h2 478w (191h). Gap 48.
- Cards row: two 604×598, gap 32, r16, shadow 0 12 15 #d2d2d2@0.19.
  - Media 604×500 (r16 16 0 0). Meta 98h, pad 20, title Bold 32 + meta Medium 16 (gap 10), arrow 46.

## 4 What we do `1030:1067` — 2926…3817, pad 60

- Head 1240×183 (left 629, right 470 at x 870, lede 105h bottom-aligned). Gap 35.
- Rule 1240 #cacaca. Gap 35.
- Accordion 1240w, gap 4. Rows: pad 24 0, border-bottom #cacaca; content row gap 16: icon 30, title Bold 32/30, 40px circle button (#cacaca stroke) right.
  - Collapsed row 88h; expanded row 150h (title + body gap 12).

## 5 How We Do It `1030:416` — 3817…4717, bg #fdfdff, pad 80

- Row 1240×740, gap 48. Left 568w (pill/h2 gap 16; h2→lede 24). Right 624w at x 716, gap 32.
- Rail 56w: active step 56 circle (#0d2dce@0.1, pad 8) with 40 inner (#0d2dce, numeral Regular 20 white); others 40 circle stroke #dbdada/3. Connector lines 3px (active segment #0d2dce).
- Steps 536w, gap 60, each 68h (title 28 + gap 16 + body 24). Step pitch 128.

## 6 Trusted & Featured `1030:535` — 4777…5964

Implemented by the shared homepage testimonial partial (two rows, 353h cards, media 430w, text 370w).

## 7 Footer `1030:1003` — 6084…6836, #020612

Shared footer partial.

## Breakpoints (implementation)

| Width | Layout |
|---|---|
| ≥1280 | Figma desktop geometry |
| 1024–1279 | Same structure, fluid widths, hero card scaled |
| 768–1023 | Hero stacks (copy then card); heads stack; two-up cards remain two-up |
| <768 | Single column; cards one-up; accordion titles 22px; steps 20px titles; hero card scaled to viewport |
