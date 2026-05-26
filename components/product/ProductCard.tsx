'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';

interface ProductCardProps {
  product: Product;
  className?: string;
  showBadge?: boolean;
}

export default function ProductCard({ product, className, showBadge = true }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();

  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.sizes?.[0], product.colors?.[0]);
    toggleCart(true);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("group relative flex flex-col h-full bg-background overflow-hidden", className)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={product.title}
              fill
              className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Badges */}
        {showBadge && (
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.discount > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                -{product.discount}%
              </span>
            )}
            {product.isTrending && (
              <span className="bg-accent text-brand text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                Trending
              </span>
            )}
            {product.isLimited && (
              <span className="bg-brand text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider border border-white/20">
                Limited
              </span>
            )}
          </div>
        )}

        {/* Action Buttons (Overlay) */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none group-hover:pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors duration-300",
              wishlisted ? "bg-accent text-brand" : "bg-white/90 text-brand hover:bg-accent hover:text-brand"
            )}
          >
            <Heart className={cn("w-5 h-5", wishlisted && "fill-current")} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-white/90 text-brand flex items-center justify-center backdrop-blur-md hover:bg-accent hover:text-brand transition-colors duration-300"
          >
            <ShoppingBag className="w-5 h-5" />
          </motion.button>

          <Link href={`/product/${product.id}`} className="pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/90 text-brand flex items-center justify-center backdrop-blur-md hover:bg-accent hover:text-brand transition-colors duration-300"
            >
              <Eye className="w-5 h-5" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow pt-4 pb-2 space-y-1">
        <div className="flex justify-between items-start gap-2">
          <p className="text-[10px] text-foreground/50 uppercase tracking-[0.2em] font-medium">
            {product.brand}
          </p>
          <div className="flex items-center gap-1 text-[10px] font-medium">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-playfair font-semibold group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm font-bold">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-foreground/40 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
