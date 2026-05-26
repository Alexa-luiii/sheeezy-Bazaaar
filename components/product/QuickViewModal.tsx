'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { useUIStore } from '@/lib/store/uiStore';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { cn } from '@/lib/utils';

const QuickViewModal = () => {
  const { quickViewOpen, quickViewProduct, closeQuickView } = useUIStore();
  const addToCart = useCartStore((state) => state.addItem);
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();

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
    addToCart(quickViewProduct);
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
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-surface border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col md:flex-row"
                >
                  <Dialog.Close
                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-white hover:text-black transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </Dialog.Close>

                  {/* Left: Image Gallery */}
                  <div className="w-full md:w-1/2 aspect-[4/5] relative bg-[#0F0F0F]">
                    <Image
                      src={quickViewProduct.images[0]}
                      alt={quickViewProduct.title}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {quickViewProduct.images.slice(0, 4).map((img, i) => (
                        <div key={i} className="w-16 h-20 rounded-lg overflow-hidden border border-white/20">
                          <Image src={img} alt="" width={64} height={80} className="object-cover h-full w-full" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Info */}
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                    <div className="mb-2">
                      <span className="text-brand-accent tracking-[0.3em] font-medium uppercase text-xs">
                        {quickViewProduct.brand}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 leading-tight font-serif">
                      {quickViewProduct.title}
                    </h2>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < Math.floor(quickViewProduct.rating)
                                ? "fill-brand-accent text-brand-accent"
                                : "text-white/20"
                            )}
                          />
                        ))}
                        <span className="text-sm text-white/60 ml-1">({quickViewProduct.reviewCount} reviews)</span>
                      </div>
                      <span className="text-sm text-white/40">|</span>
                      <span className="text-sm text-white/60">{quickViewProduct.soldCount} sold</span>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-4xl font-bold text-brand-accent">
                        ${quickViewProduct.price.toLocaleString()}
                      </span>
                      {quickViewProduct.originalPrice > quickViewProduct.price && (
                        <span className="text-xl text-white/40 line-through">
                          ${quickViewProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                      {quickViewProduct.discount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{quickViewProduct.discount}%
                        </span>
                      )}
                    </div>

                    <p className="text-white/70 leading-relaxed mb-8">
                      {quickViewProduct.description}
                    </p>

                    {/* Options placeholders */}
                    <div className="space-y-6 mb-10">
                      <div>
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-3">Select Size</span>
                        <div className="flex gap-2">
                          {['S', 'M', 'L', 'XL'].map((size) => (
                            <button key={size} className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-sm font-bold hover:border-brand-accent hover:text-brand-accent transition-colors">
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-10">
                      <button
                        onClick={handleAddToCart}
                        disabled={quickViewProduct.stock === 0}
                        className="flex-grow bg-brand-accent text-brand-primary h-14 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white transition-all transform active:scale-95 disabled:opacity-50"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        {quickViewProduct.stock === 0 ? "OUT OF STOCK" : "ADD TO BAG"}
                      </button>
                      <button
                        onClick={toggleWishlist}
                        className={cn(
                          "w-14 h-14 rounded-2xl border flex items-center justify-center transition-all active:scale-95",
                          inWishlist
                            ? "bg-red-500 border-red-500 text-white"
                            : "border-white/10 text-white hover:bg-white/5"
                        )}
                      >
                        <Heart className={cn("w-6 h-6", inWishlist && "fill-current")} />
                      </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                      <div className="flex flex-col items-center text-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-brand-accent" />
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Auth. Guaranteed</span>
                      </div>
                      <div className="flex flex-col items-center text-center gap-2">
                        <Truck className="w-5 h-5 text-brand-accent" />
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Fast Shipping</span>
                      </div>
                      <div className="flex flex-col items-center text-center gap-2">
                        <RotateCcw className="w-5 h-5 text-brand-accent" />
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Easy Returns</span>
                      </div>
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
