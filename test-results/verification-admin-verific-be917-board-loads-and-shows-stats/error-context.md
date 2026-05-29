# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: verification/admin-verification.spec.ts >> admin dashboard loads and shows stats
- Location: verification/admin-verification.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/admin
Call log:
  - navigating to "http://localhost:3000/admin", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('admin dashboard loads and shows stats', async ({ page }) => {
> 4  |   await page.goto('http://localhost:3000/admin');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/admin
  5  |   await expect(page.getByText('Total Revenue')).toBeVisible();
  6  |   await expect(page.getByText('Active Products')).toBeVisible();
  7  |   await expect(page.getByText('Recent Orders')).toBeVisible();
  8  |   await page.screenshot({ path: 'verification/admin-dashboard.png' });
  9  | });
  10 |
  11 | test('admin products page search works', async ({ page }) => {
  12 |   await page.goto('http://localhost:3000/admin/products');
  13 |   await expect(page.getByText('Zara-Cut Lawn Suit – Embroidered')).toBeVisible();
  14 |
  15 |   await page.getByPlaceholder('Search by name, brand...').fill('Safinaz');
  16 |   await expect(page.getByText('Khaddar Winter Kameez – Block Print')).toBeVisible();
  17 |   await expect(page.getByText('Zara-Cut Lawn Suit – Embroidered')).not.toBeVisible();
  18 |
  19 |   await page.screenshot({ path: 'verification/admin-products.png' });
  20 | });
  21 |
  22 | test('admin orders page filters works', async ({ page }) => {
  23 |   await page.goto('http://localhost:3000/admin/orders');
  24 |   await expect(page.getByText('ORD-7234')).toBeVisible();
  25 |
  26 |   await page.getByRole('button', { name: 'Pending' }).click();
  27 |   await expect(page.getByText('ORD-8912')).toBeVisible();
  28 |   await expect(page.getByText('ORD-7234')).not.toBeVisible();
  29 |
  30 |   await page.screenshot({ path: 'verification/admin-orders.png' });
  31 | });
  32 |
```