import { test, expect } from '@playwright/test';

test('checkout flow - step 1 to confirmation', async ({ page }) => {
  // 1. Add item to cart first
  await page.goto('http://localhost:3000/product/wc-1');
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  // 2. Go to checkout
  await page.goto('http://localhost:3000/checkout');
  await expect(page.getByText('Your Selection (1)')).toBeVisible();

  // 3. Apply coupon
  await page.getByPlaceholder('e.g. SAVE10').fill('SAVE10');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.getByText('SAVE10 Applied')).toBeVisible();

  // 4. Proceed to shipping
  await page.getByRole('button', { name: 'Proceed to Shipping' }).click();
  await expect(page.getByText('Shipping Details')).toBeVisible();

  // 5. Fill shipping (basic check)
  await page.getByLabel('Full Name').fill('John Doe');
  await page.getByLabel('Email Address').fill('john@example.com');

  // 6. Proceed to payment
  await page.getByRole('button', { name: 'Proceed to Payment' }).click();
  await expect(page.getByText('Payment Method')).toBeVisible();

  // 7. Complete purchase
  await page.getByRole('button', { name: 'Complete Purchase' }).click();

  // 8. Confirmation
  await expect(page.getByText('Order Confirmed')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('SB-')).toBeVisible(); // Order ID prefix

  await page.screenshot({ path: 'verification/checkout-confirmation.png' });
});
