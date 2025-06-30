import React from "react";

interface SparklineProps {
  data: number[];
  color?: string;
}

const Sparkline: React.FC<SparklineProps> = ({ data, color = 'blue-400' }) => {
  if (!data || data.length < 2) return <svg width="100%" height="32" />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = max === min ? 50 : 100 - ((v - min) / (max - min)) * 100;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width="100%" height="32" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={`var(--tw-${color})`}
        strokeWidth="3"
        points={points}
      />
    </svg>
  );
};

export default Sparkline; 