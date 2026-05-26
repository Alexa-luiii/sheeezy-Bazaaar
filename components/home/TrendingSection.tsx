'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function TrendingSection() {
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 6);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold relative inline-block">
              Trending Now
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-1 bg-accent"
              />
            </h2>
            <p className="text-foreground/60 max-w-md">
              Discover the pieces everyone is talking about this season.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile: Horizontal Scroll, Desktop: Grid */}
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-6 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {trendingProducts.map((product) => (
              <div key={product.id} className="min-w-[280px] md:min-w-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 md:hidden">
           <Link
            href="/shop"
            className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest bg-brand text-white py-4 rounded-full"
          >
            View All Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
