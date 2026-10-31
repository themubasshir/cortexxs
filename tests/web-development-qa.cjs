let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { launchOptions } = require('./qa-browser.cjs');

const base = process.env.CORTEXX_QA_BASE || 'http://localhost/cortexx';
const route = base + '/services/web-development';
const output = path.join(__dirname, '../docs/qa/web-development-20261031');
fs.mkdirSync(output, { recursive: true });
const result = { base, wd: {}, responsive: {}, homepage: {}, errors: [] };
const studioClass = page => page.locator('.wd-studio').getAttribute('class');
const watch = (page, label) => {
  page.on('pageerror', error => result.errors.push({ route: label, message: error.message }));
  page.on('console', message => { if (message.type() === 'error') result.errors.push({ route: label + ' console', message: message.text() }); });
  page.on('response', response => { if (response.status() >= 400) result.errors.push({ route: 'HTTP', status: response.status(), url: response.url() }); });
};
const carouselMoves = async page => {
  await page.evaluate(() => { window.__qaFirst = document.querySelector('#testimonialCarousel .testimonial-track').firstElementChild; });
  await page.locator('#tNext').click();
  await page.waitForFunction(() => document.querySelector('#testimonialCarousel .testimonial-track').firstElementChild !== window.__qaFirst, null, { timeout: 3000 }).catch(() => {});
  return page.evaluate(() => document.querySelector('#testimonialCarousel .testimonial-track').firstElementChild !== window.__qaFirst);
};

