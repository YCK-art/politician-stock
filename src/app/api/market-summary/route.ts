import { NextResponse } from "next/server";

console.log("FINNHUB_API_KEY:", process.env.FINNHUB_API_KEY);

const FINNHUB_KEY = process.env.FINNHUB_API_KEY;
const INDEXES = [
  { name: "S&P 500", symbol: "SPY", label: "SPY" },
  { name: "나스닥", symbol: "QQQ", label: "QQQ" },
  { name: "다우존스", symbol: "DIA", label: "DIA" },
];

type IndexType = {
  name: string;
  symbol: string;
  label: string;
  price: number | null;
  change: number | null;
  history: number[];
};

// 60초 캐싱용 전역 변수
let cachedData: { usdkrw: number | null; indexes: IndexType[] } | null = null;
let cachedAt: number = 0;

async function fetchFinnhub(path: string, params: Record<string, string>) {
  const url = new URL(`https://finnhub.io/api/v1/${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  url.searchParams.append("token", FINNHUB_KEY!);
  console.log("[Finnhub fetch]", url.toString());
  const res = await fetch(url.toString());
  const json = await res.json();
  console.log("[Finnhub response]", path, json);
  return json;
}

export async function GET() {
  const nowTime = Date.now();
  if (cachedData && nowTime - cachedAt < 60000) {
    console.log('[CACHE] Returning cached market summary');
    return NextResponse.json(cachedData);
  }

  // 환율 (open.er-api.com)
  let usdkrw: number | null = null;
  try {
    const fxRes = await fetch("https://open.er-api.com/v6/latest/USD");
    const fxData = await fxRes.json();
    console.log("[FX response]", fxData);
    usdkrw = fxData.rates.KRW;
  } catch (e) {
    console.log("[FX error]", e);
  }

  // 3대 지수 (실시간 가격 + 그래프용 캔들)
  const now = Math.floor(Date.now() / 1000);
  const from = now - 60 * 60 * 24 * 2; // 최근 2일치 (5분봉)
  const indexes = await Promise.all(
    INDEXES.map(async (idx) => {
      let price: number | null = null;
      let change: number | null = null;
      let history: number[] = [];
      try {
        // 실시간 가격
        const quote = await fetchFinnhub("quote", { symbol: idx.symbol });
        price = quote.c ?? null;
        change = quote.dp ?? null;
        // 캔들(그래프)
        const candle = await fetchFinnhub("stock/candle", {
          symbol: idx.symbol,
          resolution: "5",
          from: from.toString(),
          to: now.toString(),
        });
        if (candle && candle.c && Array.isArray(candle.c)) {
          history = candle.c.slice(-30);
        }
      } catch (e) {
        console.log(`[Index error] ${idx.name}`, e);
      }
      return {
        name: idx.name,
        symbol: idx.symbol,
        label: idx.label,
        price,
        change,
        history,
      };
    })
  );

  const result = { usdkrw, indexes };
  cachedData = result;
  cachedAt = nowTime;
  return NextResponse.json(result);
} 