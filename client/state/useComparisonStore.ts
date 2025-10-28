import { create } from 'zustand';


interface ComparisonState {
  comparisonResult: string | null;
  setComparisonResult: (url: string) => void;
  clearComparisonResult: () => void;
}

export const useComparisonStore = create<ComparisonState>((set) => ({
  comparisonResult: null,
  setComparisonResult: (url) => set({ comparisonResult: url }),
  clearComparisonResult: () => set({ comparisonResult: null }),
}));