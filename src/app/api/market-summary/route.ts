import { NextResponse } from "next/server";

const TWELVE_KEY = "14564784e2874d0c9b4c5c8ef879bcef";
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

// 5분(300초) 캐싱용 전역 변수
let cachedData: { usdkrw: number | null; indexes: IndexType[] } | null = null;
let cachedAt: number = 0;

async function fetchTwelveData(symbol: string) {
  // 실시간 가격/변동률
  const quoteUrl = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${TWELVE_KEY}`;
  // 5분봉 캔들 (최근 2일)
  const now = new Date();
  const from = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2);
  const fromStr = from.toISOString().slice(0, 19);
  const toStr = now.toISOString().slice(0, 19);
  const candleUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=5min&start_date=${fromStr}&end_date=${toStr}&apikey=${TWELVE_KEY}`;

  const [quoteRes, candleRes] = await Promise.all([
    fetch(quoteUrl),
    fetch(candleUrl),
  ]);
  const quote = await quoteRes.json();
  const candle = await candleRes.json();
  return { quote, candle };
}

export async function GET() {
  const nowTime = Date.now();
  if (cachedData && nowTime - cachedAt < 300000) { // 5분 캐싱
    return NextResponse.json(cachedData);
  }

  // 환율 (open.er-api.com)
  let usdkrw: number | null = null;
  try {
    const fxRes = await fetch("https://open.er-api.com/v6/latest/USD");
    const fxData = await fxRes.json();
    usdkrw = fxData.rates.KRW;
  } catch {}

  // 3대 지수 (Twelve Data)
  const indexes = await Promise.all(
    INDEXES.map(async (idx) => {
      let price: number | null = null;
      let change: number | null = null;
      let history: number[] = [];
      try {
        const { quote, candle } = await fetchTwelveData(idx.symbol);
        price = quote.close ? Number(quote.close) : null;
        change = quote.percent_change ? Number(quote.percent_change) : null;
        if (candle && candle.values && Array.isArray(candle.values)) {
          // candle.values는 [{close, datetime, ...}, ...] (최신순)
          history = candle.values.slice(-30).map((v: { close: string }) => Number(v.close));
        }
      } catch {}
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