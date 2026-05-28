'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Truck, ShieldCheck, RefreshCw, Heart, ShoppingBag, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();

  const isInWishlist = isWishlisted(product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Brand & Title */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-accent font-bold uppercase tracking-[0.2em] text-sm">{product.brand}</p>
            <p className="text-text/40 text-[10px] font-bold uppercase tracking-[0.2em]">
              {product.soldCount}+ Sold in last 24h
            </p>
          </div>
          <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        <h1 className="text-4xl lg:text-5xl font-serif text-text leading-tight">{product.title}</h1>

        <div className="flex items-center gap-4 pt-2">
          <p className="text-3xl font-light text-text">${product.price}</p>
          {product.discount > 0 && (
            <>
              <p className="text-xl text-text/40 line-through">${product.originalPrice}</p>
              <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-1 uppercase tracking-wider rounded">
                Save {product.discount}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Delivery Info */}
      <div className="flex items-center gap-3 text-text/60 text-sm bg-primary p-4 rounded-lg border border-border">
        <Truck size={18} className="text-accent" />
        <p>Estimated delivery: <span className="text-text font-bold">{product.estimatedDelivery}</span></p>
      </div>

      <div className="h-px w-full bg-accent" />

      {/* Description Preview */}
      <p className="text-text/70 leading-relaxed text-lg">
        {product.description}
      </p>

      {/* Stock Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="text-text/60">Limited Availability</span>
          <span className="text-accent">{product.stock} pieces remaining</span>
        </div>
        <div className="h-1 w-full bg-accent rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-accent"
          />
        </div>
      </div>

      {/* Variants Selection */}
      <div className="space-y-6">
        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-bold uppercase tracking-widest text-text/60">Color</label>
              <span className="text-sm text-text font-medium">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "px-4 py-2 text-sm border transition-all duration-300",
                    selectedColor === color
                      ? "border-accent text-accent bg-accent/5"
                      : "border-border text-text hover:border-white/30"
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-bold uppercase tracking-widest text-text/60">Size</label>
              <button className="text-xs text-accent underline uppercase tracking-wider font-bold">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center text-sm border transition-all duration-300",
                    selectedSize === size
                      ? "border-accent text-accent bg-accent/5"
                      : "border-border text-text hover:border-white/30"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="space-y-3">
          <label className="text-sm font-bold uppercase tracking-widest text-text/60">Quantity</label>
          <div className="flex items-center w-32 border border-border h-12">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex-1 flex items-center justify-center text-text hover:bg-primary h-full transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="flex-1 flex items-center justify-center text-text font-medium border-x border-border h-full">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex-1 flex items-center justify-center text-text hover:bg-primary h-full transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-[2] bg-accent hover:bg-accent-light text-text h-14 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <ShoppingBag size={20} />
            Add to Cart
          </button>
          <button
            onClick={toggleWishlist}
            className={cn(
              "flex-1 border h-14 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98]",
              isInWishlist
                ? "border-accent text-accent bg-accent/5"
                : "border-border text-text hover:bg-primary"
            )}
          >
            <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
            {isInWishlist ? "Saved" : "Save"}
          </button>
        </div>

        <button className="w-full bg-surface hover:bg-surface/90 text-text h-14 font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98]">
          Buy It Now
        </button>
      </div>

      {/* Shipping Info Accordion */}
      <div className="pt-8 border-t border-border space-y-4">
        {[
          {
            id: 'shipping',
            title: 'Shipping & Returns',
            content: 'We offer worldwide complimentary express shipping. Returns are accepted within 30 days of delivery in original condition.',
            icon: Truck
          },
          {
            id: 'guarantee',
            title: 'Authenticity Guarantee',
            content: 'Every piece in our collection is meticulously inspected by our master curators to guarantee 100% authenticity.',
            icon: ShieldCheck
          }
        ].map((item) => (
          <div key={item.id} className="border-b border-border pb-4 last:border-0">
            <button
              onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
              className="flex items-center justify-between w-full group"
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className="text-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/80 group-hover:text-text transition-colors">
                  {item.title}
                </span>
              </div>
              <Plus
                size={16}
                className={cn(
                  "text-accent transition-transform duration-300",
                  activeAccordion === item.id && "rotate-45"
                )}
              />
            </button>
            <motion.div
              initial={false}
              animate={{
                height: activeAccordion === item.id ? 'auto' : 0,
                opacity: activeAccordion === item.id ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-sm text-text/50 leading-relaxed pl-[30px]">
                {item.content}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
