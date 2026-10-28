# Homepage AI & Automation card navigation QA

The desktop “What we do” cards now use semantic anchors and resolve their destinations from `config/services.php`. Desktop mappings are Software → `/services/software`, Websites → `/services/web-development`, Apps → `/services/ui-ux-design`, and AI & Automation → `/services/ai-automation`. The existing mobile rows already used those configured routes and were not changed. The Slim AI route is registered in `routes/web.php`.

[Playwright results](report.json) cover 1280px and 1440px desktop and 360px, 390px, and 430px mobile. Desktop AI card dimensions remained 281 × 190px at 1280px and 293 × 190px at 1440px. The icon, arrow vector, borders, hover color and lift, full-card click, arrow click, Tab focus, focus indicator, and Enter navigation passed. Mobile one-tap navigation, return to homepage, stable 241 × 167px preview geometry, and continued forward scrolling passed. Every tested destination had the AI hero and six-step timeline; scrolling activated all six steps. No horizontal overflow, document-height change, or browser-console errors were observed.

Captures: `desktop-{1280,1440}-{hover,focus}.png` and `mobile-{360,390,430}-row.png`. The homepage mobile scroll suite passed at 360px, 390px, and 430px in normal and reduced motion with zero negative scroll deltas, stable document height, and one active preview. The self-check passed. The [destination hero controls report](../ai-animation-repair-20261028/homepage-link-controls/report.json) confirms the settled loop, pause/play, offscreen pause/resume, and reduced-motion artwork.

The shared header, shared footer, homepage testimonial carousel, footer reveal, and AI Motion V2 implementation were not edited. The existing unrelated untracked files were preserved.
