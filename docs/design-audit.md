# Cortexx — Design Audit

Source: `Untitled (3).fig` (42.7 MB, fig-kiwi binary, schema v106)
Decoded via `kiwi-schema` compiled-schema decoder → `message.json` → full node tree (1251 nodeChanges).

## Frame
- Root frame: **"Landing Page Updated (Option 02)"** — 1440 × 5884 px, background `#ffffff`.
- Single desktop variant. No mobile/responsive frames present → responsive layouts derived from desktop design language.

## Section inventory (top → bottom)

| # | Node | Size @ y | Content |
|---|------|----------|---------|
| 1 | `Hero` | 1440×952 @0 | Fixed header pill (logo JPG, nav: Work / Capabilities / Case Studies / About / Contact, "Let's Talk" dark button). Badge "Think · Design · Build". H1 "We Build Software, Websites, App\nand AI." Sub "Designed around your business Built to move it forward." CTAs "Start a Project" (blue) + "View Our Work" (ghost + play icon). Social proof: 4 avatars + "+1k", 5 stars, "Trusted by 10k+ clients". Right: video-mockup card (Rectangle 161124937) with play button + progress bar. Bottom: "Trusted by 50,000+..." + 6 logo strip (Lumina, Vortex, Velocity, Synergy, Enigma, Spectrum) separated by vertical lines. Decorative: circuit webp masks top-right (2× grid), blurred ellipses, faint diagonal gradient washes. |
| 2 | `Frame 2147261697` Selected Work | 1240×1301 @1012 | Pill "Selected Work", H2 "Work that moves businesses forward." (56px Bold), right "Start a Project →" text link. 2×2 grid of project cards (606×517): Aurora/Mobile App, Wstack/Web Platform, Aurora/Saas Platform, Voice AI/AI Mobile App. Card = 606×419 image + 98px footer row (title 32 Bold + tag 16 Medium + 46px arrow button). |
| 3 | `Frame 2147261746` What we do | 1241×411 @2413 | Pill "What we do", H2 "From ideas to impact", right col: 20px paragraph + "Explore Services →". Row of 4 service cards (292×193, r16): Web Development, Software, AI & Automation, UI/UX Design — icon + circular arrow button top, title 24 Bold + desc 18 Regular. |
| 4 | `Frame 2147261747` Case Study | 1233×797 @2948 | Stacking deck of 3 cards (1233×619, r26, offset ~89px each → scroll-stack). Each: pill "Case Study", logo-mark + "NextWrold" 60 Bold, "A clearer SaaS platform for better decisions" 25px, "UX/UX - Web Development" 24 SemiBold, "Vew Case Study" button, stats +38% Conversion / -32% Task Time / +46% Engagement. Right: 829×524 product screenshot (r32, layered desktop mockups). Decorative vectors + 954px ellipse. |
| 5 | `Frame 2147261744` Trusted & Featured | 1240×1187 @3845 | Pill "Trusted & Featured", H2 "Real partners. Real Results.", carousel arrows (top-right). Testimonial cards — two staggered marquee-style rows (r16 cards, logos Synergy/Vortex/Velocity, quotes 22px, avatar+name+5 stars; Alex Carter, Jordan Mitchell Rivera, Carlos Rivera…). Bottom: "Featured and recognized:" 24 Medium + 6 press logos (OYO, FedEx, Amazon, OLA, Microsoft, Walmart) 166×96 each. |
| 6 | `Footer` | 1440×752 @5132 | Content row: newsletter block (logo PNGs, "Automate the busywork…" 18 Medium, email input 255×48 + "Let's Talk" 125×48 button), social icons (Facebook, LinkedIn, X/Twitter 40×40 circles). Right: Menu col (About Us/Work/Capabilities/Case Studies) + Contact col (support@parfaitartlogistics.com, +(866) 255-3892, Los Angeles address). Divider, giant "Cortexx" wordmark vector 1280×254, copyright row + Privacy/Terms links. |

Floating decor: `Container` 1280×158 @2690 gradient-tinged; concentric circle group @414,2441; `Ellipse 7258` 1488×1106 @-24,1352 purple 2%.

## Typography
- **Manrope** throughout (Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800).
- Display/H2: 56px Bold, lh 64px, ls 0. H1 60px ExtraBold lh 1.1 ls −3%.
- Case-study title 60 Bold; body 22–25px Regular; card titles 24–32.
- Nav 18 Regular #323232; buttons 14–18 Medium.
- Minor `Inter` inside embedded case-study screenshot mockup (part of artwork, not site chrome).

## Colors
- Ink: `#1d1d1d`, `#111111`, `#212121`; body `#323232`, muted `#3d3d3d`, `#666666`.
- Primary blue `#0d2dce` (CTAs), accents `#3960f9`/`#4a71fa`/`#3a55d7` (pills/dots), star `#fda328`, alert `#ff6347`.
- Neutrals: `#ffffff`, `#fdfdff`, `#f2f2f2`, `#dddde0`, borders `#d8d8d8`/`#e1e1e1`.
- Decorative gradients: faint `#de1c59 → #643df3 → #10b0d6 → #faf6f7` washes at 2–4% opacity.

## Images (all embedded, extracted to `public/assets/images/figma/`)
31 image fills mapped by hash → file. Key: hero circuit masks (9ba9fb…, 53c760…, 5fc81f…), logo `b0cb4145…jpg`, avatars (cb07be…, 4ae134…, 253ea0…, ca1d4e…), 4 project cards (7af8f6…, d3c53b…, 7b43ef…, 4d8cad…), case-study shots (0107fc…, 0483e4…, dd9cbb…), testimonials avatars, footer logos (f0f984…, db7767…), press logos embedded as vector instances.

## Interactions inferred
- Case-study section = vertical stack of 3 overlapping cards → scroll-stacking implementation.
- Testimonials = horizontally scrolling rows / carousel (arrow buttons present).
- Contact: newsletter email field in footer only — no dedicated contact form in design. Implement newsletter capture endpoint.
- Nav: anchor links to sections; "Capabilities" has dropdown marker.

## Uncertainties
- Dropdown menu contents not expanded in file.
- Exact hero right card = embedded video still (dd9cbb… + 431724c…/0a6820… strips) — recreated as image with overlay play button.
- Mobile layout extrapolated (no mobile frames).
- Text encoding artifacts (’ rendered fine in JSON; spec.txt shows mojibake only in console).
