let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }
const fs = require('node:fs');
const path = require('node:path');

const base = process.env.CORTEXX_QA_BASE || 'http://localhost/cortexx';
const output = path.join(__dirname, '../docs/qa/ai-automation-20261027');
fs.mkdirSync(output, { recursive: true });
const result = { base, ai: {}, responsive: {}, homepage: {}, services: {}, errors: [] };

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    page.on('pageerror', error => result.errors.push({ route: 'ai', message: error.message }));
    page.on('console', message => { if (message.type() === 'error') result.errors.push({ route: 'ai console', message: message.text() }); });
    const response = await page.goto(base + '/services/ai-automation', { waitUntil: 'domcontentloaded', timeout: 30000 });
    result.ai.response = response.status();
    result.ai.finalUrl = page.url();
    result.ai.title = await page.title();
    result.ai.heading = await page.locator('h1').innerText();
    result.ai.artwork = await page.locator('.ai-workflow').count();
    result.ai.stylesheet = await page.locator('link[href*="ai-automation.css"]').getAttribute('href');
    result.ai.script = await page.locator('script[src*="ai-automation.js"]').getAttribute('src');
    result.ai.initiallyDeferredImages = await page.evaluate(() => [...document.images].filter(i => !i.complete).length);
    result.ai.heightInitial = await page.evaluate(() => document.documentElement.scrollHeight);
    result.ai.animationInitial = await page.locator('.ai-workflow').getAttribute('class');
    await page.screenshot({ path: path.join(output, 'hero-initial-1440.png') });
    await page.waitForTimeout(950);
    result.ai.animationMid = await page.locator('.ai-workflow').getAttribute('class');
    result.ai.heightMid = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: path.join(output, 'hero-mid-1440.png') });
    await page.waitForTimeout(1900);
    result.ai.animationSettled = await page.locator('.ai-workflow').getAttribute('class');
    result.ai.heightSettled = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: path.join(output, 'hero-settled-1440.png') });
    result.ai.heroGeometry = await page.evaluate(() => {
      const box = s => { const r = document.querySelector(s).getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }; };
      return { hero: box('.ai-hero'), heading: box('h1'), workflow: box('.ai-workflow'), buttons: [...document.querySelectorAll('.ai-hero .ai-button')].map(x => { const r = x.getBoundingClientRect(); return { x:r.x,y:r.y,width:r.width,height:r.height }; }) };
    });
    result.ai.heroOverlapsCtas = await page.evaluate(() => {
      const art = document.querySelector('.ai-workflow').getBoundingClientRect();
      return [...document.querySelectorAll('.ai-hero .ai-button')].some(button => {
        const r = button.getBoundingClientRect();
        return r.left < art.right && r.right > art.left && r.top < art.bottom && r.bottom > art.top;
      });
    });
    result.ai.motionFrames = await page.evaluate(async () => {
      const stamps = [];
      await new Promise(resolve => { const tick = time => { stamps.push(time); if (stamps.length >= 90) resolve(); else requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
      const gaps = stamps.slice(1).map((time, i) => time - stamps[i]);
      return { sampled: gaps.length, maxGapMs: Math.round(Math.max(...gaps)), meanGapMs: Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) };
    });
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(100);
    result.ai.offscreenClass = await page.locator('.ai-workflow').getAttribute('class');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    result.ai.returnClass = await page.locator('.ai-workflow').getAttribute('class');
    await page.locator('img[loading="lazy"]').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
    await page.waitForFunction(() => [...document.images].every(image => image.complete), null, { timeout: 10000 });
    result.ai.brokenImages = await page.evaluate(() => [...document.images].filter(image => image.naturalWidth === 0).map(image => image.src));
    await page.screenshot({ path: path.join(output, 'full-page-1440.png'), fullPage: true });

    for (const width of [360, 390, 430, 768, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(80);
      const metrics = await page.evaluate(() => ({
        viewport: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        h1Size: getComputedStyle(document.querySelector('h1')).fontSize,
        h1Rect: document.querySelector('h1').getBoundingClientRect().toJSON(),
        artworkRect: document.querySelector('.ai-workflow').getBoundingClientRect().toJSON(),
        ctaRects: [...document.querySelectorAll('.ai-hero .ai-button')].map(x => x.getBoundingClientRect().toJSON()),
        sectionOrder: [...document.querySelectorAll('main > section')].map(x => x.className.split(' ')[0]),
      }));
      result.responsive[width] = metrics;
      if ([390, 1440].includes(width)) await page.screenshot({ path: path.join(output, `full-page-${width}.png`), fullPage: true });
      if ([360, 390, 430, 768].includes(width)) await page.screenshot({ path: path.join(output, `hero-${width}.png`) });
    }
    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const mobile = await mobileContext.newPage();
    mobile.on('pageerror', error => result.errors.push({ route: 'ai reduced', message: error.message }));
    await mobile.goto(base + '/services/ai-automation', { waitUntil: 'domcontentloaded' });
    await mobile.waitForTimeout(150);
    result.ai.reducedMotion = await mobile.evaluate(() => ({ media: matchMedia('(prefers-reduced-motion: reduce)').matches, workflowClass: document.querySelector('.ai-workflow').className, cards: [...document.querySelectorAll('.ai-flow-card')].map(x => ({ opacity: getComputedStyle(x).opacity, visibility: getComputedStyle(x).visibility })), status: getComputedStyle(document.querySelector('.ai-workflow-status')).opacity }));
    await mobile.screenshot({ path: path.join(output, 'hero-reduced-390.png') });
    await mobile.locator('.ai-menu-button').click();
    result.ai.menuOpened = await mobile.locator('.ai-mobile-nav').isVisible();
    await mobile.keyboard.press('Escape');
    result.ai.menuClosed = await mobile.locator('.ai-mobile-nav').isHidden();
    await mobileContext.close();

    await page.setViewportSize({ width: 1440, height: 900 });
    page.on('pageerror', error => result.errors.push({ route: 'home', message: error.message }));
    const homeResponse = await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    result.homepage.response = homeResponse.status();
    result.homepage.heading = await page.locator('h1').innerText();
    result.homepage.desktopCards = await page.locator('.desktop-services .svc-card').count();
    result.homepage.links = await page.locator('.service-row').evaluateAll(els => els.map(el => ({ href: el.getAttribute('href'), text: el.innerText })));
    result.homepage.carousel = await page.locator('#testimonialCarousel').count();
    await page.locator('#tNext').click();
    await page.waitForTimeout(200);
    result.homepage.carouselTransformDuringClick = await page.locator('#testimonialCarousel .testimonial-track').first().evaluate(el => getComputedStyle(el).transform);
    result.homepage.carouselMoved = !['none', 'matrix(1, 0, 0, 1, 0, 0)'].includes(result.homepage.carouselTransformDuringClick);
    await page.waitForTimeout(500);
    result.homepage.footer = await page.locator('.footer').count();
    await page.locator('.footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    result.homepage.footerRevealed = await page.locator('.footer').evaluate(el => el.classList.contains('footer-in'));
    result.homepage.newsletterInvalid = await page.locator('#newsForm input[type=email]').evaluate(el => el.validity.valid);
    await page.locator('#newsForm input[type=email]').fill('bad-email');
    await page.locator('#newsForm button[type=submit]').click();
    result.homepage.newsletterMessage = await page.locator('#newsMsg').innerText();
    await page.screenshot({ path: path.join(output, 'homepage-1440.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    await page.locator('#menuToggle').click();
    result.homepage.mobileMenuOpened = await page.locator('#mobileNav').evaluate(el => el.classList.contains('open'));
    await page.locator('#menuClose').click();
    result.homepage.mobileMenuClosed = await page.locator('#mobileNav').evaluate(el => !el.classList.contains('open'));
    result.homepage.mobileServices = await page.locator('.mobile-services .service-row').count();
    result.homepage.mobileActiveBefore = await page.locator('.mobile-services .service-row.is-active').getAttribute('data-service');
    await page.locator('.mobile-services .service-row[data-service="ai-automation"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await page.locator('.mobile-services .service-row[data-service="ai-automation"]').focus();
    await page.waitForTimeout(100);
    result.homepage.mobileActiveAfter = await page.locator('.mobile-services .service-row.is-active').getAttribute('data-service');
    result.homepage.mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    result.homepage.mobileScrollHeightBefore = await page.evaluate(() => document.documentElement.scrollHeight);
    result.homepage.mobileScrollPositions = [];
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, 180));
      result.homepage.mobileScrollPositions.push(await page.evaluate(() => Math.round(scrollY)));
    }
    await page.waitForTimeout(150);
    result.homepage.mobileScrollHeightAfter = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: path.join(output, 'homepage-390.png'), fullPage: true });
    for (const slug of ['web-development', 'software', 'ai-automation', 'ui-ux-design']) {
      const r = await page.goto(base + '/services/' + slug, { waitUntil: 'domcontentloaded' });
      result.services[slug] = { status: r.status(), finalUrl: page.url(), body: (await page.locator('body').innerText()).slice(0, 80) };
    }
    await context.close();
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result, null, 2));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
