const fs = require('node:fs');
const path = require('node:path');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }
const phase = process.argv[2] || 'before';
const output = path.resolve(__dirname, '../docs/qa/ai-animation-repair-20261028', phase);
fs.mkdirSync(output, { recursive: true });
const times = [0, 500, 1500, 3000, 6000, 12000];
(async () => {
  const browser = await chromium.launch({ headless: false, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--window-position=80,80'] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference', deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  try {
    const response = await page.goto('http://localhost/cortexx/services/ai-automation', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    const start = Date.now();
    const samples = [];
    for (const ms of times) {
      await page.waitForTimeout(Math.max(0, start + ms - Date.now()));
      const state = await page.evaluate(() => {
        const workflow = document.querySelector('.ai-workflow');
        const visual = workflow.querySelector('.ai-figma-workflow, .ai-workflow-svg');
        const style = getComputedStyle(visual);
        const box = workflow.getBoundingClientRect();
        const node = workflow.querySelector('[data-figma-id="1027:245"]');
        const connector = workflow.querySelector('[data-figma-id="1027:231"]');
        const signal = workflow.querySelector('.ai-signal-enquiry');
        return { time: performance.now(), className: workflow.className, imageOpacity: style.opacity, imageTranslate: style.translate, imageFilter: style.filter, animationName: style.animationName, animationPlayState: style.animationPlayState, nodeOpacity: node ? getComputedStyle(node).opacity : null, nodeTranslate: node ? getComputedStyle(node).translate : null, connectorClip: connector ? getComputedStyle(connector).clipPath : null, signalOpacity: signal ? getComputedStyle(signal).opacity : null, signalTranslate: signal ? getComputedStyle(signal).translate : null, height: document.documentElement.scrollHeight, box: { x:box.x, y:box.y, width:box.width, height:box.height } };
      });
      const file = path.join(output, 'hero-' + ms + 'ms.png');
      await page.locator('.ai-hero').screenshot({ path: file });
      samples.push({ ms, ...state, file });
    }
    const report = { status: response.status(), url: page.url(), errors, samples };
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
