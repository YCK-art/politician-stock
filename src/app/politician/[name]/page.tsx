"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// 더미 정치인 데이터 (실제 구현 시 DB/API 연동)
const POLITICIANS: Record<string, any> = {
  "nancy-pelosi": {
    name: "낸시 펠로시",
    en: "Nancy Pelosi",
    party: "민주당 / 하원 / 캘리포니아",
    netWorth: "약 2,561억 원",
    tradeVolume: "약 1,611억 원",
    totalTrades: 180,
    lastTraded: "2025년 1월 14일",
    currentMember: true,
    yearsActive: "1987 - 현재",
    age: 84,
    profile: "/vercel.svg", // 실제 이미지로 교체 필요
    trades: [
      { stock: "AMZN", name: "AMAZON.COM, INC.", type: "옵션", transaction: "매수", amount: "약 3~6억 원", filed: "2025-01-17", traded: "2025-01-14", desc: "50 콜옵션 매수", return: "-5.37%" },
      { stock: "GOOGL", name: "ALPHABET INC.", type: "옵션", transaction: "매수", amount: "약 3~6억 원", filed: "2025-01-17", traded: "2025-01-14", desc: "50 콜옵션 매수", return: "-13.20%" },
      { stock: "NVDA", name: "NVIDIA CORPORATION", type: "옵션", transaction: "매수", amount: "약 6~13억 원", filed: "2025-01-17", traded: "2025-01-14", desc: "50 콜옵션 매수", return: "+13.79%" },
      { stock: "AAPL", name: "APPLE INC.", type: "주식", transaction: "매도", amount: "약 66~330억 원", filed: "2024-12-31", traded: "2024-12-31", desc: "31,600주 매도", return: "-23.49%" },
    ],
  },
};

const TABS = [
  { label: "거래내역", key: "trades" },
  { label: "실시간 포트폴리오", key: "portfolio" },
  { label: "순자산", key: "networth" },
  { label: "후원자", key: "donors" },
  { label: "입법안", key: "bills" },
];

// Trade 타입 정의 추가
interface Trade {
  stock: string;
  name: string;
  type: string;
  transaction: string;
  amount: string;
  filed: string;
  traded: string;
  desc: string;
  return: string;
}

// QuiverTrade 타입 정의 추가
interface QuiverTrade {
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

export default function PoliticianDetailPage() {
  const params = useParams();
  const name = (params.name as string) || "nancy-pelosi";
  const p: typeof POLITICIANS["nancy-pelosi"] = POLITICIANS[name] || POLITICIANS["nancy-pelosi"];
  const [sortField, setSortField] = useState<'filed'|'traded'|null>(null);
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('desc');
  const [showReturnInfo, setShowReturnInfo] = useState(false);
  const [trades, setTrades] = useState<Trade[]>(p.trades);

  // Quiver API 연동: 낸시 펠로시 거래내역 fetch
  useEffect(() => {
    async function fetchTrades() {
      if (name === "nancy-pelosi") {
        const res = await fetch("/api/politician/nancy-pelosi/trades");
        const data = await res.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          // 필드명 변환
          const mapped = data.items.map((t: QuiverTrade) => ({
            stock: t.Ticker,
            name: t.Company || "",
            type: t.TickerType === "ST" ? "주식" : "옵션",
            transaction: t.Transaction === "Sale" ? "매도" : "매수",
            amount: t.Trade_Size_USD ? `약 ${Number(t.Trade_Size_USD).toLocaleString()}원` : "",
            filed: t.Filed ? t.Filed.slice(0, 10) : "",
            traded: t.Traded ? t.Traded.slice(0, 10) : "",
            desc: t.Description || "",
            return: t.excess_return
              ? (Number(t.excess_return) > 0
                  ? `+${Number(t.excess_return).toFixed(2)}%`
                  : `${Number(t.excess_return).toFixed(2)}%`)
              : "",
          }));
          setTrades(mapped);
        }
      }
    }
    fetchTrades();
  }, [name]);

