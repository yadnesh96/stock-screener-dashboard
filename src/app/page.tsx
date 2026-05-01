"use client";

import { useEffect, useState } from "react";
import { generateStocks } from "@/data/generateStocks";
import { Stock } from "@/types/stock";

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    setStocks(generateStocks(5000));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 tracking-tight">
       📊 Stock Screener Dashboard
     </h1>

      <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">Stock Table (Preview)</h2>

        <div className="overflow-auto h-[600px] border rounded-lg">
          <table className="min-w-full text-sm text-left border border-gray-300">
              <thead className="sticky top-0 bg-gray-900 text-white">
                <tr>
                  <th className="p-3 border">Symbol</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Volume</th>
                  <th className="p-3 border">Change</th>
                </tr>
              </thead>

              <tbody>
                {stocks.map((stock, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-blue-50 even:bg-gray-50"
                  >
                    <td className="p-3 border font-medium text-gray-900">
                      {stock.symbol}
                    </td>
                    <td className="p-3 border text-gray-800">
                      ₹{stock.price}
                    </td>
                    <td className="p-3 border text-gray-800">
                      {stock.volume}
                    </td>
                    <td
                      className={`p-3 border font-semibold ${
                        stock.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stock.change}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </main>
  );
}