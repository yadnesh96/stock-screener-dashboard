import { Stock } from "@/types/stock";

const sectors = ["IT", "Banking", "Finance", "Energy", "Healthcare", "Auto"];

export function generateStocks(count: number): Stock[] {
  return Array.from({ length: count }, (_, i) => ({
    symbol: `STK${i + 1}`,
    name: `Stock Company ${i + 1}`,
    sector: sectors[i % sectors.length],
    price: Number((Math.random() * 5000 + 100).toFixed(2)),
    volume: Math.floor(Math.random() * 1000000),
    marketCap: Math.floor(Math.random() * 1000000000),
    change: Number((Math.random() * 10 - 5).toFixed(2)),
  }));
}