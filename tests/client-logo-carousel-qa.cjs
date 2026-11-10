const assert = require('node:assert/strict');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }

const url = process.env.CORTEXX_QA_URL || 'http://127.0.0.1:8770/';
const names = ['VeloSys', 'Intuitive Technologies', 'FutureTV', 'Lantra', 'GolfView Hotel', 'Calyx'];

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    for (const width of [1440, 430, 390, 360]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      const carousel = page.locator('.trust-logos');
      await carousel.scrollIntoViewIfNeeded();
      assert.deepEqual(await carousel.locator('.trust-set:first-child img').evaluateAll(images => images.map(image => image.alt)), names);
      assert.equal(await carousel.locator('.trust-set').count(), 4);
      assert.equal(await carousel.locator('.trust-set[aria-hidden="true"]').count(), 3);
      assert.equal(await carousel.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), true);
      assert.equal(await carousel.locator('img').evaluateAll(images => images.every(image => image.currentSrc.includes('/client-logos/'))), true);
      const logoBase = new URL('../', await carousel.locator('img').first().evaluate(image => image.currentSrc));
      for (const name of ['lumina', 'vortex', 'velocity', 'synergy', 'enigma', 'spectrum']) {
        const logo = await page.request.get(new URL(`brand-${name}.svg`, logoBase).href);
        assert.equal(logo.status(), 200, `${name} testimonial logo must remain available`);
      }
      assert.equal(await page.getByText('Trusted by 50,000+ businesses').count(), 0);
      assert.equal(await page.getByText('Trusted by over 100 businesses').count(), 0);
      const geometry = await carousel.evaluate(element => {
        const track = element.querySelector('.trust-track');
        const sets = [...track.querySelectorAll('.trust-set')];
        const first = sets[0].querySelector('img');
        const second = sets[1].querySelector('img');
        const animation = track.getAnimations()[0];
        const duration = animation.effect.getTiming().duration;
        animation.pause();
        animation.currentTime = 0;
        const start = first.getBoundingClientRect().left;
        animation.currentTime = duration - 0.01;
        const end = second.getBoundingClientRect().left;
        return {
          setWidths: sets.map(set => set.getBoundingClientRect().width),
          jump: Math.abs(start - end),
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
          objectFit: getComputedStyle(first).objectFit,
        };
      });
      assert.ok(Math.max(...geometry.setWidths) - Math.min(...geometry.setWidths) < 0.01);
      assert.ok(geometry.jump < 1, `Visible loop jump: ${geometry.jump}px`);
      assert.equal(geometry.horizontalOverflow, false);
      assert.equal(geometry.objectFit, 'contain');
      assert.deepEqual(errors, []);

      await carousel.hover();
      assert.equal(await carousel.locator('.trust-track').evaluate(track => getComputedStyle(track).animationPlayState), 'paused');
      await carousel.locator('.trust-track').focus();
      assert.equal(await carousel.locator('.trust-track').evaluate(track => getComputedStyle(track).animationPlayState), 'paused');

      await page.emulateMedia({ reducedMotion: 'reduce' });
      const reduced = await carousel.evaluate(element => ({
        animation: getComputedStyle(element.querySelector('.trust-track')).animationName,
        visibleSets: [...element.querySelectorAll('.trust-set')].filter(set => getComputedStyle(set).display !== 'none').length,
        scrollable: element.scrollWidth > element.clientWidth,
        contentWidth: element.querySelector('.trust-track').getBoundingClientRect().width,
        viewportWidth: element.clientWidth,
      }));
      assert.equal(reduced.animation, 'none');
      assert.equal(reduced.visibleSets, 1);
      assert.equal(reduced.scrollable, reduced.contentWidth > reduced.viewportWidth);
      console.log(`${width}px: six images loaded, loop jump ${geometry.jump.toFixed(3)}px, no overflow or console errors; reduced motion usable`);
      await page.close();
    }
    const noJs = await browser.newPage({ javaScriptEnabled: false });
    await noJs.goto(url, { waitUntil: 'load' });
    assert.equal(await noJs.locator('.trust-set:first-child img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), true);
    console.log('No-JavaScript: six logos loaded');
    await noJs.close();
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
