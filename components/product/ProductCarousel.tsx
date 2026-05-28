'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  className?: string;
}

export default function ProductCarousel({ title, subtitle, products, className }: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();

      // Also check on window resize
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={cn("w-full space-y-8", className)}>
      <div className="flex justify-between items-end">
        <div>
          {subtitle && (
            <p className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-2">{subtitle}</p>
          )}
          <h2 className="text-3xl font-serif text-text">{title}</h2>
          <div className="h-1 w-12 bg-accent mt-3" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!showLeftArrow}
            className={cn(
              "w-12 h-12 flex items-center justify-center border transition-all",
              showLeftArrow
                ? "border-border text-text hover:border-accent hover:text-accent"
                : "border-border text-text/20 cursor-not-allowed"
            )}
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!showRightArrow}
            className={cn(
              "w-12 h-12 flex items-center justify-center border transition-all",
              showRightArrow
                ? "border-border text-text hover:border-accent hover:text-accent"
                : "border-border text-text/20 cursor-not-allowed"
            )}
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative group">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Subtle fade effects on edges */}
        <div className={cn(
          "absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-text to-transparent pointer-events-none transition-opacity duration-300",
          showLeftArrow ? "opacity-100" : "opacity-0"
        )} />
        <div className={cn(
          "absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-text to-transparent pointer-events-none transition-opacity duration-300",
          showRightArrow ? "opacity-100" : "opacity-0"
        )} />
      </div>
    </div>
  );
}
