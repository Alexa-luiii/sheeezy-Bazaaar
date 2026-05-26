'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import CartItem from './CartItem';
import { cn } from '@/lib/utils';

const CartDrawer = () => {
  const { isOpen, toggleCart, items } = useCartStore();
  const [coupon, setCoupon] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag size={24} className="text-accent" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-playfair font-bold">Your Cart</h2>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="p-2 hover:bg-surface rounded-full transition-colors text-foreground"
              >
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6">
              <AnimatePresence mode="popLayout">
                {items.length > 0 ? (
                  items.map((item) => (
                    <CartItem key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"
                  >
                    <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-4 relative">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      >
                        <ShoppingBag size={48} className="text-gray-600" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-playfair font-bold">Your cart is empty</h3>
                    <p className="text-gray-500 text-sm max-w-[250px] font-inter">
                      Indulge in our premium collection and start adding items to your cart.
                    </p>
                    <button
                      onClick={() => toggleCart(false)}
                      className="mt-6 bg-accent text-white px-10 py-4 rounded-full font-bold hover:bg-accent/80 transition-all active:scale-95 shadow-lg shadow-accent/20"
                    >
                      Browse Collection
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-surface/30 space-y-6">
                {/* Coupon */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors">
                    <Tag size={16} />
                  </div>
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Apply Coupon"
                    className="w-full bg-background border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-accent transition-all font-inter"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-accent hover:text-accent/80 transition-colors uppercase tracking-wider px-2">
                    Apply
                  </button>
                </div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm text-gray-400 font-inter">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-400 font-inter">
                    <span>Shipping</span>
                    <span className="text-accent font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-lg font-playfair font-bold">Estimated Total</span>
                    <span className="text-xl font-bold text-accent">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={() => toggleCart(false)}
                    className="group flex items-center justify-center gap-2 w-full bg-accent text-white py-4 rounded-full font-bold hover:bg-accent/90 transition-all active:scale-[0.98] shadow-xl shadow-accent/10"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={() => toggleCart(false)}
                    className="w-full text-center text-sm font-medium text-gray-500 hover:text-foreground transition-colors py-2 font-inter"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
