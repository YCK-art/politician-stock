import { NextResponse } from "next/server";

async function fetchWithTimeout(resource: RequestInfo, options: RequestInit & { timeout?: number } = {}) {
  const { timeout = 5000, ...rest } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...rest,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch {
    clearTimeout(id);
    throw new Error("Timeout or fetch error");
  }
}

export async function GET() {
  // 환율
  let usdkrw: number | null = null;
  try {
    const fxRes = await fetchWithTimeout("https://api.exchangerate.host/latest?base=USD&symbols=KRW");
    const fxData = await fxRes.json();
    usdkrw = fxData.rates.KRW;
  } catch {}

  // 3대 지수
  let indexes: { symbol: string; price: number | null; change: number | null }[] = [];
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
    indexes = idxData.quoteResponse.result.map((item: Record<string, unknown>) => ({
      symbol: String(item.symbol),
      price: typeof item.regularMarketPrice === "number" ? item.regularMarketPrice : null,
      change: typeof item.regularMarketChangePercent === "number" ? item.regularMarketChangePercent : null,
    }));
  } catch {}

  if (!usdkrw && indexes.length === 0) {
    return NextResponse.json({ error: "Failed to fetch market data (network or API error)" }, { status: 500 });
  }
  return NextResponse.json({ usdkrw, indexes });
} 