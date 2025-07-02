"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// 슬러그 변환 함수 (API와 동일하게)
function nameToSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const KOREAN_NAME_EXCEPTIONS: Record<string, string> = {
  "Nancy Pelosi": "낸시 펠로시",
  "Ro Khanna": "로 카나",
  "Josh Gottheimer": "조시 곳하이머",
  "Dan Crenshaw": "댄 크렌쇼",
  "Susie Lee": "수지 리",
  "John Curtis": "존 커티스",
  "Dean Phillips": "딘 필립스",
  "Michael Burgess": "마이클 버지스"
  // ...필요시 추가
};

export function toKoreanName(englishName: string) {
  if (KOREAN_NAME_EXCEPTIONS[englishName]) return KOREAN_NAME_EXCEPTIONS[englishName];
  return englishName.split(' ').map(part => {
    if (KOREAN_NAME_EXCEPTIONS[part]) return KOREAN_NAME_EXCEPTIONS[part];
    return part
      .replace(/ch/gi, '치')
      .replace(/sh/gi, '쉬')
      .replace(/ph/gi, '프')
      .replace(/th/gi, '스')
      .replace(/a/gi, '아')
      .replace(/b/gi, '브')
      .replace(/c/gi, '크')
      .replace(/d/gi, '드')
      .replace(/e/gi, '에')
      .replace(/f/gi, '프')
      .replace(/g/gi, '그')
      .replace(/h/gi, '흐')
      .replace(/i/gi, '이')
      .replace(/j/gi, '제')
      .replace(/k/gi, '카')
      .replace(/l/gi, '르')
      .replace(/m/gi, '므')
      .replace(/n/gi, '느')
      .replace(/o/gi, '오')
      .replace(/p/gi, '프')
      .replace(/q/gi, '쿠')
      .replace(/r/gi, '르')
      .replace(/s/gi, '스')
      .replace(/t/gi, '트')
      .replace(/u/gi, '우')
      .replace(/v/gi, '브')
      .replace(/w/gi, '우')
      .replace(/x/gi, '크스')
      .replace(/y/gi, '이')
      .replace(/z/gi, '즈');
  }).join(' ');
}

interface TrendingPoliticiansProps {
  now: string; // 'hh:mm:ss' 형식
}

const politicians = [
  {
    en: "Nancy Pelosi",
    party: "민주당 · 하원",
    detail: "낸시 펠로시는 미국 하원의장으로, 남편의 주식 거래로 인해 내부자 거래 논란이 자주 제기되었습니다. 2020년 이후 기술주와 바이오주 등 다양한 종목에 투자해 높은 수익률을 기록했습니다. 미국 내 정치인 주식 거래 논란의 대표적 인물로 자주 언급됩니다.",
  },
  {
    en: "Ro Khanna",
    party: "민주당 · 하원",
    detail: "로 카나는 실리콘밸리 지역을 대표하는 하원의원으로, NVDA, TSLA, MSFT 등 기술주 거래가 활발합니다. IT·테크 산업에 대한 이해도가 높아 관련 주식 거래가 많으며, 최근 2년간 거래량이 꾸준히 상위권을 기록하고 있습니다.",
  },
  {
    en: "Josh Gottheimer",
    party: "민주당 · 하원",
    detail: "조쉬 고테이머는 뉴저지 하원의원으로, AAPL, MSFT, NVDA 등 기술주와 옵션 거래에서 주목받고 있습니다. 다양한 섹터의 주식 거래가 활발하며, 금융·헬스케어 등에도 투자 이력이 있습니다. 최근 1년간 거래 빈도가 매우 높습니다.",
  },
  {
    en: "Dan Crenshaw",
    party: "공화당 · 하원",
    detail: "댄 크렌쇼는 텍사스 하원의원으로, 주식 거래 내역이 공개되며 논란이 있었습니다. 정치인 주식 거래 규제에 찬성 입장을 밝혔으며, 에너지·방산·기술주 등 다양한 섹터의 거래가 확인됩니다. 최근에도 꾸준히 거래 내역이 보고되고 있습니다.",
  },
  {
    en: "Susie Lee",
    party: "민주당 · 하원",
    detail: "수지 리는 네바다주 하원의원으로, 2021~2023년 사이 다양한 주식과 옵션 거래로 주목받았습니다. 헬스케어, 기술주, 금융주 등 다양한 분야에 투자하며, 거래 규모도 상당히 큰 편입니다. 내부자 거래 논란에 휩싸인 적도 있습니다.",
  },
  {
    en: "John Curtis",
    party: "공화당 · 하원",
    detail: "존 커티스는 유타주 하원의원으로, 에너지 및 기술주 거래가 활발합니다. 친환경 에너지 관련 주식에 대한 투자도 꾸준히 이어지고 있습니다. 최근 2년간 거래 빈도와 금액 모두 상위권입니다.",
  },
  {
    en: "Dean Phillips",
    party: "민주당 · 하원",
    detail: "딘 필립스는 미네소타주 하원의원으로, 다양한 섹터의 주식 거래로 주목받고 있습니다. 특히 금융, 헬스케어, 기술주에 대한 투자 비중이 높으며, 최근 1년간 거래 내역이 꾸준히 공개되고 있습니다.",
  },
  {
    en: "Michael Burgess",
    party: "공화당 · 하원",
    detail: "마이클 버지스는 텍사스주 하원의원으로, 헬스케어 및 에너지 관련 주식 거래가 많습니다. 의사 출신으로 의료 관련 기업 투자에 관심이 많으며, 최근 2년간 거래 빈도도 높은 편입니다.",
  },
];

