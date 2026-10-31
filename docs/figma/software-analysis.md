# Software Development page: Figma analysis

Source: `C:/Users/Cyb3r/Downloads/software.fig`, frame `1038:47` "Software Page(Update 03)", 1440×6893.
Read with the local fig-kiwi decoder (Figma MCP was not available in this environment). The geometry,
copy and paints below come from the decoded node tree. Route: `/services/software`.

## Section inventory (Figma order, 1440 frame)

| # | Node | y | Section | Implementation |
|---|---|---|---|---|
| 1 | `1038:82` | 24 | Header (logo, nav, Let's Talk) | Shared `components/header.php` |
| 2 | `1038:49` | 0–900 | Hero: pill, H1, paragraph, 2 CTAs, illustration `1038:166` (617×647) | `.sw-hero` + animated `.sw-studio` |
| 3 | `1038:970` | 900 | Featured Transformation: heading, paragraph, before/after compare card | `.sw-featured`, range-driven split, blank image slot |
| 4 | `1038:572` | 1969 | Selected Work: 2 cards 604×598 | `.sw-work`, blank media slots |
| 5 | `1038:626` | 2966 | What We Build: centred head, 2 + 3 capability cards with art | `.sw-build`, HTML/CSS art + exported icons |
| 6 | `1038:851` | 4327 | How We Build: intro + 6-step timeline | `.sw-process`, scroll-activated steps |
| 7 | `1038:378` | 5367 | Trusted & Featured: 3 testimonials, recognition logos | Shared `components/testimonial-carousel.php` (AI 3-card carousel) |
| 8 | `1038:508` | 6141 | Footer (newsletter, menus, wordmark) | Shared `components/footer.php` |

Page-level ellipse `1038:48` (#643df3 at 2%, blur 120) sits behind sections 4–5 and is reproduced as a soft radial wash.

## Copy (exact Figma text, highlighted spans in brackets)

- Hero pill: `Software • System • AI`
- H1: `Custom [Software] Engineered For Growth` (ExtraBold 60, lh 1.1, ls -3%)
- Paragraph: `We design & build SaaS platforms, business systems and AI-powered products around how your company operates.`
- CTAs: `Start Project`, `View Work` (+ play-circle icon)
- Featured: pill `Featured Transformation`; H2 `See what a stronger [website changes]`; paragraph `A clearer journey from first visit to qualified enquiry.`; card title `Rivermere - Website Redesign`; tags `Before` / `After`
- Selected Work: pill `Selected Work`; H2 `Software built for [real] businesses`; cards `Cr` / `Online Learning Dashboard` and `ReadPlots` / `Interactive reading platform`
- What We Build: pill `What We Build`; H2 `The systems behind your [growth].`; cards
  - `Custom Software & SaaS`: `Purpose-built software designed around your business model and growth goals.`
  - `AI & Workflow Automation`: `Automate repetitive work and uncover new opportunities with Al-powered workflows.`
  - `Web & Mobile Application`: `Modern, responsive applications that deliver a seamless user experience across every device.`
  - `Internal Tools & Portals`: `Secure, role-based tools that give your team the information and control they need.`
  - `Product Modernization`: `Evolve legacy systems into modern, scalable products that are easier to maintain and ready for what's next.`
- How We Build: pill `How We Build`; H2 `A clear path from [idea] to growth.`; paragraph `We turn ideas into scalable digital products through a structured process focused on clarity, creativity, quality, and measurable growth.`; steps
  1. `Strategy & Discovery`: `Understand the business, users, market, and opportunities to establish a clear direction.`
  2. `Product Definition`: `ReadPlots is an interactive reading platform that makes stories more engaging through immersive content, exploration, and personalized experiences.`
  3. `UX & UI Design`: `Transform strategy into intuitive user experiences, wireframes, interfaces, and prototypes.`
  4. `Engineering`: `Bring the approved designs to life with scalable, reliable, and production-ready development.`
  5. `Testing & Refinement`: `Test functionality and usability, identify issues, and refine the product for a smooth experience.`
  6. `Launch & Growth`: `Launch confidently, monitor performance, gather insights, and continuously improve for sustainable growth.`
- Testimonials: pill `Trusted & Featured`; H2 `Built with clients. [Proven] in practice.`; the three existing testimonials (same data as the AI page).

Hero illustration copy: `Description`, `Share your preferred software ideas to get started...`, `Project: Medium`, `Workflow: select`,
`Accelerate AI-Powered Automation & Software Projects with Easy-to-Use and Pre-Built Library`, `Workflow Automation`
(pills Animation, Accessibility, Automate, Navigation, Motion), `Enterprise Software`, `Seamless Integration` (code sample), `More`, `Talk`,
chart axis `75/50/25/0` and `M T W T F S S`.

## Flagged copy (kept verbatim, needs client confirmation)

- Work card 1 title is `Cr`: looks truncated (placeholder or unfinished name).
- Featured heading says `website changes` and the card is `Rivermere - Website Redesign` on a software page (carried over from Web Development).
- `Al-powered` uses a lowercase L instead of `AI`.
- Step 2 `Product Definition` body is ReadPlots project copy, not a process description.
- Testimonial typos inherited from the shared data: `andintuitive`, `lanuch`, `MItchell`, `Vortextt`.
- No metrics or outcomes exist in the file; none were invented.

## Hidden / zero-opacity nodes (not rendered)

- `1038:579` "Start a Project" link in Selected Work (op 0).
- `1038:385` testimonial arrow group (op 0). The AI carousel's own prev/next controls are used instead, as required.
- `1038:860` "Connected device confirmation" article in How We Build (op 0).
- Hidden nodes `1038:609/618/953/962` and footer `1038:511`.

## Motion

Figma carries no prototype animation for this frame. The motion is designed for the page:

- Hero: entrance, then a settled loop (details in `software-geometry.md`, Hero motion). Informed by the
  publicissapient.com Sustain hero study (opposing 40 px column slide, piece-by-piece assembly on a ~200 ms stagger,
  sharp ease-out, build then hold). Its hard-cut loop reset, missing reduced-motion support and offscreen playback were deliberately not copied.
- Featured: draggable before/after split.
- Section heads/cards: shared `.reveal` from `app.js`.
- What We Build: subtle ring pulse and orbiting dots on hover/in view.
- How We Build: steps activate as they pass the reading line (same pattern as Web Development; six Figma steps, not the AI six-step design).
- Testimonials: AI 3-card carousel controller.

## Unresolved

- Real project images for compare (`1038:983`) and work cards (`1038:588`, `1038:599`): left blank by policy.
- Destination URLs for `Start Project`, `View Work`, work cards: anchored on-page (`#contact`, `#work`).
- Team member avatars `1038:691/693/695` are stock-like portraits: rendered as the Figma fallback fill `#e9ebf6` circles.
- SF Pro (illustration UI font) and Fira Code are not loaded; Manrope / system monospace are used.
