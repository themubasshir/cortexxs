let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require(process.env.CORTEXX_PLAYWRIGHT_MODULE || 'C:/Users/Cyb3r/AppData/Local/Temp/marsai/node_modules/playwright-core')); }
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const phase = process.argv[2] || 'after';
const base = process.env.CORTEXX_QA_BASE || 'http://localhost/cortexx';
const out = path.join(__dirname, '../docs/qa/ai-fidelity-20261027');
fs.mkdirSync(out, { recursive: true });

const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const browserErrors = [];

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const report = { phase, base, widths: {}, browserErrors };
  try {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 900 : 844 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => browserErrors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') browserErrors.push(message.text()); });
      await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => { scrollTo({ top: 0, behavior: 'instant' }); dispatchEvent(new Event('scroll')); });
      await page.waitForTimeout(120);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('.site-header').waitFor();
      const homeHeaderStyle = await page.locator('.nav a').first().evaluate(el => ({ color:getComputedStyle(el).color, font:getComputedStyle(el).font, href:el.getAttribute('href') }));
      const header = await page.locator('.site-header').screenshot({ animations: 'disabled' });
      await page.locator('.footer').scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      const footer = await page.locator('.footer').screenshot({ animations: 'disabled' });
      fs.writeFileSync(path.join(out, `${phase}-home-header-${width}.png`), header);
      fs.writeFileSync(path.join(out, `${phase}-home-footer-${width}.png`), footer);
      const home = {
        headerHash: hash(header), footerHash: hash(footer), headerStyle: homeHeaderStyle,
        headerRect: await page.locator('.site-header').evaluate(el => { const r = el.getBoundingClientRect(); return { x:r.x,y:r.y,w:r.width,h:r.height }; }),
        footerRect: await page.locator('.footer').evaluate(el => { const r = el.getBoundingClientRect(); return { w:r.width,h:r.height }; }),
      };
      await page.goto(base + '/services/ai-automation', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => { scrollTo({ top: 0, behavior: 'instant' }); dispatchEvent(new Event('scroll')); });
      await page.waitForTimeout(120);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('img[loading="lazy"]').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
      await page.waitForFunction(() => [...document.images].every(image => image.complete), null, { timeout: 10000 });
      const selectors = {
        header: '.site-header, .ai-header', hero: '.ai-hero', heroTitle: '.ai-hero h1', heroDescription: '.ai-hero-copy > p', heroArt: '.ai-workflow',
        challenges: '.ai-challenges', challengesTitle: '.ai-challenges h2', challengeRows: '.ai-challenge',
        capabilities: '.ai-capabilities', capabilityTitle: '.ai-capabilities h2', capabilityCards: '.ai-capability-card',
        process: '.ai-process', processTitle: '.ai-process h2', steps: '.ai-step-list li',
        caseStudy: '.ai-case', caseTitle: '.ai-case h2', caseCard: '.ai-case-card, .ai-case-grid',
        testimonials: '.ai-testimonials', testimonialCards: '.ai-testimonial-track article', recognitionTiles: '.ai-recognition img',
        footer: '.footer, .ai-footer',
      };
      const geometry = await page.evaluate(selectors => {
        const box = el => { const r = el.getBoundingClientRect(); return { x:Math.round(r.x),y:Math.round(r.y + scrollY),w:Math.round(r.width),h:Math.round(r.height),fontSize:getComputedStyle(el).fontSize }; };
        return Object.fromEntries(Object.entries(selectors).map(([name, selector]) => [name, [...document.querySelectorAll(selector)].map(box)]));
      }, selectors);
      const ai = {
        responseTitle: await page.title(), geometry,
        scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth),
        scrollHeight: await page.evaluate(() => document.documentElement.scrollHeight),
        brokenImages: await page.evaluate(() => [...document.images].filter(image => image.naturalWidth === 0).map(image => image.src)),
      };
      const aiHeaderStyle = phase === 'after' ? await page.locator('.nav a').first().evaluate(el => ({ color:getComputedStyle(el).color, font:getComputedStyle(el).font, href:el.getAttribute('href') })) : null;
      const aiHeader = phase === 'after' ? await page.locator('.site-header').screenshot({ animations: 'disabled' }) : null;
      await page.screenshot({ path: path.join(out, `${phase}-ai-full-${width}.png`), fullPage: true, animations: 'disabled' });
      if (phase === 'after') {
        await page.locator('.footer').scrollIntoViewIfNeeded();
        await page.waitForTimeout(100);
        const aiFooter = await page.locator('.footer').screenshot({ animations: 'disabled' });
        ai.headerStyle = aiHeaderStyle;
        ai.headerHash = hash(aiHeader);
        ai.footerHash = hash(aiFooter);
        ai.headerMatchesHome = ai.headerHash === home.headerHash;
        ai.footerMatchesHome = ai.footerHash === home.footerHash;
        fs.writeFileSync(path.join(out, `after-ai-header-${width}.png`), aiHeader);
        fs.writeFileSync(path.join(out, `after-ai-footer-${width}.png`), aiFooter);
      }
      report.widths[width] = { home, ai };
      await context.close();
    }
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(out, `${phase}-report.json`), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ phase, widths: Object.fromEntries(Object.entries(report.widths).map(([width, data]) => [width, { home: data.home, ai: { scrollHeight: data.ai.scrollHeight, scrollWidth: data.ai.scrollWidth, headerMatchesHome: data.ai.headerMatchesHome, footerMatchesHome: data.ai.footerMatchesHome } }])), browserErrors }, null, 2));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
