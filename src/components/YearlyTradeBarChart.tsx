import React from "react";

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
const PADDING = 32;

function formatM(val: number) {
  if (val >= 1_000_000) return (val / 1_000_000).toFixed(0) + 'M';
  if (val >= 1_000) return (val / 1_000).toFixed(0) + 'K';
  return val.toString();
}

const YearlyTradeBarChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return <div className="text-gray-500 text-center py-12">데이터 없음</div>;
  const max = Math.max(...data.map(d => Math.max(d.buy, d.sell)));
  const chartWidth = data.length * (BAR_WIDTH * 2 + BAR_GAP) + PADDING * 2;

  return (
    <div className="w-full overflow-x-auto">
      <svg width={chartWidth} height={CHART_HEIGHT + 40} className="block mx-auto">
        {/* y축 라벨 */}
        {[0.25,0.5,0.75,1].map((p,i) => (
          <text key={i} x={PADDING-8} y={CHART_HEIGHT - CHART_HEIGHT*p + 12} fontSize="13" fill="#64748b" textAnchor="end">{formatM(max*p)}</text>
        ))}
        {/* 막대 */}
        {data.map((d, i) => {
          const x = PADDING + i * (BAR_WIDTH * 2 + BAR_GAP);
          const buyH = d.buy > 0 ? (d.buy / max) * CHART_HEIGHT : 0;
          const sellH = d.sell > 0 ? (d.sell / max) * CHART_HEIGHT : 0;
          return (
            <g key={d.year}>
              {/* Buy */}
              <rect x={x} y={CHART_HEIGHT - buyH} width={BAR_WIDTH} height={buyH} rx={4} fill={BUY_COLOR} />
              {/* Sell */}
              <rect x={x+BAR_WIDTH} y={CHART_HEIGHT - sellH} width={BAR_WIDTH} height={sellH} rx={4} fill={SELL_COLOR} />
              {/* 연도 */}
              <text x={x+BAR_WIDTH} y={CHART_HEIGHT+20} fontSize="14" fill="#94a3b8" textAnchor="middle">{d.year}</text>
            </g>
          );
        })}
        {/* 상단 라벨 */}
        <g>
          <rect x={chartWidth-160} y={12} width={12} height={12} rx={2} fill={BUY_COLOR} />
          <text x={chartWidth-142} y={22} fontSize="14" fill="#94a3b8">매수</text>
          <rect x={chartWidth-90} y={12} width={12} height={12} rx={2} fill={SELL_COLOR} />
          <text x={chartWidth-72} y={22} fontSize="14" fill="#94a3b8">매도</text>
        </g>
      </svg>
    </div>
  );
};

export default YearlyTradeBarChart; 