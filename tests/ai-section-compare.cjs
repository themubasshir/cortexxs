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
  await browser.close();
  fs.writeFileSync(path.join(output, 'current-sections.json'), JSON.stringify({ status: response.status(), url: page.url(), measured, errors }, null, 2));
  for (const [name] of sections) {
    execFileSync('python', ['-c', `from PIL import Image,ImageDraw;import sys;a=Image.open(sys.argv[1]).convert('RGB');b=Image.open(sys.argv[2]).convert('RGB');o=Image.new('RGB',(a.width+b.width,max(a.height,b.height)+32),'white');o.paste(a,(0,32));o.paste(b,(a.width,32));d=ImageDraw.Draw(o);d.text((12,8),'Decoded Figma reference',fill='black');d.text((a.width+12,8),'Current browser render',fill='black');o.save(sys.argv[3])`, path.join(output, `figma-${name}.png`), path.join(output, `current-${name}.png`), path.join(output, `compare-${name}.png`)]);
  }
  console.log(JSON.stringify({ status: response.status(), errors, measured }, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
