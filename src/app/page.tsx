"use client";

import { useEffect, useState } from "react";
import { generateStocks } from "@/data/generateStocks";
import { Stock } from "@/types/stock";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import StockChart from "@/components/StockChart";


export default function Home() {
 const [stocks, setStocks] = useState<Stock[]>([]);
 const [search, setSearch] = useState("");
 const [minPrice, setMinPrice] = useState("");
 const [maxPrice, setMaxPrice] = useState("");
const [selectedStock, setSelectedStock] = useState<Stock | null>(null); 
 const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
 const [filterType, setFilterType] = useState<"all" | "gainers" | "losers">("all");
  
  const filteredStocks = stocks.filter((stock) => {
  const query = search.toLowerCase();

  const matchesSearch =
    stock.symbol.toLowerCase().includes(query) ||
    stock.name.toLowerCase().includes(query);

  const matchesMin =
    minPrice === "" || stock.price >= Number(minPrice);

  const matchesMax =
    maxPrice === "" || stock.price <= Number(maxPrice);

  const matchesType =
    filterType === "all" ||
    (filterType === "gainers" && stock.change > 0) ||
    (filterType === "losers" && stock.change < 0);

  return matchesSearch && matchesMin && matchesMax && matchesType;
});
  const sortedStocks = [...filteredStocks].sort((a, b) => {
  if (sortOrder === "asc") return a.price - b.price;
  if (sortOrder === "desc") return b.price - a.price;
  return 0;
});

  useEffect(() => {
    setStocks(generateStocks(5000));
  }, []);
  useEffect(() => {
  if (!selectedStock) return;

  const updated = stocks.find(
    (s) => s.symbol === selectedStock.symbol
  );

  setSelectedStock(updated || null);
}, [stocks]);

useEffect(() => {
  const interval = setInterval(() => {
    setStocks((prev) =>
      prev.map((stock) => ({
        ...stock,
        price: stock.price + (Math.random() * 10 - 5),
        change: stock.change + (Math.random() * 2 - 1),
      }))
    );
  }, 2000); // every 2 sec

  return () => clearInterval(interval);
}, []);
 
const parentRef = useRef<HTMLDivElement>(null);

const rowVirtualizer = useVirtualizer({
  count: sortedStocks.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 40,
});
  return (
    <main className="min-h-screen bg-[#f5f7fa] p-6">
      <h1 className="text-4xl font-bold text-[#0f172a] mb-6">
        📊 Stock Screener Dashboard
      </h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-md transition">
              <p className="text-sm text-gray-500">Total Stocks</p>
              <h3 className="text-2xl font-bold text-gray-900">{stocks.length}</h3>
            </div>

            <div className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-md transition">
              <p className="text-sm text-gray-500">Filtered Stocks</p>
              <h3 className="text-2xl font-bold text-blue-600">{sortedStocks.length}</h3>
            </div>

            <div className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-md transition">
              <p className="text-sm text-gray-500">Selected Stock</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedStock ? selectedStock.symbol : "None"}
              </h3>
            </div>

            <div className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-md transition">
              <p className="text-sm text-gray-500">Live Mode</p>
              <h3 className="text-2xl font-bold text-green-600">Active</h3>
            </div>
          </div>
      <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📈 Live Stock Screener
        </h2>

         <input
            type="text"
            placeholder="Search stock"
            className="w-full p-3 border rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-4 my-4">
            <input
              type="number"
              placeholder="Min Price"
              className="p-3 border rounded w-full text-gray-800 placeholder-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Max Price"
              className="p-3 border rounded w-full text-gray-800 placeholder-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="flex gap-3 my-4">
            <button
                className={`px-4 py-2 rounded font-semibold transition ${
                  sortOrder === "asc"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => setSortOrder("asc")}
              >
                Price Low → High
            </button>

           <button
              className={`px-4 py-2 rounded font-semibold transition ${
                sortOrder === "desc"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setSortOrder("desc")}
             >
              Price High → Low
           </button>

             <button
                className="px-4 py-2 rounded font-semibold bg-gray-300 text-gray-900 hover:bg-gray-400 transition"
                onClick={() => setSortOrder("none")}
                >
                 Reset
            </button>
         </div>
          <div className="flex gap-3 my-4">
            <button
              className={`px-4 py-2 rounded ${
                filterType === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setFilterType("all")}
            >
              All
            </button>

            <button
              className={`px-4 py-2 rounded ${
                filterType === "gainers" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setFilterType("gainers")}
            >
              Gainers
            </button>

            <button
              className={`px-4 py-2 rounded ${
                filterType === "losers" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setFilterType("losers")}
            >
              Losers
            </button>
          </div>
            
          <p className="my-3 text-sm text-gray-600">
            Showing {sortedStocks.length} of {stocks.length} stocks
          </p>

        <div className="overflow-auto h-[600px] border rounded-lg">
         {/* Header */}
          <div className="grid grid-cols-4 bg-[#0f172a] text-white font-semibold p-3 sticky top-0 z-10">
            <div>Symbol</div>
            <div>Price</div>
            <div>Volume</div>
            <div>Change</div>
          </div>

            {/* Virtualized Body */}
            <div
              ref={parentRef}
              className="h-[600px] overflow-auto"
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const stock = sortedStocks[virtualRow.index];

                  return (
                    <div
                      key={virtualRow.index}
                      onClick={() => setSelectedStock(stock)}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                      className={`grid grid-cols-4 border-b p-3 text-gray-800 cursor-pointer transition ${
                        selectedStock?.symbol === stock.symbol
                          ? "bg-blue-100 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                      >
                      <div>{stock.symbol}</div>
                      <div>₹{stock.price.toFixed(2)}</div>
                      <div>{stock.volume}</div>
                      <div className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                        {stock.change.toFixed(2)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>  
        </div>
        <StockChart stock={selectedStock} />
      </div>
    </main>
  );
}