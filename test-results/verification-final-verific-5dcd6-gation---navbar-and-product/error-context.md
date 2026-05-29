# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: verification/final-verification.spec.ts >> internal navigation - navbar and product
- Location: verification/final-verification.spec.ts:12:5

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
  3  | test('homepage sections are visible', async ({ page }) => {
  4  |   await page.goto('http://localhost:3000/');
  5  |   // Title is split into spans, so check for a word or use a different selector
  6  |   await expect(page.getByText('Style', { exact: true }).first()).toBeVisible(); // Part of Hero
  7  |   await expect(page.getByText('Trending Now')).toBeVisible(); // Trending
  8  |   await expect(page.getByText('Flash Deals')).toBeVisible(); // Flash
  9  |   await page.screenshot({ path: 'verification/homepage-sections.png' });
  10 | });
  11 |
  12 | test('internal navigation - navbar and product', async ({ page }) => {
> 13 |   await page.goto('http://localhost:3000/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  14 |
  15 |   // Navbar link to category
  16 |   await page.getByRole('link', { name: 'Women', exact: true }).first().click();
  17 |   await expect(page).toHaveURL(/.*\/category\/women/);
  18 |
  19 |   // Product card to product page
  20 |   await page.goto('http://localhost:3000/');
  21 |   const firstProduct = page.locator('h3').first();
  22 |   const productName = await firstProduct.innerText();
  23 |   await firstProduct.click();
  24 |   // Using heading role and first() to avoid strict mode violation
  25 |   await expect(page.getByRole('heading', { name: productName }).first()).toBeVisible();
  26 | });
  27 |
  28 | test('quick view modal works', async ({ page }) => {
  29 |   await page.goto('http://localhost:3000/');
  30 |   // Hover over first product to see quick view button
  31 |   await page.locator('div.group').first().hover();
  32 |   const quickViewBtn = page.getByRole('button', { name: 'Quick View' }).first();
  33 |   await quickViewBtn.click();
  34 |
  35 |   await expect(page.getByRole('dialog')).toBeVisible();
  36 |   await expect(page.getByRole('button', { name: 'ADD TO BOUTIQUE BAG' })).toBeVisible();
  37 |
  38 |   await page.screenshot({ path: 'verification/quick-view-final.png' });
  39 | });
  40 |
```