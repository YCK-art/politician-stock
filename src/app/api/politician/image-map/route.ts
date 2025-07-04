import { NextResponse } from "next/server";

export async function GET() {
  const endpoint = "https://query.wikidata.org/sparql";
  const sparql = `
    SELECT ?person ?personLabel ?image WHERE {
      ?person p:P39 ?statement.
      ?statement ps:P39 wd:Q13218630. # 하원의원
      OPTIONAL { ?person wdt:P18 ?image. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
  `;
  const url = endpoint + "?query=" + encodeURIComponent(sparql) + "&format=json";
  const res = await fetch(url, { headers: { "Accept": "application/sparql-results+json" } });
  const data = await res.json();
  // 영문명 → 이미지URL 매핑
  const map: Record<string, string> = {};
  data.results.bindings.forEach((row: any) => {
    if (row.personLabel?.value && row.image?.value) {
      // 파일명만 추출
      const fileName = row.image.value.split('/').pop();
      map[row.personLabel.value] = `https://commons.wikimedia.org/wiki/Special:FilePath/${fileName}`;
    }
  });
  return NextResponse.json({ map });
} 