'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Trophy } from 'lucide-react';

export default function BestSellers() {
  // Sort by soldCount descending and take top 8
  const bestSellers = [...products]
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 8);

  return (
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Trophy className="w-3 h-3 mr-2" />
            Top Performance
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold">Best Sellers</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            The most coveted items in our collection, favored by our global community of connoisseurs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Special Best Seller Badge for this section */}
              <div className="absolute -top-2 -right-2 z-30 bg-brand text-white text-[9px] font-black px-2 py-1 rounded-sm shadow-xl border border-white/10 uppercase tracking-tighter">
                Best Seller
              </div>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
