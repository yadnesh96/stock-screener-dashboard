"use client";

import React, { useEffect, useState, useMemo } from "react";

// ======================
// IMPORTS - External Libraries
// ======================

import { Stock } from "@/types/stock";

// ======================
// IMPORTS - Components
// ======================

import StockChart from "@/components/StockChart";
import StatsCards from "@/components/StatsCards";
import FiltersPanel from "@/components/FiltersPanel";
import StockTable from "@/components/StockTable";

// ======================
// IMPORTS - Store
// ======================

import { useStockStore } from "@/store/stockStore";

// ======================
// PAGE COMPONENT
// ======================

export default function Home() {
  // ======================
  // STATE MANAGEMENT - Zustand Store
  // ======================
  // Centralized state for stocks and selected stock

  const stocks = useStockStore((state) => state.stocks);
  const setStocks = useStockStore((state) => state.setStocks);
  const selectedStock = useStockStore((state) => state.selectedStock);
  const setSelectedStock = useStockStore((state) => state.setSelectedStock);

  // ======================
  // STATE MANAGEMENT - Local Filters
  // ======================
  // Filter and sort UI state

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [filterType, setFilterType] = useState<"all" | "gainers" | "losers">(
    "all"
  );

  // Note: Stocks are initialized by Zustand store
  // No need to regenerate here - prevents hydration mismatch

  // ======================
  // EFFECTS - Update Selected Stock
  // ======================
  // Keep selected stock in sync when stocks update

  useEffect(() => {
    if (!selectedStock) return;

    // Find updated version of selected stock
    const updated = stocks.find(
      (s) => s.symbol === selectedStock.symbol
    );

    setSelectedStock(updated || null);
  }, [stocks, selectedStock, setSelectedStock]);

  // ======================
  // EFFECTS - Live Updates
  // ======================
  // Simulate live market data updates every 2 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate realistic price and change updates
      const updatedStocks = stocks.map((stock) => ({
        ...stock,
        price: Math.max(
          0.01,
          stock.price + (Math.random() * 10 - 5) // ±₹5 change
        ),
        change: stock.change + (Math.random() * 2 - 1), // ±1% change
      }));

      setStocks(updatedStocks);
    }, 2000);

    return () => clearInterval(interval);
  }, [stocks, setStocks]);

  // ======================
  // DERIVED DATA - Filter & Sort
  // ======================
  // Filter stocks based on search, price range, and type
  // Then sort by price if needed

  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      const query = search.toLowerCase();

      // Search filter: symbol or company name
      const matchesSearch =
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query);

      // Price range filter
      const matchesMin = minPrice === "" || stock.price >= Number(minPrice);
      const matchesMax = maxPrice === "" || stock.price <= Number(maxPrice);

      // Type filter: all, gainers, or losers
      const matchesType =
        filterType === "all" ||
        (filterType === "gainers" && stock.change > 0) ||
        (filterType === "losers" && stock.change < 0);

      return matchesSearch && matchesMin && matchesMax && matchesType;
    });
  }, [stocks, search, minPrice, maxPrice, filterType]);

  // ======================
  // DERIVED DATA - Sort
  // ======================
  // Sort filtered stocks by price if sort order is set

  const sortedStocks = useMemo(() => {
    const sorted = [...filteredStocks];

    if (sortOrder === "asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [filteredStocks, sortOrder]);

  // ======================
  // EVENT HANDLERS
  // ======================

  const handleSelectStock = (stock: Stock | null) => {
    setSelectedStock(stock);
  };

  const handleResetFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("none");
    setFilterType("all");
  };

  // ======================
  // UI COMPONENTS - JSX
  // ======================

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header Section */}
      <header className="mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            📊 Stock Screener Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time market analysis with {stocks.length} stocks
          </p>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards Section */}
        <StatsCards
          stocks={stocks}
          filteredStocks={filteredStocks}
          selectedStock={selectedStock}
        />

        {/* Filters Section */}
        <FiltersPanel
          search={search}
          setSearch={setSearch}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        {/* Stock Table Section */}
        <StockTable
          stocks={sortedStocks}
          selectedStock={selectedStock}
          onSelectStock={handleSelectStock}
        />

        {/* Chart Section */}
        <StockChart stock={selectedStock} />

        {/* Footer Reset Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleResetFilters}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
            title="Reset all filters and selections"
          >
            ↻ Reset All Filters
          </button>
        </div>
      </div>
    </main>
  );
}