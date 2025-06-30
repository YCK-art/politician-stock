import { NextResponse } from "next/server";

async function fetchWithTimeout(resource: RequestInfo, options: any = {}) {
  const { timeout = 5000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

export async function GET() {
  try {
    // 환율
    let usdkrw = null;
    try {
      const fxRes = await fetchWithTimeout("https://api.exchangerate.host/latest?base=USD&symbols=KRW");
      const fxData = await fxRes.json();
      usdkrw = fxData.rates.KRW;
    } catch (e) {
      usdkrw = null;
    }

    // 3대 지수
    let indexes = [];
    try {
      const symbols = ["^GSPC", "^IXIC", "^DJI"];
      const idxRes = await fetchWithTimeout(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(",")}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; PoliticianStockBot/1.0)"
          },
        }
      );
      const idxData = await idxRes.json();
      indexes = idxData.quoteResponse.result.map((item: any) => ({
        symbol: item.symbol,
        price: item.regularMarketPrice,
        change: item.regularMarketChangePercent,
      }));
    } catch (e) {
      indexes = [];
    }

    if (!usdkrw && indexes.length === 0) {
      return NextResponse.json({ error: "Failed to fetch market data (network or API error)" }, { status: 500 });
    }
    return NextResponse.json({ usdkrw, indexes });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch market data (unexpected error)" }, { status: 500 });
  }
} 