import { test, expect } from '@playwright/test';

test('admin dashboard loads and shows stats', async ({ page }) => {
  await page.goto('http://localhost:3000/admin');
  await expect(page.getByText('Total Revenue')).toBeVisible();
  await expect(page.getByText('Active Products')).toBeVisible();
  await expect(page.getByText('Recent Orders')).toBeVisible();
  await page.screenshot({ path: 'verification/admin-dashboard.png' });
});

test('admin products page search works', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/products');
  await expect(page.getByText('Silk Wrap Midi Dress')).toBeVisible();

  await page.getByPlaceholder('Search by name, brand...').fill('Wool');
  await expect(page.getByText('Oversized Wool Blazer')).toBeVisible();
  await expect(page.getByText('Silk Wrap Midi Dress')).not.toBeVisible();

  await page.screenshot({ path: 'verification/admin-products.png' });
});

test('admin orders page filters works', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/orders');
  await expect(page.getByText('ORD-7234')).toBeVisible();

  await page.getByRole('button', { name: 'Pending' }).click();
  await expect(page.getByText('ORD-8912')).toBeVisible();
  await expect(page.getByText('ORD-7234')).not.toBeVisible();

  await page.screenshot({ path: 'verification/admin-orders.png' });
});
