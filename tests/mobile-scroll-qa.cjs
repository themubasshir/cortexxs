// Run with NODE_PATH pointing to an installed Playwright package.
// Uses the local site only; it never submits a valid newsletter address.
const { chromium } = require('playwright');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'docs', 'qa', 'mobile-scroll-20261024');
const base = process.env.CORTEXX_QA_URL || 'http://localhost/cortexx/';
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
fs.mkdirSync(output, { recursive: true });

const measure = () => ({
  y: Math.round(scrollY),
  height: document.documentElement.scrollHeight,
  viewport: innerHeight,
  header: Math.round(document.querySelector('#header').getBoundingClientRect().height),
  listTop: Math.round(document.querySelector('[data-services]').getBoundingClientRect().top),
  listBottom: Math.round(document.querySelector('[data-services]').getBoundingClientRect().bottom),
  active: [...document.querySelectorAll('[data-service].is-active')].map(row => row.dataset.service),
  rows: [...document.querySelectorAll('[data-service]')].map(row => ({
    slug: row.dataset.service,
    top: Math.round(row.getBoundingClientRect().top),
    height: Math.round(row.getBoundingClientRect().height),
    preview: Math.round(row.querySelector('.service-preview').getBoundingClientRect().height),
    imageLoaded: row.querySelector('img').naturalWidth > 0,
  })),
  scrollCalls: window.__qaScrollCalls.length,
});

async function scenario(browser, { width, reduced, baseline = false }) {
  const height = width === 430 ? 932 : width === 360 ? 780 : 844;
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.addInitScript(() => {
    window.__qaScrollCalls = [];
    for (const name of ['scrollTo', 'scrollBy']) {
      const original = window[name];
      window[name] = function (...args) {
        window.__qaScrollCalls.push({ name, args: args.map(String) });
        return original.apply(this, args);
      };
    }
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (...args) {
      window.__qaScrollCalls.push({ name: 'scrollIntoView', target: this.tagName });
      return original.apply(this, args);
    };
  });
  if (baseline) {
    for (const [name, type] of [['css/app.css', 'text/css'], ['js/app.js', 'text/javascript']]) {
      const content = execFileSync('git', ['show', `HEAD:public/assets/${name}`], { cwd: root });
      await page.route(`**/assets/${name}*`, route => route.fulfill({ status: 200, contentType: type, body: content }));
    }
  }
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.mouse.move(width / 2, height / 2);
  const events = [{ phase: 'load', state: await page.evaluate(measure) }];
  const screenshots = new Set();
  async function gesture(direction, pixels, phase, cycle) {
    const before = await page.evaluate(measure);
    await page.mouse.wheel(0, direction === 'down' ? pixels : -pixels);
    await page.waitForTimeout(95);
    const after = await page.evaluate(measure);
    await page.waitForTimeout(95);
    const settled = await page.evaluate(measure);
    events.push({ phase, cycle, direction, pixels, before, after, settled });
    if (!baseline && !reduced && width === 390 && phase === 'slow-down' && cycle === 0) {
      const slug = settled.active[0];
      const row = settled.rows.find(item => item.slug === slug);
      if (slug && row && row.top < height && row.top + row.height > 69 && !screenshots.has(slug)) {
        screenshots.add(slug);
        await page.screenshot({ path: path.join(output, `${slug}.png`) });
      }
    }
    return settled;
  }
  // Begin at the top and approach the service section with ordinary wheel gestures.
  let state = await page.evaluate(measure);
  for (let i = 0; i < 12 && state.listTop > height * .65; i++) state = await gesture('down', 450, 'approach', 0);
  for (let cycle = 0; cycle < 3; cycle++) {
    for (let i = 0; i < 42 && state.listBottom > state.header + 20; i++) state = await gesture('down', 80, 'slow-down', cycle);
    for (let i = 0; i < 42 && state.listTop < height * .65; i++) state = await gesture('up', 80, 'slow-up', cycle);
  }
  for (let i = 0; i < 12 && state.listBottom > state.header + 20; i++) state = await gesture('down', 420, 'rapid-down', 0);
  for (let i = 0; i < 12 && state.listTop < height * .65; i++) state = await gesture('up', 420, 'rapid-up', 0);
  const down = events.filter(event => event.direction === 'down');
  const negative = down.filter(event => event.after.y < event.before.y - 3 || event.settled.y < event.after.y - 3);
  const activations = [...new Set(events.flatMap(event => event.settled?.active || []))];
  const heights = [...new Set(events.map(event => event.state?.height || event.settled?.height))];
  const summary = { width, height, reduced, baseline, gestures: events.length - 1, negative: negative.length,
    worstDelta: Math.min(0, ...negative.map(event => Math.min(event.after.y - event.before.y, event.settled.y - event.after.y))),
    activations, documentHeights: heights,
    maxActiveCount: Math.max(...events.map(event => (event.state?.active || event.settled?.active || []).length)),
    imagesLoaded: events.at(-1).settled.rows.every(row => row.imageLoaded),
    scrollCalls: Math.max(...events.map(event => event.state?.scrollCalls || event.settled?.scrollCalls || 0)),
    screenshots: [...screenshots], errors };
  await context.close();
  return { summary, events };
}

