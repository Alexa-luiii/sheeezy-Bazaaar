'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

const AIRecommendations = () => {
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshRecommendations = useCallback(() => {
    setIsRefreshing(true);
    // Simulate AI thinking
    setTimeout(() => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRecommended(shuffled.slice(0, 4));
      setIsRefreshing(false);
    }, 800);
  }, []);

  useEffect(() => {
    // We want to load initial recommendations on client side only to avoid hydration mismatch
    const loadInitial = () => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRecommended(shuffled.slice(0, 4));
    };

    // Using requestAnimationFrame or setTimeout to avoid synchronous setState in effect
    requestAnimationFrame(loadInitial);
  }, []);

  return (
    <section className="py-24 bg-surface/50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-sageDark/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sageDark">
              <Sparkles className="w-4 h-4 fill-current" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Personalized for you</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text font-serif">AI Curated For You</h2>
          </div>

          <button
            onClick={refreshRecommendations}
            disabled={isRefreshing}
            className="flex items-center gap-2 text-xs font-bold text-text/40 hover:text-text transition-colors"
          >
            <RefreshCw className={cn("w-3 h-3", isRefreshing && "animate-spin")} />
            REFRESH CURATION
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;
