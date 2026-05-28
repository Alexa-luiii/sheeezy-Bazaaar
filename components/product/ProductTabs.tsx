'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ReviewList from './ReviewList';

interface ProductTabsProps {
  description: string;
  specifications: Record<string, string>;
  productId: string;
}

export default function ProductTabs({ description, specifications, productId }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping' },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-border overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-8 py-6 text-sm font-bold uppercase tracking-widest transition-colors min-w-max",
              activeTab === tab.id ? "text-accent" : "text-text/40 hover:text-text"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <p className="text-text/70 leading-relaxed text-lg">
                  {description}
                </p>
                <ul className="mt-8 space-y-4 text-text/60">
                  <li>Expertly crafted with attention to every detail</li>
                  <li>Premium materials sourced from sustainable suppliers</li>
                  <li>Designed for both durability and timeless style</li>
                  <li>Signature Sheeezy Bazaar branding</li>
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-border py-4">
                    <span className="text-text/40 uppercase tracking-widest text-xs font-bold">{key}</span>
                    <span className="text-text font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewList productId={productId} />
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-surface p-6 border border-border">
                    <h4 className="text-text font-bold uppercase tracking-widest mb-4">Standard</h4>
                    <p className="text-text/60 text-sm mb-2">5-7 Business Days</p>
                    <p className="text-accent font-bold">FREE</p>
                  </div>
                  <div className="bg-surface p-6 border border-border">
                    <h4 className="text-text font-bold uppercase tracking-widest mb-4">Express</h4>
                    <p className="text-text/60 text-sm mb-2">2-3 Business Days</p>
                    <p className="text-text font-bold">$15.00</p>
                  </div>
                  <div className="bg-surface p-6 border border-border">
                    <h4 className="text-text font-bold uppercase tracking-widest mb-4">Next Day</h4>
                    <p className="text-text/60 text-sm mb-2">1 Business Day</p>
                    <p className="text-text font-bold">$30.00</p>
                  </div>
                </div>
                <p className="text-text/40 text-sm italic">
                  * Shipping times may vary based on location and carrier capacity.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
