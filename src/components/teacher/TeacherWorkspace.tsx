// GRAVEL — Teacher Workspace Wrapper [Section 3.4]
import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { TeacherRollCall } from './TeacherRollCall';
import { TeacherMaterials } from './TeacherMaterials';
import { OperationsStudio } from '../admin/OperationsStudio';
import { StudentInspectorDrawer } from '../common/StudentInspectorDrawer';
import { AnalyticsStudio } from '../admin/AnalyticsStudio';
import { StudentRecord } from '../../types';
import { Users, Eye, Sparkles } from 'lucide-react';

interface TeacherWorkspaceProps {
  activeSubTab: string;
}

export const TeacherWorkspace: React.FC<TeacherWorkspaceProps> = ({ activeSubTab }) => {
  const { students } = useAppStore();
  const [inspectingStudent, setInspectingStudent] = useState<StudentRecord | null>(null);

  if (activeSubTab === 'teacher-materials') {
    return <TeacherMaterials />;
  }

  if (activeSubTab === 'teacher-schedules') {
    return <OperationsStudio />;
  }

  if (activeSubTab === 'teacher-delegated-admin') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ padding: '1rem 1.5rem 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
            Elevated Delegated Administrator Console [F-UI-008]
          </span>
        </div>
        <AnalyticsStudio />
      </div>
    );
  }

  if (activeSubTab === 'teacher-students') {
    return (
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div>
          <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700 }}>
            [F-UI-007] [F-MAT-703]
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 2 }}>
            Student 360 &amp; Tutor Marked Assignment Evaluation
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Inspect student profiles, award TMA continuous assessment marks, and view attendance safe margins.
          </p>
        </div>

        <div className="gravel-card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-muted)', textAlign: 'left', borderBottom: '1px solid var(--border-hairline)' }}>
                <th style={{ padding: '0.65rem 0.75rem' }}>STUDENT</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>ENROLMENT NO</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>STREAM</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>ATTENDANCE</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>TMA STATUS</th>
                <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const evalCount = s.subjects.filter(sub => sub.tmaStatus === 'Evaluated').length;
                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                    <td style={{ padding: '0.65rem 0.75rem', fontWeight: 600 }}>{s.name}</td>
                    <td className="font-mono" style={{ padding: '0.65rem 0.75rem', color: 'var(--accent-primary)' }}>
                      {s.nios.enrolmentNo}
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem' }}>{s.nios.streamBlock}</td>
                    <td style={{ padding: '0.65rem 0.75rem' }} className="font-mono">
                      {s.attendanceRate}% {s.attendanceRate < 75 && <span style={{ color: 'var(--status-absent)', fontWeight: 700 }}>!</span>}
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem' }}>
                      <span className="font-mono">{evalCount}/{s.subjects.length} Evaluated</span>
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>
                      <button
                        onClick={() => setInspectingStudent(s)}
                        className="gravel-btn gravel-btn-outline"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
                      >
                        <Eye size={12} /> Grade / Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <StudentInspectorDrawer
          student={inspectingStudent}
          onClose={() => setInspectingStudent(null)}
        />
      </div>
    );
  }

  // Default: Roll call
  return <TeacherRollCall />;
};
