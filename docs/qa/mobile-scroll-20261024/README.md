# Mobile service scroll QA

Local Playwright test against `http://localhost/cortexx/`. Production was not changed.

The runner tested 360×780, 390×844, and 430×932 at normal and reduced motion. Each scenario began at the page top, used wheel gestures for three downward/upward cycles, then tested rapid scrolling. `report.json` has the all-width results. The CSV files contain every 390px gesture before and after the fix. The four PNGs show each active service at 390px.

At the Web Development → Software transition, the old 80px downward gesture changed `scrollY` from 3100 to 2925 while its preview above the viewport collapsed from 236px to zero. The row above lost 254px including spacing. Document `scrollHeight` stayed 6077px, and the sticky header stayed 69px. The page code made no `scrollTo`, `scrollBy`, or `scrollIntoView` calls. Browser scroll anchoring compensated for the removed content above the viewport, producing a net −175px movement. A prior live observation measured approximately −244px during the same class of transition.

After the fix, the same 80px gesture changed `scrollY` from 3100 to 3180. All four preview heights remained 236px, and document `scrollHeight` stayed 6841px. Across the six corrected mobile scenarios, there were zero negative deltas, all four services activated, and no console errors.

The layout now keeps all four image slots in flow and dims inactive images. This makes the service section taller while keeping each image next to its service text. Only one row receives the active emphasis at a time. The images and links remain available without an overlay.
