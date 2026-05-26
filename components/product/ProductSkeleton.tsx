'use client';

import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] bg-white/5 rounded-2xl animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-1/3 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
