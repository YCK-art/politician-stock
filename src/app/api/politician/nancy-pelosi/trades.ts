import { NextResponse } from "next/server";

const API_KEY = process.env.QUIVER_API_KEY;

export async function GET() {
  const url = `https://api.quiverquant.com/v1/congress/trading?congressperson=Nancy Pelosi`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  if (!res.ok) {
    return NextResponse.json({ error: 'Quiver API fetch 실패', status: res.status }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json({ items: data });
} 