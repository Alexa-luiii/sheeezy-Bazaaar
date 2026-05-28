'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Send, CreditCard, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface text-text pt-24 pb-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          {/* Brand Tagline */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-playfair font-bold tracking-tight text-text">
                SHEEEZY BAZAAR
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Curating the world&apos;s most evocative fashion and lifestyle essentials. Join our journey into the heart of elegance.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-muted hover:text-sageDark transition-colors"><Globe size={20} /></Link>
              <Link href="#" className="text-muted hover:text-sageDark transition-colors"><Globe size={20} /></Link>
              <Link href="#" className="text-muted hover:text-sageDark transition-colors"><Globe size={20} /></Link>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-text">Shop</h4>
            <ul className="space-y-4 text-muted text-xs font-bold uppercase tracking-widest">
              <li><Link href="/category/women" className="hover:text-sageDark transition-colors">Women</Link></li>
              <li><Link href="/category/shoes" className="hover:text-sageDark transition-colors">Shoes</Link></li>
              <li><Link href="/category/beauty" className="hover:text-sageDark transition-colors">Beauty</Link></li>
              <li><Link href="/category/bags" className="hover:text-sageDark transition-colors">Bags</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-text">Company</h4>
            <ul className="space-y-4 text-muted text-xs font-bold uppercase tracking-widest">
              <li><Link href="/about" className="hover:text-sageDark transition-colors">Our Story</Link></li>
              <li><Link href="/sustainability" className="hover:text-sageDark transition-colors">Ethos</Link></li>
              <li><Link href="/press" className="hover:text-sageDark transition-colors">Journal</Link></li>
              <li><Link href="/careers" className="hover:text-sageDark transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-text">Concierge</h4>
            <ul className="space-y-4 text-muted text-xs font-bold uppercase tracking-widest">
              <li><Link href="/shipping" className="hover:text-sageDark transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-sageDark transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-sageDark transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-sageDark transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-muted text-[10px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} SHEEEZY BAZAAR. Crafted with love.
          </p>
          <div className="flex items-center space-x-8 text-muted">
            <span className="flex items-center space-x-2"><CreditCard size={14} /> <span className="text-[10px] font-bold tracking-widest">VISA</span></span>
            <span className="flex items-center space-x-2"><CreditCard size={14} /> <span className="text-[10px] font-bold tracking-widest">AMEX</span></span>
            <span className="flex items-center space-x-2"><CreditCard size={14} /> <span className="text-[10px] font-bold tracking-widest">PAYPAL</span></span>
          </div>
          <div className="flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-muted">
            <Link href="/privacy" className="hover:text-text transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-text transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
