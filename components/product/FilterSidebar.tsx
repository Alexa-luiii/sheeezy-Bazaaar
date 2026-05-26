'use client';

import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Star, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  brands: string[];
  maxPrice: number;
}

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  selectedBrands,
  toggleBrand,
  selectedRating,
  setSelectedRating,
  brands,
  maxPrice,
}: FilterSidebarProps) => {
  return (
    <div className="space-y-10">
      {/* Price Range */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/50">Price Range</h3>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={priceRange}
          max={maxPrice}
          step={10}
          onValueChange={(value) => setPriceRange(value as [number, number])}
        >
          <Slider.Track className="bg-white/10 relative grow rounded-full h-[2px]">
            <Slider.Range className="absolute bg-brand-accent rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-4 h-4 bg-white shadow-lg rounded-full hover:scale-110 transition-transform focus:outline-none"
            aria-label="Min price"
          />
          <Slider.Thumb
            className="block w-4 h-4 bg-white shadow-lg rounded-full hover:scale-110 transition-transform focus:outline-none"
            aria-label="Max price"
          />
        </Slider.Root>
        <div className="flex justify-between mt-4">
          <span className="text-sm font-medium text-white/70">${priceRange[0].toLocaleString()}</span>
          <span className="text-sm font-medium text-white/70">${priceRange[1].toLocaleString()}</span>
        </div>
      </section>

      {/* Brands */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/50">Brands</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 border border-white/10 rounded bg-white/5 checked:bg-brand-accent checked:border-brand-accent transition-all"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <Check className="w-3.5 h-3.5 text-brand-primary absolute opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="ml-3 text-sm text-white/60 group-hover:text-white transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Rating */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/50">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
              className={cn(
                "flex items-center gap-2 w-full p-2 rounded-lg transition-colors",
                selectedRating === rating ? "bg-white/10" : "hover:bg-white/5"
              )}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3.5 h-3.5",
                      i < rating ? "fill-brand-accent text-brand-accent" : "text-white/10"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-white/60">& Up</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilterSidebar;
