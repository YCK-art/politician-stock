"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 하트 SVG 컴포넌트 (토스/카카오 스타일, 얇고 둥글게)
function HeartIcon({ filled, ...props }: { filled: boolean, [key: string]: any }) {
  return filled ? (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="#ff3366" stroke="#ff3366" strokeWidth="1.5" {...props} style={{verticalAlign:'middle'}}>
      <path d="M10 17c-.3 0-5.2-3.5-6.7-6C1.2 7.2 3 5 5.2 5c1.1 0 2.2.6 2.8 1.6C8.8 5.6 9.9 5 11 5c2.2 0 4 2.2 1.9 6-1.5 2.5-6.4 6-6.9 6z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#b0b0b0" strokeWidth="1.5" {...props} style={{verticalAlign:'middle'}}>
      <path d="M10 17c-.3 0-5.2-3.5-6.7-6C1.2 7.2 3 5 5.2 5c1.1 0 2.2.6 2.8 1.6C8.8 5.6 9.9 5 11 5c2.2 0 4 2.2 1.9 6-1.5 2.5-6.4 6-6.9 6z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function InsiderPage() {
  const [politicians, setPoliticians] = useState<{en: string, ko: string, party?: string}[]>([]);
  const [activeFilter, setActiveFilter] = useState("volume");
  const [selectedParties, setSelectedParties] = useState<string[]>(["전체"]);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const router = useRouter();

  // 소속 카테고리 목록
  const partyCategories = ["전체", "민주당", "공화당", "무소속"];

  useEffect(() => {
    fetch("/api/politician/list")
      .then(res => {
        if (!res.ok) throw new Error('API 호출 실패');
        return res.json();
      })
      .then(data => setPoliticians(data.politicians || []))
      .catch(() => setError('정치인 목록을 불러오는 데 실패했습니다.'));
  }, []);

  useEffect(() => {
    const fav = localStorage.getItem('favoritePoliticians');
    if (fav) setFavorites(JSON.parse(fav));
  }, []);

  // 소속 카테고리 필터링
  const filtered = politicians.filter(p => {
    if (selectedParties.includes("전체")) return true;
    if (!p.party) return false;
    return selectedParties.includes(partyToKorean(p.party));
  });

  // 정렬 기준 적용 (임시, 실제 데이터 들어오면 수정)
  const sorted = [...filtered];

  // 소속 한글 변환 함수
  function partyToKorean(party: string | undefined) {
    if (!party) return '-';
    if (party === 'D') return '민주당';
    if (party === 'R') return '공화당';
    if (party === 'I') return '무소속';
    return party;
  }

  // 소속 카테고리 pill 클릭 핸들러
  function handlePartyClick(party: string) {
    if (party === "전체") {
      setSelectedParties(["전체"]);
    } else {
      let next;
      if (selectedParties.includes(party)) {
        next = selectedParties.filter(x => x !== party);
        if (next.length === 0) next = ["전체"];
      } else {
        next = selectedParties.filter(x => x !== "전체").concat(party);
      }
      setSelectedParties(next);
    }
  }

  // 슬러그 변환 함수 (API와 동일하게)
  function nameToSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function toggleFavorite(en: string) {
    setFavorites(prev => {
      let next;
      if (prev.includes(en)) {
        next = prev.filter(x => x !== en);
      } else {
        next = [...prev, en];
      }
      localStorage.setItem('favoritePoliticians', JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="flex min-h-screen bg-[#18171c] text-white">
      {/* 좌측 필터 영역 */}
      <aside className="w-[260px] bg-[#18171c] border-r border-[#23272f] flex flex-col py-10 px-6 gap-6 pt-24">
        {/* 테마 카테고리 */}
        <div>
          <div className="text-xs text-gray-400 font-semibold mb-2 ml-1">테마 카테고리</div>
          <div className="flex flex-col gap-2">
            <button className={`rounded-full px-4 py-2 text-base font-semibold transition-all border border-[#23272f] text-left ${activeFilter === 'volume' ? 'bg-[#23272f] text-blue-400' : 'bg-transparent text-white hover:bg-[#23272f]/60'}`} onClick={() => setActiveFilter('volume')}>거래량이 가장 많은</button>
            <button className={`rounded-full px-4 py-2 text-base font-semibold transition-all border border-[#23272f] text-left ${activeFilter === 'return' ? 'bg-[#23272f] text-blue-400' : 'bg-transparent text-white hover:bg-[#23272f]/60'}`} onClick={() => setActiveFilter('return')}>수익률이 제일 높은</button>
          </div>
        </div>
        {/* 소속 카테고리 */}
        <div>
          <div className="text-xs text-gray-400 font-semibold mb-2 ml-1">소속 카테고리</div>
          <div className="flex flex-wrap gap-2">
            {partyCategories.map(party => (
              <button
                key={party}
                className={`px-4 py-1.5 rounded-full border border-[#23272f] text-sm font-semibold transition-all ${selectedParties.includes(party) ? 'bg-white text-black' : 'bg-transparent text-white hover:bg-[#23272f]/60'}`}
                onClick={() => handlePartyClick(party)}
                type="button"
              >
                {party}
              </button>
            ))}
          </div>
        </div>
      </aside>
      {/* 우측 리스트 테이블 */}
      <main className="flex-1 flex flex-col items-center py-12 px-8 pt-24">
        <div className="w-full max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-bold">정치인 목록</div>
          </div>
          {error ? (
            <div className="text-center text-red-400 py-20 text-lg">{error}</div>
          ) : (
            <table className="w-full table-auto text-base rounded-xl overflow-hidden shadow-lg bg-[#23272f]">
              <thead>
                <tr className="text-gray-400 border-b border-[#23272f]">
                  <th className="py-3 px-1 text-left font-semibold min-w-[80px] max-w-[180px]">
                    <div className="flex items-center gap-3">
                      <span style={{opacity:0}}><HeartIcon filled={false} /></span>
                      <span className="text-xs text-gray-400 w-7 text-center select-none" style={{opacity:0}}>0</span>
                      <span className="font-semibold font-[Pretendard,sans-serif]">이름</span>
                    </div>
                  </th>
                  <th className="py-3 px-1 text-left font-semibold">수익률</th>
                  <th className="py-3 px-1 text-left font-semibold">소속</th>
                  <th className="py-3 px-1 text-left font-semibold">최근 거래일</th>
                  <th className="py-3 px-1 text-left font-semibold">순자산</th>
                </tr>
              </thead>
              <tbody>
                {sorted.length > 0 ? sorted.map((p, i) => (
                  <tr
                    key={p.en}
                    className={`border-b border-[#23272f] transition cursor-pointer group ${i % 2 === 0 ? 'bg-[#23272f]' : 'bg-[#202127]'} hover:bg-blue-900/30 active:bg-blue-900/60`}
                    onClick={() => router.push(`/politician/${nameToSlug(p.en)}`)}
                  >
                    <td className="py-2 px-1 pl-5 text-left align-middle min-w-[80px] max-w-[180px]" style={{cursor:'pointer'}}>
                      <div className="flex items-center gap-3">
                        <span onClick={e => { e.stopPropagation(); toggleFavorite(p.en); }}><HeartIcon filled={favorites.includes(p.en)} /></span>
                        <span className="text-xs text-gray-400 w-7 text-center select-none">{i+1}</span>
                        <span className="font-bold font-[Pretendard,sans-serif] group-hover:underline group-active:text-blue-400 transition">{p.en}</span>
                      </div>
                    </td>
                    <td className="py-2 px-1 text-left font-bold">-</td>
                    <td className="py-2 px-1 text-left">{partyToKorean(p.party)}</td>
                    <td className="py-2 px-1 text-left">-</td>
                    <td className="py-2 px-1 text-left">-</td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="text-center text-gray-400 py-8">표시할 정치인 데이터가 없습니다.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
} 