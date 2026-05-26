'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const collections = [
  {
    title: "Women's Clothing",
    description: "Curated elegance for the modern woman.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    href: "/category/womens-clothing",
    size: "large"
  },
  {
    title: "Artisan Shoes",
    description: "Handcrafted comfort and style.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
    href: "/category/shoes",
    size: "small"
  },
  {
    title: "Luxe Beauty",
    description: "Premium skincare and cosmetics.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1000&auto=format&fit=crop",
    href: "/category/beauty",
    size: "small"
  },
  {
    title: "Signature Bags",
    description: "Iconic designs for every occasion.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
    href: "/category/bags",
    size: "large"
  }
];

export default function FeaturedCollections() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[400px]">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl",
                collection.size === "large" ? "lg:col-span-2" : "lg:col-span-1"
              )}
            >
              <Link href={collection.href} className="block w-full h-full">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-6 max-w-[250px]">
                    {collection.description}
                  </p>

                  <div className="flex items-center gap-3 text-accent text-sm font-bold uppercase tracking-widest group/btn">
                    Explore Collection
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:text-brand transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
