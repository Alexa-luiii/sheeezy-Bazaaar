'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Grid, Search, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Categories', icon: Grid, href: '/category' },
  { name: 'Search', icon: Search, href: '/search' },
  { name: 'Wishlist', icon: Heart, href: '/wishlist' },
  { name: 'Profile', icon: User, href: '/account' },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
      <div className="bg-background/80 backdrop-blur-lg border-t border-border px-6 py-3">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex flex-col items-center space-y-1 group"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    color: isActive ? 'var(--color-accent)' : 'currentColor',
                  }}
                  className="relative z-10"
                >
                  <Icon size={22} className={cn(isActive ? "text-accent" : "text-foreground/70")} />
                </motion.div>

                {isActive && (
                  <motion.div
                    layoutId="mobileNavActive"
                    className="absolute -inset-2 bg-accent/10 rounded-full -z-0"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <span className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-accent" : "text-foreground/70"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
