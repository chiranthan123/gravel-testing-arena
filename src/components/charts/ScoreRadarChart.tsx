// [F-GRPH-404] Student vs. Cohort Radar (Spider) Chart
import React from 'react';

interface RadarAxis {
  label: string;
  studentScore: number; // 0 - 100
  cohortMean: number;   // 0 - 100
}

interface ScoreRadarChartProps {
  title?: string;
  studentName?: string;
  axes?: RadarAxis[];
}

export const ScoreRadarChart: React.FC<ScoreRadarChartProps> = ({
  title = 'Student vs. Cohort Performance Radar [F-GRPH-404]',
  studentName = 'Aarav Sharma',
  axes = [
    { label: '302-English', studentScore: 86, cohortMean: 71 },
    { label: '311-Math', studentScore: 52, cohortMean: 62 },
    { label: '312-Physics', studentScore: 68, cohortMean: 64 },
    { label: '313-Chem', studentScore: 62, cohortMean: 59 },
    { label: '336-DataEntry', studentScore: 92, cohortMean: 81 },
  ]
}) => {
  const size = 260;
  const center = size / 2;
  const radius = center - 35;
  const numPoints = axes.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / numPoints) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // 33% Passing Polygon
  const passingPolygon = axes.map((_, i) => {
    const pt = getCoordinates(33, i);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  // Cohort Polygon
  const cohortPolygon = axes.map((a, i) => {
    const pt = getCoordinates(a.cohortMean, i);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  // Student Polygon
  const studentPolygon = axes.map((a, i) => {
    const pt = getCoordinates(a.studentScore, i);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <div className="gravel-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{title}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Comparing {studentName} against cohort mean (μ)
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: '0.7rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-primary)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }} /> Student
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }} /> Cohort Mean (μ)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--status-absent)' }}>
            <span style={{ width: 8, height: 2, backgroundColor: 'var(--status-absent)' }} /> 33% Pass Line
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width={size} height={size}>
          {/* Concentric webs */}
          {[0.25, 0.5, 0.75, 1].map((pct, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={radius * pct}
              fill="none"
              stroke="var(--border-hairline)"
              strokeWidth={1}
            />
          ))}

          {/* Radial axis lines */}
          {axes.map((a, i) => {
            const pt = getCoordinates(100, i);
            const labelPt = getCoordinates(118, i);
            return (
              <g key={i}>
                <line
                  x1={center}
                  y1={center}
                  x2={pt.x}
                  y2={pt.y}
                  stroke="var(--border-hairline)"
                  strokeWidth={1}
                />
                <text
                  x={labelPt.x}
                  y={labelPt.y + 4}
                  textAnchor="middle"
                  fontSize={9}
                  fill="var(--text-primary)"
                  fontWeight={500}
                  className="font-mono"
                >
                  {a.label}
                </text>
              </g>
            );
          })}

          {/* 33% Passing Polygon */}
          <polygon
            points={passingPolygon}
            fill="none"
            stroke="var(--status-absent)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />

          {/* Cohort Polygon */}
          <polygon
            points={cohortPolygon}
            fill="var(--text-secondary)"
            fillOpacity={0.15}
            stroke="var(--text-secondary)"
            strokeWidth={1.5}
          />

          {/* Student Polygon */}
          <polygon
            points={studentPolygon}
            fill="var(--accent-primary)"
            fillOpacity={0.3}
            stroke="var(--accent-primary)"
            strokeWidth={2}
          />

          {/* Student Nodes */}
          {axes.map((a, i) => {
            const pt = getCoordinates(a.studentScore, i);
            return (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={3.5}
                fill="var(--accent-primary)"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

