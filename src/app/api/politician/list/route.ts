import { NextResponse } from "next/server";
// POLITICIANS import는 실제로 사용하지 않으므로 삭제

const API_KEY = process.env.QUIVER_API_KEY;

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

// 캐시 구현
let cache: { politicians: { en: string; ko: string }[]; time: number } | null = null;
const CACHE_DURATION = 600 * 1000; // 10분

export async function GET() {
  try {
    const now = Date.now();
    
    // 캐시 확인
    if (cache && now - cache.time < CACHE_DURATION) {
      return NextResponse.json({ politicians: cache.politicians });
    }
    
    const url = "https://api.quiverquant.com/beta/bulk/congresstrading";
    const res = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json"
      }
    });
    
    if (!res.ok) {
      return NextResponse.json({ 
        error: 'Quiver API fetch 실패', 
        status: res.status 
      }, { status: res.status });
    }
    
    const data: QuiverTrade[] = await res.json();
    
    // Name 필드만 추출, 중복 제거, 정렬
    const names = data
      .map((item) => item.Name)
      .filter((name) => name && name !== null && name !== undefined && name.trim() !== '')
      .filter((name, index, arr) => arr.indexOf(name) === index)
      .sort();
    
    // 한글/영문 매핑 (더미 POLITICIANS 활용, 없으면 한글은 빈 문자열)
    // 실제로 POLITICIANS를 사용하지 않으므로, ko는 빈 문자열로 둠
    const politicians = names.map((en: string) => {
      return { en, ko: "" };
    });
    
    // 캐시 저장
    cache = { politicians, time: now };
    
    return NextResponse.json({ politicians });
    
  } catch (error) {
    console.error('Politician List API Error:', error);
    return NextResponse.json({ 
      error: '서버 내부 오류', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 