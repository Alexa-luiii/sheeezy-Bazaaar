'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Most Popular', value: 'popular' },
];

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="relative group">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none bg-primary border border-border text-sm font-medium text-text/80 py-2 pl-4 pr-10 rounded-full hover:bg-accent transition-colors focus:outline-none focus:border-sageDark cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value} className="bg-surface text-text">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-text/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-text transition-colors" />
    </div>
  );
};

export default SortDropdown;
