import { NextResponse } from "next/server";
import Parser from "rss-parser";

const RSS_URL = "https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=101&listType=paper";

export async function GET() {
  const parser = new Parser();
  let items = [];
  try {
    const feed = await parser.parseURL(RSS_URL);
    items = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      summary: item.contentSnippet || item.content || "",
      // 썸네일 추출 (네이버 RSS는 media:thumbnail 또는 description에 img 태그가 있을 수 있음)
      thumbnail: item.enclosure?.url || (item.content && item.content.match(/src=['"](https?:\/\/[^'"]+)['"]/i)?.[1]) || null,
      source: feed.title,
    }));
  } catch (e) {
    return NextResponse.json({ error: "RSS 파싱 실패", detail: String(e) }, { status: 500 });
  }
  return NextResponse.json({ items });
} 