let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }
const fs = require('node:fs');
const path = require('node:path');

const base = process.env.CORTEXX_QA_BASE || 'http://localhost/cortexx';
const label = process.argv[2] || 'after';
const output = path.join(__dirname, '../docs/qa/ai-capability-cards-20261031');
fs.mkdirSync(output, { recursive: true });
const widths = [360, 390, 430, 768, 1280, 1440];
const report = { label, base, widths: {}, failures: [] };

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(base + '/services/ai-automation', { waitUntil: 'networkidle', timeout: 30000 });
      const section = page.locator('#capabilities');
      await section.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelector('#capabilities')?.classList.contains('is-revealed') || !document.querySelector('.ai-motion-ready'), null, { timeout: 5000 }).catch(() => {});
      // Sample mid-animation, then after transitions (0.55s + 0.4s delay) settle.
      await page.waitForTimeout(250);
      const during = await page.evaluate(measure);
      await page.waitForTimeout(1400);
      const settled = await page.evaluate(measure);
      await section.screenshot({ path: path.join(output, `${label}-${width}.png`) });
      report.widths[width] = { errors, during: during.cards.map(c => ({ name: c.name, clippedBy: c.clippedBy })), ...settled };
      for (const c of settled.cards) {
        if (c.clippedBy > 0.5) report.failures.push(`${width}: ${c.name} clipped by ${c.clippedBy}px`);
        if (c.padBottom < 12) report.failures.push(`${width}: ${c.name} bottom padding ${c.padBottom}px`);
        if (c.scrollHeight > c.clientHeight) report.failures.push(`${width}: ${c.name} scrollHeight ${c.scrollHeight} > clientHeight ${c.clientHeight}`);
        if (c.artOverlapsText) report.failures.push(`${width}: ${c.name} illustration overlaps text`);
      }
      for (const row of settled.rows) if (row.heights.length > 1 && Math.max(...row.heights) - Math.min(...row.heights) > 1) report.failures.push(`${width}: row ${row.top} heights ${row.heights}`);
      if (settled.docOverflow > 0) report.failures.push(`${width}: horizontal overflow ${settled.docOverflow}px`);
      if (errors.length) report.failures.push(`${width}: page errors ${errors.join('; ')}`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
  fs.writeFileSync(path.join(output, `${label}.json`), JSON.stringify(report, null, 2));
  for (const [w, r] of Object.entries(report.widths)) {
    console.log(`${w}px`);
    for (const c of r.cards) console.log(`  ${c.name.padEnd(28)} card ${c.height} art ${c.artHeight} copy ${c.copyHeight}/${c.copyScroll} scroll ${c.scrollHeight}/${c.clientHeight} clipped ${c.clippedBy} padBottom ${c.padBottom}`);
  }
  console.log(report.failures.length ? 'FAIL\n' + report.failures.join('\n') : 'PASS');
  process.exitCode = report.failures.length && label !== 'before' ? 1 : 0;
})();

function measure() {
  const r = n => Math.round(n * 10) / 10;
  const cards = [...document.querySelectorAll('.ai-capability-card')].map(card => {
    const cr = card.getBoundingClientRect();
    const art = card.querySelector('.ai-capability-art').getBoundingClientRect();
    const copy = card.querySelector('.ai-capability-copy');
    const p = copy.querySelector('p');
    // Use untransformed layout offsets so the entrance translateY does not skew results.
    const pRect = p.getBoundingClientRect();
    const h3 = copy.querySelector('h3').getBoundingClientRect();
    const innerBottom = cr.bottom - parseFloat(getComputedStyle(card).borderBottomWidth);
    const cs = getComputedStyle(card);
    return {
      name: copy.querySelector('h3').textContent.trim(),
      height: r(cr.height),
      cssHeight: cs.height,
      minHeight: cs.minHeight,
      overflow: cs.overflow,
      artHeight: r(art.height),
      copyHeight: r(copy.clientHeight),
      copyScroll: copy.scrollHeight,
      copyPadding: getComputedStyle(copy).padding,
      pLineHeight: getComputedStyle(p).lineHeight,
      pFontSize: getComputedStyle(p).fontSize,
      scrollHeight: card.scrollHeight,
      clientHeight: card.clientHeight,
      descBottom: r(pRect.bottom - cr.top),
      cardInnerBottom: r(innerBottom - cr.top),
      clippedBy: r(Math.max(0, pRect.bottom - innerBottom)),
      padBottom: r(innerBottom - pRect.bottom),
      artOverlapsText: art.bottom > h3.top + 0.5,
      top: Math.round(cr.top + scrollY),
    };
  });
  const rows = Object.values(cards.reduce((acc, c) => ((acc[c.top] ||= { top: c.top, heights: [] }).heights.push(c.height), acc), {}));
  return { cards, rows, docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth };
}
