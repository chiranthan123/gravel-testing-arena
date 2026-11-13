// [F-GRPH-402] Multi-Axis Score & Attendance Trend Line Chart
import React from 'react';

interface TrendLineChartProps {
  title?: string;
}

export const TrendLineChart: React.FC<TrendLineChartProps> = ({ 
  title = 'Longitudinal Performance vs. Weekly Attendance Rate (AR%)' 
}) => {
  const data = [
    { week: 'W1', score: 62, ar: 85 },
    { week: 'W2', score: 65, ar: 88 },
    { week: 'W3', score: 58, ar: 75 },
    { week: 'W4', score: 70, ar: 90 },
    { week: 'W5', score: 68, ar: 82 },
    { week: 'W6', score: 74, ar: 92 },
    { week: 'W7', score: 72, ar: 88 },
    { week: 'W8', score: 79, ar: 94 },
  ];

  const width = 500;
  const height = 180;
  const padding = 35;

  const getX = (idx: number) => padding + (idx * (width - 2 * padding)) / (data.length - 1);
  const getYScore = (score: number) => height - padding - ((score - 40) / 60) * (height - 2 * padding);
  const getYAr = (ar: number) => height - padding - ((ar - 50) / 50) * (height - 2 * padding);

  const scorePoints = data.map((d, i) => `${getX(i)},${getYScore(d.score)}`).join(' ');
  const arPoints = data.map((d, i) => `${getX(i)},${getYAr(d.ar)}`).join(' ');

  return (
    <div className="gravel-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{title}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            [F-GRPH-402] Dual-axis cohort correlation overlay
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-primary)' }}>
            <span style={{ width: 12, height: 3, backgroundColor: 'var(--accent-primary)' }} /> Academic Score (μ)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--status-present)' }}>
            <span style={{ width: 12, height: 3, backgroundColor: 'var(--status-present)' }} /> Weekly AR (%)
          </span>
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', maxHeight: 200 }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = padding + pct * (height - 2 * padding);
            return (
              <line
                key={idx}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="var(--border-hairline)"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
            );
          })}

          {/* Area fill for AR */}
          <polygon
            points={`${padding},${height - padding} ${arPoints} ${width - padding},${height - padding}`}
            fill="var(--status-present)"
            fillOpacity={0.1}
          />

          {/* Lines */}
          <polyline
            points={arPoints}
            fill="none"
            stroke="var(--status-present)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <polyline
            points={scorePoints}
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* Nodes */}
          {data.map((d, i) => (
            <g key={i}>
              <circle cx={getX(i)} cy={getYAr(d.ar)} r={3.5} fill="var(--status-present)" />
              <circle cx={getX(i)} cy={getYScore(d.score)} r={3.5} fill="var(--accent-primary)" />
              <text
                x={getX(i)}
                y={height - 12}
                textAnchor="middle"
                fontSize={10}
                fill="var(--text-secondary)"
                className="font-mono"
              >
                {d.week}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

