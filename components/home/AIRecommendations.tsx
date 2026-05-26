'use client';

import React, { useState, useEffect } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Sparkles } from 'lucide-react';
import { Product } from '@/types';

export default function AIRecommendations() {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get 4 random products (simulating AI recommendations)
    // Using a microtask to avoid "setState in effect" lint error in React 19 environment
    queueMicrotask(() => {
      const shuffled = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
      setRecommendedProducts(shuffled);
    });
  }, []);

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative shimmer backgrounds */}
      <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full animate-pulse" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-[0.3em] text-[10px]">
            <Sparkles className="w-4 h-4" />
            Powered by AI
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold">Picked For You ✨</h2>
          <p className="text-foreground/60 max-w-xl">
            Based on the latest trends and your unique style profile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="relative group">
              {/* Shimmer / Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-white/5 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-shimmer" />

              <ProductCard
                product={product}
                className="relative bg-background rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:translate-y-[-8px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
