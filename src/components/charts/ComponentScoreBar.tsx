// [F-GRPH-408] Component Breakdown Stacked Bar (Theory + TMA + Practical + TOC)
import React from 'react';
import { calculateNiosSubjectScore } from '../../math';

interface ComponentScoreBarProps {
  title?: string;
  subjects: Array<{
    code: string;
    name: string;
    hasPractical: boolean;
    theoryMarks?: number;
    practicalMarks?: number;
    tmaMarks?: number;
    tocMarksCarried?: number;
  }>;
}

export const ComponentScoreBar: React.FC<ComponentScoreBarProps> = ({
  title = 'Composite Subject Score Breakdown [F-GRPH-408]',
  subjects
}) => {
  return (
    <div className="gravel-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{title}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Theory (Scaled) + TMA (20%) + Practical + TOC Credits
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.7rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: 'var(--accent-primary)' }} /> Theory
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: 'var(--tag-tma-only)' }} /> TMA (20%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: 'var(--status-present)' }} /> Practical
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {subjects.map((sub, idx) => {
          const breakdown = calculateNiosSubjectScore(sub);
          const isPassed = breakdown.isPassed;

          return (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                  <span className="font-mono" style={{ color: 'var(--accent-primary)' }}>[{sub.code}]</span>
                  {sub.name}
                  {sub.hasPractical && (
                    <span style={{ fontSize: '0.65rem', padding: '1px 4px', background: 'var(--bg-surface-muted)', borderRadius: 3 }}>
                      PRAC
                    </span>
                  )}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono" style={{ fontWeight: 600 }}>
                    {breakdown.totalScore}/100
                  </span>
                  <span className={`status-pill ${isPassed ? 'status-pill-present' : 'status-pill-absent'}`} style={{ fontSize: '0.65rem' }}>
                    {isPassed ? 'PASSED' : 'AT RISK'}
                  </span>
                </span>
              </div>

              {/* Stacked Bar */}
              <div
                style={{
                  height: 10,
                  width: '100%',
                  borderRadius: 4,
                  backgroundColor: 'var(--bg-surface-muted)',
                  overflow: 'hidden',
                  display: 'flex',
                }}
              >
                <div
                  style={{ width: `${breakdown.theoryContribution}%`, backgroundColor: 'var(--accent-primary)' }}
                  title={`Theory: ${breakdown.theoryContribution}`}
                />
                <div
                  style={{ width: `${breakdown.tmaContribution}%`, backgroundColor: 'var(--tag-tma-only)' }}
                  title={`TMA: ${breakdown.tmaContribution}`}
                />
                <div
                  style={{ width: `${breakdown.practicalContribution}%`, backgroundColor: 'var(--status-present)' }}
                  title={`Practical: ${breakdown.practicalContribution}`}
                />
              </div>

              {!isPassed && breakdown.failingComponents.length > 0 && (
                <div style={{ fontSize: '0.68rem', color: 'var(--status-absent)', marginTop: 2 }}>
                  * Needs improvement in: {breakdown.failingComponents.join(', ')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

