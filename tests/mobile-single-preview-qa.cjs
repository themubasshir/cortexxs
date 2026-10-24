// Local visual and scroll regression test. Never submits newsletter data.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'docs', 'qa', 'mobile-single-preview-20261024');
const base = process.env.CORTEXX_QA_URL || 'http://localhost/cortexx/';
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
fs.mkdirSync(output, { recursive: true });

const measure = () => {
  const rect = element => {
    const r = element.getBoundingClientRect();
    return { x: Math.round(r.x), top: Math.round(r.top), bottom: Math.round(r.bottom), width: Math.round(r.width), height: Math.round(r.height) };
  };
  const section = document.querySelector('#capabilities');
  const list = document.querySelector('[data-services]');
  const preview = document.querySelector('.service-preview');
  const rows = [...document.querySelectorAll('[data-service]')];
  const images = [...document.querySelectorAll('[data-service-preview]')];
  const descriptions = [...document.querySelectorAll('[data-service-description]')];
  const visibleHeadingBlocked = rows.some(row => {
    const heading = row.querySelector('strong');
    const r = heading.getBoundingClientRect();
    const headerBottom = document.querySelector('#header').getBoundingClientRect().bottom;
    if (r.top < headerBottom || r.bottom > innerHeight) return false;
    const target = document.elementFromPoint(r.left + Math.min(10, r.width / 2), r.top + r.height / 2);
    return target !== heading && !heading.contains(target);
  });
  return {
    y: Math.round(scrollY), documentHeight: document.documentElement.scrollHeight,
    viewportHeight: innerHeight, headerBottom: Math.round(document.querySelector('#header').getBoundingClientRect().bottom),
    section: rect(section), list: rect(list), composition: rect(document.querySelector('.services-composition')),
    preview: rect(preview), rows: rows.map(row => ({ slug: row.dataset.service, ...rect(row) })),
    active: rows.filter(row => row.classList.contains('is-active')).map(row => row.dataset.service),
    activeImages: images.filter(image => image.classList.contains('is-active')).map(image => image.dataset.servicePreview),
    activeDescriptions: descriptions.filter(description => description.classList.contains('is-active')).map(description => description.dataset.serviceDescription),
    imagesLoaded: images.every(image => image.complete && image.naturalWidth > 0),
    detailFits: descriptions.every(description => description.scrollHeight <= description.clientHeight),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    visibleHeadingBlocked,
  };
};

