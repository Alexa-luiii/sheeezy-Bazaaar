# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: verification/checkout-verification.spec.ts >> checkout flow - step 1 to confirmation
- Location: verification/checkout-verification.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/product/wc-001
Call log:
  - navigating to "http://localhost:3000/product/wc-001", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('checkout flow - step 1 to confirmation', async ({ page }) => {
  4  |   // 1. Add item to cart first
> 5  |   await page.goto('http://localhost:3000/product/wc-001');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/product/wc-001
  6  |
  7  |   const addToCartBtn = page.getByRole('button', { name: /add to cart/i });
  8  |   await addToCartBtn.click();
  9  |
  10 |   // Wait for the cart to have items - check Navbar badge
  11 |   const cartBadge = page.locator('button[aria-label="Shopping Cart"] span');
  12 |   await expect(cartBadge).toBeVisible({ timeout: 10000 });
  13 |
  14 |   // 2. Go to checkout directly
  15 |   await page.goto('http://localhost:3000/checkout');
  16 |
  17 |   // Check if we are on checkout page and the product is there
  18 |   await expect(page.getByText('Zara-Cut Lawn Suit – Embroidered').first()).toBeVisible();
  19 |
  20 |   // 3. Apply coupon
  21 |   await page.getByPlaceholder('e.g. SAVE10').fill('SAVE10');
  22 |   await page.getByRole('button', { name: 'Apply' }).click();
  23 |   await expect(page.getByText('SAVE10 Applied')).toBeVisible();
  24 |
  25 |   // 4. Proceed to shipping
  26 |   await page.getByRole('button', { name: /proceed to shipping/i }).click();
  27 |   await expect(page.getByText('Shipping Details')).toBeVisible();
  28 |
  29 |   // 5. Fill shipping (basic check)
  30 |   await page.getByLabel('Full Name').fill('John Doe');
  31 |   await page.getByLabel('Email Address').fill('john@example.com');
  32 |   await page.getByLabel('Phone Number').fill('1234567890');
  33 |   await page.getByLabel('Street Address').fill('123 Test St');
  34 |   await page.getByLabel('City').fill('Test City');
  35 |   await page.getByLabel('ZIP / Postal').fill('12345');
  36 |   await page.getByLabel('Country').fill('Test Country');
  37 |
  38 |   // 6. Proceed to payment
  39 |   await page.getByRole('button', { name: /proceed to payment/i }).click();
  40 |   await expect(page.getByText('Payment Method')).toBeVisible();
  41 |
  42 |   // 7. Complete purchase
  43 |   await page.getByRole('button', { name: /complete purchase/i }).click();
  44 |
  45 |   // 8. Confirmation
  46 |   await expect(page.getByText('Order Confirmed')).toBeVisible({ timeout: 15000 });
  47 |   await expect(page.getByText('SB-')).toBeVisible();
  48 |
  49 |   await page.screenshot({ path: 'verification/checkout-confirmation.png' });
  50 | });
  51 |
```