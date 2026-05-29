import { test, expect } from '@playwright/test';

test('homepage sections are visible', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Title is split into spans, so check for a word or use a different selector
  await expect(page.getByText('Style', { exact: true }).first()).toBeVisible(); // Part of Hero
  await expect(page.getByText('Trending Now')).toBeVisible(); // Trending
  await expect(page.getByText('Flash Deals')).toBeVisible(); // Flash
  await page.screenshot({ path: 'verification/homepage-sections.png' });
});

test('internal navigation - navbar and product', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Navbar link to category
  await page.getByRole('link', { name: 'Women', exact: true }).first().click();
  await expect(page).toHaveURL(/.*\/category\/women/);

  // Product card to product page
  await page.goto('http://localhost:3000/');
  const firstProduct = page.locator('h3').first();
  const productName = await firstProduct.innerText();
  await firstProduct.click();
  // Using heading role and first() to avoid strict mode violation
  await expect(page.getByRole('heading', { name: productName }).first()).toBeVisible();
});

test('quick view modal works', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Hover over first product to see quick view button
  await page.locator('div.group').first().hover();
  const quickViewBtn = page.getByRole('button', { name: 'Quick View' }).first();
  await quickViewBtn.click();

  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('button', { name: 'ADD TO BOUTIQUE BAG' })).toBeVisible();

  await page.screenshot({ path: 'verification/quick-view-final.png' });
});
