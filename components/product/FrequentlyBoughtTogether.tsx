'use client';

import { products } from '@/data/products';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';

interface FrequentlyBoughtTogetherProps {
  currentProduct: Product;
}

export default function FrequentlyBoughtTogether({ currentProduct }: FrequentlyBoughtTogetherProps) {
  const addItem = useCartStore((state) => state.addItem);

  // Pick 2 random-ish products from related categories
  const upsellProducts = products
    .filter(p => p.id !== currentProduct.id && (p.category.includes('Shoes') || p.category.includes('Bags')))
    .slice(0, 2);

  const totalPrice = currentProduct.price + upsellProducts.reduce((sum, p) => sum + p.price, 0);

  const addBundleToCart = () => {
    addItem(currentProduct, 1);
    upsellProducts.forEach(p => addItem(p, 1));
  };

  return (
    <div className="bg-surface p-8 border border-border">
      <h3 className="text-xl font-serif text-text mb-8">Frequently Bought Together</h3>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex items-center gap-4 flex-1">
          {/* Main Product */}
          <div className="relative w-24 aspect-[3/4] border border-border">
            <Image src={currentProduct.images[0]} alt={currentProduct.title} fill className="object-cover" />
          </div>

          <Plus className="text-text/20" />

          {/* Upsell Products */}
          <div className="flex gap-4">
            {upsellProducts.map(product => (
              <div key={product.id} className="relative w-24 aspect-[3/4] border border-border">
                <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4 min-w-[200px]">
          <div className="text-center md:text-right">
            <p className="text-text/40 text-xs uppercase tracking-widest font-bold mb-1">Bundle Price</p>
            <p className="text-3xl text-text font-light">${totalPrice}</p>
          </div>
          <button
            onClick={addBundleToCart}
            className="w-full bg-surface text-text h-12 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-accent transition-colors"
          >
            <Plus size={16} />
            Add Bundle to Cart
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <input type="checkbox" checked readOnly className="accent-accent" />
          <span className="text-sm text-text font-medium italic">This item: {currentProduct.title}</span>
        </div>
        {upsellProducts.map(p => (
          <div key={p.id} className="flex items-center gap-3">
            <input type="checkbox" checked readOnly className="accent-accent" />
            <Link href={`/product/${p.id}`} className="text-sm text-text/60 hover:text-accent transition-colors">
              {p.title}
            </Link>
            <span className="text-sm text-accent font-bold ml-auto">${p.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
