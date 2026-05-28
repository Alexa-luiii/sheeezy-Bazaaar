export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function getDiscountPercent(original: number, sale: number): string {
  if (!original || original <= sale) return '';
  const percent = Math.round(((original - sale) / original) * 100);
  return `${percent}% OFF`;
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function getStockStatus(stock: number): "In Stock" | "Low Stock" | "Out of Stock" {
  if (stock <= 0) return "Out of Stock";
  if (stock < 10) return "Low Stock";
  return "In Stock";
}
