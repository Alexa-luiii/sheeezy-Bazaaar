'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { Search as SearchIcon, X, ArrowRight, Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import Link from 'next/link';

const SearchContent = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(' ');
    return products.filter(product => {
      const target = `${product.title} ${product.description} ${product.brand} ${product.category} ${product.tags.join(' ')}`.toLowerCase();
      return searchTerms.every(term => target.includes(term));
    });
  }, [query]);

  useEffect(() => {
    if (query) {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val) setLoading(true);
    else setLoading(false);
  };

  const suggestions = [
    { label: 'Royal Timepieces', link: '/category/timepieces' },
    { label: 'Ethereal Jewelry', link: '/category/jewelry' },
    { label: 'Avant-Garde Art', link: '/category/art' },
    { label: 'Haute Couture', link: '/category/high-fashion' },
  ];

  return (
    <div className="container-custom py-12 min-h-[60vh]">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto mb-16">
        <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-accent text-center mb-8">
          Seek Excellence
        </h1>
        <div className="relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <SearchIcon className="w-6 h-6 text-white/20 group-focus-within:text-brand-accent transition-colors" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search for masterpieces..."
            className="w-full bg-white/5 border-2 border-white/10 rounded-3xl py-6 pl-16 pr-16 text-2xl font-serif text-white placeholder:text-white/10 focus:outline-none focus:border-brand-accent focus:bg-white/[0.07] transition-all shadow-2xl"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-6 flex items-center text-white/20 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Results or Suggestions */}
      <div className="max-w-6xl mx-auto">
        {!query ? (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-8 text-white/40 flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              Suggested Collections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((item) => (
                <Link
                  key={item.label}
                  href={item.link}
                  className="group flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-brand-accent transition-all"
                >
                  <span className="font-serif text-xl group-hover:text-brand-accent transition-colors">
                    {item.label}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white/20 group-hover:translate-x-1 group-hover:text-brand-accent transition-all" />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
              <h2 className="text-lg font-medium text-white/60">
                Found {filteredProducts.length} results for &quot;{query}&quot;
              </h2>
            </div>

            {loading || filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                columns={{ mobile: 1, tablet: 2, desktop: 4 }}
              />
            ) : (
              <div className="py-24 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-8">
                  <SearchIcon className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-3xl font-serif mb-4 text-white/80">No matches found</h3>
                <p className="text-white/40 mb-8 max-w-md mx-auto">
                  We couldn&apos;t find any masterpieces matching your search. Try adjusting your keywords or explore our suggested collections.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Gold', 'Jewelry', 'Art', 'Watches', 'Silk'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={
      <div className="container-custom py-12 min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
