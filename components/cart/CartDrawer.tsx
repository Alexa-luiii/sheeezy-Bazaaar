'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';

const CartDrawer = () => {
  const { isOpen, toggleCart, items } = useCartStore();

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
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-playfair font-bold flex items-center gap-2">
                <ShoppingBag size={20} />
                Your Cart ({items.length})
              </h2>
              <button
                onClick={() => toggleCart(false)}
                className="p-2 hover:bg-surface rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
              {items.length === 0 ? (
                <>
                  <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={40} className="text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm max-w-xs">
                    Start adding your favorite luxury items to the cart and experience premium shopping.
                  </p>
                  <button
                    onClick={() => toggleCart(false)}
                    className="mt-4 bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/80 transition-colors"
                  >
                    Start Shopping
                  </button>
                </>
              ) : (
                <p>Items implementation coming soon...</p>
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-surface/30 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">$0.00</span>
              </div>
              <button
                disabled={items.length === 0}
                className="w-full bg-accent text-white py-4 rounded-full font-bold hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
