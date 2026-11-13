// [F-GRPH-405] Score Distribution Histogram & Box-Plot
import React from 'react';

interface ScoreHistogramProps {
  title?: string;
}

export const ScoreHistogram: React.FC<ScoreHistogramProps> = ({
  title = 'Class Exam Score Distribution & Quartiles [F-GRPH-405]'
}) => {
  // Score bins: <33% (Failing), 33-50%, 50-65%, 65-80%, 80-100%
  const bins = [
    { range: '<33%', count: 4, label: 'At-Risk / Fail', color: 'var(--status-absent)' },
    { range: '33-49%', count: 8, label: 'Passing (3rd Div)', color: 'var(--status-late)' },
    { range: '50-59%', count: 14, label: 'Average (2nd Div)', color: 'var(--accent-secondary)' },
    { range: '60-74%', count: 18, label: 'First Division', color: 'var(--accent-primary)' },
    { range: '75-100%', count: 9, label: 'Distinction', color: 'var(--status-present)' },
  ];

  const maxCount = Math.max(...bins.map(b => b.count));

  return (
    <div className="gravel-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{title}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Total Cohort: 53 Students | Median: 62% | μ: 60.4% | σ: 14.8
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', height: 130, gap: '1rem', paddingTop: '1rem' }}>
        {bins.map((bin, idx) => {
          const heightPct = (bin.count / maxCount) * 100;
          return (
            <div
              key={idx}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: 4 }}>
                {bin.count}
              </span>
              <div
                style={{
                  width: '100%',
                  height: `${heightPct}%`,
                  backgroundColor: bin.color,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                  opacity: 0.9
                }}
              />
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: 6 }}>
                {bin.range}
              </span>
            </div>
          );
        })}
      </div>

      {/* Box plot summary bar */}
      <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-hairline)', paddingTop: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
          <span>Q1 (25%): 48.0%</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Median (50%): 62.0%</span>
          <span>Q3 (75%): 71.5%</span>
        </div>
      </div>
    </div>
  );
};

