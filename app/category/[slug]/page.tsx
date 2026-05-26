'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { products } from '@/data/products';
import FilterSidebar from '@/components/product/FilterSidebar';
import SortDropdown, { SortOption } from '@/components/product/SortDropdown';
import ActiveFilters from '@/components/product/ActiveFilters';
import ProductGrid from '@/components/product/ProductGrid';

const DEFAULT_PRICE_RANGE: [number, number] = [0, 5000];

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Format slug for display
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const brands = useMemo(() => {
    const categoryProducts = products.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === slug);
    return Array.from(new Set(categoryProducts.map(p => p.brand)));
  }, [slug]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === slug);

    // Apply filters
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedRating !== null) {
      result = result.filter(p => p.rating >= selectedRating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.soldCount - a.soldCount);
        break;
      case 'newest':
      default:
        // Mock newest by ID
        result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [slug, priceRange, selectedBrands, selectedRating, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [slug, priceRange, selectedBrands, selectedRating, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSelectedBrands([]);
    setSelectedRating(null);
  };

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{categoryName}</h1>
            <p className="text-white/40 uppercase tracking-widest text-xs font-bold">
              {filteredProducts.length} Exquisite Pieces Found
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedBrands={selectedBrands}
              toggleBrand={toggleBrand}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              brands={brands}
              maxPrice={5000}
            />
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-grow">
          <ActiveFilters
            priceRange={priceRange}
            resetPrice={() => setPriceRange(DEFAULT_PRICE_RANGE)}
            selectedBrands={selectedBrands}
            removeBrand={toggleBrand}
            selectedRating={selectedRating}
            resetRating={() => setSelectedRating(null)}
            onClearAll={clearAllFilters}
            defaultPriceRange={DEFAULT_PRICE_RANGE}
          />

          {filteredProducts.length > 0 || loading ? (
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              columns={{ mobile: 1, tablet: 2, desktop: 3 }}
            />
          ) : (
            <div className="py-32 text-center">
              <h3 className="text-2xl font-serif mb-4 text-white/80">No matches found</h3>
              <p className="text-white/40 mb-8 max-w-md mx-auto">
                Adjust your filters or explore our other exquisite collections.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-8 py-3 bg-brand-accent text-brand-primary rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-surface z-[151] p-8 md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-bold uppercase tracking-widest">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                brands={brands}
                maxPrice={5000}
              />

              <div className="mt-12 pt-8 border-t border-white/10">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-4 bg-brand-accent text-brand-primary rounded-2xl font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;
