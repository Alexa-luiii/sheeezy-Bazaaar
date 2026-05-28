'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star, TrendingUp, Zap, Clock, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useUIStore } from '@/lib/store/uiStore';

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

const ProductCard = ({ product, showQuickView = true }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();
  const openQuickView = useUIStore((state) => state.openQuickView);

  const inWishlist = isWishlisted(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      className="group relative flex flex-col h-full bg-surface/40 backdrop-blur-sm rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-sageDark/20 hover:border-sageDark/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.isDeal && (
          <div className="bg-accent text-text text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg shadow-accent/20">
            <Zap className="w-3 h-3 fill-current" />
            DEAL
          </div>
        )}
        {product.isTrending && (
          <div className="bg-sageDark text-primary text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg shadow-sageDark/20">
            <TrendingUp className="w-3 h-3" />
            TRENDING
          </div>
        )}
        {product.isLimited && (
          <div className="bg-sage text-text text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg shadow-sage/20">
            <Clock className="w-3 h-3" />
            LIMITED
          </div>
        )}
        {product.tags.includes('New') && (
          <div className="bg-sageDark text-primary text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg shadow-sageDark/20">
            <Sparkles className="w-3 h-3 fill-current" />
            NEW
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className={cn(
          "absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 border",
          inWishlist
            ? "bg-accent border-accent text-text scale-110"
            : "bg-surface/20 border-border text-text hover:bg-accent hover:border-accent"
        )}
      >
        <Heart className={cn("w-4 h-4 transition-transform duration-300", inWishlist && "fill-current")} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="h-full w-full"
        >
          {/* Main Image */}
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition-opacity duration-700",
              isHovered && product.images.length > 1 ? "opacity-0" : "opacity-100"
            )}
            priority={false}
          />

          {/* Hover Image */}
          {product.images.length > 1 && (
            <Image
              src={product.images[1]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-opacity duration-700 absolute inset-0",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </motion.div>

        {/* Quick View Button overlay */}
        <AnimatePresence>
          {isHovered && showQuickView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-surface/40 flex items-center justify-center pointer-events-none"
            >
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={handleQuickView}
                className="bg-surface text-text px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 pointer-events-auto hover:bg-sageDark transition-colors"
              >
                <Eye className="w-4 h-4" />
                QUICK VIEW
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add to Cart Slide-up */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              exit={{ y: 60 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="absolute bottom-0 inset-x-0 p-3 z-20"
            >
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={cn(
                  "w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all duration-300",
                  product.stock === 0
                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                    : "bg-sageDark text-primary hover:bg-surface"
                )}
              >
                <ShoppingBag className="w-4 h-4" />
                {product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow p-4 space-y-2">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] text-sageDark tracking-[0.2em] font-medium uppercase truncate">
            {product.brand}
          </span>
          <h3 className="text-sm font-semibold text-text group-hover:text-sageDark transition-colors truncate">
            {product.title}
          </h3>
        </div>

        {/* Rating & Sales */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "fill-sageDark text-sageDark"
                      : "text-text/20"
                  )}
                />
              ))}
            </div>
            <span className="text-[10px] text-text/60">({product.reviewCount})</span>
          </div>
          <span className="text-[10px] text-text/40 font-medium">
            {product.soldCount > 1000
              ? `${(product.soldCount / 1000).toFixed(1)}k sold`
              : `${product.soldCount} sold`}
          </span>
        </div>

        <div className="mt-auto pt-2 flex flex-col gap-2">
          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-lg font-bold text-sageDark">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-text/40 line-through mb-0.5">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          {product.stock > 0 && product.stock < 5 && (
            <div className="flex items-center gap-1.5 text-[10px] text-red-400 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Only {product.stock} left in stock - order soon
            </div>
          )}
          {product.stock === 0 && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium italic">
              Out of stock
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
