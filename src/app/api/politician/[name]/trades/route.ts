import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.QUIVER_API_KEY;
const CACHE_DURATION = 600 * 1000; // 10분

// Quiver API 데이터 타입 정의
interface QuiverTrade {
  Name: string;
  Ticker: string;
  Company?: string;
  TickerType: string;
  Transaction: string;
  Trade_Size_USD?: string;
  Filed?: string;
  Traded?: string;
  Description?: string;
  excess_return?: string;
  Party?: string;
  NetWorth?: string;
  CurrentMember?: boolean;
  StartDate?: string;
  EndDate?: string;
  Age?: number;
}

type PoliticianNameList = string[];

// 슬러그 변환 함수
function nameToSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
function slugToName(slug: string, nameList: PoliticianNameList) {
  return nameList.find(name => nameToSlug(name) === slug) || null;
}

// 정치인별 개별 캐시 구현
interface CacheEntry {
  data: QuiverTrade[];
  time: number;
}
const cache: Record<string, CacheEntry> = {};
let nameList: PoliticianNameList = [];

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  try {
    const { name: slug } = params;
    const now = Date.now();

    // 최초 1회 전체 정치인 이름 목록을 받아옴
    if (nameList.length === 0) {
      const url = "https://api.quiverquant.com/beta/bulk/congresstrading";
      const res = await fetch(url, {
        headers: { "Authorization": `Bearer ${API_KEY}` }
      });
      const data: QuiverTrade[] = await res.json();
      nameList = Array.from(new Set(data.map((item) => item.Name)));
    }
    const realName = slugToName(slug, nameList) || "Nancy Pelosi";

    // 캐시 확인
    if (cache[slug] && now - cache[slug].time < CACHE_DURATION) {
      const filtered = cache[slug].data.filter((item) => item.Name === realName);
      return NextResponse.json({ items: filtered });
    }

    // Quiver API 호출
    const url = "https://api.quiverquant.com/beta/bulk/congresstrading";
    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${API_KEY}` }
    });
    const data: QuiverTrade[] = await res.json();
    // 해당 정치인의 데이터만 필터링
    const filtered = data.filter((item) => item.Name === realName);
    // 캐시 저장
    cache[slug] = { data: filtered, time: now };
    return NextResponse.json({ items: filtered });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: '서버 내부 오류', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 