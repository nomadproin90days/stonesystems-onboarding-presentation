const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('requestfailed', request => {
    console.log(`PAGE REQUEST FAILED: ${request.url()} - ${request.failure()?.errorText}`);
  });
  page.on('pageerror', error => {
    console.log(`PAGE ERROR: ${error.message}`);
  });

  await page.goto('http://127.0.0.1:8125/index.html', { waitUntil: 'networkidle0' });
  
  await browser.close();
  process.exit(0);
})();