// [F-GRPH-401] Calendar Attendance Heatmap
import React, { useMemo } from 'react';

interface AttendanceHeatmapProps {
  title?: string;
  totalDays?: number;
}

export const AttendanceHeatmap: React.FC<AttendanceHeatmapProps> = ({ 
  title = 'PCP & Regular Attendance Heatmap (Last 16 Weeks)',
  totalDays = 112 
}) => {
  // Generate mock day grid
  const days = useMemo(() => {
    const list = [];
    const today = new Date('2026-11-08');
    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dayOfWeek = d.getDay(); // 0 = Sun
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Realistic mock statuses
      let status: 'present' | 'late' | 'absent' | 'off' = 'off';
      if (!isWeekend) {
        const rand = Math.random();
        if (rand > 0.3) status = 'present';
        else if (rand > 0.15) status = 'late';
        else status = 'absent';
      }

      list.push({
        date: d.toISOString().split('T')[0],
        dayOfWeek,
        status,
        dayNum: d.getDate(),
        month: d.toLocaleString('default', { month: 'short' })
      });
    }
    return list;
  }, [totalDays]);

  const getColor = (status: string) => {
    switch (status) {
      case 'present': return 'var(--status-present)';
      case 'late': return 'var(--status-late)';
      case 'absent': return 'var(--status-absent)';
      default: return 'var(--bg-surface-muted)';
    }
  };

  return (
    <div className="gravel-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{title}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            [F-GRPH-401] Daily contact session presence tracking
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'var(--status-present)' }} /> Present
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'var(--status-late)' }} /> Late
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'var(--status-absent)' }} /> Absent
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'var(--bg-surface-muted)' }} /> Off
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(7, 12px)', gap: '4px' }}>
          {days.map((d, idx) => (
            <div
              key={idx}
              title={`${d.date}: ${d.status.toUpperCase()}`}
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                backgroundColor: getColor(d.status),
                cursor: 'pointer',
                transition: 'transform 0.1s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

