"use client";
import { useEffect, useState } from "react";

const INDEXES = [
  {
    name: "S&P 500",
    symbol: "^GSPC",
    color: "text-blue-400",
  },
  {
    name: "나스닥",
    symbol: "^IXIC",
    color: "text-red-400",
  },
  {
    name: "다우존스",
    symbol: "^DJI",
    color: "text-blue-400",
  },
];

export default function MarketSummary() {
  const [usdkrw, setUsdkrw] = useState<number|null>(null);
  const [indexes, setIndexes] = useState(
    INDEXES.map(idx => ({ ...idx, price: null as number|null, change: null as number|null, history: [] as number[] }))
  );

  // 서버 API에서 환율/지수 fetch
  useEffect(() => {
    async function fetchMarket() {
      try {
        const res = await fetch("/api/market-summary");
        const data = await res.json();
        setUsdkrw(data.usdkrw);
        setIndexes(prev => prev.map((idx, i) => ({
          ...idx,
          price: data.indexes[i]?.price ?? null,
          change: data.indexes[i]?.change ?? null,
          history: idx.history.length > 30 ? idx.history.slice(-29).concat([data.indexes[i]?.price ?? null]) : idx.history.concat([data.indexes[i]?.price ?? null])
        })));
      } catch {}
    }
    fetchMarket();
    const timer = setInterval(fetchMarket, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="bg-[#23272f] rounded-xl p-6 flex flex-col items-start mb-2 w-full">
        <span className="text-xs text-gray-400 mb-1">USD/KRW 환율</span>
        <span className="text-3xl font-extrabold tracking-tight">$1 = ₩{usdkrw ? usdkrw.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "-"}</span>
      </div>
      <div className="flex gap-4 w-full">
        {indexes && indexes.length > 0 ? (
          indexes.map((idx) => (
            <div key={idx.symbol} className="bg-[#23272f] rounded-xl p-4 flex-1 flex flex-col items-start min-w-[120px]">
              <span className="text-xs text-gray-400">{idx.name}</span>
              <span className="text-lg font-bold mt-1">{idx.price !== null ? idx.price.toLocaleString() : "-"}</span>
              <span className={`text-sm mt-1 ${idx.color}`}>{idx.change !== null ? (idx.change > 0 ? `▲${idx.change.toFixed(2)}%` : `▼${Math.abs(idx.change).toFixed(2)}%`) : "-"}</span>
              {idx.history && idx.history.length > 1 && (
                <svg width="100%" height="32" viewBox="0 0 100 32" preserveAspectRatio="none" className="mt-2">
                  <polyline
                    fill="none"
                    stroke={idx.change !== null && idx.change < 0 ? '#ef4444' : '#60a5fa'}
                    strokeWidth="2"
                    points={idx.history.map((v, i, arr) => {
                      const x = (i / (arr.length - 1)) * 100;
                      const min = Math.min(...arr);
                      const max = Math.max(...arr);
                      const y = max === min ? 16 : 32 - ((v - min) / (max - min)) * 32;
                      return `${x},${y}`;
                    }).join(' ')}
                  />
                </svg>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-400 w-full text-center py-4">지수 데이터를 불러올 수 없습니다.</div>
        )}
      </div>
    </div>
  );
} 