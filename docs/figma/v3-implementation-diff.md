# Cortexx V3 implementation diff

Compared current project against decoded `Untitled (4).fig` and `mobile.fig`.

## Substantive structural differences

1. **Root geometry**
   - Current CSS uses a mostly generic responsive layout with 1240px container and 24px mobile padding.
   - V3 desktop uses explicit 1440px canvas sections, 100px desktop side margins, and fixed section geometry.
   - V3 mobile is a separate 390px composition with explicit section heights and different hierarchy.

2. **Section order**
   - Current order is broadly similar, but current case-study stack occupies a large sticky region and current footer starts from flow after testimonials.
   - V3 mobile uses compact `Featured case study` before `Client proof`; this is not equivalent to desktop sticky stack geometry.

3. **Hero**
   - Current copy differs: `We build software, websites, apps & AI systems.` vs V3 `We Build Software, Websites, App and AI.`.
   - Current hero trust copy says `Trusted by over 100 businesses`; V3 says `Trusted by 50,000+ businesses for innovative design and growth.`.
   - Current desktop hero visual uses existing product image but lacks decoded V3 circuit composition and exact 675 × 508 placement.
   - Current mobile hero only shrinks desktop; V3 has a dedicated 390px layout.

4. **Selected Work**
   - Current desktop grid uses generic `1fr 1fr` cards and current mobile collapses through generic media queries.
   - V3 mobile requires four 350 × 314 stacked project cards.
   - V3 headings use different casing and exact spacing.

5. **Services**
   - Current desktop renders four cards.
   - V3 desktop renders three cards: Websites, Apps, AI & Automation.
   - V3 mobile renders four cards, with Software added and order Software, Websites, Apps, AI & Automation.
   - Current labels and card copy do not match decoded V3 ordering.

6. **Case studies**
   - Current PHP repeats same case content three times with the same image and uses generic sticky cards.
   - V3 has three distinct artwork layers and a compact single featured case-study mobile section.
   - Current copy contains known typo variants (`NextWrold`, `Vew Case Study`, `UX/UX`) that match some Figma text but need preservation only where approved by client; no invented replacement.

7. **Trusted & Featured**
   - Current implementation uses two marquee rows with mixed media cards, 390 × 250 cards, negative mask clipping, and testimonial data containing duplicate/unapproved copy.
   - V3 desktop has one 1240 × 568 carousel viewport with three 400 × 353 self-contained testimonial cards.
   - V3 mobile has one horizontal 892px internal track with three 284 × 261.5 cards.
   - Current `blockquote` and `.who` use normal flow with margin; long identities can clip or escape because fixed card height is too small.
   - Required rebuild: grid/flex card layout, header/logo, star row, quote body, bottom identity row, no avatar outside boundary, no navigation overlap with eyebrow.
   - Current media cards are not present in authoritative V3 Client proof geometry and must not be used as generic placeholders.

8. **Recognition row**
   - Current page has no approved V3 OYO/FedEx/Amazon/OLA/Microsoft/Walmart row.
   - V3 requires six approved recognition logos, with mobile compact recognition frame.

9. **Footer**
   - Current footer uses CSS text SVG wordmark and generic columns.
   - V3 includes approved footer artwork source and exact desktop/mobile geometry.
   - Current footer starts as sticky `min-height:100vh`; this conflicts with natural reveal requirement and mobile 593.78px footer.
   - Current footer contact copy differs from decoded V3 desktop/mobile source.
   - Current wordmark reveal can remain conceptually, but must use overflow mask, normal flow, and reduced-motion fallback.

10. **Interactions**
    - Current testimonial drag uses row-level `transform` and independent rows; V3 needs one accessible carousel track per responsive composition.
    - Current pointer handling moves only on pointerup and lacks robust pointermove behavior.
    - Current mobile menu has open/close behavior but no Escape handling or focus return.
    - Newsletter route and CSRF backend should be preserved.

## V3 implementation plan

- Keep Slim routes/controllers/middleware unchanged.
- Replace homepage section markup where geometry conflicts; avoid blind CSS patching.
- Extract/archive exact new image files before mapping visual slots.
- Rebuild testimonial markup as card data with approved content only.
- Use CSS Grid/Flexbox for all testimonial internals.
- Add one small non-framework self-check for carousel bounds and reduced-motion behavior if interaction code changes materially.
- Capture browser screenshots at 1440px and 390px before declaring completion.

## Current blockers

- Source Figma vector recognition logos are decoded in canvas but not yet exported as standalone browser assets.
- Several mobile image hashes are archive-only and require visual mapping.
- Browser screenshot tooling is available in temporary workspace, but implementation comparison assets are not yet generated for V3.
