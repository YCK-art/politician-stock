import { NextResponse } from "next/server";

const API_KEY = process.env.FMP_API_KEY;
const BASE_URL = "https://financialmodelingprep.com/api/v3/stock_news";

// 주요 주제: 미국경제, 미국주식, 미국정치인
const TOPICS = [
  "us economy",
  "us stock",
  "us equities",
  "us finance",
  "us politician",
  "congress",
  "senator",
  "representative",
  "white house"
];

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 });
  }
  // 미국 대표 주식 심볼로 뉴스 요청 (AAPL, MSFT, GOOG)
  const url = `${BASE_URL}?tickers=AAPL,MSFT,GOOG&limit=10&apikey=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // 응답 전체 콘솔 출력
    console.log('FMP API 응답:', JSON.stringify(data, null, 2));
    // 필요한 필드만 추출
    const items = (data as unknown[]).map((item) => {
      const it = item as {
        title: string;
        text: string;
        url: string;
        publishedDate: string;
        site: string;
        image: string;
        symbol?: string;
      };
      return {
        title: it.title,
        summary: it.text,
        url: it.url,
        published_at: it.publishedDate,
        source: it.site,
        image: it.image || null,
      };
    });
    return NextResponse.json({ items });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: "FMP API fetch 실패", detail: msg }, { status: 500 });
  }
} 