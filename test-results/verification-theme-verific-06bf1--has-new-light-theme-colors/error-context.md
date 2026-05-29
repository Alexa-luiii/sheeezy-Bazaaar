# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: verification/theme-verification.spec.ts >> homepage has new light theme colors
- Location: verification/theme-verification.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('homepage has new light theme colors', async ({ page }) => {
> 4  |   await page.goto('http://localhost:3000/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  5  |
  6  |   // Check body background
  7  |   const body = page.locator('body');
  8  |   await expect(body).toHaveCSS('background-color', 'rgb(249, 240, 243)'); // #F9F0F3
  9  |
  10 |   // Check button color
  11 |   const shopNowBtn = page.getByRole('link', { name: 'Shop Now' });
  12 |   await expect(shopNowBtn).toHaveCSS('background-color', 'rgb(232, 196, 208)'); // #E8C4D0 (Wait, I used accent for this link)
  13 |
  14 |   // Check announcement bar
  15 |   await expect(page.getByText('Complimentary worldwide shipping')).toBeVisible();
  16 |
  17 |   await page.screenshot({ path: 'verification/theme-homepage.png' });
  18 | });
  19 |
  20 | test('admin layout has new light theme colors', async ({ page }) => {
  21 |   await page.goto('http://localhost:3000/admin');
  22 |
  23 |   // Check sidebar background
  24 |   const aside = page.locator('aside');
  25 |   await expect(aside).toHaveCSS('background-color', 'rgb(255, 255, 255)'); // #FFFFFF
  26 |
  27 |   await page.screenshot({ path: 'verification/theme-admin.png' });
  28 | });
  29 |
```