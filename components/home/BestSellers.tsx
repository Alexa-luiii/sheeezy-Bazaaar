'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

const BestSellers = () => {
  const bestSellers = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 8);

  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sageDark tracking-[0.4em] font-medium uppercase text-xs block"
          >
            Customer Favorites
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-text font-serif"
          >
            The Best Sellers
          </motion.h2>
          <div className="w-24 h-1 bg-sageDark mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-surface text-text font-bold text-sm tracking-widest uppercase hover:bg-sageDark transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
