# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: verification/checkout-verification.spec.ts >> checkout flow - step 1 to confirmation
- Location: verification/checkout-verification.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button[aria-label="Shopping Cart"] span')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('button[aria-label="Shopping Cart"] span')

```

```yaml
- text: Complimentary worldwide shipping on orders over $500
- navigation:
  - link "SHEEEZY BAZAAR":
    - /url: /
  - link "Home":
    - /url: /
  - link "Women":
    - /url: /category/womens-clothing
  - link "Shoes":
    - /url: /category/womens-shoes
  - link "Beauty":
    - /url: /category/beauty-products
  - link "Bags":
    - /url: /category/bags
  - button "Search"
  - link "Wishlist":
    - /url: /profile
  - button "Shopping Cart"
  - link "Account":
    - /url: /profile
- main:
  - navigation:
    - link "Home":
      - /url: /
    - link "Women's Clothing":
      - /url: /category/women's-clothing
    - text: Zara-Cut Lawn Suit – Embroidered
  - button "Product thumbnail 1":
    - img "Product thumbnail 1"
  - button "Product thumbnail 2":
    - img "Product thumbnail 2"
  - button "Product thumbnail 3":
    - img "Product thumbnail 3"
  - img "Product image"
  - button
  - button
  - paragraph: Gul Ahmed
  - paragraph: 890+ Sold in last 24h
  - text: "4.8"
  - heading "Zara-Cut Lawn Suit – Embroidered" [level=1]
  - paragraph: $3200
  - paragraph: $4500
  - text: Save 29%
  - paragraph: "Estimated delivery: 3-5 business days"
  - paragraph: Premium Gul Ahmed lawn suit with delicate floral embroidery. Perfect for summer gatherings and casual wear.
  - text: Limited Availability 18 pieces remaining Color Crimson Red
  - button "Crimson Red"
  - button "Purple"
  - button "Navy"
  - text: Size
  - button "Size Guide"
  - button "XS"
  - button "S"
  - button "M"
  - button "L"
  - button "XL"
  - text: Quantity
  - button
  - text: "1"
  - button
  - button "Add to Cart"
  - button "Save"
  - button "Buy It Now"
  - button "Shipping & Returns"
  - paragraph: We offer worldwide complimentary express shipping. Returns are accepted within 30 days of delivery in original condition.
  - button "Authenticity Guarantee"
  - paragraph: Every piece in our collection is meticulously inspected by our master curators to guarantee 100% authenticity.
  - heading "Frequently Bought Together" [level=3]
  - img "Zara-Cut Lawn Suit – Embroidered"
  - img "Block Heel Mules – Nude"
  - img "Classic White Sneakers"
  - paragraph: Bundle Price
  - paragraph: $10900
  - button "Add Bundle to Cart"
  - checkbox [checked]
  - text: "This item: Zara-Cut Lawn Suit – Embroidered"
  - checkbox [checked]
  - link "Block Heel Mules – Nude":
    - /url: /product/ws-001
  - text: $4500
  - checkbox [checked]
  - link "Classic White Sneakers":
    - /url: /product/ws-002
  - text: $3200
  - button "Description"
  - button "Specifications"
  - button "Reviews"
  - button "Shipping"
  - paragraph: Premium Gul Ahmed lawn suit with delicate floral embroidery. Perfect for summer gatherings and casual wear.
  - list:
    - listitem: Expertly crafted with attention to every detail
    - listitem: Premium materials sourced from sustainable suppliers
    - listitem: Designed for both durability and timeless style
    - listitem: Signature Sheeezy Bazaar branding
  - paragraph: From the same collection
  - heading "Similar Products" [level=2]
  - button "Previous products" [disabled]
  - button "Next products"
  - button
  - img "Khaddar Winter Kameez – Block Print"
  - img "Khaddar Winter Kameez – Block Print"
  - text: Sana Safinaz
  - heading "Khaddar Winter Kameez – Block Print" [level=3]
  - text: (198) 540 sold $4,800 $6,200 TRENDING LIMITED
  - button
  - img "Chiffon Party Wear Suit – Sequin Work"
  - img "Chiffon Party Wear Suit – Sequin Work"
  - text: Maria B
  - heading "Chiffon Party Wear Suit – Sequin Work" [level=3]
  - text: (421) 1.2k sold $8,500 $11,000 Only 4 left in stock - order soon
  - button
  - img "Cotton Casual Kurti – Printed"
  - img "Cotton Casual Kurti – Printed"
  - text: Khaadi
  - heading "Cotton Casual Kurti – Printed" [level=3]
  - text: (567) 2.1k sold $1,850 $2,400 LIMITED
  - button
  - img "Silk Dupatta 3-Piece Suit"
  - img "Silk Dupatta 3-Piece Suit"
  - text: Asim Jofa
  - heading "Silk Dupatta 3-Piece Suit" [level=3]
  - text: (203) 430 sold $12,500 $15,000 TRENDING
  - button
  - img "Linen Co-ord Set – Wide Leg"
  - img "Linen Co-ord Set – Wide Leg"
  - text: Sapphire
  - heading "Linen Co-ord Set – Wide Leg" [level=3]
  - text: (145) 320 sold $5,200 $6,500 DEAL LIMITED
  - button
  - img "Eid Collection Pishwas – Embellished"
  - img "Eid Collection Pishwas – Embellished"
  - text: HSY
  - heading "Eid Collection Pishwas – Embellished" [level=3]
  - text: (89) 210 sold $18,000 $22,000 Only 3 left in stock - order soon
  - button
  - img "Karandi Shawl Suit – Winter"
  - img "Karandi Shawl Suit – Winter"
  - text: Bonanza Satrangi
  - heading "Karandi Shawl Suit – Winter" [level=3]
  - text: (278) 760 sold $3,800 $4,800
  - button
  - img "Organza Formal Top – Floral"
  - img "Organza Formal Top – Floral"
  - text: Zara Shahjahan
  - heading "Organza Formal Top – Floral" [level=3]
  - text: (134) 290 sold $6,800 $8,500
  - paragraph: Hand-picked for you
  - heading "You May Also Like" [level=2]
  - button "Previous products" [disabled]
  - button "Next products"
  - text: DEAL
  - button
  - img "Digital Print Lawn – Summer Vol.2"
  - img "Digital Print Lawn – Summer Vol.2"
  - text: Al Karam
  - heading "Digital Print Lawn – Summer Vol.2" [level=3]
  - text: (445) 1.6k sold $2,600 $3,200
  - button
  - img "Velvet Shawl Wrap – Embroidered"
  - img "Velvet Shawl Wrap – Embroidered"
  - text: Orient Textiles
  - heading "Velvet Shawl Wrap – Embroidered" [level=3]
  - text: (99) 180 sold $7,200 $9,000
  - button
  - img "Casual Cambric Suit – Tie-Dye"
  - img "Casual Cambric Suit – Tie-Dye"
  - text: Nishat Linen
  - heading "Casual Cambric Suit – Tie-Dye" [level=3]
  - text: (321) 980 sold $2,200 $2,800 TRENDING
  - button
  - img "Block Heel Mules – Nude"
  - img "Block Heel Mules – Nude"
  - text: Stylo
  - heading "Block Heel Mules – Nude" [level=3]
  - text: (234) 780 sold $4,500 $5,800
  - button
  - img "Classic White Sneakers"
  - img "Classic White Sneakers"
  - text: Bata
  - heading "Classic White Sneakers" [level=3]
  - text: (890) 3.2k sold $3,200 $4,000 DEAL LIMITED
  - button
  - img "Strappy Kitten Heels – Bridal"
  - img "Strappy Kitten Heels – Bridal"
  - text: Insignia
  - heading "Strappy Kitten Heels – Bridal" [level=3]
  - text: (156) 420 sold $6,800 $8,500
  - button
  - img "Flat Kolhapuri Sandals"
  - img "Flat Kolhapuri Sandals"
  - text: Servis
  - heading "Flat Kolhapuri Sandals" [level=3]
  - text: (445) 1.9k sold $1,800 $2,400 TRENDING
  - button
  - img "Platform Heels – Party Wear"
  - img "Platform Heels – Party Wear"
  - text: Stylo
  - heading "Platform Heels – Party Wear" [level=3]
  - text: (178) 540 sold $7,500 $9,200
