"use client";
import { useEffect, useState } from "react";
import TrendingPoliticians from "../components/TrendingPoliticians";
import MarketSummary from "../components/MarketSummary";

export default function Home() {
  // 실시간 KST 시계
  const [now, setNow] = useState("");
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

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-black/80 pt-24 pb-12">
      {/* 왼쪽: 타이틀/설명/검색/환율/지수 */}
      <section className="flex flex-col gap-6 w-[480px] max-w-full text-white">
        <h1 className="text-3xl font-extrabold drop-shadow-lg">백악관 내부자의 주식을 꿰뚫어 본다</h1>
        <p className="text-base text-gray-300">미국 정치인들의 내부정보, 가장 빠르게 전달합니다</p>
        <input
          type="text"
          placeholder="🔍 정치인 이름 또는 종목명을 검색하세요"
          className="bg-[#222c] text-white px-5 py-3 rounded-lg w-full outline-none placeholder:text-gray-400 border border-transparent focus:border-white/40 transition"
        />
        {/* 환율/지수 영역 */}
        <MarketSummary />
      </section>
      {/* 오른쪽: 트렌딩 정치인 영역 (PC에서만 보임) */}
      <div className="hidden md:block">
        <TrendingPoliticians now={now} />
      </div>
    </main>
  );
}
