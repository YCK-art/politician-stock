"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TrendingPoliticians from "../components/TrendingPoliticians";
import MarketSummary from "../components/MarketSummary";

// 슬러그 변환 함수 (API와 동일하게)
function nameToSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// 하이라이트 함수
function highlight(text: string, keyword: string) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase()
      ? <span key={i} style={{ background: "#ffe066", color: "#222", borderRadius: 4, padding: "0 2px" }}>{part}</span>
      : part
  );
}

export default function Home() {
  const router = useRouter();
  const [now, setNow] = useState("");
  const [search, setSearch] = useState("");
  const [politicians, setPoliticians] = useState<{en: string, ko: string, image?: string}[]>([]);
  const [results, setResults] = useState<{en: string, ko: string, image?: string}[]>([]);

  // 실시간 KST 시계
  useEffect(() => {
    const update = () => {
      const date = new Date();
      // KST 변환
      const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
      const hh = String(kst.getUTCHours()).padStart(2, "0");
      const mm = String(kst.getUTCMinutes()).padStart(2, "0");
      const ss = String(kst.getUTCSeconds()).padStart(2, "0");
      setNow(`${hh}:${mm}:${ss}`);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // 정치인 목록 불러오기 (최초 1회)
  useEffect(() => {
    fetch("/api/politician/list")
      .then(res => res.json())
      .then(data => {
        setPoliticians(data.politicians || []);
      });
  }, []);

  // 검색어 입력 시 필터링
  useEffect(() => {
    if (!search) {
      setResults([]);
      return;
    }
    setResults(
      politicians.filter(
        p =>
          p.en.toLowerCase().includes(search.toLowerCase()) ||
          p.ko.includes(search)
      )
    );
  }, [search, politicians]);

  return (
    <main className="relative min-h-screen w-full bg-black/90 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-40 w-full max-w-7xl mx-auto py-24">
        {/* 중앙 메인영역 */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-5xl font-extrabold drop-shadow-lg text-left w-[600px] whitespace-nowrap">백악관 내부자의 주식을 꿰뚫어 본다</h1>
          <p className="text-xl text-gray-300 text-left w-[600px]">미국 정치인들의 내부정보, 가장 빠르게 전달합니다</p>
          {/* 중앙 검색창: 타이틀과 비슷한 길이, 왼쪽 정렬 */}
          <div className="w-[600px] relative text-left">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M20 20l-3.5-3.5"/></svg>
            </span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="미국 정치인 이름을 검색하세요"
              className="w-full pl-10 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow"
            />
            {/* 검색 결과 드롭다운 */}
            {results.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 bg-[#23272f] rounded-lg shadow-lg z-20 max-h-72 overflow-y-auto border border-white/10">
                {results.map((p, i) => (
                  <li
                    key={p.en}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-white/10 transition"
                    onClick={() => router.push(`/politician/${nameToSlug(p.en)}`)}
                  >
                    <img
                      src={p.image || "/default-profile.png"}
                      alt={p.ko}
                      className="w-8 h-8 rounded-full object-cover bg-gray-700"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-white text-base">{highlight(p.ko, search)}</span>
                      <span className="text-xs text-gray-300">{highlight(p.en, search)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* 환율/ETF 카드: 3대 ETF 칸 전체와 동일한 가로폭, 왼쪽 정렬 */}
          <div className="w-[600px] text-left">
            <MarketSummary />
          </div>
        </div>
        {/* 트렌딩 정치인 칸 */}
        <div className="flex-1 min-w-[340px] max-w-2xl ml-32">
          <TrendingPoliticians now={now} />
        </div>
      </div>
      {/* 모바일/태블릿에서는 트렌딩 정치인 아래로 */}
      <aside className="block lg:hidden w-full max-w-md mx-auto mt-12">
        <TrendingPoliticians now={now} />
      </aside>
    </main>
  );
}
