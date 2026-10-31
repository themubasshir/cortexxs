let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { launchOptions } = require('./qa-browser.cjs');

const base = process.env.CORTEXX_QA_BASE || 'http://localhost/cortexx';
const route = base + '/services/software';
const output = process.env.CORTEXX_QA_OUT || path.join(__dirname, '../docs/qa/software-20261031');
fs.mkdirSync(output, { recursive: true });
const result = { base, sw: {}, responsive: {}, errors: [] };
const heroClass = page => page.locator('.sw-hero').getAttribute('class');
const shot = (page, name, opts = {}) => page.screenshot({ path: path.join(output, name), ...opts });
const watch = (page, label) => {
  page.on('pageerror', error => result.errors.push({ route: label, message: error.message }));
  page.on('console', message => { if (message.type() === 'error') result.errors.push({ route: label + ' console', message: message.text() }); });
  page.on('response', response => { if (response.status() >= 400) result.errors.push({ route: 'HTTP', status: response.status(), url: response.url() }); });
};
const firstCard = page => page.evaluate(() => document.querySelector('.sw-testimonials .ai-testimonial-track article footer strong').textContent);

(async () => {
  const browser = await chromium.launch(launchOptions({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' }, base));
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    watch(page, 'sw');
    const response = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30000 });
    result.sw.response = response.status();
    result.sw.title = await page.title();
    result.sw.heading = await page.locator('h1').innerText();
    result.sw.stylesheet = await page.locator('link[href*="software.css"]').getAttribute('href');
    result.sw.scripts = await page.locator('script[src*="software.js"], script[src*="testimonial-carousel.js"]').evaluateAll(s => s.map(x => x.getAttribute('src')));
    result.sw.aiCss = await page.locator('link[href*="ai-automation.css"]').count();
    await page.waitForFunction(() => document.querySelector('.sw-hero').classList.contains('is-playing'), null, { timeout: 5000 });
    // Web-font swap reflows text; measure layout stability of the motion itself after fonts settle.
    await page.evaluate(() => document.fonts.ready);
    result.sw.heightInitial = await page.evaluate(() => document.documentElement.scrollHeight);
    result.sw.animationInitial = await heroClass(page);
    await page.waitForTimeout(250);
    await shot(page, 'hero-initial-1440.png');
    await page.waitForTimeout(1050);
    result.sw.animationMid = await heroClass(page);
    await shot(page, 'hero-mid-1440.png');
    await page.waitForTimeout(2000);
    result.sw.animationSettled = await heroClass(page);
    result.sw.heightSettled = await page.evaluate(() => document.documentElement.scrollHeight);
    await shot(page, 'hero-settled-1440.png');
    result.sw.heroOverlapsCtas = await page.evaluate(() => {
      const card = document.querySelector('.sw-studio').getBoundingClientRect();
      return [...document.querySelectorAll('.sw-actions .btn')].some(b => { const r = b.getBoundingClientRect(); return r.left < card.right && r.right > card.left && r.top < card.bottom && r.bottom > card.top; });
    });
    await page.locator('.sw-motion-toggle').click();
    result.sw.pausedClass = await heroClass(page);
    result.sw.pausedState = await page.locator('.sw-motion-toggle').evaluate(el => [el.getAttribute('aria-pressed'), el.getAttribute('aria-label')]);
    await shot(page, 'hero-paused-1440.png');
    await page.locator('.sw-motion-toggle').click();
    result.sw.resumedClass = await heroClass(page);
    result.sw.resumedState = await page.locator('.sw-motion-toggle').evaluate(el => [el.getAttribute('aria-pressed'), el.getAttribute('aria-label')]);
    result.sw.motionFrames = await page.evaluate(async () => {
      const stamps = [];
      await new Promise(resolve => { const tick = t => { stamps.push(t); if (stamps.length >= 90) resolve(); else requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
      const gaps = stamps.slice(1).map((t, i) => t - stamps[i]);
      return { maxGapMs: Math.round(Math.max(...gaps)), meanGapMs: Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) };
    });
    await page.evaluate(() => scrollTo(0, 1600));
    await page.waitForTimeout(200);
    result.sw.offscreenClass = await heroClass(page);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(200);
    result.sw.returnClass = await heroClass(page);

    // Duplicate-init guards: loading both scripts again must not double-bind.
    for (const src of result.sw.scripts) await page.addScriptTag({ url: src });
    await page.locator('.sw-motion-toggle').click();
    result.sw.toggleAfterReinit = await page.locator('.sw-motion-toggle').getAttribute('aria-pressed');
    await page.locator('.sw-motion-toggle').click();

    await page.locator('.sw-compare-range').evaluate(el => { el.value = '30'; el.dispatchEvent(new Event('input', { bubbles: true })); });
    result.sw.compareSplit = await page.locator('.sw-compare-frame').evaluate(el => el.style.getPropertyValue('--split'));
    await page.locator('.sw-compare-range').evaluate(el => { el.value = '50'; el.dispatchEvent(new Event('input', { bubbles: true })); });

    result.sw.blankRegions = await page.locator('.sw-blank').evaluateAll(els => els.map(el => {
      const r = el.getBoundingClientRect();
      return { cls: el.className, w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, radius: getComputedStyle(el).borderRadius, imgs: el.querySelectorAll('img').length, bg: getComputedStyle(el).backgroundImage.includes('url(') };
    }));
    result.sw.replacementImages = await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('.sw-avatars img, .sw-work-media img')];
      imgs.forEach(i => { i.loading = 'eager'; });
      await Promise.all(imgs.map(i => i.decode().catch(() => null)));
      return imgs.map(i => {
        const r = i.getBoundingClientRect();
        const cs = getComputedStyle(i);
        return { src: i.getAttribute('src').split('/').pop(), alt: i.alt, natural: [i.naturalWidth, i.naturalHeight], box: [Math.round(r.width * 10) / 10, Math.round(r.height * 10) / 10], fit: cs.objectFit, card: i.closest('.sw-build-card, .sw-work-card').querySelector('h3').textContent.trim() };
      });
    });
    result.sw.carouselRoots = await page.locator('[data-testimonial-carousel]').count();
    result.sw.homeCarousel = await page.locator('#testimonialCarousel').count();
    result.sw.sectionOrder = await page.evaluate(() => [...document.querySelectorAll('.sw-page main > section')].map(s => s.className.split(' ').find(c => c.startsWith('sw-') && c !== 'sw-section')));

    await page.locator('.sw-testimonials').scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    result.sw.carousel = { initial: await firstCard(page) };
    await page.locator('.sw-testimonials').screenshot({ path: path.join(output, 'testimonials-initial-1440.png') });
    await page.locator('[data-testimonial-next]').click();
    await page.waitForTimeout(600);
    result.sw.carousel.afterNext = await firstCard(page);
    await page.locator('.sw-testimonials').screenshot({ path: path.join(output, 'testimonials-next-1440.png') });
    await page.locator('[data-testimonial-prev]').click();
    await page.waitForTimeout(600);
    result.sw.carousel.afterPrev = await firstCard(page);
    await page.locator('[data-testimonial-prev]').click();
    await page.waitForTimeout(600);
    result.sw.carousel.wrapped = await firstCard(page);
    await page.locator('.sw-testimonials .ai-testimonial-track').focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(600);
    result.sw.carousel.keyboard = await firstCard(page);
    result.sw.carousel.hidden = await page.locator('.sw-testimonials .ai-testimonial-track article').evaluateAll(a => a.map(x => x.getAttribute('aria-hidden')));

    for (const selector of ['.sw-featured', '.sw-work', '.sw-build', '.sw-process', '.sw-testimonials', '.footer']) {
      await page.locator(selector).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
    }
    result.sw.steps = await page.locator('.sw-step.is-active').count();
    result.sw.buildIn = await page.locator('.sw-build-card.in').count();
    result.sw.footerRevealed = await page.locator('.footer').evaluate(el => el.classList.contains('footer-in'));
    await page.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 10000 });
    result.sw.brokenImages = await page.evaluate(() => [...document.images].filter(i => i.naturalWidth === 0).map(i => i.src));
    await page.waitForTimeout(800);
    // Element captures: blur the carousel and hide the sticky header so it does not paint over sections.
    await page.evaluate(() => { document.activeElement?.blur(); document.querySelector('.site-header').style.visibility = 'hidden'; });
    for (const [name, selector] of [['hero', '.sw-hero'], ['featured', '.sw-featured'], ['work', '.sw-work'], ['build', '.sw-build'], ['process', '.sw-process'], ['testimonials', '.sw-testimonials']]) {
      await page.locator(selector).screenshot({ path: path.join(output, `section-${name}-1440.png`) });
    }
    await page.locator('.sw-build-card').first().screenshot({ path: path.join(output, 'closeup-saas-1440.png') });
    await page.locator('.sw-members').screenshot({ path: path.join(output, 'closeup-saas-members-1440.png') });
    await page.locator('.sw-work-grid').screenshot({ path: path.join(output, 'closeup-work-1440.png') });
    await page.evaluate(() => { document.querySelector('.site-header').style.visibility = ''; });

    for (const width of [360, 390, 430, 768, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(300);
      result.responsive[width] = await page.evaluate(() => {
        const clipped = [...document.querySelectorAll('.sw-page h1, .sw-page h2, .sw-page h3, .sw-page p, .sw-pill, .sw-page .btn')]
          .filter(el => el.closest('.sw-stage, .sw-art') === null && el.offsetParent && el.scrollWidth > el.clientWidth + 1)
          .map(el => el.className || el.tagName + ':' + el.textContent.slice(0, 30));
        const card = document.querySelector('.sw-studio').getBoundingClientRect();
        const ctas = [...document.querySelectorAll('.sw-actions .btn')].map(b => b.getBoundingClientRect());
        const track = document.querySelector('.sw-testimonials .ai-testimonial-track').getBoundingClientRect();
        const visibleCards = [...document.querySelectorAll('.sw-testimonials .ai-testimonial-track article')].filter(a => { const r = a.getBoundingClientRect(); return r.left >= track.left - 1 && r.right <= track.right + 1; }).length;
        return {
          scrollWidth: document.documentElement.scrollWidth,
          h1Size: getComputedStyle(document.querySelector('h1')).fontSize,
          studio: { width: Math.round(card.width), height: Math.round(card.height) },
          ctaOverlap: ctas.some(r => r.left < card.right && r.right > card.left && r.top < card.bottom && r.bottom > card.top),
          clipped,
          visibleCards,
          pageHeight: document.documentElement.scrollHeight,
        };
      });
      if ([390, 1440].includes(width)) {
        // Footer reveal and other scroll effects need a pass before the full-page capture.
        for (let y = 0; y < result.responsive[width].pageHeight; y += 700) { await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), y); await page.waitForTimeout(60); }
        await page.waitForTimeout(800);
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForTimeout(300);
        await shot(page, `full-page-${width}.png`, { fullPage: true });
      }
      if (width === 390) {
        await page.evaluate(() => { document.querySelector('.site-header').style.visibility = 'hidden'; });
        for (const [name, selector] of [['featured', '.sw-featured'], ['work', '.sw-work'], ['build', '.sw-build'], ['process', '.sw-process'], ['testimonials', '.sw-testimonials']]) {
          await page.locator(selector).screenshot({ path: path.join(output, `section-${name}-390.png`) });
        }
        await page.evaluate(() => { document.querySelector('.site-header').style.visibility = ''; });
      }
      if (width !== 1440) await page.locator('.sw-hero').screenshot({ path: path.join(output, `hero-${width}.png`) });
    }
    await context.close();

    const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const mobile = await reduced.newPage();
    watch(mobile, 'sw reduced');
    await mobile.goto(route, { waitUntil: 'networkidle' });
    await mobile.waitForTimeout(150);
    result.sw.reducedMotion = await mobile.evaluate(() => ({
      media: matchMedia('(prefers-reduced-motion: reduce)').matches,
      heroClass: document.querySelector('.sw-hero').className,
      copyOpacity: getComputedStyle(document.querySelector('.sw-hero-copy')).opacity,
      studioOpacity: getComputedStyle(document.querySelector('.sw-studio')).opacity,
      cardsOpacity: [...document.querySelectorAll('.sw-card, .sw-code, .sw-chart')].map(a => getComputedStyle(a).opacity),
      typedClip: getComputedStyle(document.querySelector('.sw-typed')).clipPath,
      toggleDisplay: getComputedStyle(document.querySelector('.sw-motion-toggle')).display,
    }));
    await mobile.screenshot({ path: path.join(output, 'hero-reduced-390.png') });
    await mobile.locator('#menuToggle').click();
    result.sw.menuOpened = await mobile.locator('#mobileNav').evaluate(el => el.classList.contains('open'));
    await mobile.locator('#menuClose').click();
    await reduced.close();

    assert.equal(result.sw.response, 200);
    assert.equal(result.sw.aiCss, 0);
    assert.match(result.sw.animationInitial, /is-playing/);
    assert.match(result.sw.animationMid, /is-playing/);
    assert.match(result.sw.animationSettled, /is-settled/);
    assert.equal(result.sw.heightInitial, result.sw.heightSettled);
    assert.equal(result.sw.heroOverlapsCtas, false);
    assert.equal(result.sw.pausedClass, 'sw-hero');
    assert.deepEqual(result.sw.pausedState, ['true', 'Play animation']);
    assert.match(result.sw.resumedClass, /is-settled/);
    assert.deepEqual(result.sw.resumedState, ['false', 'Pause animation']);
    assert.equal(result.sw.offscreenClass, 'sw-hero');
    assert.match(result.sw.returnClass, /is-settled/);
    assert.equal(result.sw.toggleAfterReinit, 'true');
    assert.equal(result.sw.compareSplit, '30%');
    assert.equal(result.sw.blankRegions.length, 2);
    assert.deepEqual(result.sw.replacementImages.map(i => [i.src, i.card]), [
      ['software-cr.png', 'Cr'], ['software-readplots.png', 'ReadPlots'],
      ['software-member-1.png', 'Custom Software & SaaS'], ['software-member-2.png', 'Custom Software & SaaS'], ['software-member-3.png', 'Custom Software & SaaS'],
    ]);
    for (const i of result.sw.replacementImages) {
      assert.ok(i.natural[0] > 0 && i.alt, `image ${i.src}`);
      assert.equal(i.fit, 'cover', `object-fit ${i.src}`);
    }
    assert.equal(result.sw.blankRegions.every(r => r.imgs === 0 && !r.bg), true);
    assert.equal(result.sw.carouselRoots, 1);
    assert.equal(result.sw.homeCarousel, 0);
    assert.deepEqual(result.sw.sectionOrder, ['sw-hero', 'sw-featured', 'sw-work', 'sw-build', 'sw-process', 'sw-testimonials']);
    assert.notEqual(result.sw.carousel.afterNext, result.sw.carousel.initial);
    assert.equal(result.sw.carousel.afterPrev, result.sw.carousel.initial);
    assert.notEqual(result.sw.carousel.wrapped, result.sw.carousel.initial);
    assert.equal(result.sw.carousel.keyboard, result.sw.carousel.initial);
    assert.deepEqual(result.sw.carousel.hidden, ['false', 'false', 'false']);
    assert.equal(result.sw.steps, 6);
    assert.equal(result.sw.buildIn, 5);
    assert.equal(result.sw.footerRevealed, true);
    assert.equal(result.sw.brokenImages.length, 0);
    const expectedCards = { 360: 1, 390: 1, 430: 1, 768: 2, 1280: 3, 1440: 3 };
    for (const [width, m] of Object.entries(result.responsive)) {
      assert.equal(m.scrollWidth, Number(width), `overflow at ${width}`);
      assert.equal(m.ctaOverlap, false, `CTA overlap at ${width}`);
      assert.deepEqual(m.clipped, [], `clipped text at ${width}`);
      assert.equal(m.visibleCards, expectedCards[width], `visible testimonials at ${width}`);
    }
    assert.equal(result.sw.reducedMotion.media, true);
    assert.equal(result.sw.reducedMotion.heroClass, 'sw-hero');
    assert.equal(result.sw.reducedMotion.copyOpacity, '1');
    assert.equal(result.sw.reducedMotion.studioOpacity, '1');
    assert.equal(result.sw.reducedMotion.cardsOpacity.every(o => o === '1'), true);
    assert.equal(result.sw.menuOpened, true);
    assert.equal(result.errors.length, 0);
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result, null, 2));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
