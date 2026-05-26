import { create } from 'zustand';

interface UIState {
  searchOpen: boolean;
  mobileNavOpen: boolean;
  activeCategory: string | null;
  toggleSearch: (open?: boolean) => void;
  toggleMobileNav: (open?: boolean) => void;
  setActiveCategory: (category: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchOpen: false,
  mobileNavOpen: false,
  activeCategory: null,
  toggleSearch: (open) =>
    set((state) => ({ searchOpen: open !== undefined ? open : !state.searchOpen })),
  toggleMobileNav: (open) =>
    set((state) => ({ mobileNavOpen: open !== undefined ? open : !state.mobileNavOpen })),
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