export default function TrendingPoliticians({ now }: TrendingPoliticiansProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % politicians.length);
    }, 10000); // 10초
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-xl p-0 border border-white/20 w-full max-w-md mx-auto shadow-lg">
      {/* 제목 */}
      <div className="px-6 pt-3 pb-1 border-b border-white/10">
        <h2 className="text-lg font-bold text-white tracking-tight">트렌딩 정치인</h2>
      </div>
      {/* 순위 목록 */}
      <ol className="flex flex-col gap-1 px-6 pt-2 pb-2 min-h-[360px] max-h-[360px] overflow-y-auto">
        {politicians.map((p, i) => (
          <li
            key={p.en}
            className={`flex items-center px-0 py-2 rounded-lg cursor-pointer transition font-semibold text-white/90 text-base
              ${currentIndex === i ? 'bg-blue-500/80 text-white shadow' : 'hover:bg-white/10'} ${i !== politicians.length - 1 ? 'border-b border-white/10' : ''}`}
            onClick={() => setCurrentIndex(i)}
          >
            <span className="w-5 text-center text-xs font-bold text-blue-200">{i + 1}</span>
            <div className="flex flex-row items-center min-w-0 w-full ml-2">
              <span className="font-medium text-base truncate flex items-center gap-1 w-40 min-w-0">
                {toKoreanName(p.en)}
                <span className="text-xs text-gray-400 max-w-[120px] truncate">{p.en}</span>
              </span>
              <span className="text-xs text-gray-300 whitespace-nowrap flex-shrink-0 ml-14">{p.party}</span>
            </div>
          </li>
        ))}
      </ol>
      {/* 상세 설명 */}
      <div className="bg-black/40 rounded-b-lg px-6 py-1 flex flex-col gap-1 border-t border-white/10 h-[260px] overflow-y-auto mt-3">
        <div className="flex items-center gap-2 mb-1 pt-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-base">
            {toKoreanName(politicians[currentIndex].en).charAt(0)}
          </span>
          <span className="text-base font-bold text-white ml-2 whitespace-nowrap">{toKoreanName(politicians[currentIndex].en)}</span>
          <span className="text-xs text-gray-300 bg-gray-600 px-2 py-1 rounded ml-2 whitespace-nowrap">{politicians[currentIndex].party}</span>
        </div>
        <p className="text-gray-200 text-sm leading-relaxed mb-1 min-h-[60px]">
          {politicians[currentIndex].detail}
        </p>
        <Link
          href={`/politician/${nameToSlug(politicians[currentIndex].en)}`}
          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          거래 내역 보기
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <div className="text-xs text-gray-400 text-right mt-1">
          업데이트: {now} KST
        </div>
      </div>
    </div>
  );
} 