import { test, expect } from '@playwright/test';

test('product page layout', async ({ page }) => {
  // Use a known product ID from the data
  await page.goto('http://localhost:3000/product/wc-1');

  // Wait for the main elements to be visible
  await expect(page.locator('h1')).toContainText('Silk Wrap Midi Dress');
  await expect(page.locator('text=$245')).toBeVisible();

  // Check for gallery
  await expect(page.locator('img').first()).toBeVisible();

  // Check for tabs
  await expect(page.locator('button:has-text("Description")')).toBeVisible();
  await expect(page.locator('button:has-text("Reviews")')).toBeVisible();

  // Check for recommendations
  await expect(page.locator('h2:has-text("You May Also Like")')).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: 'verification/product-page.png', fullPage: true });
});
