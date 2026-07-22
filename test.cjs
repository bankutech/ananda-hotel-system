const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const errors = [];
  page.on('pageerror', exception => {
    errors.push(`Page Error: ${exception}`);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console Error: ${msg.text()}`);
    }
  });

  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(500);
  
  await page.goto('http://localhost:5173/rooms');
  await page.waitForTimeout(500);

  await page.goto('http://localhost:5173/guests');
  await page.waitForTimeout(500);

  await page.goto('http://localhost:5173/bookings');
  await page.waitForTimeout(500);
  
  console.log('ERRORS:', JSON.stringify(errors, null, 2));
  await browser.close();
})().catch(e => {
  console.error("Test script failed", e);
  process.exit(1);
});