  // 정렬 함수
  function getSortedTrades(trades: Trade[]) {
    if (!sortField) return trades;
    return [...trades].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (sortDir === 'asc') return aVal.localeCompare(bVal);
      else return bVal.localeCompare(aVal);
    });
  }
  const sortedTrades = getSortedTrades(trades);

  return (
    <main className="min-h-screen w-full bg-[#18171c] text-white flex flex-col items-center pt-28 pb-16 font-sans">
      <div className="w-full max-w-7xl flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 좌측: 프로필/요약/전략 */}
          <section className="w-full md:w-80 flex flex-col gap-6">
            {/* 프로필 카드 */}
            <div className="bg-[#23272f] rounded-2xl p-7 shadow-lg flex flex-col items-center gap-3 border border-[#23272f]">
              <img src={p.profile} alt={p.name} className="w-28 h-28 rounded-full border-4 border-[#23272f] object-cover mb-2 shadow" />
              <div className="text-2xl font-extrabold mb-1 tracking-tight text-white flex flex-col items-center">
                {p.name}
                <span className="text-sm text-gray-400 font-normal mt-1">{p.en}</span>
              </div>
              <div className="text-base text-gray-400 mb-2 font-semibold">{p.party}</div>
              <div className="flex flex-col gap-1 text-base w-full">
                <div className="flex justify-between"><span>추정 순자산</span><span className="font-bold text-white">{p.netWorth}</span></div>
                <div className="flex justify-between"><span>총 거래금액</span><span className="font-bold text-white">{p.tradeVolume}</span></div>
                <div className="flex justify-between"><span>총 거래 건수</span><span className="font-bold text-white">{p.totalTrades}</span></div>
                <div className="flex justify-between"><span>최근 거래일</span><span className="font-bold text-white">{p.lastTraded}</span></div>
                <div className="flex justify-between"><span>현직 여부</span><span className="font-bold text-white">{p.currentMember ? "예" : "아니오"}</span></div>
                <div className="flex justify-between"><span>활동 기간</span><span className="font-bold text-white">{p.yearsActive}</span></div>
                <div className="flex justify-between"><span>나이</span><span className="font-bold text-white">{p.age}</span></div>
              </div>
            </div>
            {/* 전략 복사 카드 */}
            <div className="bg-[#23272f] rounded-2xl p-7 shadow-lg flex flex-col gap-2 border border-[#23272f]">
              <div className="font-bold mb-2 text-lg text-white">낸시 펠로시 전략 따라하기</div>
              <div className="h-24 flex items-center justify-center text-gray-500">[수익률 차트 자리]</div>
              <div className="flex flex-col gap-1 text-base mt-2">
                <div className="flex justify-between"><span>2014년 이후 수익률</span><span className="font-bold text-green-400">+710.13%</span></div>
                <div className="flex justify-between"><span>S&P 500 수익률</span><span className="font-bold text-blue-400">+226.99%</span></div>
              </div>
              <button className="mt-3 w-full py-3 rounded-xl bg-[#3182f6] hover:bg-[#2563eb] text-white font-bold text-lg transition shadow">낸시 펠로시 전략 복사하기</button>
            </div>
          </section>
          {/* 우측: 차트/거래내역 등 */}
          <section className="flex-1 flex flex-col gap-8">
            {/* 상단 탭 */}
            <nav className="flex gap-2 mb-4 z-10 relative">
              {TABS.map(tab => (
                <button key={tab.key} className={`px-7 py-3 rounded-xl font-bold text-lg tracking-tight transition border-2 ${tab.key === "trades" ? "bg-[#23272f] border-[#3182f6] text-white shadow" : "bg-[#18171c] border-[#23272f] text-gray-400 hover:text-white"}`}>
                  {tab.label}
                </button>
              ))}
            </nav>
            {/* 거래 차트/섹터 */}
            <div className="bg-[#23272f] rounded-2xl p-7 shadow-lg mb-4 min-h-[220px] flex flex-col gap-2 border border-[#23272f]">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xl font-bold text-white">연도별 거래량</div>
                <div className="flex gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-400 inline-block"></span> 매수</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-400 inline-block"></span> 매도</span>
                </div>
              </div>
              <div className="h-32 flex items-center justify-center text-gray-500">[연도별 거래량 차트 자리]</div>
              <div className="flex gap-8 mt-4">
                <div className="flex flex-col gap-1 text-sm">
                  <div className="font-bold mb-1 text-white">주요 거래 섹터</div>
                  <div className="text-gray-300">정보기술 68</div>
                  <div className="text-gray-300">금융 28</div>
                  <div className="text-gray-300">커뮤니케이션 26</div>
                  <div className="text-gray-300">소비재 13</div>
                  <div className="text-gray-300">산업재 3</div>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="font-bold mb-1 text-white">총 거래금액</div>
                  <div className="text-lg font-bold text-white">{p.tradeVolume}</div>
                  <div className="font-bold text-white">총 거래 {p.totalTrades}건</div>
                </div>
              </div>
            </div>
            {/* 거래내역 테이블 */}
            <div className="bg-[#23272f] rounded-2xl p-7 shadow-lg border border-[#23272f]">
              <div className="text-xl font-bold mb-2 text-white">거래내역</div>
              <div className="overflow-visible">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-[#23272f]">
                      <th className="px-4 py-2 min-w-[120px] whitespace-nowrap">종목</th>
                      <th className="px-4 py-2 min-w-[80px] whitespace-nowrap">구분</th>
                      <th className="px-4 py-2 min-w-[120px] whitespace-nowrap">금액</th>
                      <th className="px-4 py-2 min-w-[110px] whitespace-nowrap cursor-pointer select-none" onClick={() => {
                        if (sortField === 'filed') setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                        else { setSortField('filed'); setSortDir('desc'); }
                      }}>
                        <span className="inline-flex items-center">
                          신고일
                          <span className="flex items-center ml-1 h-4">
                            <svg width="12" height="12" viewBox="0 0 12 12" className="block">
                              <polygon points="6,2 10,7 2,7" fill={sortField==='filed'&&sortDir==='asc'?"#60a5fa":"#666"}/>
                              <polygon points="6,10 2,5 10,5" fill={sortField==='filed'&&sortDir==='desc'?"#60a5fa":"#666"}/>
                            </svg>
                          </span>
                        </span>
                      </th>
                      <th className="px-4 py-2 min-w-[110px] whitespace-nowrap cursor-pointer select-none" onClick={() => {
                        if (sortField === 'traded') setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                        else { setSortField('traded'); setSortDir('desc'); }
                      }}>
                        <span className="inline-flex items-center">
                          거래일
                          <span className="flex items-center ml-1 h-4">
                            <svg width="12" height="12" viewBox="0 0 12 12" className="block">
                              <polygon points="6,2 10,7 2,7" fill={sortField==='traded'&&sortDir==='asc'?"#60a5fa":"#666"}/>
                              <polygon points="6,10 2,5 10,5" fill={sortField==='traded'&&sortDir==='desc'?"#60a5fa":"#666"}/>
                            </svg>
                          </span>
                        </span>
                      </th>
                      <th className="px-4 py-2 min-w-[220px] whitespace-nowrap">설명</th>
                      <th className="px-4 py-2 min-w-[90px] whitespace-nowrap relative select-none">
                        <span className="inline-flex items-center gap-1">
                          수익률
                          <button
                            className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xs ml-1 focus:outline-none"
                            onClick={e => { e.stopPropagation(); setShowReturnInfo(v => !v); }}
                            aria-label="수익률 정보"
                            type="button"
                          >
                            <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#fff" fillOpacity="0.15"/><text x="10" y="15" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">i</text></svg>
                          </button>
                        </span>
                        {showReturnInfo && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-8 z-[9999] bg-[#23272f] text-white text-xs rounded-xl px-4 py-3 shadow-xl border border-white/10 w-64 text-center animate-fadein">
                            이 수익률은 거래 이후 해당 종목의 초과 수익률(추정치)입니다.
                            <button className="block mx-auto mt-2 text-xs text-gray-400 hover:text-white underline" onClick={() => setShowReturnInfo(false)}>닫기</button>
                          </div>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTrades.map((t: Trade, i: number) => {
                      const isPlus = t.return.startsWith("+");
                      const isMinus = t.return.startsWith("-");
                      return (
                        <tr key={i} className="border-b border-[#23272f] hover:bg-[#23272f]/60 transition">
                          <td className="px-4 py-2 font-bold text-white min-w-[120px] whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <img src={`https://financialmodelingprep.com/image-stock/${t.stock}.png`} alt={t.stock} className="w-8 h-8 rounded bg-white" />
                              <div className="flex flex-col justify-center">
                                <span className="text-base font-bold text-[#60a5fa] leading-tight">{t.stock}</span>
                                <span className="text-xs text-gray-300 leading-tight">{t.name}</span>
                                <span className="text-xs text-gray-400 leading-tight mt-0.5">{t.type}</span>
                              </div>
                            </div>
                          </td>
                          <td
                            className={
                              t.transaction === '매도'
                                ? 'px-4 py-2 min-w-[80px] whitespace-nowrap text-orange-400 font-bold'
                                : 'px-4 py-2 min-w-[80px] whitespace-nowrap text-white'
                            }
                          >
                            {t.transaction}
                          </td>
                          <td className="px-4 py-2 min-w-[120px] whitespace-nowrap text-white">{t.amount}</td>
                          <td className="px-4 py-2 min-w-[110px] whitespace-nowrap text-white">{t.filed}</td>
                          <td className="px-4 py-2 min-w-[110px] whitespace-nowrap text-white">{t.traded}</td>
                          <td className="px-4 py-2 min-w-[220px] whitespace-nowrap text-white">{t.desc}</td>
                          <td className={`px-4 py-2 min-w-[90px] whitespace-nowrap text-right font-bold ${isPlus ? 'text-red-500' : isMinus ? 'text-blue-500' : 'text-white'}`}>{t.return}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 