// [F-GRPH-407] Stream, Block & ODE Distribution Donut Chart
import React from 'react';

interface StreamDistributionDonutProps {
  title?: string;
}

export const StreamDistributionDonut: React.FC<StreamDistributionDonutProps> = ({
  title = 'NIOS Headcount by Stream & Block [F-GRPH-407]'
}) => {
  const streams = [
    { name: 'Stream 1, Block 1 (April)', count: 78, color: 'var(--accent-primary)', pct: 55 },
    { name: 'Stream 1, Block 2 (October)', count: 32, color: 'var(--accent-secondary)', pct: 23 },
    { name: 'Stream 2 (Failed Regulars)', count: 18, color: 'var(--status-late)', pct: 13 },
    { name: 'Stream 3/4 (ODE - On Demand)', count: 14, color: 'var(--status-present)', pct: 9 },
  ];

  return (
    <div className="gravel-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{title}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Total Registered: 142 Learners
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
          <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="var(--bg-surface-muted)" strokeWidth="4" />
            {/* Segments */}
            {(() => {
              let accumulatedPct = 0;
              return streams.map((s, idx) => {
                const strokeDasharray = `${s.pct} ${100 - s.pct}`;
                const strokeDashoffset = -accumulatedPct;
                accumulatedPct += s.pct;
                return (
                  <circle
                    key={idx}
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="4"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                  />
                );
              });
            })()}
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              142
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Total</span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: 160 }}>
          {streams.map((s, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: s.color }} />
                <span>{s.name}</span>
              </span>
              <span className="font-mono" style={{ fontWeight: 600 }}>
                {s.count} ({s.pct}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

