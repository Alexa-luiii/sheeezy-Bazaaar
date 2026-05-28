'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useUIStore } from '@/lib/store/uiStore';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Women', href: '/category/women' },
  { name: 'Shoes', href: '/category/shoes' },
  { name: 'Beauty', href: '/category/beauty' },
  { name: 'Bags', href: '/category/bags' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { mobileNavOpen, toggleMobileNav } = useUIStore();
  const toggleCart = useCartStore((state) => state.toggleCart);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted) return <div className="h-20" aria-hidden="true" />;

  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-sage text-surface py-2 text-center text-[10px] font-bold uppercase tracking-[0.2em]">
        Complimentary worldwide shipping on orders over $500
      </div>

      <motion.nav
        className={cn(
          'fixed top-8 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'py-3 border-b border-border' : 'py-6'
        )}
        style={{
          backgroundColor,
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="z-50">
            <span className="text-xl md:text-2xl font-playfair font-bold tracking-tight text-text">
              SHEEEZY BAZAAR
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-xs font-bold uppercase tracking-widest transition-colors hover:text-sageDark group text-text"
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sageDark"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sageDark scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative flex items-center">
              <AnimatePresence>
                {searchExpanded && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (searchQuery.trim()) {
                        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                      }
                    }}
                    className="flex items-center"
                  >
                    <motion.input
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 180, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Find elegance..."
                      className="bg-primary/50 border border-border rounded-sm py-1.5 px-4 text-[10px] uppercase font-bold focus:outline-none focus:border-sageDark mr-2 text-text"
                      autoFocus
                    />
                  </form>
                )}
              </AnimatePresence>
              <button
                onClick={() => setSearchExpanded(!searchExpanded)}
                className="p-2 hover:text-sageDark transition-colors text-text"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>

            <Link href="/profile" className="relative p-2 hover:text-sageDark transition-colors hidden md:block text-text" aria-label="Wishlist">
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-[8px] text-text font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => toggleCart(true)}
              className="relative p-2 hover:text-sageDark transition-colors text-text"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-sageDark text-[8px] text-surface font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center border border-surface">
                  {cartCount}
                </span>
              )}
            </button>

            <Link href="/profile" className="p-2 hover:text-sageDark transition-colors hidden md:block text-text" aria-label="Account">
              <User size={18} />
            </Link>

            <button
              onClick={() => toggleMobileNav()}
              className="lg:hidden p-2 hover:text-sageDark transition-colors z-50 text-text"
              aria-label="Toggle Mobile Menu"
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 bg-surface z-40 flex flex-col items-center justify-center space-y-8 text-2xl"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => toggleMobileNav(false)}
                  className={cn(
                    "font-playfair font-bold transition-colors hover:text-sageDark uppercase tracking-widest",
                    pathname === link.href ? "text-sageDark" : "text-text"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-10 pt-8">
                <Link href="/profile" onClick={() => toggleMobileNav(false)} className="text-text hover:text-sageDark transition-colors">
                  <Heart size={24} />
                </Link>
                <Link href="/profile" onClick={() => toggleMobileNav(false)} className="text-text hover:text-sageDark transition-colors">
                  <User size={24} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
