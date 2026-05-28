'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, ChevronDown, Star, Flame } from 'lucide-react';

const heroLooks = [
  {
    id: 1,
    title: 'Style That Speaks',
    subtext: 'Discover our latest collection of premium silk and wool essentials.',
    image: 'https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#7A9E7E',
  },
  {
    id: 2,
    title: 'Elegance Redefined',
    subtext: 'Step into luxury with our curated selection of designer shoes.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#E8C4D0',
  },
  {
    id: 3,
    title: 'Timeless Beauty',
    subtext: 'Indulge in premium skincare and makeup that brings out your glow.',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#B2C8B0',
  },
];

const HeroSection = () => {
  const [currentLook, setCurrentLook] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLook((prev) => (prev + 1) % heroLooks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const look = heroLooks[currentLook];

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center overflow-hidden bg-background pt-20">
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-8 py-12 lg:py-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={look.id}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h1 className="text-6xl md:text-8xl font-playfair font-bold leading-tight tracking-tighter text-foreground max-w-xl">
                {look.title.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={wordVariants}
                    className="inline-block mr-[0.2em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-foreground/60 font-inter max-w-md"
              >
                {look.subtext}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link
                  href="/shop"
                  className="bg-accent text-text px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-accent/80 transition-all active:scale-95 shadow-xl shadow-accent/20"
                >
                  Shop Now
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/looks"
                  className="bg-transparent border border-foreground/10 text-foreground px-8 py-4 rounded-full font-bold hover:bg-surface transition-all active:scale-95"
                >
                  Explore Looks
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Content - Hero Image */}
        <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center pt-8 lg:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={look.id}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 50 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/5] lg:aspect-square max-w-[600px]"
            >
              <div className="absolute inset-0 bg-accent/10 rounded-3xl -rotate-3 scale-95" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border hidden md:flex items-center gap-3"
              >
                <div className="bg-accent/20 p-2 rounded-full text-accent">
                  <Flame size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-accent uppercase tracking-wider">Trending</div>
                  <div className="text-sm font-medium">New Season 2026</div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 -left-12 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border hidden md:flex items-center gap-3"
              >
                <div className="bg-yellow-500/20 p-2 rounded-full text-yellow-500">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <div className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Top Rated</div>
                  <div className="text-sm font-medium">4.9/5 from 2k+ buyers</div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-accent"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
