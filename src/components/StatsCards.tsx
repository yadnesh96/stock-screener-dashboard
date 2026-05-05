"use client";

import React, { useMemo } from "react";
import { Stock } from "@/types/stock";

// ======================
// TYPES
// ======================

interface StatsCardsProps {
  stocks: Stock[];
  filteredStocks: Stock[];
  selectedStock: Stock | null;
}

// ======================
// COMPONENT
// ======================

export default function StatsCards({
  stocks,
  filteredStocks,
  selectedStock,
}: StatsCardsProps) {
  // Calculate key metrics
  const metrics = useMemo(() => {
    const gainers = stocks.filter((s) => s.change > 0).length;
    const losers = stocks.filter((s) => s.change < 0).length;
    const avgChange =
      stocks.reduce((sum, s) => sum + s.change, 0) / stocks.length;

    return { gainers, losers, avgChange };
  }, [stocks]);

  // ======================
  // STATS CARD COMPONENT
  // ======================

  const StatCard = ({
    label,
    value,
    color,
    icon,
  }: {
    label: string;
    value: string | number;
    color: string;
    icon: string;
  }) => (
    <div className="bg-white p-5 rounded-xl shadow border border-gray-200 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <h3
            className={`text-2xl font-bold ${color}`}
            suppressHydrationWarning
          >
            {value}
          </h3>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Total Stocks"
        value={stocks.length}
        color="text-gray-900"
        icon="📊"
      />

      <StatCard
        label="Filtered Results"
        value={filteredStocks.length}
        color="text-blue-600"
        icon="🔍"
      />

      <StatCard
        label="Selected Stock"
        value={selectedStock?.symbol || "None"}
        color="text-purple-600"
        icon="⭐"
      />

      <StatCard
        label="Market Status"
        value={`+${metrics.gainers} / -${metrics.losers}`}
        color="text-green-600"
        icon="📈"
      />
    </div>
  );
}
