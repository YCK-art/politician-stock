import { NextResponse } from "next/server";

const ALPHA_KEY = process.env.ALPHA_VANTAGE_KEY;
const INDEXES = [
  { name: "S&P 500", symbol: "^GSPC" },
  { name: "나스닥", symbol: "^IXIC" },
  { name: "다우존스", symbol: "^DJI" },
];

async function fetchAlphaVantage(url: string) {
  const res = await fetch(url);
  return res.json();
}

export async function GET() {
  // 환율
  let usdkrw: number | null = null;
  try {
    const fxData = await fetchAlphaVantage(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=KRW&apikey=${ALPHA_KEY}`
    );
    usdkrw = parseFloat(fxData["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
  } catch {}

  // 3대 지수 (현재가 + 그래프용 데이터)
  const indexes = await Promise.all(
    INDEXES.map(async (idx) => {
      let price: number | null = null;
      let change: number | null = null;
      let history: number[] = [];
      try {
        // 현재가 및 변동률
        const quoteData = await fetchAlphaVantage(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(idx.symbol)}&apikey=${ALPHA_KEY}`
        );
        price = parseFloat(quoteData["Global Quote"]["05. price"]);
        change = parseFloat(quoteData["Global Quote"]["10. change percent"]?.replace("%", "") ?? "0");
        // 최근 30개 데이터 (5분봉)
        const histData = await fetchAlphaVantage(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${encodeURIComponent(idx.symbol)}&interval=5min&outputsize=compact&apikey=${ALPHA_KEY}`
        );
        const series = histData["Time Series (5min)"] || {};
        history = Object.values(series)
          .map((v: any) => parseFloat(v["4. close"]))
          .filter((v) => !isNaN(v))
          .slice(0, 30)
          .reverse();
      } catch {}
      return {
        name: idx.name,
        symbol: idx.symbol,
        price,
        change,
        history,
      };
    })
  );

  return NextResponse.json({ usdkrw, indexes });
} 