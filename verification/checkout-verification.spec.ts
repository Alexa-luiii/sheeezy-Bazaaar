import { test, expect } from '@playwright/test';

test('checkout flow - step 1 to confirmation', async ({ page }) => {
  // 1. Add item to cart first
  await page.goto('http://localhost:3000/product/wc-001');

  const addToCartBtn = page.getByRole('button', { name: /add to cart/i });
  await addToCartBtn.click();

  // Wait for the cart to have items - check Navbar badge
  const cartBadge = page.locator('button[aria-label="Shopping Cart"] span');
  await expect(cartBadge).toBeVisible({ timeout: 10000 });

  // 2. Go to checkout directly
  await page.goto('http://localhost:3000/checkout');

  // Check if we are on checkout page and the product is there
  await expect(page.getByText('Zara-Cut Lawn Suit – Embroidered').first()).toBeVisible();

  // 3. Apply coupon
  await page.getByPlaceholder('e.g. SAVE10').fill('SAVE10');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByText('SAVE10 Applied')).toBeVisible();

  // 4. Proceed to shipping
  await page.getByRole('button', { name: /proceed to shipping/i }).click();
  await expect(page.getByText('Shipping Details')).toBeVisible();

  // 5. Fill shipping (basic check)
  await page.getByLabel('Full Name').fill('John Doe');
  await page.getByLabel('Email Address').fill('john@example.com');
  await page.getByLabel('Phone Number').fill('1234567890');
  await page.getByLabel('Street Address').fill('123 Test St');
  await page.getByLabel('City').fill('Test City');
  await page.getByLabel('ZIP / Postal').fill('12345');
  await page.getByLabel('Country').fill('Test Country');

  // 6. Proceed to payment
  await page.getByRole('button', { name: /proceed to payment/i }).click();
  await expect(page.getByText('Payment Method')).toBeVisible();

  // 7. Complete purchase
  await page.getByRole('button', { name: /complete purchase/i }).click();

  // 8. Confirmation
  await expect(page.getByText('Order Confirmed')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('SB-')).toBeVisible();

  await page.screenshot({ path: 'verification/checkout-confirmation.png' });
});
