import React, { useRef, useState } from "react";

interface YearlyTrade {
  year: number;
  buy: number;
  sell: number;
}

interface Props {
  data: YearlyTrade[];
}

// 색상
const BUY_COLOR = '#34d399'; // emerald-400
const SELL_COLOR = '#fb923c'; // orange-400

const CHART_HEIGHT = 220;
const BAR_WIDTH = 18;
const BAR_GAP = 16;
const PADDING = 150; // y축 라벨이 완전히 보이도록 더 크게
const RIGHT_PADDING = 220; // 오른쪽 여백을 넉넉히

function formatM(val: number) {
  if (val >= 1_000_000) return (val / 1_000_000).toFixed(0) + 'M';
  if (val >= 1_000) return (val / 1_000).toFixed(0) + 'K';
  return val.toLocaleString();
}

const YearlyTradeBarChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    buy: number;
    sell: number;
    year: number;
    show: boolean;
    direction: 'up' | 'down';
  } | null>(null);

  if (!data || data.length === 0) return <div className="text-gray-500 text-center py-12">데이터 없음</div>;
  const max = Math.max(...data.map(d => Math.max(d.buy, d.sell)));
  const LEGEND_WIDTH = 180;
  const chartWidth = data.length * (BAR_WIDTH * 2 + BAR_GAP) + PADDING + RIGHT_PADDING + LEGEND_WIDTH;
  const tooltipWidth = 240; // 고정 툴팁 가로폭
  const tooltipHeight = 110;

  return (
    <div ref={chartRef} className="w-full overflow-x-auto relative" style={{ marginLeft: 0 }}>
      {/* 범례: 차트 div의 오른쪽 상단에 고정 */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          right: 36,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          background: 'rgba(24,23,28,0.92)',
          borderRadius: 12,
          padding: '6px 18px 6px 16px',
          boxShadow: '0 2px 8px #0004',
          border: '1.5px solid #23272f',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, background: BUY_COLOR, display: 'inline-block' }} />
          <span style={{ color: BUY_COLOR, fontWeight: 700, fontSize: 16 }}>매수</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, background: SELL_COLOR, display: 'inline-block' }} />
          <span style={{ color: SELL_COLOR, fontWeight: 700, fontSize: 16 }}>매도</span>
        </span>
      </div>
      <svg width={chartWidth} height={CHART_HEIGHT + 40} className="block mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        {/* y축 라벨 */}
        {[0.25,0.5,0.75,1].map((p,i) => (
          <text
            key={i}
            x={PADDING-110}
            y={CHART_HEIGHT - CHART_HEIGHT*p + 12}
            fontSize="15"
            fill="#e5e7eb"
            fontWeight="bold"
            textAnchor="end"
            style={{ textShadow: "0 1px 2px #18171c" }}
          >
            {formatM(max*p)}
          </text>
        ))}
        {/* 막대 */}
        {data.map((d, i) => {
          const x = PADDING + i * (BAR_WIDTH * 2 + BAR_GAP);
          const buyH = d.buy > 0 ? (d.buy / max) * CHART_HEIGHT : 0;
          const sellH = d.sell > 0 ? (d.sell / max) * CHART_HEIGHT : 0;
          // hover rect: 봉(bar)와 봉 사이 GAP을 더 넓게 포함, y=0, height=CHART_HEIGHT+40
          return (
            <g key={d.year}>
              <rect
                x={x - BAR_GAP}
                y={0}
                width={BAR_WIDTH*2 + BAR_GAP*2}
                height={CHART_HEIGHT+40}
                fill="transparent"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => {
                  // 봉 위에 툴팁이 뜨도록 y좌표 계산
                  const barTop = Math.min(CHART_HEIGHT - buyH, CHART_HEIGHT - sellH);
                  // 툴팁 방향 및 위치 보정
                  let xPos = x + BAR_WIDTH;
                  let yPos = barTop - 16;
                  let direction: 'up' | 'down' = 'up';
                  // 좌우 경계 보정
                  if (xPos < tooltipWidth/2) xPos = tooltipWidth/2 + 8;
                  if (xPos > chartWidth - tooltipWidth/2 - RIGHT_PADDING/2) xPos = chartWidth - tooltipWidth/2 - RIGHT_PADDING/2;
                  // 상단 경계 보정 (툴팁이 위로 뜨다 가려지면 아래로)
                  if (yPos - tooltipHeight < 0) {
                    yPos = barTop + 32;
                    direction = 'down';
                  }
                  setTooltip({
                    x: xPos,
                    y: yPos,
                    buy: d.buy,
                    sell: d.sell,
                    year: d.year,
                    show: true,
                    direction
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
              {/* Buy */}
              <rect
                x={x}
                y={CHART_HEIGHT - buyH}
                width={BAR_WIDTH}
                height={buyH}
                rx={4}
                fill={BUY_COLOR}
                style={{ cursor: "pointer" }}
              />
              {/* Sell */}
              <rect
                x={x+BAR_WIDTH}
                y={CHART_HEIGHT - sellH}
                width={BAR_WIDTH}
                height={sellH}
                rx={4}
                fill={SELL_COLOR}
                style={{ cursor: "pointer" }}
              />
              {/* 연도: 두 막대의 중앙 */}
              <text x={x+BAR_WIDTH} y={CHART_HEIGHT+20} fontSize="14" fill="#94a3b8" textAnchor="middle">{d.year}</text>
            </g>
          );
        })}
      </svg>
      {/* 툴팁 (항상 SVG 위, 차트 div 내에서 zIndex 99999) */}
      {tooltip && tooltip.show && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.direction === 'up' ? tooltip.y - tooltipHeight : tooltip.y,
            background: "#23272f",
            color: "#fff",
            borderRadius: 16,
            padding: "18px 28px 16px 28px",
            fontSize: 16,
            fontWeight: 500,
            boxShadow: "0 4px 24px #0008",
            pointerEvents: "none",
            minWidth: tooltipWidth,
            maxWidth: tooltipWidth,
            zIndex: 99999,
            border: "1.5px solid #3b4151",
            transform: "translate(-50%, 0)"
          }}
        >
          <div style={{ fontSize: 13, color: "#bfc9d1", fontWeight: 600, marginBottom: 2 }}>{tooltip.year}년 거래 요약</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ color: BUY_COLOR, fontWeight: 700, fontSize: 15 }}>매수</span>
            <span style={{ fontWeight: 700, fontSize: 18 }}>{tooltip.buy.toLocaleString()} USD</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ color: SELL_COLOR, fontWeight: 700, fontSize: 15 }}>매도</span>
            <span style={{ fontWeight: 700, fontSize: 18 }}>{tooltip.sell.toLocaleString()} USD</span>
          </div>
          <div style={{ borderTop: "1px solid #3b4151", margin: "10px 0 0 0", paddingTop: 8, fontSize: 14, color: "#bfc9d1", fontWeight: 600, textAlign: "right" }}>
            총 거래량: <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{(tooltip.buy + tooltip.sell).toLocaleString()} USD</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearlyTradeBarChart; 