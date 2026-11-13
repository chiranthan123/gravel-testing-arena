// [F-GRPH-403] Subject-Wise Stacked Attendance Bar Chart
import React from 'react';

interface SubjectAttendanceData {
  subject: string;
  code: string;
  present: number;
  late: number;
  absent: number;
}

interface StackedAttendanceBarProps {
  title?: string;
  data?: SubjectAttendanceData[];
}

export const StackedAttendanceBar: React.FC<StackedAttendanceBarProps> = ({
  title = 'Subject-Wise Attendance Breakdown [F-GRPH-403]',
  data = [
    { subject: 'English', code: '302', present: 28, late: 3, absent: 4 },
    { subject: 'Mathematics', code: '311', present: 22, late: 5, absent: 8 },
    { subject: 'Physics', code: '312', present: 25, late: 4, absent: 6 },
    { subject: 'Chemistry', code: '313', present: 24, late: 3, absent: 8 },
    { subject: 'Data Entry', code: '336', present: 32, late: 2, absent: 1 },
  ]
}) => {
  return (
    <div className="gravel-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{title}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Proportion of Present, Late, and Absent contact sessions
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: 'var(--status-present)' }} /> Present
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: 'var(--status-late)' }} /> Late
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: 'var(--status-absent)' }} /> Absent
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {data.map((item, idx) => {
          const total = item.present + item.late + item.absent;
          const pctPresent = total > 0 ? (item.present / total) * 100 : 0;
          const pctLate = total > 0 ? (item.late / total) * 100 : 0;
          const pctAbsent = total > 0 ? (item.absent / total) * 100 : 0;

          return (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 500 }}>
                  <span className="font-mono" style={{ color: 'var(--accent-primary)', marginRight: 6 }}>[{item.code}]</span>
                  {item.subject}
                </span>
                <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>
                  {item.present}P / {item.late}L / {item.absent}A ({pctPresent.toFixed(0)}%)
                </span>
              </div>
              <div
                style={{
                  height: 10,
                  width: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  display: 'flex',
                  backgroundColor: 'var(--bg-surface-muted)',
                }}
              >
                <div style={{ width: `${pctPresent}%`, backgroundColor: 'var(--status-present)' }} title={`Present: ${item.present}`} />
                <div style={{ width: `${pctLate}%`, backgroundColor: 'var(--status-late)' }} title={`Late: ${item.late}`} />
                <div style={{ width: `${pctAbsent}%`, backgroundColor: 'var(--status-absent)' }} title={`Absent: ${item.absent}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

