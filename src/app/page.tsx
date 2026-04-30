"use client";

import { generateStocks } from "@/data/generateStocks";

export default function Home() {
  const stocks = generateStocks(5000);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Stock Screener Dashboard 🔥
      </h1>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">Stock Table (Preview)</h2>

        <div className="overflow-auto h-[400px]">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                <th className="p-2">Symbol</th>
                <th className="p-2">Price</th>
                <th className="p-2">Volume</th>
                <th className="p-2">Change</th>
              </tr>
            </thead>

            <tbody>
              {stocks.slice(0, 100).map((stock, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{stock.symbol}</td>
                  <td className="p-2">{stock.price}</td>
                  <td className="p-2">{stock.volume}</td>
                  <td className="p-2">{stock.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}