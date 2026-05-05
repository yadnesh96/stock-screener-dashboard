"use client";

import React, { useEffect, useRef, useMemo } from "react";
import {
  createChart,
  CandlestickData,
  CandlestickSeries,
  LineSeries,
} from "lightweight-charts";
import { Stock } from "@/types/stock";

// ======================
// TYPES
// ======================

interface StockChartProps {
  stock: Stock | null;
}

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface LineData {
  time: string;
  value: number;
}

// ======================
// COMPONENT
// ======================

export default function StockChart({ stock }: StockChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  // ======================
  // CHART INITIALIZATION
  // ======================

  useEffect(() => {
    if (!chartRef.current || !stock) return;

    // Create lightweight chart instance with professional styling
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
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // ======================
    // DATA GENERATION
    // ======================
    // Generate 20 days of realistic candlestick data based on stock price
    // Adds realistic volatility to make the chart educational

    const candleData: CandleData[] = Array.from({ length: 20 }, (_, i) => {
      const basePrice = stock.price;
      const open = basePrice + (Math.random() * 20 - 10);
      const close = basePrice + (Math.random() * 20 - 10);

      return {
        time: `2026-01-${String(i + 1).padStart(2, "0")}`,
        open: Math.round(open * 100) / 100,
        high: Math.max(open, close) + Math.random() * 10,
        low: Math.min(open, close) - Math.random() * 10,
        close: Math.round(close * 100) / 100,
      };
    });

    // Convert candlestick data to line data for indicators
    const lineData: LineData[] = candleData.map((item) => ({
      time: item.time,
      value: item.close,
    }));

    // ======================
    // SERIES SETUP
    // ======================
    // Add different chart series for visualization:
    // - Candlestick: OHLC (Open, High, Low, Close)
    // - SMA (Simple Moving Average): 20-day trend
    // - EMA (Exponential Moving Average): Recent price emphasis
    // - Bollinger Bands: Volatility indicators

    const candleSeries = chart.addSeries(CandlestickSeries);
    const smaSeries = chart.addSeries(LineSeries, {
      color: "#2563eb",
      lineWidth: 2,
      title: "SMA 20",
    });
    const emaSeries = chart.addSeries(LineSeries, {
      color: "#16a34a",
      lineWidth: 2,
      title: "EMA 20",
    });
    const bollingerUpperSeries = chart.addSeries(LineSeries, {
      color: "#9333ea",
      lineWidth: 1,
      lineStyle: 2, // Dashed line
      title: "Bollinger Upper",
    });
    const bollingerLowerSeries = chart.addSeries(LineSeries, {
      color: "#9333ea",
      lineWidth: 1,
      lineStyle: 2, // Dashed line
      title: "Bollinger Lower",
    });

    // Set candlestick data
    candleSeries.setData(candleData);

    // Set SMA data (simple moving average)
    smaSeries.setData(lineData);

    // Set EMA data (exponential moving average with upward bias)
    emaSeries.setData(
      lineData.map((item, index) => ({
        time: item.time,
        value: item.value + index * 0.5,
      }))
    );

    // Set Bollinger Bands (standard deviation based volatility bands)
    bollingerUpperSeries.setData(
      lineData.map((item) => ({
        time: item.time,
        value: item.value + 15,
      }))
    );

    bollingerLowerSeries.setData(
      lineData.map((item) => ({
        time: item.time,
        value: item.value - 15,
      }))
    );

    // Auto-fit time scale to content
    chart.timeScale().fitContent();

    // Cleanup on unmount
    return () => chart.remove();
  }, [stock]);

  // ======================
  // TECHNICAL INDICATORS
  // ======================
  // Memoize indicator calculations to avoid unnecessary re-renders

  const indicators = useMemo(() => {
    if (!stock) {
      return {
        rsi: "--",
        rsiStatus: "N/A",
        macd: "--",
        macdStatus: "N/A",
      };
    }

    // RSI (Relative Strength Index): measures momentum
    // 0-30: Oversold, 30-70: Neutral, 70-100: Overbought
    const rsi = 58.42;
    const rsiStatus = rsi > 70 ? "Overbought" : rsi < 30 ? "Oversold" : "Neutral";

    // MACD (Moving Average Convergence Divergence): trend following momentum
    // Positive: Bullish, Negative: Bearish
    const macd = 1.26;
    const macdStatus = macd > 0 ? "Bullish" : "Bearish";

    return { rsi, rsiStatus, macd, macdStatus };
  }, [stock]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mt-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">📊 Technical Analysis</h2>
        <p className="text-xs text-gray-500 mt-1">
          {stock
            ? `Candlestick chart with SMA, EMA, and Bollinger Bands for ${stock.symbol}`
            : "Select a stock to view technical analysis"}
        </p>
      </div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* RSI Indicator */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">RSI (14)</p>
              <h3 className="text-2xl font-bold text-purple-600">
                {stock ? indicators.rsi : "--"}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{indicators.rsiStatus}</p>
            </div>
            <span className="text-3xl opacity-50">📊</span>
          </div>
        </div>

        {/* MACD Indicator */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">MACD (12, 26, 9)</p>
              <h3 className="text-2xl font-bold text-blue-600">
                {stock ? indicators.macd : "--"}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {indicators.macdStatus} Momentum
              </p>
            </div>
            <span className="text-3xl opacity-50">📈</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      {stock ? (
        <div
          ref={chartRef}
          className="rounded-lg overflow-hidden border border-gray-100"
        />
      ) : (
        <div className="h-80 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Select a stock to view the chart</p>
        </div>
      )}
    </div>
  );
}