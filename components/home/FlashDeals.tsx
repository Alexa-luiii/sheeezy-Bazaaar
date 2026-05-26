'use client';

import React, { useState, useEffect } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Timer } from 'lucide-react';

const FlashDeals = () => {
  const dealProducts = products.filter(p => p.isDeal).slice(0, 4);
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div className="flex items-center gap-6">
            <h2 className="text-4xl font-bold text-white font-serif">Flash Deals</h2>
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl">
              <Timer className="w-4 h-4 text-red-500 animate-pulse" />
              <div className="flex gap-1.5 font-mono text-sm font-bold text-red-500">
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;
