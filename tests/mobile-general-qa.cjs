// Local browser regression checks. Never sends a valid newsletter submission.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const base = process.env.CORTEXX_QA_URL || 'http://localhost/cortexx/';
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const output = path.join(__dirname, '..', 'docs', 'qa', 'mobile-scroll-20261024', 'general.json');
const slugs = ['web-development', 'software', 'ai-automation', 'ui-ux-design'];

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: chrome });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const routes = [];
    for (const slug of slugs) {
      await page.goto(base, { waitUntil: 'networkidle' });
      const link = page.locator(`[data-service="${slug}"]`);
      const before = await link.evaluate(element => ({
        name: element.innerText.trim(),
        href: element.getAttribute('href'),
        image: element.querySelector('img').getAttribute('src'),
        decorative: element.querySelector('.service-preview').getAttribute('aria-hidden'),
      }));
      await link.focus();
      const focusable = await link.evaluate(element => document.activeElement === element);
      await link.click();
      routes.push({ slug, before, focusable, destination: new URL(page.url()).pathname });
    }
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.locator('#testimonialCarousel').scrollIntoViewIfNeeded();
    const track = page.locator('.testimonial-track').first();
    const carouselBefore = await track.evaluate(element => getComputedStyle(element).transform);
    await page.waitForTimeout(1100);
    const carouselAfter = await track.evaluate(element => getComputedStyle(element).transform);
    await page.locator('#tToggle').click();
    const paused = await track.evaluate(element => getComputedStyle(element).animationPlayState);
    await page.locator('#tToggle').click();
    const resumed = await track.evaluate(element => getComputedStyle(element).animationPlayState);
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    const footerEntered = await page.locator('.footer').evaluate(element => element.classList.contains('footer-in'));
    await page.locator('#work').scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    const footerLeft = await page.locator('.footer').evaluate(element => element.classList.contains('footer-in'));
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    const footerReentered = await page.locator('.footer').evaluate(element => element.classList.contains('footer-in'));
    await page.locator('#newsForm input[type="email"]').fill('invalid');
    await page.locator('#newsForm button').click();
    const newsletter = await page.locator('#newsMsg').innerText();
    const overflow = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - innerWidth));
    const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await reduced.goto(base, { waitUntil: 'networkidle' });
    const reducedState = await reduced.evaluate(() => ({
      previewTransition: getComputedStyle(document.querySelector('.service-preview img')).transitionDuration,
      carouselToggle: document.querySelector('#tToggle').getAttribute('aria-pressed'),
    }));
    const report = { routes, carousel: { moved: carouselBefore !== carouselAfter, paused, resumed },
      footer: { entered: footerEntered, left: footerLeft, reentered: footerReentered },
      newsletter, overflow, reducedState, errors };
    fs.writeFileSync(output, JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
    if (routes.some(route => !route.focusable || route.destination !== `/cortexx/services/${route.slug}` || route.before.decorative !== 'true')
      || !report.carousel.moved || paused !== 'paused' || resumed !== 'running'
      || !footerEntered || footerLeft || !footerReentered || !newsletter.includes('valid email')
      || overflow || parseFloat(reducedState.previewTransition) > .0015 || reducedState.carouselToggle !== 'true' || errors.length) process.exitCode = 1;
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
