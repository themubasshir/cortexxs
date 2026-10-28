const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }
const output = path.resolve(__dirname, '../docs/qa/ai-animation-repair-20261028', process.argv[2] || 'controls');
fs.mkdirSync(output, { recursive: true });
const inspect = () => {
  const workflow = document.querySelector('.ai-workflow');
  const signal = workflow.querySelector('.ai-signal-enquiry');
  const svg = workflow.querySelector('.ai-workflow-svg');
  return { className: workflow.className, signalTranslate: getComputedStyle(signal).translate, signalOpacity: getComputedStyle(signal).opacity, signalAnimation: getComputedStyle(signal).animationName, svgOpacity: getComputedStyle(svg).opacity, height: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth, buttonLabel: workflow.querySelector('.ai-motion-toggle').getAttribute('aria-label') };
};
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const result = { errors };
  try {
    const response = await page.goto('http://localhost/cortexx/services/ai-automation', { waitUntil: 'domcontentloaded' });
    result.status = response.status();
    await page.waitForTimeout(4400);
    result.running = await page.evaluate(inspect);
    await page.locator('.ai-motion-toggle').click();
    result.paused = await page.evaluate(inspect);
    await page.locator('.ai-hero').screenshot({ path: path.join(output, 'paused.png') });
    await page.waitForTimeout(750);
    result.pausedLater = await page.evaluate(inspect);
    await page.locator('.ai-hero').screenshot({ path: path.join(output, 'paused-later.png') });
    await page.locator('.ai-motion-toggle').click();
    result.resumed = await page.evaluate(inspect);
    await page.waitForTimeout(650);
    result.resumedLater = await page.evaluate(inspect);
    await page.locator('.ai-hero').screenshot({ path: path.join(output, 'resumed.png') });
    await page.evaluate(() => scrollTo({ top: 1200, behavior: 'instant' }));
    await page.waitForTimeout(150);
    result.offscreen = await page.evaluate(inspect);
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(150);
    result.onscreenAgain = await page.evaluate(inspect);
    const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await reduced.goto('http://localhost/cortexx/services/ai-automation', { waitUntil: 'domcontentloaded' });
    result.reduced = await reduced.evaluate(() => {
      const workflow = document.querySelector('.ai-workflow');
      const signal = workflow.querySelector('.ai-signal-enquiry');
      return { className: workflow.className, media: matchMedia('(prefers-reduced-motion: reduce)').matches, signalAnimation: getComputedStyle(signal).animationName, overflow: document.documentElement.scrollWidth > innerWidth, nodeOpacities: ['1027:245','1027:274','1027:336','1027:309','1027:364'].map(id => getComputedStyle(document.querySelector('[data-figma-id="' + id + '"]')).opacity) };
    });
    await reduced.locator('.ai-hero').screenshot({ path: path.join(output, 'reduced.png') });
    await reduced.close();
    assert.equal(result.status, 200);
    assert.match(result.running.className, /is-settled/);
    assert.equal(result.paused.className, 'ai-workflow');
    assert.equal(result.paused.signalAnimation, 'none');
    assert.equal(result.pausedLater.signalTranslate, result.paused.signalTranslate);
    assert.match(result.resumedLater.className, /is-settled/);
    assert.notEqual(result.resumedLater.signalTranslate, result.resumed.signalTranslate);
    assert.equal(result.offscreen.className, 'ai-workflow');
    assert.match(result.onscreenAgain.className, /is-settled/);
    assert.equal(result.reduced.media && result.reduced.nodeOpacities.every(value => value === '1'), true);
    assert.equal(result.reduced.signalAnimation, 'none');
    assert.equal(new Set([result.running.height,result.paused.height,result.pausedLater.height,result.resumedLater.height]).size, 1);
    assert.equal(result.running.overflow || result.reduced.overflow, false);
    assert.equal(errors.length, 0);
  } finally { await browser.close(); fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(result, null, 2)); console.log(JSON.stringify(result, null, 2)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
