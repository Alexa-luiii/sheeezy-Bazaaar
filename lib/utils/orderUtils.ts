import { CartItem, Coupon } from '@/types';

export function generateOrderId(): string {
  const prefix = 'SB';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}

export function validateCoupon(code: string): Coupon | null {
  const coupons: Record<string, Coupon> = {
    'SAVE10': { code: 'SAVE10', discount: 10, type: 'percent', minOrder: 0 },
    'FLAT50': { code: 'FLAT50', discount: 50, type: 'flat', minOrder: 100 },
  };

  return coupons[code.toUpperCase()] || null;
}

export function calculateTotal(items: CartItem[], coupon: Coupon | null) {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  let discount = 0;

  if (coupon) {
    if (coupon.type === 'percent') {
      discount = (subtotal * coupon.discount) / 100;
    } else {
      discount = coupon.discount;
    }
  }

  const shipping = subtotal > 1000 ? 0 : 25; // Free shipping over $1000
  const total = Math.max(0, subtotal - discount + shipping);

  return {
    subtotal,
    discount,
    shipping,
    total,
  };
}
