"use client";

import React, { useRef, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Stock } from "@/types/stock";

// ======================
// TYPES
// ======================

interface StockTableProps {
  stocks: Stock[];
  selectedStock: Stock | null;
  onSelectStock: (stock: Stock | null) => void;
}

// ======================
// TABLE ROW COMPONENT
// ======================

function TableRow({
  stock,
  isSelected,
  onClick,
}: {
  stock: Stock;
  isSelected: boolean;
  onClick: () => void;
}) {
  // Determine color based on stock change
  const changeColor = stock.change > 0 ? "text-green-600" : "text-red-600";
  const changeIcon = stock.change > 0 ? "↗" : "↘";

  return (
    <tr
      onClick={onClick}
      className={`border-b hover:bg-blue-50 cursor-pointer transition ${
        isSelected ? "bg-blue-100" : "bg-white"
      }`}
    >
      <td className="px-6 py-3 text-sm font-semibold text-gray-900">
        {stock.symbol}
      </td>
      <td className="px-6 py-3 text-sm text-gray-700">{stock.name}</td>
      <td className="px-6 py-3 text-sm text-gray-600">{stock.sector}</td>
      <td className="px-6 py-3 text-sm font-mono text-gray-900">
        ₹{stock.price.toFixed(2)}
      </td>
      <td className={`px-6 py-3 text-sm font-semibold ${changeColor}`}>
        {changeIcon} {stock.change > 0 ? "+" : ""}
        {stock.change.toFixed(2)}%
      </td>
      <td className="px-6 py-3 text-sm text-gray-600">
        {(stock.volume / 1000000).toFixed(2)}M
      </td>
      <td className="px-6 py-3 text-sm text-gray-600">
        ₹{(stock.marketCap / 1000000000).toFixed(2)}B
      </td>
    </tr>
  );
}

// ======================
// MAIN TABLE COMPONENT
// ======================

export default function StockTable({
  stocks,
  selectedStock,
  onSelectStock,
}: StockTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  // ======================
  // VIRTUALIZATION SETUP
  // ======================
  // Virtual scrolling optimizes rendering by only displaying visible rows
  // This keeps the component performant even with 5000+ stocks

  const rowVirtualizer = useVirtualizer({
    count: stocks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // Approximate row height in pixels
    overscan: 10, // Render 10 extra rows outside viewport for smooth scrolling
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  // Calculate the padding needed for virtual scrolling
  const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end || 0)
      : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
      {/* Table Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-800">📊 Stock Data</h3>
        <p className="text-xs text-gray-500 mt-1">
          Showing {stocks.length} stocks (scroll to load more)
        </p>
      </div>

      {/* Virtualized Table Container */}
      <div
        ref={parentRef}
        className="overflow-y-auto"
        style={{ height: "500px" }}
      >
        <table className="w-full">
          {/* Table Head */}
          <thead className="sticky top-0 bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Sector
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Market Cap
              </th>
            </tr>
          </thead>

          {/* Table Body (Virtualized) */}
          <tbody>
            {/* Top padding for virtual scroll */}
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}

            {/* Rendered rows */}
            {virtualItems.map((virtualItem) => (
              <TableRow
                key={virtualItem.key}
                stock={stocks[virtualItem.index]}
                isSelected={
                  selectedStock?.symbol === stocks[virtualItem.index].symbol
                }
                onClick={() => onSelectStock(stocks[virtualItem.index])}
              />
            ))}

            {/* Bottom padding for virtual scroll */}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>

        {/* Empty State */}
        {stocks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p className="text-lg font-semibold">No stocks found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
