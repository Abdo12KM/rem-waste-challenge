import { create } from "zustand";
import { FilterState } from "@/lib/types";

interface SkipStore {
  selectedSkipId: number | null;
  filters: FilterState;
  setSelectedSkip: (id: number) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  initializeFilters: (
    minPrice: number,
    maxPrice: number,
    minSize: number,
    maxSize: number
  ) => void;
}

const defaultFilters: FilterState = {
  roadLegal: null,
  heavyWaste: null,
  priceRange: [0, 2000],
  sizeRange: [4, 40],
};

export const useSkipStore = create<SkipStore>((set) => ({
  selectedSkipId: null,
  filters: defaultFilters,
  setSelectedSkip: (id) =>
    set((state) => ({
      selectedSkipId: state.selectedSkipId === id ? null : id,
    })),
  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  initializeFilters: (minPrice, maxPrice, minSize, maxSize) =>
    set((state) => ({
      filters: {
        ...state.filters,
        priceRange: [minPrice, maxPrice],
        sizeRange: [minSize, maxSize],
      },
    })),
}));
