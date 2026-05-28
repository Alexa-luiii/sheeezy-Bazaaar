import { test, expect } from '@playwright/test';

test('homepage sections are visible', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('Elegance Redefined')).toBeVisible(); // Hero
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
  await expect(page.getByText(productName)).toBeVisible();
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
