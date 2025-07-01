"use client";
import { useState, useEffect } from "react";

const CATEGORIES = ["전체"];

interface NewsItem {
  title: string;
  summary: string;
  url: string;
  published_at: string;
  source: string;
  image: string | null;
}

export default function NewsPage() {
  const [selected, setSelected] = useState("전체");
  const [visible, setVisible] = useState(8); // 처음 8개만 보임
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/news")
      .then(res => res.json())
      .then(data => {
        setNews(data.items || []);
        setLoading(false);
      })
      .catch(() => {
        setError("뉴스를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  const filtered = news; // 카테고리 확장 시 필터링

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
        {loading && <div className="text-center text-gray-400 py-12">뉴스를 불러오는 중입니다...</div>}
        {error && <div className="text-center text-red-400 py-12">{error}</div>}
        {!loading && !error && filtered.slice(0, visible).map((news, i) => (
          <a key={i} href={news.url} target="_blank" rel="noopener noreferrer" className="flex gap-4 bg-[#23272f] rounded-xl overflow-hidden shadow-md hover:scale-[1.01] transition-transform cursor-pointer">
            <img src={news.image || "/vercel.svg"} alt="뉴스 이미지" className="w-40 h-28 object-cover flex-shrink-0 bg-black/30" />
            <div className="flex flex-col justify-between py-3 pr-3 flex-1">
              <div>
                <h2 className="text-lg font-bold mb-1 line-clamp-2">{news.title}</h2>
                <p className="text-sm text-gray-400 line-clamp-2">{news.summary}</p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span>{news.source}</span>
                <span>·</span>
                <span>{news.published_at ? new Date(news.published_at).toLocaleString("ko-KR", { hour12: false }) : ""}</span>
              </div>
            </div>
          </a>
        ))}
        {/* 더보기 드롭다운 */}
        {!loading && !error && visible < filtered.length && (
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