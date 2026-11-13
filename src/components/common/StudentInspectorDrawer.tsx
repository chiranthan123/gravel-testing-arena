// GRAVEL — Slide-Over Inspector Drawer [F-UI-007] & Full Override Account Editor [F-ACC-206]
import React, { useState } from 'react';
import { StudentRecord } from '../../types';
import { useAppStore } from '../../store';
import { 
  X, 
  User, 
  BookOpen, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Save, 
  Shield, 
  Calendar, 
  Award,
  Layers
} from 'lucide-react';
import { calculateAttendanceMargin, calculateNiosSubjectScore } from '../../math';
import { ComponentScoreBar } from '../charts/ComponentScoreBar';

interface StudentInspectorDrawerProps {
  student: StudentRecord | null;
  onClose: () => void;
}

export const StudentInspectorDrawer: React.FC<StudentInspectorDrawerProps> = ({ student, onClose }) => {
  const { updateStudent, updateTmaMarks, updatePracticalMarks, currentRole } = useAppStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'nios' | 'guardian'>('profile');
  const [editStatus, setEditStatus] = useState<StudentRecord['status']>(student?.status || 'Active');
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(student?.subjects[0]?.code || '311');
  const [editTmaMarks, setEditTmaMarks] = useState<number>(0);
  const [editPracticalMarks, setEditPracticalMarks] = useState<number>(0);
  const [editTmaStatus, setEditTmaStatus] = useState<'Pending' | 'Submitted to AI' | 'Uploaded on Portal' | 'Evaluated'>('Pending');
  const [tmaFeedback, setTmaFeedback] = useState<string>('');

  if (!student) return null;

  // Selected subject
  const currentSub = student.subjects.find(s => s.code === selectedSubjectCode) || student.subjects[0];

  // Mathematical Safe Margin [F-MATH-302]
  const margin = calculateAttendanceMargin(student.totalPresent, student.totalClassesHeld, 0.75);

  const handleSaveTma = () => {
    if (!currentSub) return;
    updateTmaMarks(student.id, currentSub.code, editTmaMarks, editTmaStatus as any, tmaFeedback);
    if (currentSub.hasPractical) {
      updatePracticalMarks(student.id, currentSub.code, editPracticalMarks);
    }
    alert(`Updated marks for ${currentSub.name} [${currentSub.code}]`);
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem',
            borderBottom: 'var(--border-width) solid var(--border-hairline)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{student.name}</h3>
              <span className={`status-pill ${student.status === 'Active' ? 'status-pill-present' : 'status-pill-absent'}`}>
                {student.status}
              </span>
            </div>
            <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginTop: 2 }}>
              NIOS Enrol: {student.nios.enrolmentNo} • AI #{student.nios.aiCode}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: 'var(--border-width) solid var(--border-hairline)',
            backgroundColor: 'var(--bg-surface-muted)',
          }}
        >
          {[
            { id: 'profile', label: 'Identity & Safe Margin' },
            { id: 'nios', label: 'NIOS & TOC' },
            { id: 'academic', label: 'TMA & Marks' },
            { id: 'guardian', label: 'Guardian' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: '0.6rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : 'none',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div style={{ flex: 1, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
          {/* TAB 1: Identity & Safe Margin [F-DAT-101, F-MATH-301..302] */}
          {activeTab === 'profile' && (
            <>
              {/* Safe Margin Recovery Card [F-MATH-302] */}
              <div
                className="gravel-card"
                style={{
                  padding: '1rem',
                  backgroundColor: margin.meetsThreshold ? 'var(--status-present-bg)' : 'var(--status-absent-bg)',
                  borderColor: margin.meetsThreshold ? 'var(--status-present)' : 'var(--status-absent)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                    Attendance Margin Calculator [F-MATH-302]
                  </span>
                  <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 800 }}>
                    AR: {student.attendanceRate}%
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.4 }}>
                  {margin.meetsThreshold ? (
                    <>
                      Target threshold (75%) maintained! The student can safely miss{' '}
                      <strong>{margin.safeMargin}</strong> upcoming class(es) without falling below the required minimum.
                    </>
                  ) : (
                    <>
                      Attendance warning! Student is below 75% threshold. Must attend at least{' '}
                      <strong>{margin.classesNeeded}</strong> consecutive upcoming sessions to recover compliance.
                    </>
                  )}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem', marginTop: 8 }}>
                  <span>Present: {student.totalPresent}</span>
                  <span>Late: {student.totalLate} (wt: 0.5)</span>
                  <span>Absent: {student.totalAbsent}</span>
                  <span>Total Held: {student.totalClassesHeld}</span>
                </div>
              </div>

              {/* Personal Details [F-DAT-101] */}
              <div className="gravel-card" style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  Base Identity & KYC [F-DAT-101, F-DAT-105]
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Date of Birth</span>
                    <div style={{ fontWeight: 500 }}>{student.dob}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Gender / Blood</span>
                    <div style={{ fontWeight: 500 }}>{student.gender} ({student.bloodGroup})</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Phone</span>
                    <div style={{ fontWeight: 500 }}>{student.phone}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Email</span>
                    <div style={{ fontWeight: 500 }}>{student.email}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>ID Proof ({student.compliance.idProofType})</span>
                    <div className="font-mono" style={{ fontWeight: 500 }}>{student.compliance.idProofNumber}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Social Category</span>
                    <div style={{ fontWeight: 500 }}>{student.compliance.socialCategory}</div>
                  </div>
                </div>

                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-hairline)', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Residential Address</span>
                  <div>{student.address}</div>
                </div>

                {/* Divyangjan / PwD Status [F-DAT-105] */}
                {student.compliance.isDivyangjan && (
                  <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'var(--accent-subtle)', borderRadius: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--accent-primary)' }}>
                      Divyangjan / PwD Concessions Active
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      Disability: {student.compliance.disabilityType} • Scribe: {student.compliance.concessions?.scribeNeeded ? 'Yes' : 'No'} • Extra Time: +20m/hr
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Override: Account Status [F-ACC-206] */}
              {currentRole === 'ADMIN' && (
                <div className="gravel-card" style={{ padding: '1rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Administrative Account Override [F-ACC-206]
                  </h4>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <select
                      className="gravel-input"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                    >
                      <option value="Active">Active</option>
                      <option value="Onboarding">Onboarding</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Archived">Archived</option>
                    </select>
                    <button
                      onClick={() => {
                        updateStudent(student.id, { status: editStatus });
                        alert(`Student status updated to ${editStatus}`);
                      }}
                      className="gravel-btn gravel-btn-outline"
                    >
                      Save Status
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: NIOS Core & TOC [F-DAT-103, F-DAT-104] */}
          {activeTab === 'nios' && (
            <div className="gravel-card" style={{ padding: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                NIOS Enrolment & Stream Details [F-DAT-103]
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Enrolment Number</span>
                  <div className="font-mono" style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>
                    {student.nios.enrolmentNo}
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Reference Number</span>
                  <div className="font-mono">{student.nios.refNo}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Course Level</span>
                  <div>{student.nios.courseLevel}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Stream & Block</span>
                  <div style={{ fontWeight: 600 }}>{student.nios.streamBlock}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Medium</span>
                  <div>{student.nios.medium}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Admission Status</span>
                  <div>{student.nios.admissionStatus}</div>
                </div>
              </div>

              {/* Enrolled Subjects List */}
              <div style={{ marginTop: '1.25rem' }}>
                <h5 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Enrolled Subjects & TOC Status ({student.subjects.length})
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {student.subjects.map(sub => (
                    <div
                      key={sub.code}
                      className="gravel-card"
                      style={{ padding: '0.5rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}
                    >
                      <span>
                        <strong className="font-mono" style={{ color: 'var(--accent-primary)', marginRight: 6 }}>[{sub.code}]</strong>
                        {sub.name}
                        {sub.hasPractical && <span style={{ marginLeft: 6, fontSize: '0.65rem', background: 'var(--bg-surface-muted)', padding: '1px 4px', borderRadius: 2 }}>PRAC</span>}
                      </span>
                      <span>
                        {sub.tocApplied ? (
                          <span className="status-pill status-pill-late" style={{ fontSize: '0.65rem' }}>TOC AVAILED</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>Regular</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TMA & Marks Entry [F-MAT-703, F-MATH-303, F-GRPH-408] */}
          {activeTab === 'academic' && (
            <>
              {/* Component breakdown bar chart */}
              <ComponentScoreBar subjects={student.subjects} />

              {/* Marks Entry Editor for Teacher/Admin */}
              <div className="gravel-card" style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  TMA & Practical Score Grader [F-MAT-703]
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Select Subject to Grade</label>
                    <select
                      className="gravel-input"
                      style={{ width: '100%' }}
                      value={selectedSubjectCode}
                      onChange={(e) => {
                        const code = e.target.value;
                        setSelectedSubjectCode(code);
                        const s = student.subjects.find(sub => sub.code === code);
                        if (s) {
                          setEditTmaMarks(s.tmaMarks || 0);
                          setEditPracticalMarks(s.practicalMarks || 0);
                          setEditTmaStatus(s.tmaStatus);
                          setTmaFeedback(s.tmaFeedback || '');
                        }
                      }}
                    >
                      {student.subjects.map(s => (
                        <option key={s.code} value={s.code}>
                          [{s.code}] {s.name} (TMA: {s.tmaMarks || 0}/20, {s.tmaStatus})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>TMA Marks (Out of 20)</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={editTmaMarks}
                        onChange={(e) => setEditTmaMarks(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>TMA Status</label>
                      <select
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={editTmaStatus}
                        onChange={(e) => setEditTmaStatus(e.target.value as any)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Submitted to AI">Submitted to AI</option>
                        <option value="Uploaded on Portal">Uploaded on Portal</option>
                        <option value="Evaluated">Evaluated</option>
                      </select>
                    </div>
                  </div>

                  {currentSub?.hasPractical && (
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        Practical Component Marks (Out of 20)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={editPracticalMarks}
                        onChange={(e) => setEditPracticalMarks(Number(e.target.value))}
                      />
                    </div>
                  )}

                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Teacher Evaluator Feedback</label>
                    <textarea
                      className="gravel-input"
                      style={{ width: '100%', minHeight: '60px' }}
                      placeholder="Feedback on Tutor Marked Assignment..."
                      value={tmaFeedback}
                      onChange={(e) => setTmaFeedback(e.target.value)}
                    />
                  </div>

                  <button onClick={handleSaveTma} className="gravel-btn gravel-btn-primary" style={{ alignSelf: 'flex-end' }}>
                    <Save size={14} /> Commit Grades
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAB 4: Guardian & Emergency Contact [F-DAT-102] */}
          {activeTab === 'guardian' && (
            <div className="gravel-card" style={{ padding: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Guardian Details [F-DAT-102]
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Father's Name</span>
                  <div style={{ fontWeight: 500 }}>{student.guardian.fatherName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Mother's Name</span>
                  <div style={{ fontWeight: 500 }}>{student.guardian.motherName}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Primary Alert Phone</span>
                  <div style={{ fontWeight: 500 }}>{student.guardian.phone}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Guardian Email</span>
                  <div>{student.guardian.guardianEmail || 'Not specified'}</div>
                </div>
              </div>

              {/* Direct Guardian WhatsApp/Call Action */}
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem' }}>
                <a
                  href={`tel:${student.guardian.phone}`}
                  className="gravel-btn gravel-btn-outline"
                  style={{ textDecoration: 'none', flex: 1, fontSize: '0.75rem' }}
                >
                  <Phone size={14} /> Call Guardian
                </a>
                <a
                  href={`https://wa.me/${student.guardian.phone.replace(/[^0-9]/g, '')}?text=Dear%20Parent%2C%20regarding%20${encodeURIComponent(student.name)}%27s%20NIOS%20attendance%20and%20TMA%20progress...`}
                  target="_blank"
                  rel="noreferrer"
                  className="gravel-btn gravel-btn-primary"
                  style={{ textDecoration: 'none', flex: 1, fontSize: '0.75rem' }}
                >
                  WhatsApp Alert
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

