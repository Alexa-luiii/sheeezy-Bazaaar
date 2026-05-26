'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/lib/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrement = () => {
    updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor);
    }
  };

  const handleRemove = () => {
    removeItem(item.product.id, item.selectedSize, item.selectedColor);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 py-6 border-b border-white/5"
    >
      {/* Product Image */}
      <div className="relative w-24 h-32 bg-surface rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.product.images[0]}
          alt={item.product.title}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium font-playfair line-clamp-2 pr-4">
              {item.product.title}
            </h4>
            <button
              onClick={handleRemove}
              className="text-gray-500 hover:text-red-500 transition-colors p-1"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 font-inter">
            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
            {item.selectedColor && (
              <div className="flex items-center gap-1">
                <span>Color:</span>
                <span className="capitalize">{item.selectedColor}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-white/10 rounded-full px-2 py-1 gap-3">
            <button
              onClick={handleDecrement}
              className="p-1 hover:text-accent transition-colors disabled:opacity-30"
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-1 hover:text-accent transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price */}
          <div className="text-sm font-bold text-accent">
            ${(item.product.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
