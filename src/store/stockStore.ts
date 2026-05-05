import { create } from "zustand";
import { Stock } from "@/types/stock";
import { generateStocks } from "@/data/generateStocks";

// ======================
// TYPES
// ======================

type StockStore = {
  // State
  stocks: Stock[];
  selectedStock: Stock | null;

  // Actions
  setStocks: (stocks: Stock[]) => void;
  setSelectedStock: (stock: Stock | null) => void;
  updateStockPrice: (symbol: string, newPrice: number, newChange: number) => void;
};

// ======================
// ZUSTAND STORE
// ======================
// Global state management for stock data
// Ensures consistent state across all components

export const useStockStore = create<StockStore>((set) => ({
  // ======================
  // INITIAL STATE
  // ======================

  stocks: generateStocks(5000),
  selectedStock: null,

  // ======================
  // ACTIONS
  // ======================

  /**
   * Replace entire stock list
   * Used when initializing data or applying bulk updates
   */
  setStocks: (stocks) => set({ stocks }),

  /**
   * Select a stock for detailed view
   * Updates chart and indicator displays
   */
  setSelectedStock: (stock) => set({ selectedStock: stock }),

  /**
   * Update price and change for a specific stock
   * Triggered by live market updates
   */
  updateStockPrice: (symbol, newPrice, newChange) =>
    set((state) => ({
      stocks: state.stocks.map((stock) =>
        stock.symbol === symbol
          ? { ...stock, price: newPrice, change: newChange }
          : stock
      ),
      // Update selected stock if it was modified
      selectedStock:
        state.selectedStock?.symbol === symbol
          ? { ...state.selectedStock, price: newPrice, change: newChange }
          : state.selectedStock,
    })),
}));