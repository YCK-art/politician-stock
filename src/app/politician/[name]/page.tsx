"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
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

// GovTrack API 응답 타입
interface GovTrackPerson {
  person: {
    name: string;
    id: number;
  };
}

// 더미 정치인 데이터 (실제 구현 시 DB/API 연동)
const POLITICIANS: Record<string, Politician & { slug: string; profile: string }> = {
  "nancy-pelosi": {
    name: "낸시 펠로시",
    en: "Nancy Pelosi",
    party: "민주당 / 하원 / 캘리포니아",
    netWorth: "약 2,561억 원",
    tradeVolume: "-",
    totalTrades: 0,
    lastTraded: "-",
    currentMember: true,
    yearsActive: "1987 - 현재",
    age: 84,
    profile: "/vercel.svg",
    trades: [],
    slug: "Nancy Pelosi"
  },
  "dan-crenshaw": {
    name: "댄 크렌쇼",
    en: "Dan Crenshaw",
    party: "공화당 / 하원 / 텍사스",
    netWorth: "-",
    tradeVolume: "-",
    totalTrades: 0,
    lastTraded: "-",
    currentMember: true,
    yearsActive: "2019 - 현재",
    age: 40,
    profile: "/vercel.svg",
    trades: [],
    slug: "Dan Crenshaw"
  },
  "john-ossoff": {
    name: "존 오소프",
    en: "Jon Ossoff",
    party: "민주당 / 상원 / 조지아",
    netWorth: "-",
    tradeVolume: "-",
    totalTrades: 0,
    lastTraded: "-",
    currentMember: true,
    yearsActive: "2021 - 현재",
    age: 37,
    profile: "/vercel.svg",
    trades: [],
    slug: "Jon Ossoff"
  }
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
  if (!desc || desc.trim() === "") return "-";
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

// 이름 정규화 함수
function normalizeName(name: string) {
  return name.toLowerCase().replace(/\s+/g, '');
}

// 주요 인물 수동 매핑 (예시)
const manualGovtrackIds: Record<string, string> = {
  'nancypelosi': '400314',
  'dancrenshaw': '412809',
  'jonossoff': '456841',
  // 필요시 추가
};

// GovTrack 인물 캐시
const govtrackCache: { [name: string]: string } = {};
let govtrackLoaded = false;

// GovTrack 전체 인물 목록을 불러와서 캐시에 저장 (정규화된 이름으로)
async function loadGovtrackCache() {
  if (govtrackLoaded) return;
  try {
    const res = await fetch("https://www.govtrack.us/api/v2/role?current=true&limit=600");
    const data = await res.json();
    if (data.objects) {
      data.objects.forEach((obj: GovTrackPerson) => {
        if (obj.person && obj.person.name && obj.person.id) {
          govtrackCache[normalizeName(obj.person.name)] = String(obj.person.id);
        }
      });
      govtrackLoaded = true;
    }
  } catch {
    // 실패 시 무시
  }
}

// 금액 범위에서 중간값 추출 함수 추가
function parseAmountRange(str: string | number | undefined): number {
  if (typeof str === "number") return str;
  if (!str) return 0;
  const match = String(str).match(/\$([\d,]+)~\$([\d,]+)/);
  if (match) {
    const min = Number(match[1].replace(/,/g, ""));
    const max = Number(match[2].replace(/,/g, ""));
    return Math.round((min + max) / 2); // 중간값
  }
  // $1,001+ 등 단일값 처리
  const single = String(str).match(/\$([\d,]+)/);
  if (single) return Number(single[1].replace(/,/g, ""));
  // 숫자형 문자열 처리
  if (!isNaN(Number(str))) return Number(str);
  return 0;
}

function PoliticianDetailPage() {
  const params = useParams();
  const name = (params.name as string) || "nancy-pelosi";
  // 기존 POLITICIANS는 fallback용으로만 사용
  const fallback = POLITICIANS.hasOwnProperty(name) ? POLITICIANS[name] : POLITICIANS["nancy-pelosi"];
  const [p, setP] = useState<Politician>(fallback);
  const [govtrackId, setGovtrackId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'filed'|'traded'|null>(null);
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('desc');
  const [showReturnInfo, setShowReturnInfo] = useState(false);
  const [trades, setTrades] = useState<Trade[]>(fallback.trades);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(trades.length / itemsPerPage);
  const pagedTrades = trades.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  // 페이지네이션 그룹 계산
  const pageGroup = Math.floor((currentPage - 1) / 10);
  const startPage = pageGroup * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);

  // 연도별 거래량 차트 데이터 상태
  const [yearlyData, setYearlyData] = useState<{year:number;buy:number;sell:number}[]>([]);

  // 이미지 매핑 캐시 (컴포넌트 내부로 이동)
  const [imageMap, setImageMap] = useState<Record<string, string> | null>(null);
  // Wikidata 이미지 매핑 fetch (컴포넌트 내부로 이동)
  useEffect(() => {
    fetch('/api/politician/image-map')
      .then(async res => {
        if (!res.ok) return {};
        const text = await res.text();
        return text ? JSON.parse(text) : {};
      })
      .then(data => setImageMap(data.map || {}));
  }, []);

  // 프로필 이미지 URL 결정 (폴더 내 jpg > Wikidata > govtrack)
  let profileImgUrl: string | null = null;
  // 1. 폴더 내 jpg 파일 우선 시도 (항상 유지)
  const localImageUrl = `/politician-profiles/${name}.jpg`;
  
  // 2. Wikidata 이미지가 있으면 사용, 없으면 로컬 이미지 유지
  if (imageMap && imageMap[p.en]) {
    profileImgUrl = imageMap[p.en];
  } else {
    // 3. Wikidata도 없으면 로컬 이미지 사용 (govtrack은 fallback으로만)
    profileImgUrl = localImageUrl;
  }
  const [imgError, setImgError] = useState(false);

  // GovTrack 인물 캐시 로딩 및 govtrackId 찾기 (수동 매핑 우선)
  useEffect(() => {
    loadGovtrackCache().then(() => {
      const norm = normalizeName(p.en);
      const id = manualGovtrackIds[norm] || govtrackCache[norm] || null;
      setGovtrackId(id);
    });
  }, [p.en]);

  // GovTrack API로 신상정보 보완 (나이, 활동기간)
  useEffect(() => {
    // Quiver API에서 age, yearsActive가 없을 때만 fetch
    if (p.age && p.age > 0 && p.yearsActive && p.yearsActive !== '-') return;
    if (!p.en) return;
    async function fetchGovtrackInfo() {
      try {
        // GovTrack 인물 정보 fetch (이름 부분일치)
        const res = await fetch(`https://www.govtrack.us/api/v2/person?name__contains=${encodeURIComponent(p.en)}`);
        const data = await res.json();
        console.log('GovTrack API 응답:', data);
        if (data.objects && data.objects.length > 0) {
          // 가장 이름이 비슷한 인물 선택 (성/이름 모두 포함 우선)
          const lowerEn = p.en.toLowerCase();
          const person = data.objects.find((obj: { name: string }) => lowerEn.includes(obj.name.toLowerCase())) || data.objects[0];
          // 생년월일 → 나이 계산
          let age = 0;
          if (person.birthdate) {
            const birth = new Date(person.birthdate);
            const now = new Date();
            age = now.getFullYear() - birth.getFullYear();
            const m = now.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
          }
          // 활동기간 계산 (가장 오래된 role~가장 최근 role)
          let yearsActive = '-';
          if (person.roles && person.roles.length > 0) {
            const sorted = person.roles.slice().sort((a: { startdate: string }, b: { startdate: string }) => a.startdate.localeCompare(b.startdate));
            const start = sorted[0].startdate ? sorted[0].startdate.slice(0, 4) : '';
            const end = sorted[sorted.length - 1].enddate ? sorted[sorted.length - 1].enddate.slice(0, 4) : '현재';
            if (start) yearsActive = `${start} - ${end}`;
          }
          setP(prev => ({ ...prev, age: age || prev.age, yearsActive: yearsActive !== '-' ? yearsActive : prev.yearsActive }));
        }
      } catch {
        console.warn('GovTrack API fetch 실패');
      }
    }
    fetchGovtrackInfo();
  }, [p.en, p.age, p.yearsActive]);

  // Quiver API 연동: 정치인 상세 정보 + 거래내역 fetch
  useEffect(() => {
    async function fetchPolitician() {
      try {
        // 1. 거래내역은 기존 API 라우트 사용
        const tradesRes = await fetch(`/api/politician/${name}/trades`);
        const tradesData = await tradesRes.json();
        
        // 디버깅: 실제 데이터 확인
        console.log('tradesData.items', tradesData.items);
        if (tradesData.items && Array.isArray(tradesData.items)) {
          tradesData.items.forEach((t: QuiverTrade, idx: number) => {
            console.log(`[${idx}] Traded:`, t.Traded, 'Trade_Size_USD:', t.Trade_Size_USD);
          });
        }
        
        if (tradesData.items && Array.isArray(tradesData.items) && tradesData.items.length > 0) {
          // 거래내역 변환
          const mapped = tradesData.items.map((t: QuiverTrade) => ({
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
          
          // 연도별 거래량 집계 (매수/매도) - 중간값 기반
          const yearly: Record<string, { buy: number; sell: number }> = {};
          tradesData.items.forEach((t: QuiverTrade) => {
            if (!t.Traded || !t.Trade_Size_USD) return;
            const year = t.Traded.slice(0, 4);
            const amount = parseAmountRange(formatAmount(t.Trade_Size_USD));
            const isBuy = t.Transaction !== "Sale";
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

          // 총 거래금액, 건수, 최근 거래일 계산 (중간값 합산, '약' 추가)
          let totalAmount = 0;
          tradesData.items.forEach((t: QuiverTrade) => {
            totalAmount += parseAmountRange(formatAmount(t.Trade_Size_USD));
          });
          const totalTrades = tradesData.items.length;
          const lastTraded = tradesData.items.reduce((latest: string, t: QuiverTrade) => {
            if (t.Traded && (!latest || t.Traded > latest)) return t.Traded;
            return latest;
          }, "");

          // 2. 정치인 상세 정보는 첫 번째 거래 데이터에서 추출
          const firstTrade = tradesData.items[0];
          if (firstTrade) {
            // 정당 한글 변환
            const partyMap: Record<string, string> = { D: '민주당', R: '공화당', I: '무소속' };
            const chamberMap: Record<string, string> = { House: '하원', Senate: '상원' };
            const partyKor = partyMap[firstTrade.Party?.trim() || ''] || '-';
            const chamberKor = chamberMap[firstTrade.Chamber?.trim() || ''] || '-';
            // 지역구: State(예: CA) + District(예: 12) → '캘리포니아' 등으로 변환(간단히 State만 한글로 변환, 없으면 '-')
            const stateMap: Record<string, string> = { CA: '캘리포니아', TX: '텍사스', NY: '뉴욕', GA: '조지아', FL: '플로리다', NV: '네바다', UT: '유타', MN: '미네소타', /* 필요시 추가 */ };
            const stateKor = stateMap[firstTrade.State?.trim() || ''] || '-';
            const districtKor = firstTrade.District ? ` ${firstTrade.District}지구` : '';
            const regionKor = stateKor !== '-' ? stateKor + districtKor : '-';
            const partyDisplay = `${partyKor}/${chamberKor}/${regionKor}`;
            // 활동기간/나이 더미값이면 '-'로 대체
            let ageVal = firstTrade.Age || fallback.age || 0;
            let yearsActiveVal = firstTrade.StartDate ? `${firstTrade.StartDate.slice(0,4)} - ${firstTrade.EndDate ? firstTrade.EndDate.slice(0,4) : '현재'}` : fallback.yearsActive;
            // 더미값 목록(필요시 추가)
            const dummyAges = [0, 1, 84, 37, 40];
            const dummyYears = ['1987 - 현재', '2021 - 현재', '2019 - 현재'];
            if (dummyAges.includes(ageVal)) ageVal = '-';
            if (dummyYears.includes(yearsActiveVal)) yearsActiveVal = '-';
            setP({
              name: firstTrade.Name || fallback.name,
              en: firstTrade.Name || fallback.en,
              party: partyDisplay,
              netWorth: firstTrade.NetWorth && firstTrade.NetWorth !== '-' ? firstTrade.NetWorth : '-',
              tradeVolume: `약 $${totalAmount.toLocaleString()}`,
              totalTrades,
              lastTraded: lastTraded ? lastTraded.slice(0, 10) : "-",
              currentMember: firstTrade.CurrentMember !== undefined ? firstTrade.CurrentMember : fallback.currentMember,
              yearsActive: yearsActiveVal,
              age: ageVal,
              profile: fallback.profile, // Quiver API에 이미지 없으므로 fallback
              trades: mapped
            });
          }
          setTrades(mapped);
        } else {
          // 거래내역이 없으면 fallback 사용
          setP(fallback);
          setTrades(fallback.trades);
        }
      } catch (error) {
        console.error('Error fetching politician data:', error);
        // 에러 시 fallback 사용
        setP(fallback);
        setTrades(fallback.trades);
      }
    }
    fetchPolitician();
  }, [name, fallback]);

  // 정렬 함수
  function getSortedTrades(trades: Trade[]) {
    if (!sortField) return trades;
    return [...trades].sort((a: Trade, b: Trade) => {
      const aVal = a[sortField as keyof Trade];
      const bVal = b[sortField as keyof Trade];
      if (sortDir === 'asc') return String(aVal).localeCompare(String(bVal));
      else return String(bVal).localeCompare(String(aVal));
    });
  }
  const sortedTrades = getSortedTrades(pagedTrades);

  return (
    <main className="min-h-screen w-full bg-[#18171c] text-white flex flex-col items-center pt-28 pb-16 font-sans">
      <div className="w-full max-w-7xl flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 좌측: 프로필/요약/전략 */}
          <section className="w-full md:w-[320px] flex flex-col gap-6">
            {/* 프로필 카드 */}
            <div className="bg-[#23272f] rounded-2xl p-7 shadow-lg flex flex-col items-center gap-3 border border-[#23272f]">
              {profileImgUrl ? (
                <Image
                  src={imgError ? "/default-profile.png" : profileImgUrl}
                  alt={p.name}
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full border-4 border-[#23272f] object-cover mb-2 shadow"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-28 h-28 rounded-full border-4 border-[#23272f] bg-gray-800 flex items-center justify-center mb-2 shadow" />
              )}
              <div className="text-lg font-extrabold mb-1 tracking-tight text-white flex flex-col items-center whitespace-nowrap overflow-hidden text-ellipsis" style={{maxWidth: '220px'}}>
                {p.en}
              </div>
              <div className="text-base text-gray-400 mb-2 font-semibold">
                {/* 정당/상·하원/지역구 */}
                {p.party ? p.party : '-'}
              </div>
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
            <div className="bg-[#23272f] rounded-2xl p-7 shadow-lg mb-4 min-h-[320px] flex flex-col gap-2 border border-[#23272f] max-w-[950px] relative">
              {/* 범례: 우측 상단 고정 */}
              <div
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 36,
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  background: 'rgba(24,23,28,0.92)',
                  borderRadius: 12,
                  padding: '6px 18px 6px 16px',
                  boxShadow: '0 2px 8px #0004',
                  border: '1.5px solid #23272f',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 4, background: '#34d399', display: 'inline-block' }} />
                  <span style={{ color: '#34d399', fontWeight: 700, fontSize: 16 }}>매수</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 4, background: '#fb923c', display: 'inline-block' }} />
                  <span style={{ color: '#fb923c', fontWeight: 700, fontSize: 16 }}>매도</span>
                </span>
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
                              <Image src={`https://financialmodelingprep.com/image-stock/${t.stock}.png`} alt={t.stock} width={28} height={28} className="w-7 h-7 rounded bg-white" />
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
                          <td className="px-4 py-2 min-w-[180px] max-w-[240px] whitespace-nowrap text-white" style={{whiteSpace: 'pre-line', textAlign: (t.desc.trim() === '' || t.desc.trim() === '-') ? 'center' : 'left'}} dangerouslySetInnerHTML={{__html: formatDesc(t.desc)}}></td>
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

export default PoliticianDetailPage; 