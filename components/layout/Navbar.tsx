'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Heart, User, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
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
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

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
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']
  );
  const darkBackgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.8)']
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
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
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'py-3 border-b border-white/10' : 'py-6'
      )}
      style={{
        backgroundColor: resolvedTheme === 'dark' ? darkBackgroundColor : backgroundColor,
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="z-50">
          <span className="text-xl md:text-2xl font-playfair font-bold tracking-tight text-foreground">
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
                className="relative text-sm font-medium transition-colors hover:text-accent group text-foreground"
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-2 md:space-x-5">
          <div className="relative flex items-center">
            <AnimatePresence>
              {searchExpanded && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="Search products..."
                  className="bg-surface/50 border border-white/10 rounded-full py-1 px-4 text-xs focus:outline-none focus:border-accent mr-2 text-foreground"
                  autoFocus
                />
              )}
            </AnimatePresence>
            <button
              onClick={() => setSearchExpanded(!searchExpanded)}
              className="p-2 hover:text-accent transition-colors text-foreground"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>

          <Link href="/wishlist" className="relative p-2 hover:text-accent transition-colors hidden md:block text-foreground" aria-label="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-[10px] text-white font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => toggleCart(true)}
            className="relative p-2 hover:text-accent transition-colors text-foreground"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-[10px] text-white font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <Link href="/account" className="p-2 hover:text-accent transition-colors hidden md:block text-foreground" aria-label="Account">
            <User size={20} />
          </Link>

          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:text-accent transition-colors text-foreground"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => toggleMobileNav()}
            className="lg:hidden p-2 hover:text-accent transition-colors z-50 text-foreground"
            aria-label="Toggle Mobile Menu"
          >
            {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8 text-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => toggleMobileNav(false)}
                className={cn(
                  "font-playfair font-medium transition-colors hover:text-accent",
                  pathname === link.href ? "text-accent" : "text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex space-x-6 pt-8">
              <Link href="/wishlist" onClick={() => toggleMobileNav(false)} className="text-foreground">
                <Heart size={28} />
              </Link>
              <Link href="/account" onClick={() => toggleMobileNav(false)} className="text-foreground">
                <User size={28} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
