'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Sophia Loren",
    role: "Fashion Editor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote: "The curation at Sheeezy Bazaar is unparalleled. Every piece I've ordered feels like a personal find. The quality is consistently exceptional.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Aurelius",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    quote: "Finding a marketplace that understands true luxury and minimalism is rare. Their customer service and presentation are simply top-tier.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Gilbert",
    role: "Lifestyle Blogger",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    quote: "The shopping experience is seamless, and the products are even more beautiful in person. It's my go-to for everything premium.",
    rating: 5
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <Quote className="w-12 h-12 text-accent/20 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-playfair font-bold">Voices of Distinction</h2>
          </div>

          <div className="relative h-[400px] md:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                <div className="relative w-24 h-24 md:w-40 md:h-40 shrink-0">
                  <div className="absolute inset-0 rounded-full border-2 border-accent/30 scale-110 animate-pulse" />
                  <Image
                    src={testimonials[index].avatar}
                    alt={testimonials[index].name}
                    fill
                    className="object-cover rounded-full p-2"
                  />
                </div>

                <div className="flex-grow space-y-6 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1">
                    {[...Array(testimonials[index].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl font-playfair italic text-foreground/80 leading-relaxed">
                    &quot;{testimonials[index].quote}&quot;
                  </p>

                  <div className="space-y-1">
                    <h4 className="text-lg font-bold">{testimonials[index].name}</h4>
                    <p className="text-sm text-foreground/40 font-medium uppercase tracking-widest">
                      {testimonials[index].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center md:justify-end gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 transition-all duration-500 rounded-full",
                  index === i ? "w-8 bg-accent" : "w-2 bg-foreground/10"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
