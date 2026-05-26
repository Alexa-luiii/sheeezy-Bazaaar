'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const ProductGrid = ({
  products,
  loading = false,
  columns = { mobile: 1, tablet: 2, desktop: 3 }
}: ProductGridProps) => {
  // Note: Tailwind v4 with dynamic classes might need full class names or a different approach if not pre-defined
  // Using explicit classes for safety
  const getGridClass = () => {
    let classes = 'grid gap-x-8 gap-y-12 ';

    if (columns.mobile === 1) classes += 'grid-cols-1 ';
    else if (columns.mobile === 2) classes += 'grid-cols-2 ';

    if (columns.tablet === 2) classes += 'sm:grid-cols-2 ';
    else if (columns.tablet === 3) classes += 'sm:grid-cols-3 ';

    if (columns.desktop === 3) classes += 'lg:grid-cols-3 ';
    else if (columns.desktop === 4) classes += 'lg:grid-cols-4 ';

    return classes;
  };

  return (
    <div className={getGridClass()}>
      <AnimatePresence mode="popLayout">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <motion.div
              key={`skeleton-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductSkeleton />
            </motion.div>
          ))
        ) : (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
