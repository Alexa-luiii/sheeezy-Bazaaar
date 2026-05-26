'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Zap } from 'lucide-react';

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-brand border border-white/10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg shadow-xl">
      <span className="text-xl md:text-2xl font-bold font-mono text-white">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] uppercase tracking-tighter mt-1 text-white/50">{label}</span>
  </div>
);

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.isDeal).slice(0, 4);

  return (
    <section className="py-24 bg-brand text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold flex items-center gap-3">
                Flash Deals <span className="text-accent text-sm md:text-base font-inter font-normal tracking-widest uppercase">Limited Time</span>
              </h2>
              <p className="text-white/40 text-sm">Exclusive prices on premium items. Act fast.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
            <TimeUnit value={timeLeft.hours} label="Hrs" />
            <span className="text-2xl font-bold mt-[-20px]">:</span>
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <span className="text-2xl font-bold mt-[-20px]">:</span>
            <TimeUnit value={timeLeft.seconds} label="Sec" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {dealProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard
                product={product}
                className="bg-surface border border-white/5 hover:border-accent/50 transition-colors duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
