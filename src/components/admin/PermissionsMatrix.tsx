// GRAVEL — Granular Permission Delegation Matrix [F-ACC-207]
import React from 'react';
import { useAppStore } from '../../store';
import { ShieldCheck, ShieldAlert, Check, X, Clock, Calendar } from 'lucide-react';
import { TeacherRecord } from '../../types';

export const PermissionsMatrix: React.FC = () => {
  const { teachers, toggleTeacherDelegation } = useAppStore();

  const handleUpdate = (teacher: TeacherRecord, updates: Partial<NonNullable<TeacherRecord['delegation']>>) => {
    const current = teacher.delegation || {
      isDelegated: false,
      canCreateEditStudents: false,
      canApproveSchedules: false,
      canUnlockAttendance: false,
      canVerifyTmaMarks: false,
      canViewGlobalAnalytics: false,
      scope: 'Assigned Batches Only',
    };

    const newDelegation = {
      ...current,
      ...updates,
      // If any permission is true, mark isDelegated true
      isDelegated: updates.isDelegated !== undefined 
        ? updates.isDelegated 
        : (updates.canCreateEditStudents || updates.canApproveSchedules || updates.canUnlockAttendance || updates.canVerifyTmaMarks || updates.canViewGlobalAnalytics || false)
    };

    toggleTeacherDelegation(teacher.id, newDelegation);
  };

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Title */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700 }}>
            [F-ACC-207] [F-UI-008]
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Dynamic Delegated-Permission Matrix
          </span>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 2 }}>
          Faculty Sub-Admin Permissions & Scope Delegation
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          Granting sub-admin tools automatically triggers <strong>[F-UI-008] Sidebar Injector</strong> in the teacher's session, displaying an elevated administration drawer with scoped privileges.
        </p>
      </div>

      {/* Teachers Delegation Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {teachers.map((teacher) => {
          const del = teacher.delegation || {
            isDelegated: false,
            canCreateEditStudents: false,
            canApproveSchedules: false,
            canUnlockAttendance: false,
            canVerifyTmaMarks: false,
            canViewGlobalAnalytics: false,
            scope: 'Assigned Batches Only' as const
          };

          return (
            <div
              key={teacher.id}
              className="gravel-card"
              style={{
                padding: '1.25rem',
                border: del.isDelegated ? '1.5px solid var(--accent-primary)' : 'var(--border-width) solid var(--border-hairline)',
                backgroundColor: 'var(--bg-surface-primary)',
              }}
            >
              {/* Teacher Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{teacher.name}</h3>
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      ({teacher.employeeId})
                    </span>
                    <span className={`status-pill ${del.isDelegated ? 'status-pill-present' : 'status-pill-late'}`} style={{ fontSize: '0.65rem' }}>
                      {del.isDelegated ? 'SUB-ADMIN ELEVATED' : 'STANDARD FACULTY'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {teacher.designation} • {teacher.department} • Batches: {teacher.assignedBatches.join(', ')}
                  </div>
                </div>

                {/* Scope & Expiry Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <select
                    className="gravel-input"
                    value={del.scope}
                    onChange={(e) => handleUpdate(teacher, { scope: e.target.value as any })}
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
                  >
                    <option value="Assigned Batches Only">Scope: Assigned Batches Only</option>
                    <option value="Institution-Wide">Scope: Institution-Wide</option>
                  </select>

                  <button
                    onClick={() => handleUpdate(teacher, { isDelegated: !del.isDelegated })}
                    className={`gravel-btn ${del.isDelegated ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.8rem' }}
                  >
                    {del.isDelegated ? 'Revoke All Elevation' : 'Grant Delegation'}
                  </button>
                </div>
              </div>

              {/* Granular Checkbox Matrix */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.75rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-hairline)',
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={del.canCreateEditStudents}
                    onChange={(e) => handleUpdate(teacher, { canCreateEditStudents: e.target.checked })}
                  />
                  <span>Create & Edit Students [F-ACC-201]</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={del.canApproveSchedules}
                    onChange={(e) => handleUpdate(teacher, { canApproveSchedules: e.target.checked })}
                  />
                  <span>Schedule & Conflict Check [F-SCH-503]</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={del.canUnlockAttendance}
                    onChange={(e) => handleUpdate(teacher, { canUnlockAttendance: e.target.checked })}
                  />
                  <span>Unlock Past Attendance [F-ATT-606]</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={del.canVerifyTmaMarks}
                    onChange={(e) => handleUpdate(teacher, { canVerifyTmaMarks: e.target.checked })}
                  />
                  <span>Verify Official TMA Marks [F-MAT-703]</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={del.canViewGlobalAnalytics}
                    onChange={(e) => handleUpdate(teacher, { canViewGlobalAnalytics: e.target.checked })}
                  />
                  <span>View Global Analytics [F-MATH-307]</span>
                </label>
              </div>

              {del.isDelegated && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={13} /> Delegation expires on: {del.expiresAt || '2026-12-31'} (Automated expiry on TMA portal lock)
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

