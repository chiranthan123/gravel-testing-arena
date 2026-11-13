// GRAVEL — Developer Platform Control Suite [F-DEV-001..006]
import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { 
  Settings, 
  ToggleLeft, 
  ToggleRight, 
  ShieldCheck, 
  Database, 
  Clock, 
  Download, 
  Upload, 
  RotateCcw, 
  UserCheck, 
  Search,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { InstitutionPreset, Role } from '../../types';

interface DevWorkspaceProps {
  activeSubTab: string;
}

export const DevWorkspace: React.FC<DevWorkspaceProps> = ({ activeSubTab }) => {
  const {
    institutionPreset,
    setInstitutionPreset,
    features,
    toggleFeature,
    auditLogs,
    students,
    teachers,
    schedules,
    exportDatabaseJson,
    importDatabaseJson,
    resetDatabase,
    setCurrentRole,
    setImpersonatedStudentId,
    setImpersonatedTeacherId
  } = useAppStore();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [auditSearch, setAuditSearch] = useState<string>('');
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Filtered features
  const filteredFeatures = features.filter(f => {
    if (categoryFilter === 'ALL') return true;
    return f.category === categoryFilter;
  });

  // Filtered audit logs
  const filteredLogs = auditLogs.filter(l => {
    if (!auditSearch) return true;
    return (
      l.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.userName.toLowerCase().includes(auditSearch.toLowerCase())
    );
  });

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const ok = importDatabaseJson(importJsonText);
    if (ok) {
      setImportStatus('Database successfully restored from JSON snapshot!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 4000);
    } else {
      setImportStatus('Invalid JSON snapshot format.');
    }
  };

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Dev Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 700 }}>
              [DEV_WORKSPACE]
            </span>
            <span className="status-pill status-pill-present" style={{ fontSize: '0.65rem' }}>
              PLATFORM ROOT ACCESS
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: 4 }}>
            System Architecture & Feature Engine
          </h2>
        </div>

        {/* Shadow Login Quick Bar [F-DEV-006] */}
        <div className="gravel-card" style={{ padding: '0.5rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <UserCheck size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Shadow Login [F-DEV-006]:</span>
          <select
            className="gravel-input"
            style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
            onChange={(e) => {
              const val = e.target.value;
              if (val.startsWith('std-')) {
                setImpersonatedStudentId(val);
                setCurrentRole('STUDENT');
              } else if (val.startsWith('tch-')) {
                setImpersonatedTeacherId(val);
                setCurrentRole('TEACHER');
              } else if (val === 'ADMIN') {
                setCurrentRole('ADMIN');
              }
            }}
            defaultValue=""
          >
            <option value="" disabled>Impersonate Any User...</option>
            <option value="ADMIN">Administrator (Head Office)</option>
            <option value="tch-001">Dr. Aruna Saxena (Delegated Teacher)</option>
            <option value="tch-002">Prof. Rajesh Kulkarni (Teacher)</option>
            <option value="std-001">Aarav Sharma (Student - S1-B1)</option>
            <option value="std-002">Diya Nair (Student - Low Attendance)</option>
            <option value="std-005">Rohan Sen (Student - Divyangjan PwD)</option>
          </select>
        </div>
      </div>

      {/* TAB 1: Platform & Institution Configurator [F-DEV-001] */}
      {(activeSubTab === 'dev-config' || !activeSubTab) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Preset Selector Card */}
          <div className="gravel-card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>
              Active Institution Blueprint Manifest [F-DEV-001]
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Swapping the institution preset instantly alters mounted data schemas, mathematical models, and syllabus taxonomics without redeploying code.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {(['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM'] as InstitutionPreset[]).map((preset) => {
                const isActive = institutionPreset === preset;
                return (
                  <div
                    key={preset}
                    onClick={() => setInstitutionPreset(preset)}
                    className="gravel-card"
                    style={{
                      padding: '1rem',
                      cursor: 'pointer',
                      border: isActive ? '2px solid var(--accent-primary)' : 'var(--border-width) solid var(--border-hairline)',
                      backgroundColor: isActive ? 'var(--accent-subtle)' : 'var(--bg-surface-primary)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                        {preset === 'NIOS' && 'Preset 1: NIOS Study Centre'}
                        {preset === 'COLLEGE' && 'Preset 2: Degree College'}
                        {preset === 'COACHING' && 'Preset 3: Coaching / Tuition'}
                        {preset === 'CUSTOM' && 'Custom Tenant Blueprint'}
                      </span>
                      {isActive && <CheckCircle size={16} style={{ color: 'var(--accent-primary)' }} />}
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {preset === 'NIOS' && 'Mounts Stream 1-4, TMA 20% weightage, 5 Formative Practical PCPs, TOC credits, and Divyangjan UDID compliance.'}
                      {preset === 'COLLEGE' && 'Mounts University Reg No, SGPA/CGPA engine [F-MATH-308], Semester credit hours, and Lab Internal Assessments.'}
                      {preset === 'COACHING' && 'Mounts JEE/NEET/CUET targets, Batch slotting, Fee installments, and Percentile Rank tracking [F-MATH-306].'}
                      {preset === 'CUSTOM' && 'Dev manual override mode. Every individual feature index toggleable per tenant.'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feature Index Toggle Matrix */}
          <div className="gravel-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Master Feature-Index Matrix</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Total Features: {features.length} | Active: {features.filter(f => f.enabled).length}
                </span>
              </div>

              {/* Category Filter Pills */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {['ALL', 'UI', 'DEV', 'DAT', 'ACC', 'MATH', 'GRPH', 'SCH', 'ATT', 'MAT', 'NOT'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className="gravel-btn"
                    style={{
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.7rem',
                      backgroundColor: categoryFilter === cat ? 'var(--accent-primary)' : 'var(--bg-surface-muted)',
                      color: categoryFilter === cat ? '#fff' : 'var(--text-secondary)',
                      borderRadius: 4,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Features Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: 'var(--border-width) solid var(--border-hairline)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '0.5rem' }}>INDEX ID</th>
                    <th style={{ padding: '0.5rem' }}>FEATURE NAME</th>
                    <th style={{ padding: '0.5rem' }}>DESCRIPTION</th>
                    <th style={{ padding: '0.5rem' }}>ALLOWED ROLES</th>
                    <th style={{ padding: '0.5rem', textAlign: 'right' }}>DEV TOGGLE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeatures.map((f) => (
                    <tr
                      key={f.id}
                      style={{
                        borderBottom: '1px solid var(--border-hairline)',
                        backgroundColor: f.enabled ? 'transparent' : 'var(--bg-surface-muted)',
                        opacity: f.enabled ? 1 : 0.6,
                      }}
                    >
                      <td style={{ padding: '0.6rem 0.5rem' }}>
                        <code className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>
                          {f.id}
                        </code>
                      </td>
                      <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>{f.name}</td>
                      <td style={{ padding: '0.6rem 0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem', maxWidth: 350 }}>
                        {f.description}
                      </td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>
                        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                          {f.allowedRoles.map(r => (
                            <span key={r} style={{ fontSize: '0.62rem', padding: '1px 4px', background: 'var(--bg-canvas)', borderRadius: 2 }}>
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>
                        <button
                          onClick={() => toggleFeature(f.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: f.enabled ? 'var(--status-present)' : 'var(--text-muted)',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                          title={`Toggle ${f.id}`}
                        >
                          {f.enabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Admin Account Provisioning Console [F-DEV-002] */}
      {activeSubTab === 'dev-admins' && (
        <div className="gravel-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>
            Admin Account Provisioning Console [F-DEV-002]
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Manage administrative credentials, tenant scopes, and rate allocations across institutional centres.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="gravel-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Regional Coordinator (HQ East Delhi)</div>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  admin-hq@gravel.edu • Scope: Institution-Wide • Status: ACTIVE
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="gravel-btn gravel-btn-outline" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>
                  Reset PIN
                </button>
                <button className="gravel-btn gravel-btn-subtle" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>
                  Edit Tenant Scope
                </button>
              </div>
            </div>

            <div className="gravel-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>AI Study Centre #270123 Administrator</div>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  admin-ai270123@gravel.edu • Scope: AI Centre #270123 Only • Status: ACTIVE
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="gravel-btn gravel-btn-outline" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>
                  Reset PIN
                </button>
                <button className="gravel-btn gravel-btn-subtle" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>
                  Edit Tenant Scope
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Global Audit Log & Mutation Stream [F-DEV-003] */}
      {activeSubTab === 'dev-audit' && (
        <div className="gravel-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Global Mutation Stream & Audit Log [F-DEV-003]</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Real-time chronological trace of every CREATE, UPDATE, DELETE, and PERMISSION_GRANT action.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={15} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="gravel-input"
                placeholder="Filter logs by keyword..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                style={{ fontSize: '0.75rem', width: 220 }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: 'var(--border-width) solid var(--border-hairline)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '0.5rem' }}>TIMESTAMP</th>
                  <th style={{ padding: '0.5rem' }}>ACTION</th>
                  <th style={{ padding: '0.5rem' }}>ROLE</th>
                  <th style={{ padding: '0.5rem' }}>OPERATOR</th>
                  <th style={{ padding: '0.5rem' }}>MUTATION DETAILS</th>
                  <th style={{ padding: '0.5rem' }}>ORIGIN IP</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((l) => (
                  <tr key={l.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                    <td className="font-mono" style={{ padding: '0.5rem', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {l.timestamp}
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: 3,
                          backgroundColor:
                            l.action === 'CREATE' ? 'var(--status-present-bg)' :
                            l.action === 'DELETE' ? 'var(--status-absent-bg)' :
                            l.action === 'PERMISSION_GRANT' ? 'var(--accent-subtle)' : 'var(--bg-surface-muted)',
                          color:
                            l.action === 'CREATE' ? 'var(--status-present)' :
                            l.action === 'DELETE' ? 'var(--status-absent)' :
                            l.action === 'PERMISSION_GRANT' ? 'var(--accent-primary)' : 'var(--text-primary)',
                        }}
                      >
                        {l.action}
                      </span>
                    </td>
                    <td style={{ padding: '0.5rem', fontWeight: 600 }}>{l.userRole}</td>
                    <td style={{ padding: '0.5rem' }}>{l.userName}</td>
                    <td style={{ padding: '0.5rem', color: 'var(--text-primary)' }}>{l.details}</td>
                    <td className="font-mono" style={{ padding: '0.5rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {l.ip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Raw Database Inspector & Snapshot Backup [F-DEV-004..005] */}
      {activeSubTab === 'dev-database' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Backup & Restore Utility [F-DEV-005] */}
          <div className="gravel-card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>
              Snapshot Backup, Restore & Point-in-Time Recovery [F-DEV-005]
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Create a full export of local IndexedDB/localStorage state, restore from a snapshot file, or reset to factory defaults.
            </p>

            {importStatus && (
              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--card-radius)',
                  backgroundColor: 'var(--status-present-bg)',
                  color: 'var(--status-present)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                {importStatus}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportDatabaseJson());
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", `gravel_backup_${new Date().toISOString().slice(0, 10)}.json`);
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                className="gravel-btn gravel-btn-primary"
              >
                <Download size={15} /> Export Complete JSON Snapshot
              </button>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset the entire database to factory defaults? All mock edits will be restored.')) {
                    resetDatabase();
                  }
                }}
                className="gravel-btn gravel-btn-danger"
              >
                <RotateCcw size={15} /> Reset Database to Defaults
              </button>
            </div>

            {/* JSON Restore Box */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                Restore From Raw JSON Snapshot String:
              </label>
              <textarea
                className="gravel-input font-mono"
                style={{ width: '100%', minHeight: '90px', fontSize: '0.75rem', resize: 'vertical' }}
                placeholder="Paste exported Gravel database JSON here..."
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
              />
              <button
                onClick={handleImport}
                className="gravel-btn gravel-btn-outline"
                style={{ marginTop: 6 }}
                disabled={!importJsonText.trim()}
              >
                <Upload size={14} /> Restore Snapshot
              </button>
            </div>
          </div>

          {/* Raw Database Inspector [F-DEV-004] */}
          <div className="gravel-card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>
              Raw Database Collection Inspector [F-DEV-004]
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Direct live inspection of application entities.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="gravel-card" style={{ padding: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Collection</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Students</div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>
                  {students.length} Records
                </div>
              </div>

              <div className="gravel-card" style={{ padding: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Collection</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Teachers</div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>
                  {teachers.length} Records
                </div>
              </div>

              <div className="gravel-card" style={{ padding: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Collection</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Schedules</div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>
                  {schedules.length} Sessions
                </div>
              </div>

              <div className="gravel-card" style={{ padding: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Collection</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Audit Events</div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>
                  {auditLogs.length} Entries
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
