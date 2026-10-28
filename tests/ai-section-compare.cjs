const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }

const base = process.env.CORTEXX_QA_BASE || 'http://localhost/cortexx';
const output = path.resolve(__dirname, '../docs/qa/ai-reconstruction-20261027');
const sections = [
  ['hero', '.ai-hero'], ['challenges', '.ai-challenges'], ['capabilities', '.ai-capabilities'],
  ['process', '.ai-process'], ['case', '.ai-case'], ['testimonials', '.ai-testimonials'], ['footer', '.footer'],
];

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const response = await page.goto(base + '/services/ai-automation', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img[loading="lazy"]').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
  await page.waitForFunction(() => [...document.images].every(image => image.complete));
  const measured = {};
  for (const [name, selector] of sections) {
    const box = await page.locator(selector).boundingBox();
    measured[name] = box;
    await page.screenshot({ path: path.join(output, `current-${name}.png`), fullPage: true, clip: { x: 0, y: box.y, width: 1440, height: box.height }, animations: 'disabled' });
  }
  const recognition = await page.locator('.ai-recognition').boundingBox();
  measured.recognition = recognition;
  await page.screenshot({ path: path.join(output, 'current-recognition.png'), fullPage: true, clip: { x: 0, y: recognition.y, width: 1440, height: recognition.height }, animations: 'disabled' });
  await browser.close();
  fs.writeFileSync(path.join(output, 'current-sections.json'), JSON.stringify({ status: response.status(), url: page.url(), measured, errors }, null, 2));
  execFileSync('python', [path.resolve(__dirname, '../scripts/compare-ai-crops.py'), output, ...sections.map(([name]) => name), 'recognition']);
  console.log(JSON.stringify({ status: response.status(), errors, measured }, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
