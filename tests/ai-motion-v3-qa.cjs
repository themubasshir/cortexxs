let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }
const fs = require('node:fs');
const path = require('node:path');

const base = process.env.CORTEXX_QA_BASE || 'http://localhost/cortexx';
const route = base + '/services/ai-automation';
const out = path.join(__dirname, '../docs/qa/ai-motion-v3-20261031');
fs.mkdirSync(out, { recursive: true });
const widths = [360, 390, 430, 768, 1280, 1440];
const cardNames = ['workflow', 'sales', 'connected', 'search', 'product'];
const frameTimes = [0, 700, 1500, 2400];
const report = { route, widths: {}, illustrations: {}, sections: {}, reduced: {}, failures: [] };
const fail = message => report.failures.push(message);

const settle = page => page.evaluate(() => document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))));

// Pixel difference between two PNG screenshots, computed in the page with canvas.
async function diff(page, a, b) {
  return page.evaluate(async ([a, b]) => {
    const load = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = 'data:image/png;base64,' + src; });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const w = Math.min(ia.width, ib.width), h = Math.min(ia.height, ib.height);
    const read = img => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.drawImage(img, 0, 0); return x.getImageData(0, 0, w, h).data; };
    const da = read(ia), db = read(ib);
    let changed = 0;
    for (let i = 0; i < da.length; i += 4) if (Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]) > 24) changed++;
    return Math.round(changed / (w * h) * 10000) / 100;
  }, [a.toString('base64'), b.toString('base64')]);
}

