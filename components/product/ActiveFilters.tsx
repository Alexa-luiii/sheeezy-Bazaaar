'use client';

import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActiveFiltersProps {
  priceRange: [number, number];
  resetPrice: () => void;
  selectedBrands: string[];
  removeBrand: (brand: string) => void;
  selectedRating: number | null;
  resetRating: () => void;
  onClearAll: () => void;
  defaultPriceRange: [number, number];
}

const ActiveFilters = ({
  priceRange,
  resetPrice,
  selectedBrands,
  removeBrand,
  selectedRating,
  resetRating,
  onClearAll,
  defaultPriceRange,
}: ActiveFiltersProps) => {
  const hasFilters =
    priceRange[0] !== defaultPriceRange[0] ||
    priceRange[1] !== defaultPriceRange[1] ||
    selectedBrands.length > 0 ||
    selectedRating !== null;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <span className="text-xs font-bold uppercase tracking-widest text-white/40 mr-2">Filters:</span>

      <AnimatePresence>
        {(priceRange[0] !== defaultPriceRange[0] || priceRange[1] !== defaultPriceRange[1]) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={resetPrice}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/80 hover:bg-white/10 transition-colors"
          >
            ${priceRange[0]} - ${priceRange[1]}
            <X className="w-3 h-3" />
          </motion.button>
        )}

        {selectedBrands.map((brand) => (
          <motion.button
            key={brand}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => removeBrand(brand)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/80 hover:bg-white/10 transition-colors"
          >
            {brand}
            <X className="w-3 h-3" />
          </motion.button>
        ))}

        {selectedRating !== null && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={resetRating}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/80 hover:bg-white/10 transition-colors"
          >
            {selectedRating}+ Stars
            <X className="w-3 h-3" />
          </motion.button>
        )}
      </AnimatePresence>

      <button
        onClick={onClearAll}
        className="text-xs font-medium text-brand-accent hover:underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
};

export default ActiveFilters;
