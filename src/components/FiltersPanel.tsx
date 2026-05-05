"use client";

import React from "react";

// ======================
// TYPES
// ======================

interface FiltersPanelProps {
  search: string;
  setSearch: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  sortOrder: "none" | "asc" | "desc";
  setSortOrder: (value: "none" | "asc" | "desc") => void;
  filterType: "all" | "gainers" | "losers";
  setFilterType: (value: "all" | "gainers" | "losers") => void;
}

// ======================
// COMPONENT
// ======================

export default function FiltersPanel({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortOrder,
  setSortOrder,
  filterType,
  setFilterType,
}: FiltersPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 mb-6">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        📈 Live Stock Screener
      </h2>

      {/* Search Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by symbol or company name..."
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Price Range Filters */}
      <div className="flex gap-3 mb-4">
        <input
          type="number"
          placeholder="Min Price"
          className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Sorting Buttons */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">Sort Price</p>
        <div className="flex gap-3">
          <button
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
              sortOrder === "asc"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setSortOrder("asc")}
            title="Sort ascending"
          >
            Low → High
          </button>

          <button
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
              sortOrder === "desc"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setSortOrder("desc")}
            title="Sort descending"
          >
            High → Low
          </button>

          <button
            className="flex-1 px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
            onClick={() => setSortOrder("none")}
            title="Reset sorting"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Filter Type Buttons */}
      <div>
        <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">Filter Type</p>
        <div className="flex gap-3">
          <button
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
              filterType === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setFilterType("all")}
            title="Show all stocks"
          >
            All
          </button>

          <button
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
              filterType === "gainers"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setFilterType("gainers")}
            title="Show only gainers"
          >
            ↗ Gainers
          </button>

          <button
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
              filterType === "losers"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setFilterType("losers")}
            title="Show only losers"
          >
            ↘ Losers
          </button>
        </div>
      </div>
    </div>
  );
}
