'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

const TrendingSection = () => {
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-accent tracking-[0.3em] font-medium uppercase text-sm block"
            >
              Most Wanted
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white font-serif"
            >
              Trending Now
            </motion.h2>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group flex items-center gap-2 text-white/60 hover:text-brand-accent transition-colors text-sm font-bold tracking-widest uppercase"
          >
            Explore All Trending
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
