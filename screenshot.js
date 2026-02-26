const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('https://onboarding-presentation.vercel.app/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot1.png' });
  
  await page.click('#btn-next');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot2.png' });
  
  await browser.close();
})();