"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TrendingPoliticians from "../components/TrendingPoliticians";
import MarketSummary from "../components/MarketSummary";
import { BannerProvider, useBanner } from "../components/BannerContext";

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
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase()
      ? <span key={index} style={{ background: "#ffe066", color: "#222", borderRadius: 4, padding: "0 2px" }}>{part}</span>
      : part
  );
}

export default function Home() {
  const router = useRouter();
  const [now, setNow] = useState("");
  const [search, setSearch] = useState("");
  const [politicians, setPoliticians] = useState<{en: string, ko: string, image?: string}[]>([]);
  const [results, setResults] = useState<{en: string, ko: string, image?: string}[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showGifInfo, setShowGifInfo] = useState(false);
  const [showDataset, setShowDataset] = useState(false);
  const datasetRef = useRef<HTMLDivElement>(null);
  const { showBanner, setShowBanner } = useBanner();

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
        // 'ms. nancy pelosi'를 제외
        const filtered = (data.politicians || []).filter(
          (p: {en: string, ko: string, image?: string}) => p.en.toLowerCase().replace(/\s+/g, '') !== 'ms.nancypelosi'
        );
        setPoliticians(filtered);
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
        (p: {en: string, ko: string, image?: string}) =>
          p.en.toLowerCase().includes(search.toLowerCase()) ||
          p.ko.includes(search)
      )
    );
  }, [search, politicians]);

  // Intersection Observer로 동영상 자동재생/일시정지
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // 드롭다운 외부 클릭 시 닫힘
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (datasetRef.current && !datasetRef.current.contains(e.target as Node)) {
        setShowDataset(false);
      }
    }
    if (showDataset) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDataset]);

  return (
    <BannerProvider>
      {/* 베타 무료운영 배너 - 홈화면에서만, Topbar 위에 */}
      {showBanner && (
        <div className="w-full bg-yellow-400 text-black font-bold text-center py-3 px-2 flex items-center justify-center gap-2 fixed top-0 left-0 z-[100] shadow-md" style={{letterSpacing: '-0.01em'}}>
          <span className="text-base md:text-lg">🎉 지금 베타 테스트 기간! <b>한달 무료 트라이얼</b>로 모든 기능을 자유롭게 이용하세요.</span>
          <button
            className="ml-4 text-black/60 hover:text-black text-xl font-bold px-2 rounded focus:outline-none"
            aria-label="배너 닫기"
            onClick={() => setShowBanner(false)}
            style={{lineHeight: 1}}
          >
            ×
          </button>
        </div>
      )}
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
                  {results.map((p) => {
                    const slug = nameToSlug(p.en);
                    const profilePath = `/politician-profiles/${slug}.jpg`;
                    return (
                      <li
                        key={p.en}
                        className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-white/10 transition"
                        onClick={() => router.push(`/politician/${nameToSlug(p.en)}`)}
                      >
                        <Image
                          src={profilePath}
                          alt={p.ko}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover bg-gray-700"
                          onError={e => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (p.image) target.src = p.image;
                            else target.src = "/default-profile.png";
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-white text-base">{highlight(p.ko, search)}</span>
                          <span className="text-xs text-gray-300">{highlight(p.en, search)}</span>
                        </div>
                      </li>
                    );
                  })}
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
      {/* 추가 동영상 섹션 (푸터 위) - 숨김 처리 */}
      <section className="w-full flex flex-col items-center justify-center bg-[#111112] py-20 px-4" style={{display: 'none'}}>
        {/* 마케팅 문구 */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 text-center leading-tight" style={{letterSpacing: '-0.01em', fontFamily: 'Pretendard, sans-serif'}}>POV: 2020년에 S&P500이 아니라<br className="hidden md:block"/>미국 정치인의 포트폴리오를 따라샀다면</h2>
        <p className="text-lg md:text-2xl text-gray-400 mb-10 text-center font-medium" style={{fontFamily: 'Pretendard, sans-serif'}}>백악관의 선택은 늘 이유가 있습니다. 당신도 시작할 수 있습니다.</p>
        <button
          className="px-8 py-4 mb-12 rounded-2xl bg-[#3182f6] hover:bg-[#2563eb] text-white text-xl font-bold shadow-lg transition-all duration-150 active:scale-95"
          style={{fontFamily: 'Pretendard, sans-serif', boxShadow: '0 4px 24px 0 rgba(49,130,246,0.15)'}}
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          지금 시작하기
        </button>
        <div className="relative w-full max-w-2xl">
          <img
            src="/stock.gif"
            alt="주식과 정치, 애니메이션"
            className="w-full rounded-xl shadow-lg border border-gray-700 bg-black"
            style={{objectFit: 'cover'}}
          />
          {/* 인포메이션 아이콘 (오른쪽 하단) */}
          <button
            type="button"
            aria-label="GIF 출처 정보"
            className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
            onClick={() => setShowGifInfo(v => !v)}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10" fill="#fff" fillOpacity="0.15"/>
              <text x="10" y="15" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">i</text>
            </svg>
          </button>
          {/* 툴팁/팝오버 */}
          {showGifInfo && (
            <div className="absolute bottom-12 right-0 bg-[#23272f] text-white text-xs rounded-xl px-4 py-3 shadow-xl border border-white/10 w-64 text-center animate-fadein z-20">
              출처 : Quiver Quantitative의 통계자료
              <button className="block mx-auto mt-2 text-xs text-gray-400 hover:text-white underline" onClick={() => setShowGifInfo(false)}>닫기</button>
            </div>
          )}
        </div>
      </section>
    </BannerProvider>
  );
}
