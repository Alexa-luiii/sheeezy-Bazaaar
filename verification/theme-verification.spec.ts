import { test, expect } from '@playwright/test';

test('homepage has new light theme colors', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Check body background
  const body = page.locator('body');
  await expect(body).toHaveCSS('background-color', 'rgb(249, 240, 243)'); // #F9F0F3

  // Check button color
  const shopNowBtn = page.getByRole('link', { name: 'Shop Now' });
  await expect(shopNowBtn).toHaveCSS('background-color', 'rgb(232, 196, 208)'); // #E8C4D0 (Wait, I used accent for this link)

  // Check announcement bar
  await expect(page.getByText('Complimentary worldwide shipping')).toBeVisible();

  await page.screenshot({ path: 'verification/theme-homepage.png' });
});

test('admin layout has new light theme colors', async ({ page }) => {
  await page.goto('http://localhost:3000/admin');

  // Check sidebar background
  const aside = page.locator('aside');
  await expect(aside).toHaveCSS('background-color', 'rgb(255, 255, 255)'); // #FFFFFF

  await page.screenshot({ path: 'verification/theme-admin.png' });
});
