'use client';

import { products } from '@/data/products';
import ProductCarousel from './ProductCarousel';

interface ProductRecommendationsProps {
  currentProductId: string;
  category: string;
}

export default function ProductRecommendations({ currentProductId, category }: ProductRecommendationsProps) {
  // Similar Products: Same category
  const similarProducts = products
    .filter(p => p.category === category && p.id !== currentProductId)
    .slice(0, 8);

  // You May Also Like: Trending or different categories
  const youMayAlsoLike = products
    .filter(p => p.id !== currentProductId && !similarProducts.find(r => r.id === p.id))
    .slice(0, 8);

  return (
    <div className="w-full space-y-24">
      {similarProducts.length > 0 && (
        <ProductCarousel
          title="Similar Products"
          subtitle="From the same collection"
          products={similarProducts}
        />
      )}

      {youMayAlsoLike.length > 0 && (
        <ProductCarousel
          title="You May Also Like"
          subtitle="Hand-picked for you"
          products={youMayAlsoLike}
        />
      )}
    </div>
  );
}
