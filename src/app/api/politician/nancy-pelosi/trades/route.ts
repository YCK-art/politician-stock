import { NextResponse } from "next/server";

const API_KEY = process.env.QUIVER_API_KEY;

// 10분(600초) 메모리 캐시
let cache: unknown = null;
let cacheTime = 0;
const CACHE_DURATION = 600 * 1000; // 10분(ms)

export async function GET() {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_DURATION) {
    return NextResponse.json({ items: cache });
  }
  const url = "https://api.quiverquant.com/beta/bulk/congresstrading?representative=Nancy%20Pelosi";
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Accept": "application/json"
    }
  });
  if (!res.ok) {
    return NextResponse.json({ error: 'Quiver API fetch 실패', status: res.status }, { status: res.status });
  }
  const data = await res.json();
  cache = data;
  cacheTime = now;
  return NextResponse.json({ items: data });
} 