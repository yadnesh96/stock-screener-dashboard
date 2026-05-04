"use client";

import {
  createChart,
  CandlestickData,
  CandlestickSeries,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

export default function StockChart({ stock }: { stock: any }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      height: 350,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#1f2937",
      },
      grid: {
        vertLines: { color: "#e5e7eb" },
        horzLines: { color: "#e5e7eb" },
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries);

   const data = Array.from({ length: 20 }, (_, i) => ({
  time: `2026-01-${String(i + 1).padStart(2, "0")}`,
  open: stock ? stock.price + Math.random() * 10 : 100,
  high: stock ? stock.price + Math.random() * 20 : 120,
  low: stock ? stock.price - Math.random() * 20 : 80,
  close: stock ? stock.price + Math.random() * 10 : 110,
}));

    candleSeries.setData(data);
    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [stock]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        📊 Candlestick Chart
      </h2>

      <div ref={chartRef} />
    </div>
  );
}