- contentinfo:
  - link "SHEEEZY BAZAAR":
    - /url: /
  - paragraph: Curating the world's most evocative fashion and lifestyle essentials. Join our journey into the heart of elegance.
  - link:
    - /url: "#"
  - link:
    - /url: "#"
  - link:
    - /url: "#"
  - heading "Shop" [level=4]
  - list:
    - listitem:
      - link "Women":
        - /url: /category/women
    - listitem:
      - link "Shoes":
        - /url: /category/shoes
    - listitem:
      - link "Beauty":
        - /url: /category/beauty
    - listitem:
      - link "Bags":
        - /url: /category/bags
  - heading "Company" [level=4]
  - list:
    - listitem:
      - link "Our Story":
        - /url: /about
    - listitem:
      - link "Ethos":
        - /url: /sustainability
    - listitem:
      - link "Journal":
        - /url: /press
    - listitem:
      - link "Careers":
        - /url: /careers
  - heading "Concierge" [level=4]
  - list:
    - listitem:
      - link "Shipping":
        - /url: /shipping
    - listitem:
      - link "Returns":
        - /url: /returns
    - listitem:
      - link "FAQ":
        - /url: /faq
    - listitem:
      - link "Contact":
        - /url: /contact
  - paragraph: © 2026 SHEEEZY BAZAAR. Crafted with love.
  - text: VISA AMEX PAYPAL
  - link "Privacy":
    - /url: /privacy
  - link "Terms":
    - /url: /terms
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('checkout flow - step 1 to confirmation', async ({ page }) => {
  4  |   // 1. Add item to cart first
  5  |   await page.goto('http://localhost:3000/product/wc-001');
  6  |
  7  |   const addToCartBtn = page.getByRole('button', { name: /add to cart/i });
  8  |   await addToCartBtn.click();
  9  |
  10 |   // Wait for the cart to have items - check Navbar badge
  11 |   const cartBadge = page.locator('button[aria-label="Shopping Cart"] span');
> 12 |   await expect(cartBadge).toBeVisible({ timeout: 10000 });
     |                           ^ Error: expect(locator).toBeVisible() failed
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