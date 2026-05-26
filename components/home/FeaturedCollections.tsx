'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const collections = [
  {
    title: "The Silk Collective",
    subtitle: "SS26 Collection",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    color: "bg-emerald-900/20"
  },
  {
    title: "Urban Minimalist",
    subtitle: "New Arrivals",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    color: "bg-brand-primary"
  }
];

const FeaturedCollections = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={cn(
                "group relative h-[600px] overflow-hidden rounded-3xl cursor-pointer",
                col.color
              )}
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-12 left-12 right-12 space-y-4">
                <span className="text-brand-accent tracking-[0.3em] font-medium uppercase text-xs">
                  {col.subtitle}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold text-white font-serif leading-tight">
                  {col.title}
                </h3>
                <button className="flex items-center gap-3 text-white font-bold text-sm tracking-widest uppercase group/btn">
                  Shop Collection
                  <div className="w-10 h-[1px] bg-white transition-all group-hover/btn:w-16" />
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
