import { create } from 'zustand';
import { Product } from '@/types';

interface UIState {
  searchOpen: boolean;
  mobileNavOpen: boolean;
  activeCategory: string | null;
  quickViewProduct: Product | null;
  quickViewOpen: boolean;
  toggleSearch: (open?: boolean) => void;
  toggleMobileNav: (open?: boolean) => void;
  setActiveCategory: (category: string | null) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchOpen: false,
  mobileNavOpen: false,
  activeCategory: null,
  quickViewProduct: null,
  quickViewOpen: false,
  toggleSearch: (open) =>
    set((state) => ({ searchOpen: open !== undefined ? open : !state.searchOpen })),
  toggleMobileNav: (open) =>
    set((state) => ({ mobileNavOpen: open !== undefined ? open : !state.mobileNavOpen })),
  setActiveCategory: (category) => set({ activeCategory: category }),
  openQuickView: (product) => set({ quickViewProduct: product, quickViewOpen: true }),
  closeQuickView: () => set({ quickViewOpen: false, quickViewProduct: null }),
}));
