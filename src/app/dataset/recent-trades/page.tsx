"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";

interface Trade {
  Name: string;
  Ticker: string;
  Company?: string;
  TickerType: string;
  Transaction: string;
  Trade_Size_USD?: string;
  Filed?: string;
  Traded?: string;
  Description?: string;
  excess_return?: string;
}

// 금액 범위 매핑 함수
const tradeAmountRanges: Record<string, string> = {
  "1001": "$1,001~$15,000",
  "15001": "$15,001~$50,000",
  "50001": "$50,001~$100,000",
  "100001": "$100,001~$250,000",
  "250001": "$250,001~$500,000",
  "500001": "$500,001~$1,000,000",
  "1000001": "$1,000,001~$5,000,000",
  "5000001": "$5,000,001~$25,000,000",
  "25000001": "$25,000,001~$50,000,000",
  "50000001": "$50,000,001+"
};

function formatAmountRange(tradeSize: string | number | undefined) {
  if (!tradeSize) return "-";
  const key = String(Number(tradeSize));
  return tradeAmountRanges[key] || `$${Number(tradeSize).toLocaleString()}~`;
}

export default function RecentTradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/dataset/recent-trades")
      .then(res => {
        if (!res.ok) throw new Error('API 호출 실패');
        return res.json();
      })
      .then(data => {
        setTrades(data.items || []);
        setLoading(false);
      })
      .catch(() => {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, []);

  // 오늘 날짜 기준 3주(21일) 이내 신고일만 필터링
  const threeWeeksAgo = dayjs().subtract(21, 'day');
  const filteredTrades = Array.isArray(trades)
    ? trades.filter(t => t.Filed && dayjs(t.Filed.slice(0, 10)).isAfter(threeWeeksAgo))
    : [];

  return (
    <main className="min-h-screen w-full bg-[#18171c] text-white flex flex-col items-center pt-28 pb-16 font-sans">
      <div className="inline-block max-w-fit mx-auto">
        <h1 className="text-3xl font-extrabold mb-8">최근 주식거래내역</h1>
        {error ? (
          <div className="text-center text-red-400 py-20 text-lg">{error}</div>
        ) : loading ? (
          <div className="text-center text-gray-400 py-20 text-lg">로딩 중...</div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto rounded-xl bg-[#23272f] p-2 md:p-4 shadow-lg border border-[#23272f] max-h-[70vh]">
            <table className="table-auto text-sm w-auto">
              <thead className="sticky top-0 z-20 bg-[#23272f]">
                <tr className="text-gray-400 border-b border-[#23272f]">
                  <th className="px-1 py-2 whitespace-nowrap min-w-[60px]">이름</th>
                  <th className="px-1 py-2 whitespace-nowrap min-w-[80px]">종목</th>
                  <th className="px-2 py-2 whitespace-nowrap min-w-[40px]">구분</th>
                  <th className="px-2 py-2 whitespace-nowrap min-w-[90px]">금액</th>
                  <th className="px-2 py-2 whitespace-nowrap min-w-[80px]">신고일</th>
                  <th className="px-2 py-2 whitespace-nowrap min-w-[80px]">거래일</th>
                  <th className="px-2 py-2 whitespace-nowrap min-w-[100px] max-w-[140px]">설명</th>
                  <th className="px-2 py-2 whitespace-nowrap min-w-[60px]">수익률</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrades.length > 0 ? filteredTrades.map((t, i) => (
                  <tr key={i} className="border-b border-[#363843] hover:bg-[#31343c] transition-all cursor-pointer">
                    <td className="px-1 py-2 text-blue-400 font-bold whitespace-nowrap min-w-[60px]">{t.Name}</td>
                    <td className="px-1 py-2 whitespace-nowrap min-w-[80px]">
                      <span className="flex items-center gap-1">
                        <Image
                          src={`https://financialmodelingprep.com/image-stock/${t.Ticker}.png`}
                          alt={t.Ticker}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded bg-white"
                          style={{objectFit: 'contain'}}
                        />
                        <span>{t.Ticker}</span>
                      </span>
                    </td>
                    <td className={`px-2 py-2 whitespace-nowrap min-w-[40px] font-bold ${t.Transaction === 'Sale' ? 'text-orange-400' : ''}`}>{t.Transaction === "Sale" ? "매도" : "매수"}</td>
                    <td className="px-2 py-2 whitespace-nowrap min-w-[90px]">{formatAmountRange(t.Trade_Size_USD)}</td>
                    <td className="px-2 py-2 whitespace-nowrap min-w-[80px]">{t.Filed?.slice(0,10)}</td>
                    <td className="px-2 py-2 whitespace-nowrap min-w-[80px]">{t.Traded?.slice(0,10)}</td>
                    <td className={`px-2 py-2 max-w-[140px] min-w-[100px] whitespace-nowrap text-ellipsis overflow-hidden ${t.Description ? 'text-left' : 'text-center'}`}>
                      {t.Description ? (t.Description.length > 15 ? t.Description.slice(0, 15) + '...' : t.Description) : "-"}
                    </td>
                    <td className={`${t.excess_return !== undefined && t.excess_return !== null && t.excess_return !== '' ? 'text-right font-bold' : 'text-center font-normal'} px-2 py-2 whitespace-nowrap min-w-[60px] ${t.excess_return ? (Number(t.excess_return) > 0 ? 'text-red-400' : (Number(t.excess_return) < 0 ? 'text-blue-400' : '')) : ''}`}>
                      {t.excess_return !== undefined && t.excess_return !== null && t.excess_return !== ''
                        ? (Number(t.excess_return) > 0 ? `+${Number(t.excess_return).toFixed(2)}%` : `${Number(t.excess_return).toFixed(2)}%`)
                        : 'N/A'}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={8} className="text-center text-gray-400 py-8">표시할 데이터가 없습니다.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
} 