(async () => {
  const browser = await chromium.launch(launchOptions({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' }, base));
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    watch(page, 'wd');
    const response = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 30000 });
    result.wd.response = response.status();
    result.wd.title = await page.title();
    result.wd.heading = await page.locator('h1').innerText();
    result.wd.stylesheet = await page.locator('link[href*="web-development.css"]').getAttribute('href');
    result.wd.script = await page.locator('script[src*="web-development.js"]').getAttribute('src');
    await page.waitForFunction(() => document.querySelector('.wd-studio').classList.contains('is-playing'), null, { timeout: 5000 });
    result.wd.heightInitial = await page.evaluate(() => document.documentElement.scrollHeight);
    result.wd.animationInitial = await studioClass(page);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(output, 'hero-initial-1440.png') });
    await page.waitForTimeout(1000);
    result.wd.animationMid = await studioClass(page);
    await page.screenshot({ path: path.join(output, 'hero-mid-1440.png') });
    await page.waitForTimeout(2200);
    result.wd.animationSettled = await studioClass(page);
    result.wd.heightSettled = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: path.join(output, 'hero-settled-1440.png') });
    result.wd.heroOverlapsCtas = await page.evaluate(() => {
      const card = document.querySelector('.wd-studio').getBoundingClientRect();
      return [...document.querySelectorAll('.wd-actions .btn')].some(b => { const r = b.getBoundingClientRect(); return r.left < card.right && r.right > card.left && r.top < card.bottom && r.bottom > card.top; });
    });
    await page.locator('.wd-motion-toggle').click();
    result.wd.pausedClass = await studioClass(page);
    result.wd.pausedState = await page.locator('.wd-motion-toggle').evaluate(el => [el.getAttribute('aria-pressed'), el.getAttribute('aria-label')]);
    await page.locator('.wd-motion-toggle').click();
    result.wd.resumedClass = await studioClass(page);
    result.wd.resumedState = await page.locator('.wd-motion-toggle').evaluate(el => [el.getAttribute('aria-pressed'), el.getAttribute('aria-label')]);
    result.wd.motionFrames = await page.evaluate(async () => {
      const stamps = [];
      await new Promise(resolve => { const tick = t => { stamps.push(t); if (stamps.length >= 90) resolve(); else requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
      const gaps = stamps.slice(1).map((t, i) => t - stamps[i]);
      return { maxGapMs: Math.round(Math.max(...gaps)), meanGapMs: Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) };
    });
    await page.evaluate(() => scrollTo(0, 1600));
    await page.waitForTimeout(150);
    result.wd.offscreenClass = await studioClass(page);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(150);
    result.wd.returnClass = await studioClass(page);

    // Duplicate-init guard: loading the script a second time must not double-bind handlers.
    await page.addScriptTag({ url: await page.locator('script[src*="web-development.js"]').getAttribute('src') });
    const firstButton = page.locator('.wd-acc-item').nth(0).locator('button');
    await firstButton.click();
    result.wd.accordion = await page.evaluate(() => [...document.querySelectorAll('.wd-acc-item')].map(i => [i.classList.contains('is-open'), i.querySelector('button').getAttribute('aria-expanded')]));
    await firstButton.click();
    result.wd.accordionClosed = await page.evaluate(() => document.querySelectorAll('.wd-acc-item.is-open').length);
    await page.locator('.wd-acc-item').nth(2).locator('button').click();

    await page.locator('.wd-compare-range').evaluate(el => { el.value = '30'; el.dispatchEvent(new Event('input', { bubbles: true })); });
    result.wd.compareSplit = await page.locator('.wd-compare-frame').evaluate(el => el.style.getPropertyValue('--split'));
    await page.locator('.wd-compare-range').evaluate(el => { el.value = '50'; el.dispatchEvent(new Event('input', { bubbles: true })); });

    result.wd.blankRegions = await page.locator('.wd-blank').evaluateAll(els => els.map(el => ({ imgs: el.querySelectorAll('img').length, bg: getComputedStyle(el).backgroundImage.includes('url(') })));
    result.wd.carouselCount = await page.locator('#testimonialCarousel').count();
    result.wd.aiCarousel = await page.locator('.ai-testimonial-track').count();
    result.wd.carouselRows = await page.locator('#testimonialCarousel .testimonial-row').count();
    await page.locator('#testimonialCarousel').scrollIntoViewIfNeeded();
    result.wd.carouselMoved = await carouselMoves(page);

    for (const selector of ['.wd-featured', '.wd-work', '.wd-services', '.wd-process', '.testi', '.footer']) {
      await page.locator(selector).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
    }
    result.wd.steps = await page.locator('.wd-step.is-active').count();
    result.wd.footerRevealed = await page.locator('.footer').evaluate(el => el.classList.contains('footer-in'));
    await page.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 10000 });
    result.wd.brokenImages = await page.evaluate(() => [...document.images].filter(i => i.naturalWidth === 0).map(i => i.src));
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(output, 'full-page-1440.png'), fullPage: true });
    for (const [name, selector] of [['featured', '.wd-featured'], ['work', '.wd-work'], ['whatwedo', '.wd-services'], ['process', '.wd-process'], ['testi', '.wd-testimonials']]) {
      await page.locator(selector).screenshot({ path: path.join(output, `section-${name}-1440.png`) });
    }

    for (const width of [360, 390, 430, 768, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(250);
      result.responsive[width] = await page.evaluate(() => {
        const clipped = [...document.querySelectorAll('.wd-page h1, .wd-page h2, .wd-page h3, .wd-page p, .wd-pill, .wd-page .btn')]
          .filter(el => el.closest('.wd-stage') === null && el.offsetParent && el.scrollWidth > el.clientWidth + 1)
          .map(el => el.className || el.tagName + ':' + el.textContent.slice(0, 30));
        const card = document.querySelector('.wd-studio').getBoundingClientRect();
        const ctas = [...document.querySelectorAll('.wd-actions .btn')].map(b => b.getBoundingClientRect());
        return {
          scrollWidth: document.documentElement.scrollWidth,
          h1Size: getComputedStyle(document.querySelector('h1')).fontSize,
          studio: { width: Math.round(card.width), height: Math.round(card.height) },
          ctaOverlap: ctas.some(r => r.left < card.right && r.right > card.left && r.top < card.bottom && r.bottom > card.top),
          clipped,
          work: [...document.querySelectorAll('.wd-work-card')].map(c => {
            const media = c.querySelector('.wd-work-media');
            const img = media.querySelector('img');
            const m = media.getBoundingClientRect();
            const r = img ? img.getBoundingClientRect() : null;
            return {
              title: c.querySelector('h3').textContent,
              src: img ? img.getAttribute('src').split('/').pop() : null,
              alt: img ? img.alt : null,
              natural: img ? [img.naturalWidth, img.naturalHeight] : null,
              mediaRatio: m.width / m.height,
              imgFill: r ? [Math.abs(r.width - m.width) < 1, Math.abs(r.height - m.height) < 1] : null,
              fit: img ? getComputedStyle(img).objectFit : null,
              radius: getComputedStyle(media).borderRadius,
              overflow: getComputedStyle(media).overflow,
              blank: media.classList.contains('wd-blank'),
            };
          }),
        };
      });
      if ([390, 1440].includes(width)) {
        await page.screenshot({ path: path.join(output, `full-page-${width}.png`), fullPage: true });
        await page.locator('.wd-work').screenshot({ path: path.join(output, `section-work-${width}.png`) });
      }
      if (width !== 1440) await page.screenshot({ path: path.join(output, `hero-${width}.png`) });
    }
    await context.close();

    const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const mobile = await reduced.newPage();
    watch(mobile, 'wd reduced');
    await mobile.goto(route, { waitUntil: 'networkidle' });
    await mobile.waitForTimeout(150);
    result.wd.reducedMotion = await mobile.evaluate(() => ({
      media: matchMedia('(prefers-reduced-motion: reduce)').matches,
      studioClass: document.querySelector('.wd-studio').className,
      stageOpacity: getComputedStyle(document.querySelector('.wd-stage')).opacity,
      articlesOpacity: [...document.querySelectorAll('.wd-article')].map(a => getComputedStyle(a).opacity),
      typedClip: getComputedStyle(document.querySelector('.wd-typed')).clipPath,
    }));
    await mobile.screenshot({ path: path.join(output, 'hero-reduced-390.png') });
    await mobile.locator('#menuToggle').click();
    result.wd.menuOpened = await mobile.locator('#mobileNav').evaluate(el => el.classList.contains('open'));
    await mobile.locator('#menuClose').click();
    await reduced.close();

    const homeContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const home = await homeContext.newPage();
    watch(home, 'home');
    result.homepage.response = (await home.goto(base + '/', { waitUntil: 'networkidle' })).status();
    result.homepage.carouselCount = await home.locator('#testimonialCarousel').count();
    result.homepage.sectionId = await home.locator('.testi').getAttribute('id');
    await home.locator('#testimonialCarousel').scrollIntoViewIfNeeded();
    result.homepage.carouselMoved = await carouselMoves(home);
    await home.locator('#tToggle').click();
    result.homepage.toggle = await home.locator('#tToggle').evaluate(el => [el.textContent, el.getAttribute('aria-pressed')]);
    await home.locator('.testi').screenshot({ path: path.join(output, 'homepage-testimonials-1440.png') });
    await homeContext.close();

    assert.equal(result.wd.response, 200);
    assert.match(result.wd.animationInitial, /is-playing/);
    assert.match(result.wd.animationMid, /is-playing/);
    assert.match(result.wd.animationSettled, /is-settled/);
    assert.equal(result.wd.heightInitial, result.wd.heightSettled);
    assert.equal(result.wd.heroOverlapsCtas, false);
    assert.equal(result.wd.pausedClass, 'wd-studio');
    assert.deepEqual(result.wd.pausedState, ['true', 'Play animation']);
    assert.match(result.wd.resumedClass, /is-settled/);
    assert.deepEqual(result.wd.resumedState, ['false', 'Pause animation']);
    assert.equal(result.wd.offscreenClass, 'wd-studio');
    assert.match(result.wd.returnClass, /is-settled/);
    assert.deepEqual(result.wd.accordion.map(x => x[0]), [true, false, false, false, false]);
    assert.deepEqual(result.wd.accordion.map(x => x[1]), ['true', 'false', 'false', 'false', 'false']);
    assert.equal(result.wd.accordionClosed, 0);
    assert.equal(result.wd.compareSplit, '30%');
    // Only the before/after compare panels stay blank; work cards carry supplied images.
    assert.equal(result.wd.blankRegions.length, 2);
    assert.equal(result.wd.blankRegions.every(r => r.imgs === 0 && !r.bg), true);
    assert.equal(result.wd.carouselCount, 1);
    assert.equal(result.wd.aiCarousel, 0);
    assert.equal(result.wd.carouselRows, 2);
    assert.equal(result.wd.carouselMoved, true);
    assert.equal(result.wd.steps, 6);
    assert.equal(result.wd.footerRevealed, true);
    assert.equal(result.wd.brokenImages.length, 0);
    for (const [width, m] of Object.entries(result.responsive)) {
      assert.equal(m.scrollWidth, Number(width), `overflow at ${width}`);
      assert.equal(m.ctaOverlap, false, `CTA overlap at ${width}`);
      assert.deepEqual(m.clipped, [], `clipped text at ${width}`);
      assert.deepEqual(m.work.map(w => [w.title, w.src]), [['Nexora', 'nexora.png'], ['Haven', 'haven.png']], `work mapping at ${width}`);
      for (const w of m.work) {
        assert.equal(w.blank, false, `${w.title} still blank at ${width}`);
        assert.ok(w.alt.length > 0, `${w.title} alt at ${width}`);
        assert.deepEqual(w.natural, [604, 500], `${w.title} natural size at ${width}`);
        assert.ok(Math.abs(w.mediaRatio - 604 / 500) < 0.01, `${w.title} media ratio at ${width}`);
        assert.deepEqual(w.imgFill, [true, true], `${w.title} img fill at ${width}`);
        assert.equal(w.fit, 'cover');
        assert.equal(w.radius, '16px 16px 0px 0px');
        assert.equal(w.overflow, 'hidden');
      }
    }
    assert.equal(result.wd.reducedMotion.media, true);
    assert.equal(result.wd.reducedMotion.studioClass, 'wd-studio');
    assert.equal(result.wd.reducedMotion.stageOpacity, '1');
    assert.equal(result.wd.reducedMotion.articlesOpacity.every(o => o === '1'), true);
    assert.equal(result.wd.menuOpened, true);
    assert.equal(result.homepage.response, 200);
    assert.equal(result.homepage.carouselCount, 1);
    assert.equal(result.homepage.sectionId, 'about');
    assert.equal(result.homepage.carouselMoved, true);
    assert.deepEqual(result.homepage.toggle, ['Play', 'true']);
    assert.equal(result.errors.length, 0);
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result, null, 2));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
