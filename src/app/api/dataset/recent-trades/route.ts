import { NextResponse } from "next/server";

const API_KEY = process.env.QUIVER_API_KEY;
const CACHE_DURATION = 12 * 3600 * 1000; // 12시간(ms)

interface TradeData {
  [key: string]: unknown;
  Traded?: string;
}

// 캐시 구조: { data: TradeData[]; time: number }
let cache: { data: TradeData[]; time: number } | null = null;

console.log('QUIVER_API_KEY:', process.env.QUIVER_API_KEY);

// bulk API에서 모든 거래내역을 한 번에 불러오는 함수
async function fetchAllTrades(): Promise<TradeData[]> {
  const url = "https://api.quiverquant.com/beta/bulk/congresstrading";
  const res = await fetch(url, {
    headers: { "Authorization": `Bearer ${API_KEY}` }
  });
  if (!res.ok) return [];
  return await res.json();
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.time < CACHE_DURATION) {
    console.log('[recent-trades API] cache HIT, 응답 시간:', new Date().toISOString());
    return NextResponse.json({ items: cache.data });
  }
  try {
    console.log('[recent-trades API] cache MISS, fetchAllTrades 실행, 시간:', new Date().toISOString());
    // bulk API로 모든 거래내역 불러오기
    const allTrades = await fetchAllTrades();
    // Traded(거래일) 기준 내림차순 정렬
    allTrades.sort((a, b) => (b.Traded || "").localeCompare(a.Traded || ""));
    // 캐시 저장
    cache = { data: allTrades, time: now };
    return NextResponse.json({ items: allTrades });
  } catch (error) {
    return NextResponse.json({ error: '서버 내부 오류', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 