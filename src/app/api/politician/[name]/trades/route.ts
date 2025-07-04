import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.QUIVER_API_KEY;
const CACHE_DURATION = 86400 * 1000; // 24시간

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

// bulk 데이터 전체 캐시
let bulkCache: { data: QuiverTrade[]; time: number } | null = null;
let nameList: PoliticianNameList = [];

export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  try {
    const { name: slug } = await params;
    const now = Date.now();

    // bulk 데이터 전체 캐시 확인 및 갱신
    if (!bulkCache || now - bulkCache.time > CACHE_DURATION) {
      const url = "https://api.quiverquant.com/beta/bulk/congresstrading";
      const res = await fetch(url, {
        headers: { "Authorization": `Bearer ${API_KEY}` }
      });
      const data: QuiverTrade[] = await res.json();
      bulkCache = { data, time: now };
      nameList = Array.from(new Set(data.map((item) => item.Name)));
    }
    const realName = slugToName(slug, nameList) || "Nancy Pelosi";
    const filtered = bulkCache.data.filter((item) => item.Name === realName);
    return NextResponse.json({ items: filtered });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: '서버 내부 오류', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 