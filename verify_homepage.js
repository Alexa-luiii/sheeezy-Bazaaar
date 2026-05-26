const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });

    // Screenshot whole page (long) or sections
    await page.screenshot({ path: 'homepage_full.png', fullPage: true });

    const sections = [
      { name: 'hero', selector: 'section:has-text("Luxury")' },
      { name: 'trending', selector: 'section:has-text("Trending Now")' },
      { name: 'flash_deals', selector: 'section:has-text("Flash Deals")' },
      { name: 'best_sellers', selector: 'section:has-text("Best Sellers")' },
      { name: 'featured', selector: 'section:has-text("Shop by Category")' },
      { name: 'ai_recs', selector: 'section:has-text("Picked For You")' },
      { name: 'testimonials', selector: 'section:has-text("What Our Clients Say")' },
      { name: 'newsletter', selector: 'section:has-text("Join the Inner Circle")' }
    ];

    for (const section of sections) {
      const element = await page.$(section.selector);
      if (element) {
        await element.screenshot({ path: `${section.name}.png` });
        console.log(`Captured ${section.name}`);
      } else {
        console.log(`Could not find ${section.name} with selector ${section.selector}`);
      }
    }

  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await browser.close();
  }
})();