function cardMetrics() {
  return [...document.querySelectorAll('.ai-capability-card')].map(card => {
    const cr = card.getBoundingClientRect();
    const p = card.querySelector('.ai-capability-copy p').getBoundingClientRect();
    const bottom = cr.bottom - parseFloat(getComputedStyle(card).borderBottomWidth);
    return { name: card.querySelector('h3').textContent.trim(), height: Math.round(cr.height * 10) / 10, padBottom: Math.round((bottom - p.bottom) * 10) / 10, scroll: card.scrollHeight, client: card.clientHeight, svgs: card.querySelectorAll('.ai-capability-art svg').length, imgs: card.querySelectorAll('.ai-capability-art img').length };
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    // 1. Every width: errors, stable scroll and height, full reveal, card text, overflow.
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: width < 800 ? 844 : 900 }, reducedMotion: 'no-preference', hasTouch: width < 800 });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      await page.goto(route, { waitUntil: 'networkidle' });
      await settle(page);
      const heightStart = await page.evaluate(() => document.documentElement.scrollHeight);
      let lastY = 0, backward = 0, heights = new Set([heightStart]);
      for (let i = 0; i < 200; i++) {
        await page.mouse.wheel(0, 240);
        await page.waitForTimeout(45);
        const { y, h, max } = await page.evaluate(() => ({ y: scrollY, h: document.documentElement.scrollHeight, max: document.documentElement.scrollHeight - innerHeight }));
        if (y < lastY - 1) backward++;
        lastY = y; heights.add(h);
        if (y >= max - 1) break;
      }
      await page.waitForTimeout(1600);
      const state = await page.evaluate(() => ({
        hidden: [...document.querySelectorAll('.ai-challenge, .ai-capability-card, .ai-case-card, .ai-recognition-tile')].filter(e => !e.classList.contains('is-in')).length,
        sections: [...document.querySelectorAll('.ai-challenges, .ai-capabilities, .ai-case, .ai-testimonials, .ai-recognition')].filter(e => !e.classList.contains('is-revealed')).length,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        init: document.querySelector('.ai-page').dataset.aiMotion,
        caseImage: (() => { const i = document.querySelector('.ai-case-image img'); return { fit: getComputedStyle(i).objectFit, clip: getComputedStyle(i).clipPath }; })(),
      }));
      await page.evaluate(() => document.querySelector('#capabilities').scrollIntoView({ block: 'start' }));
      await page.waitForTimeout(900);
      const cards = await page.evaluate(cardMetrics);
      const heightEnd = await page.evaluate(() => document.documentElement.scrollHeight);
      report.widths[width] = { errors, heightStart, heightEnd, heightsSeen: [...heights], backward, ...state, cards };
      if (errors.length) fail(`${width}: errors ${errors.join(' | ')}`);
      if (backward) fail(`${width}: ${backward} backward scroll jumps`);
      if (heights.size > 1 || heightEnd !== heightStart) fail(`${width}: document height changed ${[...heights]} -> ${heightEnd}`);
      if (state.hidden || state.sections) fail(`${width}: ${state.hidden} items / ${state.sections} sections not revealed`);
      if (state.overflow > 0) fail(`${width}: horizontal overflow ${state.overflow}`);
      if (state.caseImage.fit !== 'cover') fail(`${width}: case image object-fit ${state.caseImage.fit}`);
      for (const c of cards) {
        if (c.padBottom < 12 || c.scroll > c.client) fail(`${width}: ${c.name} clipped (pad ${c.padBottom}, ${c.scroll}/${c.client})`);
        if (c.svgs !== 1 || c.imgs !== 0) fail(`${width}: ${c.name} inline art svg=${c.svgs} img=${c.imgs}`);
      }
      const rows = {};
      for (const c of await page.evaluate(() => [...document.querySelectorAll('.ai-capability-card')].map(c => [Math.round(c.offsetTop), c.offsetHeight]))) (rows[c[0]] ||= []).push(c[1]);
      for (const hs of Object.values(rows)) if (Math.max(...hs) - Math.min(...hs) > 1) fail(`${width}: uneven card row ${hs}`);
      await page.locator('#capabilities').screenshot({ path: path.join(out, `capabilities-${width}.png`) });
      await context.close();
    }

    // 2. Illustration frames at 1440 and 390: pause each card's own animations at fixed times.
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' });
      const page = await context.newPage();
      await page.goto(route, { waitUntil: 'networkidle' });
      await settle(page);
      for (const [index, name] of cardNames.entries()) {
        const card = page.locator('.ai-capability-card').nth(index);
        await card.scrollIntoViewIfNeeded();
        await page.waitForFunction(i => document.querySelectorAll('.ai-capability-card')[i].querySelector('.ai-capability-art svg'), index);
        await page.waitForTimeout(800);
        await card.dispatchEvent('pointerenter');
        const animationCount = await card.evaluate(c => c.querySelector('.ai-capability-art svg').getAnimations({ subtree: true }).length);
        const shots = [];
        for (const t of frameTimes) {
          await card.evaluate((c, t) => c.querySelector('.ai-capability-art svg').getAnimations({ subtree: true }).forEach(a => { a.pause(); a.currentTime = t; }), t);
          await page.waitForTimeout(60);
          const file = path.join(out, `art-${name}-${width}-${t}ms.png`);
          shots.push(await page.locator('.ai-capability-art').nth(index).screenshot({ path: file }));
        }
        const diffs = [];
        for (let i = 1; i < shots.length; i++) diffs.push(await diff(page, shots[0], shots[i]));
        // Live playback check without pausing: two real-time frames 600ms apart must differ.
        await card.evaluate(c => c.querySelector('.ai-capability-art svg').getAnimations({ subtree: true }).forEach(a => { a.currentTime = 0; a.play(); }));
        await page.waitForTimeout(900);
        const liveA = await page.locator('.ai-capability-art').nth(index).screenshot();
        await page.waitForTimeout(600);
        const liveB = await page.locator('.ai-capability-art').nth(index).screenshot();
        const live = await diff(page, liveA, liveB);
        const playing = await page.evaluate(() => document.querySelectorAll('.ai-capability-card.is-animating').length);
        report.illustrations[`${name}-${width}`] = { animationCount, diffsVsRestPct: diffs, liveDiffPct: live, concurrentlyAnimating: playing };
        if (!animationCount) fail(`${name} ${width}: no animations`);
        if (Math.max(...diffs) < 0.3 || live < 0.05) fail(`${name} ${width}: frames not visibly different ${diffs} live ${live}`);
        if (playing > 1) fail(`${name} ${width}: ${playing} cards animating at once`);
      }
      // Offscreen: scrolling away must stop illustration playback.
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(800);
      const offscreen = await page.evaluate(() => ({ animating: document.querySelectorAll('.ai-capability-card.is-animating').length, running: [...document.querySelectorAll('.ai-capability-art svg')].flatMap(s => s.getAnimations({ subtree: true })).filter(a => a.playState === 'running').length }));
      report.illustrations[`offscreen-${width}`] = offscreen;
      if (offscreen.animating || offscreen.running) fail(`${width}: illustrations still running offscreen ${JSON.stringify(offscreen)}`);
      await context.close();
    }

    // 3. Section entrances: before/after frames and carousel state.
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: width < 800 ? 844 : 900 }, reducedMotion: 'no-preference' });
      const page = await context.newPage();
      await page.goto(route, { waitUntil: 'networkidle' });
      await settle(page);
      const sectionShots = {};
      for (const [key, selector] of [['challenges', '.ai-challenges'], ['case', '.ai-case'], ['testimonials', '.ai-testimonials .ai-container'], ['recognition', '.ai-recognition']]) {
        // Fresh load per section so earlier scrolling cannot pre-reveal it.
        await page.goto(route, { waitUntil: 'networkidle' });
        await settle(page);
        const target = page.locator(selector).first();
        await target.evaluate(el => el.scrollIntoView({ block: 'start' }));
        // Sample the computed state of the section's animated items frame by frame after arrival.
        await target.evaluate(el => { window.__aiSamples = new Promise(resolve => {
          const items = [...el.querySelectorAll('h2, .ai-challenge, .ai-case-card, .ai-case-details > *, .ai-case-image img, .ai-testimonial-track article, .ai-recognition-tile')];
          const seen = [];
          const read = () => {
            const ops = items.map(i => Number(getComputedStyle(i).opacity));
            seen.push(Math.round(ops.reduce((a, b) => a + b, 0) / Math.max(1, ops.length) * 100) / 100);
            if (seen.length < 50) requestAnimationFrame(read); else resolve({ count: items.length, min: Math.min(...seen), last: seen[seen.length - 1] });
          };
          read();
        }); });
        const early = await target.screenshot({ path: path.join(out, `${key}-${width}-entering.png`) });
        const samples = await page.evaluate(() => window.__aiSamples);
        sectionShots[key + 'Opacity'] = samples;
        if (!(samples.min < 0.6)) fail(`${key} ${width}: entrance not observed ${JSON.stringify(samples)}`);
        await page.waitForTimeout(1500);
        const settled = await target.screenshot({ path: path.join(out, `${key}-${width}-settled.png`) });
        sectionShots[key] = await diff(page, early, settled);
      }
      const track = page.locator('.ai-testimonial-track');
      await track.evaluate(el => el.scrollIntoView({ block: 'center' }));
      await page.waitForTimeout(400);
      const first = await page.locator('.ai-testimonial-track article:first-child footer strong').innerText();
      await track.screenshot({ path: path.join(out, `testimonials-${width}-initial.png`) });
      await page.locator('[data-testimonial-next]').click();
      await page.waitForTimeout(700);
      const afterNext = await page.locator('.ai-testimonial-track article:first-child footer strong').innerText();
      await track.screenshot({ path: path.join(out, `testimonials-${width}-next.png`) });
      await page.locator('[data-testimonial-prev]').click();
      await page.waitForTimeout(700);
      const afterPrev = await page.locator('.ai-testimonial-track article:first-child footer strong').innerText();
      await track.focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(700);
      const afterKey = await page.locator('.ai-testimonial-track article:first-child footer strong').innerText();
      const articles = await page.locator('.ai-testimonial-track article').count();
      report.sections[width] = { entranceDiffPct: sectionShots, carousel: { first, afterNext, afterPrev, afterKey, articles } };
      if (afterNext === first || afterPrev !== first || afterKey === first || articles !== 3) fail(`${width}: carousel ${JSON.stringify(report.sections[width].carousel)}`);
      await context.close();
    }

    // 4. Reduced motion: everything visible and static.
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.goto(route, { waitUntil: 'networkidle' });
      await settle(page);
      await page.evaluate(() => document.querySelector('#capabilities').scrollIntoView());
      await page.waitForTimeout(1500);
      const result = await page.evaluate(() => ({
        transparent: [...document.querySelectorAll('.ai-challenge, .ai-capability-card, .ai-case-card, .ai-case-details > *, .ai-recognition-tile, .ai-testimonial-track article, .ai-challenge-icon, .ai-case-image img')].filter(e => getComputedStyle(e).opacity !== '1').length,
        artRunning: [...document.querySelectorAll('.ai-capability-art svg')].flatMap(s => s.getAnimations({ subtree: true })).length,
        animating: document.querySelectorAll('.is-animating').length,
      }));
      await page.screenshot({ path: path.join(out, `reduced-${width}-full.png`), fullPage: true });
      report.reduced[width] = result;
      if (result.transparent || result.artRunning || result.animating) fail(`${width} reduced: ${JSON.stringify(result)}`);
      await context.close();
    }

    // 5. No JavaScript: original images and all content visible.
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(route, { waitUntil: 'networkidle' });
      const result = await page.evaluate(() => ({ imgs: document.querySelectorAll('.ai-capability-art img').length, hidden: [...document.querySelectorAll('.ai-challenge, .ai-capability-card, .ai-case-card, .ai-recognition-tile')].filter(e => getComputedStyle(e).opacity !== '1').length }));
      report.noJs = result;
      if (result.imgs !== 5 || result.hidden) fail(`no-js: ${JSON.stringify(result)}`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
  for (const [w, r] of Object.entries(report.widths)) console.log(`${w}px height ${r.heightStart}->${r.heightEnd} back ${r.backward} overflow ${r.overflow} cards ${r.cards.map(c => c.height + '/' + c.padBottom).join(' ')}`);
  for (const [k, r] of Object.entries(report.illustrations)) console.log(k, JSON.stringify(r));
  console.log('sections', JSON.stringify(report.sections));
  console.log('reduced', JSON.stringify(report.reduced), 'noJs', JSON.stringify(report.noJs));
  console.log(report.failures.length ? 'FAIL\n' + report.failures.join('\n') : 'PASS');
  process.exitCode = report.failures.length ? 1 : 0;
})();
