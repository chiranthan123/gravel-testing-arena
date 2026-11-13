// [F-GRPH-406] NIOS TMA & PCP Compliance Funnel Chart
import React from 'react';

interface ComplianceFunnelProps {
  title?: string;
}

export const ComplianceFunnel: React.FC<ComplianceFunnelProps> = ({
  title = 'NIOS Academic Milestone Compliance Funnel [F-GRPH-406]'
}) => {
  const stages = [
    { name: '1. Enrolled (AI #270123)', count: 142, pct: 100, color: 'var(--accent-primary)' },
    { name: '2. PCP Attended (>=50%)', count: 126, pct: 88.7, color: 'var(--accent-secondary)' },
    { name: '3. TMA Uploaded/Submitted', count: 98, pct: 69.0, color: 'var(--status-late)' },
    { name: '4. TMA Marks Evaluated', count: 84, pct: 59.1, color: 'var(--accent-primary)' },
    { name: '5. Exam Fee Paid', count: 135, pct: 95.0, color: 'var(--status-present)' },
    { name: '6. Hall Ticket Generated', count: 131, pct: 92.2, color: 'var(--status-present)' },
  ];

  return (
    <div className="gravel-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{title}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Mandatory pathway progression for April-May Public Exam & ODE
          </span>
        </div>
        <span className="status-pill status-pill-present">
          Centre Compliance: 74%
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {stages.map((stage, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span style={{ fontWeight: 500 }}>{stage.name}</span>
              <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>
                {stage.count} / 142 ({stage.pct}%)
              </span>
            </div>
            <div
              style={{
                height: 12,
                width: '100%',
                borderRadius: 4,
                backgroundColor: 'var(--bg-surface-muted)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${stage.pct}%`,
                  backgroundColor: stage.color,
                  borderRadius: 4,
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

