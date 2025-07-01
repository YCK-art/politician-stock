"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import YearlyTradeBarChart from "@/components/YearlyTradeBarChart";

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

// Politician 타입 정의 추가
interface Politician {
  name: string;
  en: string;
  party: string;
  netWorth: string;
  tradeVolume: string;
  totalTrades: number;
  lastTraded: string;
  currentMember: boolean;
  yearsActive: string;
  age: number;
  profile: string;
  trades: Trade[];
}

// 더미 정치인 데이터 (실제 구현 시 DB/API 연동)
const POLITICIANS: Record<string, Politician> = {
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

// 설명 2줄(15자씩, 30자 초과 ...), <br/>로 줄바꿈
function formatDesc(desc: string) {
  if (desc.length <= 15) return desc;
  if (desc.length <= 30) return desc.slice(0, 15) + "<br/>" + desc.slice(15, 30);
  return desc.slice(0, 15) + "<br/>" + desc.slice(15, 30) + "...";
}

// 회사명 10자 제한 함수 추가
function formatCompany(name: string) {
  return name.length > 10 ? name.slice(0, 10) + "..." : name;
}

// 금액 범위 변환 함수 추가
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
function formatAmount(tradeSize: string | number | undefined) {
  if (!tradeSize) return "";
  const key = String(Number(tradeSize));
  return tradeAmountRanges[key] || `$${Number(tradeSize).toLocaleString()}~`;
}

export default function PoliticianDetailPage() {
  const params = useParams();
  const name = (params.name as string) || "nancy-pelosi";
  const p: typeof POLITICIANS["nancy-pelosi"] = POLITICIANS[name] || POLITICIANS["nancy-pelosi"];
  const [sortField, setSortField] = useState<'filed'|'traded'|null>(null);
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('desc');
  const [showReturnInfo, setShowReturnInfo] = useState(false);
  const [trades, setTrades] = useState<Trade[]>(p.trades);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(trades.length / itemsPerPage);
  const pagedTrades = trades.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  // 페이지네이션 그룹 계산
  const pageGroup = Math.floor((currentPage - 1) / 10);
  const startPage = pageGroup * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);

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
            amount: formatAmount(t.Trade_Size_USD),
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

          // 연도별 거래량 집계 (매수/매도)
          const yearly: Record<string, { buy: number; sell: number }> = {};
          data.items.forEach((t: QuiverTrade) => {
            if (!t.Traded || !t.Trade_Size_USD) return;
            const year = t.Traded.slice(0, 4);
            const isBuy = t.Transaction !== "Sale";
            // 거래 금액 범위의 최대값 추출
            const str = String(t.Trade_Size_USD);
            const match = str.match(/\$(\d{1,3}(,\d{3})*)(\+)?/g);
            let amount = 0;
            if (match && match.length > 0) {
              const last = match[match.length-1].replace(/[^\d]/g, "");
              amount = Number(last);
            }
            if (!yearly[year]) yearly[year] = { buy: 0, sell: 0 };
            if (isBuy) yearly[year].buy += amount;
            else yearly[year].sell += amount;
          });
          // 연도 오름차순 정렬, 2014~2025까지 빈 연도도 0으로 채움
          const years = Array.from({length: 2025-2014+1}, (_,i)=>2014+i);
          const yearlyData = years.map(y => ({
            year: y,
            buy: yearly[y]?.buy || 0,
            sell: yearly[y]?.sell || 0
          }));
          setYearlyData(yearlyData);

          // 총 거래금액, 건수, 최근 거래일 계산
          // 총 거래금액: Trade_Size_USD의 범위 중 최대값을 모두 더함 (대략적 추정)
          let totalAmount = 0;
          data.items.forEach((t: QuiverTrade) => {
            if (t.Trade_Size_USD) {
              // 범위의 최대값 추출
              const str = String(t.Trade_Size_USD);
              const match = str.match(/\$(\d{1,3}(,\d{3})*)(\+)?/g);
              if (match && match.length > 0) {
                // $50,001~$100,000 → 100000, $50,000,001+ → 50000001
                const last = match[match.length-1].replace(/[^\d]/g, "");
                totalAmount += Number(last);
              }
            }
          });
          // 총 거래건수
          const totalTrades = data.items.length;
          // 최근 거래일
          const lastTraded = data.items.reduce((latest: string, t: QuiverTrade) => {
            if (t.Traded && (!latest || t.Traded > latest)) return t.Traded;
            return latest;
          }, "");

          // p 객체의 값도 동적으로 변경
          p.tradeVolume = totalAmount ? `약 $${totalAmount.toLocaleString()}` : "-";
          p.totalTrades = totalTrades;
          p.lastTraded = lastTraded ? lastTraded.slice(0, 10) : "-";
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
  const sortedTrades = getSortedTrades(pagedTrades);

  // 연도별 거래량 차트 데이터 상태
  const [yearlyData, setYearlyData] = useState<{year:number;buy:number;sell:number}[]>([]);

  return (
    <main className="min-h-screen w-full bg-[#18171c] text-white flex flex-col items-center pt-28 pb-16 font-sans">
      <div className="w-full max-w-7xl flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 좌측: 프로필/요약/전략 */}
          <section className="w-full md:w-[320px] flex flex-col gap-6">
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
            <div className="bg-[#23272f] rounded-2xl p-7 shadow-lg mb-4 min-h-[320px] flex flex-col gap-2 border border-[#23272f] max-w-[950px]">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xl font-bold text-white">연도별 거래량</div>
              </div>
              <div className="flex-1 w-full flex items-center justify-center px-2" style={{minHeight:220}}>
                <YearlyTradeBarChart data={yearlyData} />
              </div>
            </div>
            {/* 거래내역 테이블 */}
            <div className="bg-[#23272f] rounded-2xl p-7 shadow-lg border border-[#23272f] max-w-[950px]">
              <div className="text-xl font-bold mb-2 text-white">거래내역</div>
              <div className="overflow-visible">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-[#23272f]">
                      <th className="px-1 py-2 min-w-[40px] w-[60px] max-w-[70px] whitespace-nowrap">종목</th>
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
                      <th className="px-4 py-2 min-w-[180px] max-w-[240px] whitespace-nowrap">설명</th>
                      <th className="px-4 py-2 min-w-[90px] max-w-[100px] whitespace-nowrap relative select-none">
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
                        <tr
                          key={i}
                          className="border-b border-[#363843] hover:bg-[#31343c] hover:shadow-md transition-all cursor-pointer"
                          onClick={() => { console.log('거래내역 클릭:', t); }}
                        >
                          <td className="px-1 py-2 font-bold text-white min-w-[40px] w-[60px] max-w-[70px] whitespace-nowrap">
                            <div className="flex flex-col items-center gap-1">
                              <img src={`https://financialmodelingprep.com/image-stock/${t.stock}.png`} alt={t.stock} className="w-7 h-7 rounded bg-white" />
                              <span className="text-xs font-bold text-[#60a5fa] leading-tight">{t.stock}</span>
                              <span className="text-[10px] text-gray-300 leading-tight">{formatCompany(t.name)}</span>
                              <span className="text-[10px] text-gray-400 leading-tight">{t.type}</span>
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
                          <td className="px-4 py-2 min-w-[180px] max-w-[240px] whitespace-nowrap text-white" style={{whiteSpace: 'pre-line'}} dangerouslySetInnerHTML={{__html: formatDesc(t.desc)}}></td>
                          <td className={`px-4 py-2 min-w-[90px] max-w-[100px] whitespace-nowrap text-right font-bold overflow-hidden text-ellipsis ${isPlus ? 'text-red-500' : isMinus ? 'text-blue-500' : 'text-white'}`}>{t.return}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* 페이지네이션 버튼 */}
                <div className="flex justify-center mt-6 gap-2 items-center">
                  {/* 이전 그룹 화살표 */}
                  <button
                    className="px-2 py-1 rounded-lg font-bold border-2 transition text-sm bg-[#23272f] border-[#23272f] text-gray-400 hover:text-white disabled:opacity-30"
                    onClick={() => setCurrentPage(Math.max(1, startPage - 1))}
                    disabled={startPage === 1}
                    aria-label="이전 페이지 그룹"
                  >
                    &#8592;
                  </button>
                  {/* 페이지 버튼 */}
                  {Array.from({ length: endPage - startPage + 1 }, (_, idx) => (
                    <button
                      key={startPage + idx}
                      className={`px-3 py-1 rounded-lg font-bold border-2 transition text-sm ${currentPage === startPage + idx ? 'bg-[#3182f6] border-[#3182f6] text-white' : 'bg-[#23272f] border-[#23272f] text-gray-400 hover:text-white'}`}
                      onClick={() => setCurrentPage(startPage + idx)}
                    >
                      {startPage + idx}
                    </button>
                  ))}
                  {/* 다음 그룹 화살표 */}
                  <button
                    className="px-2 py-1 rounded-lg font-bold border-2 transition text-sm bg-[#23272f] border-[#23272f] text-gray-400 hover:text-white disabled:opacity-30"
                    onClick={() => setCurrentPage(Math.min(totalPages, endPage + 1))}
                    disabled={endPage === totalPages}
                    aria-label="다음 페이지 그룹"
                  >
                    &#8594;
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 