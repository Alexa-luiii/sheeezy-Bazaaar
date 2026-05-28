'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Star, ShieldCheck, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUIStore } from '@/lib/store/uiStore';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const QuickViewModal = () => {
  const { quickViewOpen, quickViewProduct, closeQuickView } = useUIStore();
  const addItem = useCartStore((state) => state.addItem);
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!quickViewProduct) return null;

  const inWishlist = isWishlisted(quickViewProduct.id);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(quickViewProduct.id);
    } else {
      addToWishlist(quickViewProduct);
    }
  };

  const handleAddToCart = () => {
    addItem(quickViewProduct, 1, selectedSize, selectedColor);
    closeQuickView();
  };

  return (
    <Dialog.Root open={quickViewOpen} onOpenChange={(open) => !open && closeQuickView()}>
      <AnimatePresence>
        {quickViewOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-surface/90 backdrop-blur-md z-[100]"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-primary border border-border w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl relative flex flex-col md:flex-row no-scrollbar"
                >
                  <Dialog.Close
                    className="absolute top-6 right-6 z-20 p-2 rounded-full bg-surface/40 text-text hover:bg-surface hover:text-text transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </Dialog.Close>

                  {/* Left: Image Gallery */}
                  <div className="w-full md:w-1/2 aspect-[4/5] relative bg-surface overflow-hidden">
                    <Image
                      src={quickViewProduct.images[0]}
                      alt={quickViewProduct.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-text/60 to-transparent" />
                    <div className="absolute bottom-8 left-8 flex gap-3">
                      {quickViewProduct.images.slice(0, 3).map((img, i) => (
                        <div key={i} className="w-20 h-24 rounded-sm overflow-hidden border border-border shadow-xl">
                          <Image src={img} alt="" width={80} height={96} className="object-cover h-full w-full" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Info */}
                  <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col bg-surface">
                    <div className="mb-4">
                      <span className="text-sageDark tracking-[0.4em] font-bold uppercase text-[10px] border border-sageDark/30 px-2 py-1">
                        {quickViewProduct.brand}
                      </span>
                    </div>
                    <Dialog.Title className="text-4xl font-bold text-text mb-4 leading-tight font-serif">
                      {quickViewProduct.title}
                    </Dialog.Title>

                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3.5 h-3.5",
                              i < Math.floor(quickViewProduct.rating)
                                ? "fill-sageDark text-sageDark"
                                : "text-text/10"
                            )}
                          />
                        ))}
                        <span className="text-[10px] uppercase tracking-widest text-muted ml-2">{quickViewProduct.reviewCount} Reviews</span>
                      </div>
                      <div className="h-4 w-px bg-accent" />
                      <span className="text-[10px] uppercase tracking-widest text-muted">{quickViewProduct.soldCount} Collections Sold</span>
                    </div>

                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-4xl font-bold text-sageDark">
                        ${quickViewProduct.price.toLocaleString()}
                      </span>
                      {quickViewProduct.originalPrice > quickViewProduct.price && (
                        <span className="text-xl text-muted line-through font-medium">
                          ${quickViewProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <Dialog.Description className="text-muted leading-relaxed mb-10 text-sm">
                      {quickViewProduct.description}
                    </Dialog.Description>

                    {/* Variant Selectors */}
                    <div className="space-y-8 mb-12">
                      {quickViewProduct.sizes && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Select Size</span>
                                <button className="text-[10px] text-sageDark uppercase tracking-widest hover:underline">Size Guide</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                            {quickViewProduct.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={cn(
                                        "min-w-[3rem] h-10 px-3 rounded-sm border text-xs font-bold transition-all uppercase tracking-widest",
                                        selectedSize === size
                                            ? "border-sageDark bg-sageDark text-primary"
                                            : "border-border text-text hover:border-white/30"
                                    )}
                                >
                                {size}
                                </button>
                            ))}
                            </div>
                        </div>
                      )}

                      {quickViewProduct.colors && (
                        <div>
                            <span className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-4">Select Color</span>
                            <div className="flex flex-wrap gap-3">
                            {quickViewProduct.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    title={color}
                                    className={cn(
                                        "w-8 h-8 rounded-full border-2 transition-all p-0.5",
                                        selectedColor === color ? "border-sageDark scale-110" : "border-transparent"
                                    )}
                                >
                                    <div className="w-full h-full rounded-full border border-border" style={{ backgroundColor: color.toLowerCase().replace(' ', '') }} />
                                </button>
                            ))}
                            </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <Button
                                onClick={handleAddToCart}
                                disabled={quickViewProduct.stock === 0}
                                className="flex-grow h-14"
                                size="lg"
                            >
                                <ShoppingBag className="w-5 h-5 mr-3" />
                                {quickViewProduct.stock === 0 ? "OUT OF STOCK" : "ADD TO BOUTIQUE BAG"}
                            </Button>
                            <button
                                onClick={toggleWishlist}
                                className={cn(
                                "w-14 h-14 rounded-sm border flex items-center justify-center transition-all group",
                                inWishlist
                                    ? "bg-red-500/10 border-red-500/50 text-red-500"
                                    : "border-border text-muted hover:text-text hover:border-white/30"
                                )}
                            >
                                <Heart className={cn("w-6 h-6", inWishlist && "fill-current")} />
                            </button>
                        </div>
                        <Link
                            href={`/product/${quickViewProduct.id}`}
                            onClick={closeQuickView}
                            className="text-center py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-muted hover:text-sageDark transition-colors flex items-center justify-center group"
                        >
                            View Full Masterpiece Details
                            <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default QuickViewModal;
