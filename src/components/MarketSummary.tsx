"use client";
import { useEffect, useState } from "react";

const INDEXES = [
  {
    name: "S&P 500",
    symbol: "^GSPC",
    label: "S&P 500",
    color: "text-blue-400",
  },
  {
    name: "나스닥",
    symbol: "^IXIC",
    label: "나스닥",
    color: "text-red-400",
  },
  {
    name: "다우존스",
    symbol: "^DJI",
    label: "다우존스",
    color: "text-blue-400",
  },
];

export default function MarketSummary() {
  const [usdkrw, setUsdkrw] = useState<number|null>(null);
  const [indexes, setIndexes] = useState<{
    name: string;
    symbol: string;
    label: string;
    price: number | null;
    change: number | null;
    history: number[];
  }[]>(INDEXES.map(idx => ({ ...idx, price: null, change: null, history: [] })));

  // 서버 API에서 환율/지수 fetch
  useEffect(() => {
    async function fetchMarket() {
      try {
        const res = await fetch("/api/market-summary");
        const data = await res.json();
        setUsdkrw(data.usdkrw);
        setIndexes(data.indexes);
      } catch {
        setIndexes([]);
      }
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
          indexes.map((idx) => {
            // 한국식 색상: 상승=빨강, 하락=파랑
            let color = 'text-gray-400';
            let graphColor = '#6b7280';
            let arrow = '';
            if (idx.change !== null) {
              if (idx.change > 0) {
                color = 'text-red-500';
                graphColor = '#ef4444';
                arrow = `▲${idx.change.toFixed(2)}%`;
              } else if (idx.change < 0) {
                color = 'text-blue-500';
                graphColor = '#3b82f6';
                arrow = `▼${Math.abs(idx.change).toFixed(2)}%`;
              } else {
                arrow = '0.00%';
              }
            } else {
              arrow = '-';
            }
            return (
              <div key={idx.symbol} className="bg-[#23272f] rounded-xl p-4 flex-1 flex flex-col items-start min-w-[120px]">
                <span className="text-xs text-gray-400">{idx.label}</span>
                <span className="text-lg font-bold mt-1">{idx.price !== null ? idx.price.toLocaleString() : "-"}</span>
                <span className={`text-sm mt-1 ${color}`}>{arrow}</span>
                {idx.history && idx.history.length > 1 && (
                  <svg width="100%" height="32" viewBox="0 0 100 32" preserveAspectRatio="none" className="mt-2">
                    <polyline
                      fill="none"
                      stroke={graphColor}
                      strokeWidth="2"
                      points={(() => {
                        const arr = idx.history;
                        const min = Math.min(...arr);
                        const max = Math.max(...arr);
                        return arr.map((v, i) => {
                          const x = (i / (arr.length - 1)) * 100;
                          // min==max일 때 평평하게
                          const y = max === min ? 16 : 32 - ((v - min) / (max - min)) * 32;
                          return `${x},${y}`;
                        }).join(' ');
                      })()}
                    />
                  </svg>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex-1 text-center text-gray-400">데이터를 불러오는 중입니다...</div>
        )}
      </div>
    </div>
  );
}