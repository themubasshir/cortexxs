const fs = require('node:fs');
const path = require('node:path');
const { launchOptions } = require('./qa-browser.cjs');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }

const base = process.env.CORTEXX_QA_BASE || 'http://localhost/cortexx';
const out = path.join(__dirname, '../docs/qa/ai-motion-v2-20261028');
fs.mkdirSync(out, { recursive: true });
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await chromium.launch(launchOptions({
    headless: true,
    executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  }, base));
  const report = { route: base + '/services/ai-automation', timeline: {}, carousel: {}, responsive: {}, reveals: {}, errors: [] };
  try {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 900 : 844 }, hasTouch: width === 390 });
      const page = await context.newPage();
      page.on('pageerror', error => report.errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
      const response = await page.goto(report.route, { waitUntil: 'domcontentloaded' });
      assert(response.status() === 200, `${width}: route failed`);
      await page.evaluate(() => document.fonts.ready);
      const geometry = await page.evaluate(() => {
        const list = document.querySelector('.ai-step-list');
        const markers = [...list.querySelectorAll('.ai-step-number')];
        return {
          centers: markers.map(marker => { const r = marker.getBoundingClientRect(); return r.top + scrollY + r.height / 2; }),
          height: document.documentElement.scrollHeight,
        };
      });
      const state = async () => page.evaluate(() => {
        const list = document.querySelector('.ai-step-list');
        const listRect = list.getBoundingClientRect();
        const first = list.querySelector('.ai-step-number').getBoundingClientRect();
        const steps = [...list.querySelectorAll('li')];
        const css = getComputedStyle(list);
        return {
          active: steps.map((step, index) => step.classList.contains('is-active') ? index + 1 : null).filter(Boolean),
          progress: Number(css.getPropertyValue('--ai-timeline-progress').trim()),
          lineLeft: Number.parseFloat(css.getPropertyValue('--ai-line-left')),
          firstCenterX: first.left + first.width / 2 - listRect.left,
          height: document.documentElement.scrollHeight,
          scrollY,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      const samples = [];
      for (const number of [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]) {
        const y = Math.round(geometry.centers[number - 1] - (width === 1440 ? 900 : 844) * .72 + 4);
        await page.evaluate(target => scrollTo({ top: target, behavior: 'instant' }), y);
        await page.waitForTimeout(140);
        const value = await state();
        value.targetStep = number;
        value.expectedScroll = y;
        samples.push(value);
        assert(value.active.length === number, `${width}: expected ${number} active steps, got ${value.active}`);
        assert(Math.abs(value.scrollY - y) < 2, `${width}: scroll moved unexpectedly`);
        assert(Math.abs(value.lineLeft - value.firstCenterX) < 1, `${width}: line/circle center mismatch`);
        assert(value.height === geometry.height, `${width}: document height changed`);
        assert(!value.overflow, `${width}: horizontal overflow`);
        if ([1, 3, 6].includes(number) && samples.length <= 6) {
          await page.screenshot({ path: path.join(out, `timeline-${width}-step-${number}.png`) });
        }
      }
      assert(samples.slice(1, 6).every((sample, index) => sample.progress > samples[index].progress), `${width}: connector did not grow through all six steps`);
      assert(samples.slice(6).every((sample, index) => sample.progress < samples[index + 5].progress), `${width}: connector did not retract through all six steps`);
      report.timeline[width] = samples;

      await page.locator('.ai-testimonials').scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      const names = async () => page.locator('.ai-testimonial-track article>footer strong').allTextContents();
      const original = await names();
      assert(original.length === 3 && new Set(original).size === 3, `${width}: testimonial data was duplicated`);
      await page.screenshot({ path: path.join(out, `carousel-${width}-first.png`) });
      await page.locator('[data-testimonial-next]').click();
      await page.waitForTimeout(150);
      const midAnimations = await page.locator('.ai-testimonial-track').evaluate(el =>
        [...el.querySelectorAll('article')].flatMap(card => card.getAnimations()).filter(animation => animation.playState === 'running').length);
      assert(midAnimations === 3, `${width}: cards did not animate between positions`);
      await page.screenshot({ path: path.join(out, `carousel-${width}-mid.png`) });
      await page.waitForTimeout(500);
      const next = await names();
      assert(next.join('|') === [original[1], original[2], original[0]].join('|'), `${width}: next did not rotate one card`);
      await page.screenshot({ path: path.join(out, `carousel-${width}-next.png`) });
      await page.locator('[data-testimonial-prev]').click();
      await page.waitForTimeout(650);
      assert((await names()).join('|') === original.join('|'), `${width}: previous did not reverse one card`);
      await page.locator('[data-testimonial-prev]').click();
      await page.waitForTimeout(650);
      const wrapped = await names();
      assert(wrapped.join('|') === [original[2], original[0], original[1]].join('|'), `${width}: previous wrap failed`);
      await page.screenshot({ path: path.join(out, `carousel-${width}-wrapped.png`) });
      await page.locator('.ai-testimonial-track').focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(650);
      assert((await names()).join('|') === original.join('|'), `${width}: keyboard navigation failed`);
      const carouselState = await page.evaluate(() => {
        const track = document.querySelector('.ai-testimonial-track');
        const cards = [...track.querySelectorAll('article')];
        const visible = cards.filter(card => card.getAttribute('aria-hidden') === 'false');
        return {
          cardCount: cards.length,
          visibleCount: visible.length,
          focusVisible: track.matches(':focus-visible'),
          height: document.documentElement.scrollHeight,
          overflow: document.documentElement.scrollWidth > innerWidth,
          clipped: visible.some(card => {
            const box = card.getBoundingClientRect();
            const quote = card.querySelector('blockquote').getBoundingClientRect();
            const author = card.querySelector('footer').getBoundingClientRect();
            return quote.bottom > box.bottom + 1 || author.bottom > box.bottom + 1;
          }),
        };
      });
      assert(carouselState.visibleCount === (width === 390 ? 1 : 3), `${width}: visible card count incorrect`);
      assert(!carouselState.overflow && !carouselState.clipped && carouselState.height === geometry.height, `${width}: carousel clipping, overflow, or height change`);
      if (width === 390) {
        const box = await page.locator('.ai-testimonial-track').boundingBox();
        const client = await context.newCDPSession(page);
        const startX = box.x + box.width * .75;
        const endX = box.x + box.width * .25;
        const y = box.y + box.height / 2;
        await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: startX, y }] });
        for (let i = 1; i <= 5; i++) {
          await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: startX + (endX - startX) * i / 5, y }] });
          await sleep(15);
        }
        await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        await page.waitForTimeout(650);
        assert((await names()).join('|') === next.join('|'), 'mobile swipe failed');
        carouselState.swipe = true;
      }
      report.carousel[width] = { original, next, wrapped, midAnimations, ...carouselState };
      await context.close();
    }

    const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const reducedPage = await reduced.newPage();
    await reducedPage.goto(report.route, { waitUntil: 'domcontentloaded' });
    report.reduced = await reducedPage.evaluate(() => ({
      active: document.querySelectorAll('.ai-step-list li.is-active').length,
      progress: Number(getComputedStyle(document.querySelector('.ai-step-list')).getPropertyValue('--ai-timeline-progress')),
      textVisible: [...document.querySelectorAll('.ai-step-list li>div')].every(el => getComputedStyle(el).opacity === '1'),
    }));
    assert(report.reduced.active === 6 && report.reduced.progress === 1 && report.reduced.textVisible, 'reduced timeline incomplete');
    const reducedFirst = await reducedPage.locator('.ai-testimonial-track article:first-child footer strong').innerText();
    await reducedPage.locator('[data-testimonial-next]').click();
    report.reduced.carouselFirstAfterNext = await reducedPage.locator('.ai-testimonial-track article:first-child footer strong').innerText();
    report.reduced.carouselAnimations = await reducedPage.locator('.ai-testimonial-track').evaluate(el =>
      [...el.querySelectorAll('article')].flatMap(card => card.getAnimations()).filter(animation => animation.playState === 'running').length);
    assert(report.reduced.carouselFirstAfterNext !== reducedFirst && report.reduced.carouselAnimations === 0, 'reduced carousel did not advance without motion');
    await reducedPage.locator('.ai-process').scrollIntoViewIfNeeded();
    await reducedPage.screenshot({ path: path.join(out, 'timeline-390-reduced.png') });
    await reduced.close();

    const revealContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const revealPage = await revealContext.newPage();
    await revealPage.goto(report.route, { waitUntil: 'domcontentloaded' });
    const revealHeight = await revealPage.evaluate(() => document.documentElement.scrollHeight);
    for (const selector of ['.ai-challenges', '.ai-capabilities', '.ai-case', '.ai-testimonials', '.ai-recognition']) {
      await revealPage.locator(selector).scrollIntoViewIfNeeded();
      await revealPage.waitForTimeout(700);
      const visible = await revealPage.locator(selector).evaluate(el => el.classList.contains('is-revealed'));
      assert(visible, `${selector}: reveal did not complete`);
      report.reveals[selector] = visible;
    }
    report.reveals.heightBefore = revealHeight;
    report.reveals.heightAfter = await revealPage.evaluate(() => document.documentElement.scrollHeight);
    assert(report.reveals.heightBefore === report.reveals.heightAfter, 'section reveals changed document height');
    await revealContext.close();

    const noJs = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
    const noJsPage = await noJs.newPage();
    await noJsPage.goto(report.route, { waitUntil: 'domcontentloaded' });
    report.noJavaScript = await noJsPage.evaluate(() => {
      const track = document.querySelector('.ai-testimonial-track');
      return {
        challengeVisible: getComputedStyle(document.querySelector('.ai-challenge')).opacity === '1',
        timelineTextVisible: [...document.querySelectorAll('.ai-step-list li>div')].every(el => getComputedStyle(el).opacity === '1'),
        cardsScrollable: track.scrollWidth > track.clientWidth,
      };
    });
    assert(report.noJavaScript.challengeVisible && report.noJavaScript.timelineTextVisible && report.noJavaScript.cardsScrollable, 'no-JS fallback hid content');
    await noJs.close();

    for (const width of [360, 430, 768, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.goto(report.route, { waitUntil: 'domcontentloaded' });
      report.responsive[width] = await page.evaluate(() => {
        const track = document.querySelector('.ai-testimonial-track');
        const visible = [...track.querySelectorAll('article')].filter(card => card.getAttribute('aria-hidden') === 'false');
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          visibleCount: visible.length,
          clipped: visible.some(card => {
            const box = card.getBoundingClientRect();
            const quote = card.querySelector('blockquote').getBoundingClientRect();
            const author = card.querySelector('footer').getBoundingClientRect();
            return quote.bottom > box.bottom + 1 || author.bottom > box.bottom + 1;
          }),
          height: document.documentElement.scrollHeight,
        };
      });
      const value = report.responsive[width];
      assert(!value.overflow && !value.clipped && value.visibleCount === (width <= 520 ? 1 : width <= 1100 ? 2 : 3), `${width}: responsive carousel failed`);
      await context.close();
    }
    assert(!report.errors.length, `browser errors: ${report.errors.join('; ')}`);
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
