"use client";
import { useEffect, useState } from "react";

interface TrendingPoliticiansProps {
  now: string; // 'hh:mm:ss' 형식
}

const politicians = [
  {
    name: "낸시 펠로시",
    en: "Nancy Pelosi",
    party: "민주당 · 하원",
    detail: "낸시 펠로시는 미국 하원의장으로, 남편의 주식 거래로 인해 내부자 거래 논란이 자주 제기되었습니다.",
  },
  {
    name: "조쉬 홀리",
    en: "Josh Hawley",
    party: "공화당 · 상원",
    detail: "조쉬 홀리는 내부자 거래 규제 강화를 주장하며, 정치인 주식 거래 금지 법안을 발의한 인물입니다.",
  },
  {
    name: "댄 크렌쇼",
    en: "Dan Crenshaw",
    party: "공화당 · 하원",
    detail: "댄 크렌쇼는 주식 거래 내역이 공개되며 논란이 있었고, 정치인 주식 거래 규제에 찬성 입장을 밝혔습니다.",
  },
  {
    name: "리차드 버",
    en: "Richard Burr",
    party: "공화당 · 상원",
    detail: "리차드 버는 코로나19 초기 내부 정보를 활용한 주식 매도로 FBI 조사를 받은 바 있습니다.",
  },
  {
    name: "켈리 뢰플러",
    en: "Kelly Loeffler",
    party: "공화당 · 상원",
    detail: "켈리 뢰플러는 상원의원 재직 시 대규모 주식 거래로 논란이 있었습니다.",
  },
  {
    name: "데이비드 퍼듀",
    en: "David Perdue",
    party: "공화당 · 상원",
    detail: "데이비드 퍼듀는 코로나19 팬데믹 초기 대규모 주식 거래로 논란이 있었습니다.",
  },
  {
    name: "토미 터버빌",
    en: "Tommy Tuberville",
    party: "공화당 · 상원",
    detail: "토미 터버빌은 주식 거래 보고 지연 및 대규모 거래로 언론의 주목을 받았습니다.",
  },
  {
    name: "존 부즈먼",
    en: "John Boozman",
    party: "공화당 · 상원",
    detail: "존 부즈먼은 농업 관련 주식 거래로 이해충돌 논란이 있었습니다.",
  },
];

export default function TrendingPoliticians({ now }: TrendingPoliticiansProps) {
  const [active, setActive] = useState(4); // 5번(인덱스 4)부터 시작
  const [baseTime, setBaseTime] = useState("");

  // 분이 바뀔 때마다 기준 시간 갱신
  useEffect(() => {
    if (!now) return;
    const [hh, mm] = now.split(":");
    setBaseTime(`${hh}:${mm}`);
  }, [now]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % politicians.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="absolute right-24 top-1/2 -translate-y-1/2 w-[340px] max-w-full bg-black/60 rounded-2xl p-6 flex flex-col gap-4 shadow-xl border border-white/10">
      <div className="text-lg font-bold mb-2">트렌딩 정치인 <span className="text-xs text-gray-400">{baseTime} 기준</span></div>
      <ol className="flex flex-col gap-2">
        {politicians.map((p, i) => (
          <li
            key={p.en}
            className={`flex items-center gap-2 text-white/90 font-semibold ${active === i ? "bg-white/10 rounded-lg px-2 py-1" : ""}`}
          >
            {i + 1}. {p.name} <span className="text-xs text-gray-400">{p.en} · {p.party}</span>
          </li>
        ))}
      </ol>
      <div className="mt-4 bg-[#23272f] rounded-xl p-4 text-white min-h-[80px]">
        <div className="font-bold text-base mb-1">{politicians[active].name}</div>
        <div className="text-xs text-gray-300 mb-1">{politicians[active].en} · {politicians[active].party}</div>
        <div className="text-sm text-gray-200">{politicians[active].detail}</div>
      </div>
    </aside>
  );
} 