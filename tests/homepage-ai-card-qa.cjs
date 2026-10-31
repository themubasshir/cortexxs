const fs = require('node:fs');
const path = require('node:path');
const { launchOptions } = require('./qa-browser.cjs');
const assert = require('node:assert/strict');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }

const base = process.env.CORTEXX_QA_BASE || 'http://localhost/cortexx';
const out = path.join(__dirname, '../docs/qa/homepage-ai-card-20261028');
fs.mkdirSync(out, { recursive: true });
const routes = {
  software: '/services/software',
  'web-development': '/services/web-development',
  'ui-ux-design': '/services/ui-ux-design',
  'ai-automation': '/services/ai-automation',
};

(async () => {
  const browser = await chromium.launch(launchOptions({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' }, base));
  const report = { base, desktop: {}, mobile: {}, errors: [] };
  try {
    for (const width of [1280, 1440, 360, 390, 430]) {
      const desktop = width > 1024;
      const context = await browser.newContext({ viewport: { width, height: desktop ? 900 : width === 360 ? 780 : width === 390 ? 844 : 932 }, hasTouch: !desktop });
      const page = await context.newPage();
      page.on('pageerror', error => report.errors.push({ width, kind: 'pageerror', message: error.message }));
      page.on('console', message => { if (message.type() === 'error') report.errors.push({ width, kind: 'console', message: message.text() }); });
      const response = await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const section = page.locator('#capabilities');
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(650);
      const card = page.locator('.desktop-services .svc-card').filter({ hasText: 'AI & Automation' });
      const row = page.locator('.mobile-services .service-row[data-service="ai-automation"]');
      const all = await page.evaluate(() => ({
        desktop: [...document.querySelectorAll('.desktop-services .svc-card')].map(el => ({ title: el.querySelector('h3')?.textContent.trim(), href: el.getAttribute('href'), tag: el.tagName })),
        mobile: [...document.querySelectorAll('.mobile-services .service-row')].map(el => ({ slug: el.dataset.service, href: el.getAttribute('href'), tag: el.tagName })),
      }));
      assert.equal(all.desktop.length, 4);
      assert.equal(all.mobile.length, 4);
      assert.deepEqual(all.desktop.map(item => item.href), [routes.software, routes['web-development'], routes['ui-ux-design'], routes['ai-automation']].map(route => base.replace('http://localhost', '') + route));
      assert.deepEqual(all.mobile.map(item => item.href), [routes['web-development'], routes.software, routes['ai-automation'], routes['ui-ux-design']].map(route => base.replace('http://localhost', '') + route));
      assert(all.desktop.every(item => item.tag === 'A') && all.mobile.every(item => item.tag === 'A'), 'service destinations must be anchors');
      const initial = await page.evaluate(() => ({ y: scrollY, height: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth }));
      assert.equal(initial.overflow, false);

      if (desktop) {
        const box = await card.boundingBox();
        const dimensions = { width: Math.round(box.width), height: Math.round(box.height) };
        assert.deepEqual(dimensions, width === 1280 ? { width: 281, height: 190 } : { width: 293, height: 190 });
        const icon = await card.evaluate(el => ({ circle: el.querySelector('.svc-icon circle')?.getAttribute('r'), arrow: el.querySelector('.svc-go svg path')?.getAttribute('d'), nestedAnchor: !!el.querySelector('a') }));
        assert.equal(icon.circle, '5');
        assert.equal(icon.arrow, 'M2 12L12 2M4 2h8v8');
        assert.equal(icon.nestedAnchor, false);
        const beforeHover = await card.evaluate(el => ({ border: getComputedStyle(el).borderColor, arrow: getComputedStyle(el.querySelector('.svc-go')).backgroundColor }));
        await card.hover();
        await page.waitForTimeout(750);
        const hover = await card.evaluate(el => ({ border: getComputedStyle(el).borderColor, arrow: getComputedStyle(el.querySelector('.svc-go')).backgroundColor, transform: getComputedStyle(el).transform }));
        assert.notEqual(hover.border, beforeHover.border);
        assert.notEqual(hover.arrow, beforeHover.arrow);
        assert(Number(hover.transform.match(/-?[\d.]+(?=\)$)/)?.[0]) < -3, `${width}: hover lift did not run`);
        await page.screenshot({ path: path.join(out, `desktop-${width}-hover.png`) });
        await card.click();
        assert.equal(page.url(), base + routes['ai-automation']);
        await page.goBack({ waitUntil: 'domcontentloaded' });
        await section.scrollIntoViewIfNeeded();
        await card.locator('.svc-go').click();
        assert.equal(page.url(), base + routes['ai-automation']);
        await page.goBack({ waitUntil: 'domcontentloaded' });
        let tabs = 0;
        while (tabs < 80 && !(await card.evaluate(el => document.activeElement === el))) {
          await page.keyboard.press('Tab');
          tabs++;
        }
        assert(tabs < 80, `${width}: card could not be reached by Tab`);
        const focus = await card.evaluate(el => ({ visible: el.matches(':focus-visible'), arrow: getComputedStyle(el.querySelector('.svc-go svg')).stroke }));
        assert.equal(focus.visible, true);
        await page.screenshot({ path: path.join(out, `desktop-${width}-focus.png`) });
        await page.keyboard.press('Enter');
        await page.waitForURL(base + routes['ai-automation']);
        assert.equal(page.url(), base + routes['ai-automation']);
        report.desktop[width] = { dimensions, beforeHover, hover, focus, tabs, cardClick: true, arrowClick: true, enter: true };
      } else {
        assert(await row.isVisible());
        await row.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        const previewBefore = await page.locator('.service-preview').boundingBox();
        await page.screenshot({ path: path.join(out, `mobile-${width}-row.png`) });
        await row.tap();
        await page.waitForURL(base + routes['ai-automation']);
        assert.equal(page.url(), base + routes['ai-automation']);
        await page.goBack({ waitUntil: 'domcontentloaded' });
        await page.locator('.mobile-services').scrollIntoViewIfNeeded();
        await page.waitForTimeout(160);
        const previewAfter = await page.locator('.service-preview').boundingBox();
        assert(Math.abs(previewBefore.width - previewAfter.width) < 1 && Math.abs(previewBefore.height - previewAfter.height) < 1, `${width}: preview geometry changed`);
        const scrollBefore = await page.evaluate(() => scrollY);
        await page.evaluate(() => scrollBy({ top: 180, behavior: 'instant' }));
        await page.waitForTimeout(120);
        const scrollAfter = await page.evaluate(() => scrollY);
        assert(scrollAfter >= scrollBefore, `${width}: returning home caused a backward scroll jump`);
        report.mobile[width] = { oneTap: true, previewBefore: { width: previewBefore.width, height: previewBefore.height }, previewAfter: { width: previewAfter.width, height: previewAfter.height }, scrollBefore, scrollAfter };
        await row.tap();
        await page.waitForURL(base + routes['ai-automation']);
        assert.equal(page.url(), base + routes['ai-automation']);
      }
      const hero = page.locator('.ai-workflow');
      assert(await hero.count() === 1, `${width}: destination hero missing`);
      const timeline = page.locator('.ai-step-list');
      assert(await timeline.locator('li').count() === 6, `${width}: destination timeline missing`);
      const destinationHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const target = await page.evaluate(() => {
        const last = document.querySelector('.ai-step-list li:last-child .ai-step-number').getBoundingClientRect();
        return Math.round(last.top + scrollY + last.height / 2 - innerHeight * .72 + 4);
      });
      await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), target);
      await page.waitForTimeout(100);
      assert(await timeline.locator('li.is-active').count() === 6, `${width}: destination timeline did not activate`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.equal(await page.evaluate(() => document.documentElement.scrollHeight), destinationHeight, `${width}: destination page height changed`);
      await context.close();
    }
    assert.equal(report.errors.length, 0);
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
