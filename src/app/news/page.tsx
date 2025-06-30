"use client";
import { useState } from "react";

// 더미 뉴스 데이터
const dummyNews = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `뉴스 제목 예시 ${i + 1}`,
  summary: `이곳에 뉴스 요약 또는 부제목이 들어갑니다. (예시 ${i + 1})`,
  source: "연합뉴스",
  time: `${2 + i}시간 전`,
  image: `https://source.unsplash.com/400x240/?finance,stock,news&sig=${i}`,
}));

const CATEGORIES = ["전체", "정치", "경제", "기술", "기업", "해외", "증시"];

export default function NewsPage() {
  const [selected, setSelected] = useState("전체");
  const [visible, setVisible] = useState(8); // 처음 8개만 보임
  const [dropdown, setDropdown] = useState(false);

  const filtered = selected === "전체" ? dummyNews : dummyNews.filter(n => n.title.includes(selected));

  return (
    <main className="min-h-screen w-full bg-[#18171c] text-white flex flex-col items-center pt-20 pb-16">
      {/* 상단 헤더 */}
      <div className="w-full max-w-3xl px-4 flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">뉴스</h1>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selected === cat ? "bg-white text-black" : "bg-[#23272f] text-gray-300 hover:bg-white/10"}`}
              onClick={() => setSelected(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {/* 뉴스 리스트 */}
      <section className="w-full max-w-3xl px-4 flex flex-col gap-6">
        {filtered.slice(0, visible).map(news => (
          <article key={news.id} className="flex gap-4 bg-[#23272f] rounded-xl overflow-hidden shadow-md hover:scale-[1.01] transition-transform cursor-pointer">
            <img src={news.image} alt="뉴스 이미지" className="w-40 h-28 object-cover flex-shrink-0" />
            <div className="flex flex-col justify-between py-3 pr-3 flex-1">
              <div>
                <h2 className="text-lg font-bold mb-1 line-clamp-2">{news.title}</h2>
                <p className="text-sm text-gray-400 line-clamp-2">{news.summary}</p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span>{news.source}</span>
                <span>·</span>
                <span>{news.time}</span>
              </div>
            </div>
          </article>
        ))}
        {/* 더보기 드롭다운 */}
        {visible < filtered.length && (
          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-2 bg-[#23272f] rounded-full text-gray-300 hover:bg-white/10 transition text-sm font-semibold flex items-center gap-2"
              onClick={() => setVisible(v => v + 8)}
            >
              더보기
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 10l6 6 6-6"/></svg>
            </button>
          </div>
        )}
      </section>
    </main>
  );
} 