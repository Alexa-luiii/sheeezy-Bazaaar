'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Send, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-brand text-white pt-20 pb-10"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Tagline */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-playfair font-bold tracking-tight">
                SHEEEZY BAZAAR
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Experience the finest curation of global fashion, beauty, and luxury lifestyle essentials. Curated for the modern connoisseur.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-accent transition-colors text-xs font-medium">INSTAGRAM</Link>
              <Link href="#" className="hover:text-accent transition-colors text-xs font-medium">TWITTER</Link>
              <Link href="#" className="hover:text-accent transition-colors text-xs font-medium">FACEBOOK</Link>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-playfair font-bold text-lg mb-6">Shop</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/category/women" className="hover:text-accent transition-colors">Women&apos;s Clothing</Link></li>
              <li><Link href="/category/shoes" className="hover:text-accent transition-colors">Women&apos;s Shoes</Link></li>
              <li><Link href="/category/beauty" className="hover:text-accent transition-colors">Beauty Products</Link></li>
              <li><Link href="/category/bags" className="hover:text-accent transition-colors">Luxury Bags</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-accent transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-playfair font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="/sustainability" className="hover:text-accent transition-colors">Sustainability</Link></li>
              <li><Link href="/press" className="hover:text-accent transition-colors">Press</Link></li>
              <li><Link href="/affiliates" className="hover:text-accent transition-colors">Affiliates</Link></li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="font-playfair font-bold text-lg mb-6">Help</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/shipping" className="hover:text-accent transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-accent transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link href="/size-guide" className="hover:text-accent transition-colors">Size Guide</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Social (Re-arranged) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pt-12 border-t border-white/5">
          <div>
            <h4 className="font-playfair font-bold text-lg mb-6 text-accent">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="relative max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-1 top-1 bottom-1 bg-accent text-white px-4 rounded-full flex items-center justify-center transition-colors hover:bg-accent/80"
              >
                <Send size={16} />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} SHEEEZY BAZAAR. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6 text-gray-500">
            <span className="flex items-center space-x-1"><CreditCard size={14} /> <span className="text-[10px]">VISA</span></span>
            <span className="flex items-center space-x-1"><CreditCard size={14} /> <span className="text-[10px]">MASTERCARD</span></span>
            <span className="flex items-center space-x-1"><CreditCard size={14} /> <span className="text-[10px]">PAYPAL</span></span>
          </div>
          <div className="flex space-x-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