async function scenario(browser, width, reduced) {
  const height = width === 360 ? 780 : width === 430 ? 932 : 844;
  const context = await browser.newContext({ viewport: { width, height }, isMobile: true, hasTouch: true,
    reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.locator('[data-services]').waitFor();
  await page.waitForTimeout(300);
  const events = [];
  const screenshots = new Set();
  const gesture = async (direction, pixels, phase, cycle) => {
    const before = await page.evaluate(measure);
    await page.mouse.wheel(0, direction === 'down' ? pixels : -pixels);
    await page.waitForTimeout(65);
    const after = await page.evaluate(measure);
    await page.waitForTimeout(45);
    const settled = await page.evaluate(measure);
    events.push({ phase, cycle, direction, pixels, before, after, settled });
    if (width === 390 && !reduced && phase === 'slow-down' && cycle === 0) {
      const slug = settled.active[0];
      const row = settled.rows.find(item => item.slug === slug);
      if (slug && row && !screenshots.has(slug) && settled.preview.top >= settled.headerBottom &&
        settled.preview.bottom < height && row.top >= settled.headerBottom && row.bottom < height) {
        await page.waitForTimeout(370);
        const capture = await page.evaluate(measure);
        if (capture.active[0] === slug) {
          await page.screenshot({ path: path.join(output, `${slug}.png`) });
          screenshots.add(slug);
        }
      }
    }
    return settled;
  };
  let state = await page.evaluate(measure);
  for (let i = 0; i < 20 && state.section.top > height * .7; i++) state = await gesture('down', 350, 'approach', 0);
  for (let cycle = 0; cycle < 3; cycle++) {
    for (let i = 0; i < 32 && state.section.bottom > state.headerBottom + 30; i++) state = await gesture('down', 55, 'slow-down', cycle);
    for (let i = 0; i < 32 && state.section.top < height * .6; i++) state = await gesture('up', 55, 'slow-up', cycle);
  }
  for (let i = 0; i < 8 && state.section.bottom > state.headerBottom + 30; i++) state = await gesture('down', 350, 'rapid-down', 0);
  for (let i = 0; i < 8 && state.section.top < height * .6; i++) state = await gesture('up', 350, 'rapid-up', 0);
  const down = events.filter(event => event.direction === 'down');
  const negative = down.filter(event => event.after.y < event.before.y - 3 || event.settled.y < event.after.y - 3);
  const activeCounts = events.map(event => event.settled.active.length);
  const heights = [...new Set(events.map(event => event.settled.documentHeight))];
  const sectionHeights = [...new Set(events.map(event => event.settled.section.height))];
  const activationsDown = [...new Set(events.filter(event => event.direction === 'down').map(event => event.settled.active[0]).filter(Boolean))];
  const activationsUp = [...new Set(events.filter(event => event.direction === 'up').map(event => event.settled.active[0]).filter(Boolean))];
  const summary = { width, height, reduced, gestures: events.length, negative: negative.length,
    worstDelta: Math.min(0, ...negative.map(event => Math.min(event.after.y - event.before.y, event.settled.y - event.after.y))),
    documentHeights: heights, sectionHeights, preview: events.at(-1).settled.preview,
    activationsDown, activationsUp, maxActiveCount: Math.max(...activeCounts), minActiveCount: Math.min(...activeCounts),
    imagesLoaded: events.some(event => event.settled.imagesLoaded), detailFits: events.every(event => event.settled.detailFits),
    blockedHeadings: events.filter(event => event.settled.visibleHeadingBlocked).length,
    overflow: Math.max(...events.map(event => event.settled.overflow)), screenshots: [...screenshots], errors };
  if (width === 390 && !reduced) {
    fs.writeFileSync(path.join(output, 'trace-390.csv'), 'phase,cycle,direction,pixels,beforeY,afterY,settledY,active,sectionHeight,documentHeight\n' +
      events.map(e => [e.phase, e.cycle, e.direction, e.pixels, e.before.y, e.after.y, e.settled.y, e.settled.active[0] || '', e.settled.section.height, e.settled.documentHeight].join(',')).join('\n'));
  }
  await context.close();
  return summary;
}

async function navigation(browser) {
  const routes = [];
  for (const slug of ['web-development', 'software', 'ai-automation', 'ui-ux-design']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    const link = page.locator(`[data-service="${slug}"]`);
    await Promise.all([page.waitForURL(`**/services/${slug}`), link.tap()]);
    routes.push({ slug, destination: new URL(page.url()).pathname });
    await context.close();
  }
  return routes;
}

async function desktop(browser, width) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  const result = await page.evaluate(() => ({
    cards: [...document.querySelectorAll('.svc-card')].map(card => ({
      width: Math.round(card.getBoundingClientRect().width), height: Math.round(card.getBoundingClientRect().height),
    })),
    desktopDisplay: getComputedStyle(document.querySelector('.desktop-services')).display,
    mobileDisplay: getComputedStyle(document.querySelector('.mobile-services')).display,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  await context.close();
  return { width, ...result, errors };
}

async function main() {
  const browser = await chromium.launch({ executablePath: chrome, headless: true });
  const results = [];
  let routes;
  let desktops;
  try {
    for (const reduced of [false, true]) for (const width of [360, 390, 430]) {
      const result = await scenario(browser, width, reduced);
      results.push(result);
      console.log(JSON.stringify(result));
    }
    routes = await navigation(browser);
    desktops = [await desktop(browser, 1280), await desktop(browser, 1440)];
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), results, routes, desktops }, null, 2));
  if (results.some(result => result.negative || result.maxActiveCount !== 1 || !result.imagesLoaded ||
    !result.detailFits || result.blockedHeadings || result.overflow || result.errors.length || result.sectionHeights.length !== 1) ||
    routes.some(route => !route.destination.endsWith(`/services/${route.slug}`)) ||
    desktops.some(result => result.cards.length !== 4 || result.mobileDisplay !== 'none' ||
      result.desktopDisplay !== 'grid' || result.overflow || result.errors.length)) process.exitCode = 1;
}
main().catch(error => { console.error(error); process.exitCode = 1; });