async function desktop(browser, width) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  const initial = await page.evaluate(() => ({
    cards: [...document.querySelectorAll('.svc-card')].map(card => ({ width: Math.round(card.getBoundingClientRect().width), height: Math.round(card.getBoundingClientRect().height) })),
    desktop: getComputedStyle(document.querySelector('.desktop-services')).display,
    mobile: getComputedStyle(document.querySelector('.mobile-services')).display,
    overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    arrow: getComputedStyle(document.querySelector('.svc-card .svc-go')).backgroundColor,
  }));
  await page.locator('.svc-card').first().hover();
  const hoverArrow = await page.locator('.svc-card .svc-go').first().evaluate(el => getComputedStyle(el).backgroundColor);
  await context.close();
  return { width, initial, hoverArrow, errors };
}

function compactTrace(events) {
  const columns = ['phase', 'cycle', 'direction', 'pixels', 'beforeY', 'afterY', 'settledY',
    'beforeHeight', 'settledHeight', 'beforeActive', 'settledActive', 'beforePreviews',
    'settledPreviews', 'beforeRowTops', 'settledRowTops'];
  const quote = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const rows = events.filter(event => event.direction).map(event => [event.phase, event.cycle,
    event.direction, event.pixels, event.before.y, event.after.y, event.settled.y,
    event.before.height, event.settled.height, event.before.active.join('|'), event.settled.active.join('|'),
    event.before.rows.map(row => row.preview).join('|'), event.settled.rows.map(row => row.preview).join('|'),
    event.before.rows.map(row => row.top).join('|'), event.settled.rows.map(row => row.top).join('|')].map(quote).join(','));
  return [columns.join(','), ...rows].join('\n') + '\n';
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: chrome });
  try {
    const results = [];
    results.push(await scenario(browser, { width: 390, reduced: false, baseline: true }));
    for (const reduced of [false, true]) {
      for (const width of [360, 390, 430]) results.push(await scenario(browser, { width, reduced }));
    }
    const desktops = [await desktop(browser, 1280), await desktop(browser, 1440)];
    const report = { generatedAt: new Date().toISOString(), results: results.map(result => result.summary), desktops };
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
    for (const result of results) {
      const { width, reduced, baseline } = result.summary;
      if (baseline || (width === 390 && !reduced))
        fs.writeFileSync(path.join(output, `trace-${baseline ? 'before' : 'after'}-${width}.csv`), compactTrace(result.events));
      console.log(JSON.stringify(result.summary));
    }
    console.log(JSON.stringify({ desktops }));
    const failures = results.slice(1).filter(result => result.summary.negative || result.summary.activations.length !== 4
      || result.summary.maxActiveCount !== 1 || !result.summary.imagesLoaded || result.summary.documentHeights.length !== 1
      || result.summary.scrollCalls || result.summary.errors.length);
    if (failures.length || desktops.some(result => result.errors.length || result.initial.cards.length !== 4
      || result.initial.desktop !== 'grid' || result.initial.mobile !== 'none' || result.initial.overflow
      || result.initial.arrow === result.hoverArrow)) process.exitCode = 1;
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
