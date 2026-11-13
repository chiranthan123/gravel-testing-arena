// GRAVEL — Desktop Sidebar Controller [F-UI-001] & Dynamic Delegated Injector [F-UI-008]
import React from 'react';
import { useAppStore } from '../../store';
import { 
  Users, 
  BarChart3, 
  ShieldCheck, 
  Calendar, 
  CheckSquare, 
  BookOpen, 
  GraduationCap, 
  Cpu, 
  Database, 
  FileText, 
  Clock, 
  Sparkles,
  Settings,
  Layers,
  Award
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentRole, teachers, impersonatedTeacherId } = useAppStore();

  // Check if current logged-in teacher has delegated admin permissions [F-UI-008]
  const currentTeacher = teachers.find(t => 
    impersonatedTeacherId ? t.id === impersonatedTeacherId : t.id === 'tch-001'
  );
  const isDelegatedTeacher = currentRole === 'TEACHER' && !!currentTeacher?.delegation?.isDelegated;

  const renderNavButton = (id: string, label: string, icon: React.ReactNode, featureBadge?: string) => {
    const isActive = activeTab === id;
    return (
      <button
        key={id}
        onClick={() => setActiveTab(id)}
        className="gravel-btn"
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          backgroundColor: isActive ? 'var(--accent-subtle)' : 'transparent',
          color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
          fontWeight: isActive ? 600 : 500,
          border: 'none',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--card-radius)',
          textAlign: 'left',
          marginBottom: '2px',
        }}
      >
        <span style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
          {icon}
        </span>
        <span style={{ flex: 1, fontSize: '0.82rem' }}>{label}</span>
        {featureBadge && (
          <span
            className="font-mono"
            style={{
              fontSize: '0.62rem',
              padding: '1px 4px',
              borderRadius: 3,
              backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-surface-muted)',
              color: isActive ? '#fff' : 'var(--text-muted)',
            }}
          >
            {featureBadge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="app-sidebar" style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column' }}>
      {/* Role badge header */}
      <div
        style={{
          padding: '0.5rem 0.75rem',
          marginBottom: '1rem',
          borderRadius: 'var(--card-radius)',
          backgroundColor: 'var(--bg-surface-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          WORKSPACE
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            color: 'var(--accent-primary)',
            backgroundColor: 'var(--accent-subtle)',
            padding: '1px 6px',
            borderRadius: 3,
          }}
        >
          {currentRole}
        </span>
      </div>

      {/* Nav List depending on Role */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        {/* DEV ROLE NAV */}
        {currentRole === 'DEV' && (
          <>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.4rem 0.5rem', textTransform: 'uppercase' }}>
              Platform Engineering
            </div>
            {renderNavButton('dev-config', 'Platform & Presets', <Settings size={16} />, 'F-DEV-001')}
            {renderNavButton('dev-admins', 'Admin Provisioning', <ShieldCheck size={16} />, 'F-DEV-002')}
            {renderNavButton('dev-audit', 'Mutation Stream', <Clock size={16} />, 'F-DEV-003')}
            {renderNavButton('dev-database', 'Raw DB & Backup', <Database size={16} />, 'F-DEV-004')}
          </>
        )}

        {/* ADMIN ROLE NAV */}
        {currentRole === 'ADMIN' && (
          <>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.4rem 0.5rem', textTransform: 'uppercase' }}>
              Administration
            </div>
            {renderNavButton('admin-directory', 'Student Directory', <Users size={16} />, 'F-ACC-203')}
            {renderNavButton('admin-analytics', 'Observation Studio', <BarChart3 size={16} />, 'F-GRPH-406')}
            {renderNavButton('admin-permissions', 'Teacher Delegation', <ShieldCheck size={16} />, 'F-ACC-207')}
            {renderNavButton('admin-operations', 'Schedules & Timetable', <Calendar size={16} />, 'F-SCH-501')}
          </>
        )}

        {/* TEACHER ROLE NAV */}
        {currentRole === 'TEACHER' && (
          <>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.4rem 0.5rem', textTransform: 'uppercase' }}>
              Classroom & Grading
            </div>
            {renderNavButton('teacher-attendance', '15-Sec Roll Call', <CheckSquare size={16} />, 'F-ATT-603')}
            {renderNavButton('teacher-students', 'Student 360 & TMA', <Users size={16} />, 'F-MAT-703')}
            {renderNavButton('teacher-schedules', 'Class Schedule & Diffs', <Calendar size={16} />, 'F-SCH-505')}
            {renderNavButton('teacher-materials', 'Study Materials', <BookOpen size={16} />, 'F-MAT-702')}

            {/* Dynamic Delegated Permission Sidebar Injector [F-UI-008] */}
            {isDelegatedTeacher && (
              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-hairline)', paddingTop: '0.75rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-primary)', padding: '0.4rem 0.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Sparkles size={12} /> Delegated Admin Tools [F-UI-008]
                </div>
                {renderNavButton('teacher-delegated-admin', 'Elevated Admin Studio', <ShieldCheck size={16} />, 'DELEGATED')}
              </div>
            )}
          </>
        )}

        {/* STUDENT ROLE NAV */}
        {currentRole === 'STUDENT' && (
          <>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.4rem 0.5rem', textTransform: 'uppercase' }}>
              Learner Portal (NIOS)
            </div>
            {renderNavButton('student-home', 'Attendance & Margin', <GraduationCap size={16} />, 'F-MATH-302')}
            {renderNavButton('student-schedule', 'Timetable & Diffs', <Calendar size={16} />, 'F-SCH-505')}
            {renderNavButton('student-checklist', 'Syllabus Checklist', <CheckSquare size={16} />, 'F-MAT-705')}
            {renderNavButton('student-library', 'Offline Textbooks', <BookOpen size={16} />, 'F-MAT-704')}
            {renderNavButton('student-profile', 'Score Card & Radar', <Award size={16} />, 'F-GRPH-404')}
          </>
        )}
      </div>

      {/* Footer Info */}
      <div
        style={{
          borderTop: 'var(--border-width) solid var(--border-hairline)',
          paddingTop: '0.75rem',
          fontSize: '0.68rem',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>GRAVEL v1.0 • PWA</span>
        <span>Feature Index: <code className="font-mono">[F-UI-001]</code></span>
      </div>
    </aside>
  );
};

