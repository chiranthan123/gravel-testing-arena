// GRAVEL — Student Mobile-First Thumb-Zone Portal [Section 3.5]
import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store';
import { ScheduleEvent, SyllabusChecklistTopic, StudyMaterial } from '../../types';
import { 
  GraduationCap, 
  Calendar, 
  CheckSquare, 
  BookOpen, 
  User, 
  Clock, 
  Download, 
  CheckCircle2, 
  Circle, 
  RotateCw, 
  MapPin, 
  ShieldCheck, 
  Award,
  Sparkles,
  ArrowRight,
  Coffee,
  AlertTriangle,
  Repeat,
  Search,
  Eye,
  ZoomIn,
  ZoomOut,
  FileText,
  Image as ImageIcon,
  Tag,
  ChevronDown,
  ChevronUp,
  FolderOpen
} from 'lucide-react';
import { calculateAttendanceMargin } from '../../math';
import { AttendanceHeatmap } from '../charts/AttendanceHeatmap';
import { ScoreRadarChart } from '../charts/ScoreRadarChart';
import { ComponentScoreBar } from '../charts/ComponentScoreBar';
import { getFilteredStudentAgenda, timeToMinutes } from '../../utils/scheduleEngine';

interface StudentWorkspaceProps {
  activeSubTab: string;
}

export const StudentWorkspace: React.FC<StudentWorkspaceProps> = ({ activeSubTab }) => {
  const { 
    students, 
    impersonatedStudentId, 
    schedules, 
    checklist, 
    updateTopicStatus, 
    materials, 
    toggleOfflineMaterial,
    resolveDateSchedule
  } = useAppStore();

  // Active student
  const student = students.find(s => s.id === (impersonatedStudentId || 'std-001')) || students[0];

  // Schedule Active Date (Layer 2 & 3 Resolver)
  const [scheduleDate, setScheduleDate] = useState('2026-11-14');

  // Checklist Filter & Sort State [F-MAT-706]
  const [bifurcationFilter, setBifurcationFilter] = useState<'ALL' | 'TMA-40%' | 'Public-Exam-60%'>('ALL');
  const [subjectFilter, setSubjectFilter] = useState<string>('ALL');
  const [librarySubjectFilter, setLibrarySubjectFilter] = useState<string>('ALL');

  // Study Materials Hub State [F-MAT-701..704]
  const [activeMaterialSubject, setActiveMaterialSubject] = useState<string>(student?.subjects[0]?.code || '311');
  const [materialSearchQuery, setMaterialSearchQuery] = useState('');
  const [materialCategoryFilter, setMaterialCategoryFilter] = useState<'ALL' | 'Class Notes' | 'TMA Help' | 'Practice / PYQ' | 'Quick Revision' | 'Lab / Practical' | 'IMAGES_ONLY'>('ALL');
  const [materialSmartSort, setMaterialSmartSort] = useState<'NEWEST' | 'CHAPTER_ORDER' | 'MISSED_FIRST'>('NEWEST');
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Attendance margin calculation [F-MATH-302]
  const margin = student ? calculateAttendanceMargin(student.totalPresent, student.totalClassesHeld, 0.75) : null;

  // Downstream Wiring 3: Filtered strictly by Student's Registered Subjects
  const studentRegisteredCodes = useMemo(() => {
    return student ? student.subjects.map(s => s.code) : [];
  }, [student]);

  // Filtered Checklist Topics (strictly within student's enrolled subjects)
  const filteredTopics = useMemo(() => {
    return checklist.filter(t => {
      // Must be a registered subject
      if (!studentRegisteredCodes.includes(t.subjectCode)) return false;
      if (bifurcationFilter !== 'ALL' && t.bifurcation !== bifurcationFilter) return false;
      if (subjectFilter !== 'ALL' && t.subjectCode !== subjectFilter) return false;
      return true;
    });
  }, [checklist, studentRegisteredCodes, bifurcationFilter, subjectFilter]);

  // Filtered Materials (strictly within student's enrolled subjects)
  const enrolledMaterials = useMemo(() => {
    return materials.filter(m => {
      if (!studentRegisteredCodes.includes(m.subjectCode)) return false;
      if (librarySubjectFilter !== 'ALL' && m.subjectCode !== librarySubjectFilter) return false;
      return true;
    });
  }, [materials, studentRegisteredCodes, librarySubjectFilter]);

  // Filtered Student Schedules (classes for student's enrolled subjects)
  const enrolledSchedules = useMemo(() => {
    return schedules.filter(sch => studentRegisteredCodes.includes(sch.subjectCode));
  }, [schedules, studentRegisteredCodes]);

  // Layer 2 & 3: Resolved Daily Schedule and Filtered Personal Agenda
  const resolvedDateSchedule = useMemo(() => {
    return resolveDateSchedule(scheduleDate);
  }, [resolveDateSchedule, scheduleDate]);

  const personalDailySlots = useMemo(() => {
    if (!student) return [];
    return getFilteredStudentAgenda(student, resolvedDateSchedule);
  }, [student, resolvedDateSchedule]);

  const studentChecklistTopics = checklist.filter(t => studentRegisteredCodes.includes(t.subjectCode));
  const masteredCount = studentChecklistTopics.filter(t => t.status === 'MASTERED').length;
  const progressPct = Math.round((masteredCount / (studentChecklistTopics.length || 1)) * 100);

  if (!student) return null;

  return (
    <div style={{ padding: '1.25rem', maxWidth: '850px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '5.5rem' }}>
      {/* Student Banner Header */}
      <div className="gravel-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{student.name}</span>
            <span className="status-pill status-pill-present" style={{ fontSize: '0.65rem' }}>
              {student.nios.admissionStatus}
            </span>
          </div>
          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginTop: 2 }}>
            NIOS Enrol: {student.nios.enrolmentNo} • {student.nios.streamBlock}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: student.attendanceRate >= 75 ? 'var(--status-present)' : 'var(--status-absent)' }}>
              {student.attendanceRate}%
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Attendance Rate (AR)</div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: HOME & ATTENDANCE COMPLIANCE [F-MATH-301..302, F-GRPH-401] */}
      {/* ============================================================== */}
      {(activeSubTab === 'student-home' || !activeSubTab) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Safe Margin / Recovery Class Calculator [F-MATH-302] */}
          <div
            className="gravel-card"
            style={{
              padding: '1.25rem',
              backgroundColor: margin?.meetsThreshold ? 'var(--status-present-bg)' : 'var(--status-absent-bg)',
              borderColor: margin?.meetsThreshold ? 'var(--status-present)' : 'var(--status-absent)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                Attendance Safe-Margin & Recovery Calculator [F-MATH-302]
              </h3>
              <span className="status-pill" style={{ background: '#fff', color: '#000', fontSize: '0.65rem' }}>
                Rule: 75% Min.
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>
              {margin?.meetsThreshold ? (
                <>
                  You are currently above the mandatory threshold! You can safely miss up to{' '}
                  <strong style={{ fontSize: '0.95rem' }}>{margin.safeMargin} class(es)</strong> without dropping below the 75% exam hall-ticket eligibility cutoff.
                </>
              ) : (
                <>
                  Attendance Warning! You are below the 75% cutoff. You must consecutively attend the next{' '}
                  <strong style={{ fontSize: '0.95rem' }}>{margin?.classesNeeded} classes</strong> without any absences to restore full compliance.
                </>
              )}
            </p>

            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem', marginTop: 10 }}>
              <span>Present: {student.totalPresent}</span>
              <span>Late: {student.totalLate} (weighted 0.5)</span>
              <span>Absent: {student.totalAbsent}</span>
              <span>Total Conducted: {student.totalClassesHeld}</span>
            </div>
          </div>

          {/* NIOS Milestone Pathway Cards */}
          <div className="gravel-card" style={{ padding: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Academic Milestones (April-May Exam Window)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem', fontSize: '0.72rem' }}>
              <div className="gravel-card" style={{ padding: '0.6rem', borderLeft: '3px solid var(--status-present)' }}>
                <div style={{ color: 'var(--text-secondary)' }}>1. PCP SESSIONS</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>24 / 30 Attended</div>
              </div>
              <div className="gravel-card" style={{ padding: '0.6rem', borderLeft: '3px solid var(--accent-primary)' }}>
                <div style={{ color: 'var(--text-secondary)' }}>2. TMA UPLOADS</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>4 / 5 Submitted</div>
              </div>
              <div className="gravel-card" style={{ padding: '0.6rem', borderLeft: '3px solid var(--status-present)' }}>
                <div style={{ color: 'var(--text-secondary)' }}>3. EXAM FEE</div>
                <div style={{ fontWeight: 700, marginTop: 2, color: 'var(--status-present)' }}>Paid & Verified</div>
              </div>
              <div className="gravel-card" style={{ padding: '0.6rem', borderLeft: '3px solid var(--status-present)' }}>
                <div style={{ color: 'var(--text-secondary)' }}>4. HALL TICKET</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{student.hallTicketStatus}</div>
              </div>
            </div>
          </div>

          {/* Daily Attendance Calendar Heatmap [F-GRPH-401] */}
          <AttendanceHeatmap title="My Personal Contact Session Attendance (PWA Vault Cache)" />
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: SCHEDULE & VISUAL DIFFS [F-SCH-501, 505, 508, 509]      */}
      {/* ============================================================== */}
      {activeSubTab === 'student-schedule' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Header & Date Selector */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  My Personalized Daily Agenda
                </h3>
                <span className="font-mono" style={{ fontSize: '0.65rem', background: 'var(--accent-subtle)', color: 'var(--accent-primary)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                  [F-SCH-509]
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Filtered strictly to your enrolled subjects ({studentRegisteredCodes.join(', ')}).
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-surface-primary)', padding: '0.35rem 0.65rem', borderRadius: 6, border: '1px solid var(--border-hairline)' }}>
              <Calendar size={14} style={{ color: 'var(--accent-primary)' }} />
              <input
                type="date"
                className="gravel-input font-mono"
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Simulation Presets */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Test Day States:</span>
            <button 
              onClick={() => setScheduleDate('2026-11-14')} 
              className={`gravel-btn ${scheduleDate === '2026-11-14' ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
              style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}
            >
              Nov 14 (Day-Swap: Follow Tue)
            </button>
            <button 
              onClick={() => setScheduleDate('2026-11-15')} 
              className={`gravel-btn ${scheduleDate === '2026-11-15' ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
              style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem', color: scheduleDate === '2026-11-15' ? '#fff' : 'var(--status-absent)' }}
            >
              Nov 15 (Holiday: Centre Closed)
            </button>
            <button 
              onClick={() => setScheduleDate('2026-11-18')} 
              className={`gravel-btn ${scheduleDate === '2026-11-18' ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
              style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem', color: scheduleDate === '2026-11-18' ? '#fff' : 'var(--accent-secondary)' }}
            >
              Nov 18 (TMA Portal Drive)
            </button>
            <button 
              onClick={() => setScheduleDate('2026-11-16')} 
              className={`gravel-btn ${scheduleDate === '2026-11-16' ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
              style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}
            >
              Nov 16 (Normal Monday)
            </button>
          </div>

          {/* Layer 2 Calendar Override Notice Banner */}
          {resolvedDateSchedule.isHoliday ? (
            <div className="gravel-card" style={{ padding: '2rem', textAlign: 'center', borderLeft: '4px solid var(--status-absent)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>🛑</div>
              <h4 style={{ fontWeight: 800, color: 'var(--status-absent)', fontSize: '1rem' }}>
                CENTRE CLOSED — {resolvedDateSchedule.overrideInfo?.title}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                All regular subject blocks are suppressed for today. Automated class alerts are paused. Use your PWA offline library to complete pending TMAs.
              </p>
            </div>
          ) : (
            <>
              {resolvedDateSchedule.state === 'DAY_SWAP' && (
                <div style={{ 
                  padding: '0.65rem 0.85rem', 
                  background: 'var(--status-late-bg)', 
                  borderLeft: '4px solid var(--status-late)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.75rem'
                }}>
                  <Repeat size={15} style={{ color: 'var(--status-late)' }} />
                  <div>
                    <strong>DAY-SWAP NOTICE:</strong> Today follows the <strong>{resolvedDateSchedule.overrideInfo?.targetDayOfWeek} Timetable</strong> ({resolvedDateSchedule.overrideInfo?.title}).
                  </div>
                </div>
              )}

              {resolvedDateSchedule.state === 'EVENT' && (
                <div style={{ 
                  padding: '0.65rem 0.85rem', 
                  background: 'var(--accent-subtle)', 
                  borderLeft: '4px solid var(--accent-secondary)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.75rem'
                }}>
                  <Sparkles size={15} style={{ color: 'var(--accent-secondary)' }} />
                  <div>
                    <strong>SPECIAL MILESTONE EVENT:</strong> {resolvedDateSchedule.overrideInfo?.title}. {resolvedDateSchedule.overrideInfo?.eventDetails?.description}
                  </div>
                </div>
              )}

              {/* Personal Filtered Agenda Slots with Gap-Time Break Indicators */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {personalDailySlots.length === 0 ? (
                  <div className="gravel-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No lectures scheduled today for your registered subjects ({studentRegisteredCodes.join(', ')}). You are free to study from home.
                  </div>
                ) : (
                  personalDailySlots.map((slot: ScheduleEvent, index: number) => {
                    const isRescheduled = slot.status === 'RESCHEDULED';
                    const isCancelled = slot.status === 'CANCELLED';

                    // Calculate gap before next personal slot if any
                    const nextSlot = personalDailySlots[index + 1];
                    let gapBreakText: string | null = null;
                    if (nextSlot) {
                      const curEnd = timeToMinutes(slot.endTime);
                      const nextStart = timeToMinutes(nextSlot.startTime);
                      if (nextStart > curEnd) {
                        const gapMins = nextStart - curEnd;
                        const hours = (gapMins / 60).toFixed(1);
                        gapBreakText = `${hours} Hours Break (${slot.endTime} – ${nextSlot.startTime}): Self-Study Library cubicles & TMA work desks available in Room 101.`;
                      }
                    }

                    return (
                      <React.Fragment key={slot.id}>
                        <div
                          className={`gravel-card ${isRescheduled ? 'diff-badge-rescheduled' : ''}`}
                          style={{
                            padding: '1rem',
                            opacity: isCancelled ? 0.6 : 1,
                            borderLeft: slot.isSpecialEvent ? '4px solid var(--accent-secondary)' : '4px solid var(--accent-primary)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.8rem' }}>
                                [{slot.subjectCode}]
                              </span>
                              <span style={{ fontWeight: 700, fontSize: '0.9rem', textDecoration: isCancelled ? 'line-through' : 'none' }}>
                                {slot.title}
                              </span>
                            </div>
                            <span className="status-pill status-pill-present" style={{ fontSize: '0.65rem' }}>
                              {slot.sessionType}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4, flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Calendar size={13} /> {slot.date}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="font-mono">
                              <Clock size={13} /> {slot.startTime} - {slot.endTime}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <MapPin size={13} /> {slot.room}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <User size={13} /> {slot.teacherName}
                            </span>
                          </div>

                          {/* Visual Diff Highlight [F-SCH-505] */}
                          {isRescheduled && slot.previousTime && (
                            <div style={{ marginTop: 8, fontSize: '0.72rem', color: 'var(--accent-primary)' }}>
                              <span className="diff-strikethrough" style={{ color: 'var(--text-muted)', marginRight: 6 }}>
                                Was: {slot.previousTime} ({slot.previousRoom})
                              </span>
                              &rarr; <strong>New Slot: {slot.startTime}-{slot.endTime} ({slot.room})</strong>
                            </div>
                          )}

                          {isCancelled && (
                            <div style={{ marginTop: 6, fontSize: '0.72rem', color: 'var(--status-absent)' }}>
                              Cancellation Notice: {slot.cancellationReason || 'Class dismissed by administration.'}
                            </div>
                          )}
                        </div>

                        {/* Gap-Time Break Pill between Slots */}
                        {gapBreakText && (
                          <div style={{ 
                            padding: '0.5rem 0.85rem', 
                            background: 'var(--bg-surface-muted)', 
                            borderRadius: 6, 
                            borderLeft: '3px solid var(--status-late)',
                            fontSize: '0.72rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            color: 'var(--text-secondary)'
                          }}>
                            <Coffee size={14} style={{ color: 'var(--status-late)' }} />
                            <span><strong>{gapBreakText}</strong></span>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: SYLLABUS CHECKLIST & TMA TRACKER [F-MAT-705, F-MAT-706] */}
      {/* ============================================================== */}
      {activeSubTab === 'student-checklist' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Header & Progress Bar */}
          <div className="gravel-card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                Interactive Syllabus & TMA Tracker [F-MAT-705]
              </h3>
              <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                {progressPct}% Mastered
              </span>
            </div>

            <div
              style={{
                height: 8,
                width: '100%',
                borderRadius: 4,
                backgroundColor: 'var(--bg-surface-muted)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progressPct}%`,
                  backgroundColor: 'var(--status-present)',
                  borderRadius: 4,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Distinguishes NIOS 40% TMA chapters vs. 60% Public Exam chapters
            </div>
          </div>

          {/* Filter & Sort Bar [F-MAT-706] */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => setBifurcationFilter('ALL')}
              className={`gravel-btn ${bifurcationFilter === 'ALL' ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
            >
              All Topics ({checklist.length})
            </button>
            <button
              onClick={() => setBifurcationFilter('Public-Exam-60%')}
              className={`gravel-btn ${bifurcationFilter === 'Public-Exam-60%' ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
            >
              #Public-Exam-60%
            </button>
            <button
              onClick={() => setBifurcationFilter('TMA-40%')}
              className={`gravel-btn ${bifurcationFilter === 'TMA-40%' ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
            >
              #TMA-40%
            </button>

            <select
              className="gravel-input"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem', marginLeft: 'auto' }}
            >
              <option value="ALL">All Enrolled Subjects</option>
              {student.subjects.map((sub) => (
                <option key={sub.code} value={sub.code}>
                  {sub.code} - {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topics List with 3-State Toggle: To Study, Needs Revision, Mastered [F-MAT-705] */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredTopics.map((topic: SyllabusChecklistTopic) => {
              const isMastered = topic.status === 'MASTERED';
              const isRevision = topic.status === 'NEEDS_REVISION';
              const isToStudy = topic.status === 'TO_STUDY';

              return (
                <div
                  key={topic.id}
                  className="gravel-card"
                  style={{
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 2 }}>
                        <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700 }}>
                          [{topic.subjectCode}] Ch {topic.chapterNo}:
                        </span>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{topic.title}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        {topic.bifurcation === 'Public-Exam-60%' ? (
                          <span className="tag-public-exam">#Public-Exam-60%</span>
                        ) : (
                          <span className="tag-tma-only">#TMA-40%</span>
                        )}
                        {topic.isHighWeightage && (
                          <span style={{ fontSize: '0.65rem', background: 'var(--accent-subtle)', color: 'var(--accent-primary)', padding: '1px 5px', borderRadius: 3, fontWeight: 600 }}>
                            #High-Weightage
                          </span>
                        )}
                        {topic.isPracticalPcp && (
                          <span style={{ fontSize: '0.65rem', background: 'var(--status-present-bg)', color: 'var(--status-present)', padding: '1px 5px', borderRadius: 3, fontWeight: 600 }}>
                            #Practical-PCP
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 3-State Progress Toggle [F-MAT-705] */}
                    <div style={{ display: 'flex', gap: 3, background: 'var(--bg-surface-muted)', padding: 2, borderRadius: 4 }}>
                      <button
                        title="Mark To Study"
                        onClick={() => updateTopicStatus(topic.id, 'TO_STUDY')}
                        style={{
                          background: isToStudy ? 'var(--text-secondary)' : 'transparent',
                          color: isToStudy ? '#fff' : 'var(--text-muted)',
                          border: 'none',
                          padding: '3px 6px',
                          borderRadius: 3,
                          fontSize: '0.68rem',
                          cursor: 'pointer',
                        }}
                      >
                        [ ] To Study
                      </button>
                      <button
                        title="Mark Needs Revision"
                        onClick={() => updateTopicStatus(topic.id, 'NEEDS_REVISION')}
                        style={{
                          background: isRevision ? 'var(--status-late)' : 'transparent',
                          color: isRevision ? '#fff' : 'var(--text-muted)',
                          border: 'none',
                          padding: '3px 6px',
                          borderRadius: 3,
                          fontSize: '0.68rem',
                          cursor: 'pointer',
                        }}
                      >
                        [~] Revision
                      </button>
                      <button
                        title="Mark Mastered"
                        onClick={() => updateTopicStatus(topic.id, 'MASTERED')}
                        style={{
                          background: isMastered ? 'var(--status-present)' : 'transparent',
                          color: isMastered ? '#fff' : 'var(--text-muted)',
                          border: 'none',
                          padding: '3px 6px',
                          borderRadius: 3,
                          fontSize: '0.68rem',
                          cursor: 'pointer',
                        }}
                      >
                        [✓] Mastered
                      </button>
                    </div>
                  </div>

                  {/* Linked Notes Chip */}
                  {topic.linkedNotesTitle && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-hairline)', paddingTop: 4 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <BookOpen size={12} /> Linked Notes: <em>{topic.linkedNotesTitle}</em>
                      </span>
                      <span style={{ color: 'var(--accent-primary)', cursor: 'pointer' }}>
                        View Notes &rarr;
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: SUBJECT-SCOPED, TAG-DRIVEN RESOURCE HUB [F-MAT-701..704] */}
      {/* ============================================================== */}
      {activeSubTab === 'student-library' && (() => {
        const isObe = student.nios.courseLevel?.includes('OBE') || false;

        // Current Subject Materials
        const activeSubjCode = activeMaterialSubject || student.subjects[0]?.code || '311';
        const currentSubj = student.subjects.find(s => s.code === activeSubjCode) || student.subjects[0];

        // Filter and Search within active subject
        let subjMaterials = materials.filter(m => m.subjectCode === activeSubjCode);

        // Search query filter
        if (materialSearchQuery.trim()) {
          const q = materialSearchQuery.toLowerCase();
          subjMaterials = subjMaterials.filter(m => 
            m.title.toLowerCase().includes(q) ||
            (m.chapterTitle && m.chapterTitle.toLowerCase().includes(q)) ||
            (m.instructions && m.instructions.toLowerCase().includes(q)) ||
            (m.previewContent && m.previewContent.toLowerCase().includes(q))
          );
        }

        // Category chip filter
        if (materialCategoryFilter !== 'ALL') {
          if (materialCategoryFilter === 'IMAGES_ONLY') {
            subjMaterials = subjMaterials.filter(m => m.fileContentType === 'IMAGE');
          } else {
            subjMaterials = subjMaterials.filter(m => m.categoryTag === materialCategoryFilter);
          }
        }

        // Smart sort
        if (materialSmartSort === 'NEWEST') {
          subjMaterials.sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));
        } else if (materialSmartSort === 'CHAPTER_ORDER') {
          subjMaterials.sort((a, b) => (a.chapterNo || 1) - (b.chapterNo || 1));
        } else if (materialSmartSort === 'MISSED_FIRST') {
          subjMaterials.sort((a, b) => (b.linkedLectureDate ? 1 : 0) - (a.linkedLectureDate ? 1 : 0));
        }

        // Group by Chapter / Topic
        const groupedByChapter: Record<string, StudyMaterial[]> = {};
        subjMaterials.forEach(m => {
          const key = m.chapterTitle || 'General Chapter Notes & Reference Booklets';
          if (!groupedByChapter[key]) groupedByChapter[key] = [];
          groupedByChapter[key].push(m);
        });

        const toggleChapter = (chTitle: string) => {
          setExpandedChapters(prev => ({
            ...prev,
            [chTitle]: prev[chTitle] === false ? true : false
          }));
        };

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Hub Header */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  My Study Materials &amp; Resource Hub
                </h3>
                <span className="font-mono" style={{ fontSize: '0.65rem', background: 'var(--accent-subtle)', color: 'var(--accent-primary)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                  [F-MAT-704]
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Zero-Clutter View: Displays only your registered subjects ({studentRegisteredCodes.join(', ')}). No unrelated courses or chaotic chat threads.
              </p>
            </div>

            {/* A. PRE-FILTERED SUBJECT TABS (TOP BAR) */}
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Enrolled Subjects ({student.subjects.length}):
              </div>

              {isObe ? (
                // OBE Visual Cards for Young Learners (8-12 Yrs)
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem' }}>
                  {student.subjects.map(s => {
                    const isSel = activeSubjCode === s.code;
                    return (
                      <div
                        key={s.code}
                        onClick={() => setActiveMaterialSubject(s.code)}
                        className="gravel-card"
                        style={{
                          padding: '0.85rem',
                          cursor: 'pointer',
                          textAlign: 'center',
                          border: isSel ? '2px solid var(--accent-primary)' : '1px solid var(--border-hairline)',
                          background: isSel ? 'var(--accent-subtle)' : 'var(--bg-surface-primary)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>
                          {s.name.includes('Math') ? '📐' : s.name.includes('Science') ? '🔬' : s.name.includes('English') ? '📖' : '🎨'}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: isSel ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                          {s.name}
                        </div>
                        <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>[{s.code}]</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Standard Subject Navigation Tabs
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: 4 }}>
                  {student.subjects.map(s => {
                    const isSel = activeSubjCode === s.code;
                    const count = materials.filter(m => m.subjectCode === s.code).length;
                    return (
                      <button
                        key={s.code}
                        onClick={() => setActiveMaterialSubject(s.code)}
                        className={`gravel-btn ${isSel ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
                        style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
                      >
                        <strong className="font-mono">[{s.code}]</strong>
                        <span>{s.name}</span>
                        <span style={{ 
                          fontSize: '0.65rem', 
                          background: isSel ? 'rgba(255,255,255,0.2)' : 'var(--accent-subtle)', 
                          color: isSel ? '#fff' : 'var(--accent-primary)',
                          padding: '1px 5px', 
                          borderRadius: 3 
                        }}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* B. FAST SEARCH, FILTER & SORT CONTROLS */}
            <div className="gravel-card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              
              {/* Instant Search Bar */}
              <div style={{ position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="gravel-input"
                  style={{ width: '100%', paddingLeft: 32, fontSize: '0.78rem' }}
                  placeholder={`Search ${currentSubj?.name || ''} notes, chapters, TMA solutions, or formulas (e.g. "Quadratic", "TMA")...`}
                  value={materialSearchQuery}
                  onChange={(e) => setMaterialSearchQuery(e.target.value)}
                />
                {materialSearchQuery && (
                  <button
                    onClick={() => setMaterialSearchQuery('')}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* 1-Tap Filter Chips & Smart Sort */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginRight: 2 }}>Filter:</span>
                  {[
                    { id: 'ALL', label: 'All' },
                    { id: 'Class Notes', label: 'Notes' },
                    { id: 'TMA Help', label: 'TMA' },
                    { id: 'Practice / PYQ', label: 'Practice' },
                    { id: 'Quick Revision', label: 'Revision' },
                    { id: 'Lab / Practical', label: 'Practical' },
                    { id: 'IMAGES_ONLY', label: '📸 Board Photos' }
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => setMaterialCategoryFilter(chip.id as any)}
                      className={`gravel-btn ${materialCategoryFilter === chip.id ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
                      style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Smart Sort Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Sort:</span>
                  <select
                    className="gravel-input font-mono"
                    value={materialSmartSort}
                    onChange={(e) => setMaterialSmartSort(e.target.value as any)}
                    style={{ fontSize: '0.72rem', padding: '0.2rem 0.45rem' }}
                  >
                    <option value="NEWEST">Newest First (Today's Notes)</option>
                    <option value="CHAPTER_ORDER">By Chapter Order (Ch 1 → Ch 15)</option>
                    <option value="MISSED_FIRST">Missed Classes First ⚡</option>
                  </select>
                </div>
              </div>
            </div>

            {/* C. EXPANDABLE CHAPTER CARDS (ZERO FOLDER MAINTENANCE) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {Object.keys(groupedByChapter).length === 0 ? (
                <div className="gravel-card" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <BookOpen size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 8px', display: 'block' }} />
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>No Materials Match Your Filters</div>
                  <div style={{ fontSize: '0.75rem', marginTop: 4 }}>
                    Try clearing the search query or selecting "All" under filter chips.
                  </div>
                </div>
              ) : (
                Object.entries(groupedByChapter).map(([chapterTitle, items]) => {
                  const isCollapsed = expandedChapters[chapterTitle] === false;

                  return (
                    <div key={chapterTitle} className="gravel-card" style={{ overflow: 'hidden' }}>
                      {/* Chapter Header Card */}
                      <div
                        onClick={() => toggleChapter(chapterTitle)}
                        style={{
                          padding: '0.75rem 1rem',
                          background: 'var(--bg-surface-muted)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          userSelect: 'none',
                          borderBottom: isCollapsed ? 'none' : '1px solid var(--border-hairline)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <FolderOpen size={16} style={{ color: 'var(--accent-primary)' }} />
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{chapterTitle}</span>
                          <span style={{ fontSize: '0.65rem', background: 'var(--accent-subtle)', color: 'var(--accent-primary)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                            {items.length} {items.length === 1 ? 'file' : 'files'}
                          </span>
                        </div>

                        {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </div>

                      {/* Chapter Items List */}
                      {!isCollapsed && (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {items.map((mat, idx) => {
                            const isMissedLecture = Boolean(mat.linkedLectureDate);

                            return (
                              <div
                                key={mat.id}
                                style={{
                                  padding: '0.85rem 1rem',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  flexWrap: 'wrap',
                                  gap: '0.75rem',
                                  borderBottom: idx < items.length - 1 ? '1px solid var(--border-hairline)' : 'none',
                                  backgroundColor: isMissedLecture ? 'rgba(234, 179, 8, 0.05)' : 'transparent'
                                }}
                              >
                                <div style={{ flex: 1, minWidth: 240 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                                      {mat.title}
                                    </span>
                                    
                                    <span className="status-pill status-pill-present" style={{ fontSize: '0.62rem' }}>
                                      {mat.categoryTag || 'Class Notes'}
                                    </span>

                                    {/* Catch Up from Missed Class Badge */}
                                    {isMissedLecture && (
                                      <span className="status-pill status-pill-late" style={{ fontSize: '0.62rem' }}>
                                        Catch Up from {mat.linkedLectureDate}
                                      </span>
                                    )}
                                  </div>

                                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    <span>Type: <strong>{mat.fileContentType}</strong></span>
                                    <span>Size: <strong>{mat.compressedSize || mat.fileSize}</strong></span>
                                    <span>Faculty: {mat.teacherName || 'Subject Teacher'}</span>
                                  </div>

                                  {mat.previewContent && (
                                    <div style={{ marginTop: 4, fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                      "{mat.previewContent.slice(0, 90)}..."
                                    </div>
                                  )}
                                </div>

                                {/* Action Buttons: In-App View & 1-Tap Offline Save */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <button
                                    onClick={() => toggleOfflineMaterial(mat.id)}
                                    className={`gravel-btn ${mat.savedOffline ? 'gravel-btn-subtle' : 'gravel-btn-outline'}`}
                                    style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
                                    title="Store in PWA Vault for offline reading"
                                  >
                                    <Download size={12} />
                                    {mat.savedOffline ? 'Saved Offline' : 'Save Offline'}
                                  </button>

                                  <button
                                    onClick={() => {
                                      setPreviewMaterial(mat);
                                      setZoomLevel(1);
                                    }}
                                    className="gravel-btn gravel-btn-primary"
                                    style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}
                                  >
                                    <Eye size={12} /> View In-App
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* IN-APP INSTANT VIEWER MODAL (NO FORCED DOWNLOADS) */}
            {previewMaterial && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.82)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem'
                }}
                onClick={() => setPreviewMaterial(null)}
              >
                <div
                  className="gravel-card"
                  style={{
                    width: '100%',
                    maxWidth: '740px',
                    maxHeight: '88vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid var(--border-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-surface-primary)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700 }}>
                          [{previewMaterial.subjectCode}] {previewMaterial.categoryTag}
                        </span>
                        {previewMaterial.linkedLectureDate && (
                          <span className="status-pill status-pill-late" style={{ fontSize: '0.62rem' }}>
                            Missed Class Material
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginTop: 2 }}>{previewMaterial.title}</h4>
                    </div>

                    {/* Zoom & Close Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
                        className="gravel-btn gravel-btn-outline"
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }}
                        title="Zoom In"
                      >
                        <ZoomIn size={13} />
                      </button>
                      <button
                        onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
                        className="gravel-btn gravel-btn-outline"
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }}
                        title="Zoom Out"
                      >
                        <ZoomOut size={13} />
                      </button>
                      <button
                        onClick={() => setPreviewMaterial(null)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem', marginLeft: 6 }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Viewer Canvas */}
                  <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-canvas)' }}>
                    <div 
                      style={{ 
                        transform: `scale(${zoomLevel})`, 
                        transformOrigin: 'top center', 
                        transition: 'transform 0.15s ease',
                        padding: '1.5rem',
                        background: 'var(--bg-surface-primary)',
                        borderRadius: 8,
                        border: '1px solid var(--border-hairline)',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, borderBottom: '1px solid var(--border-hairline)', paddingBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {previewMaterial.fileContentType === 'IMAGE' ? (
                            <ImageIcon size={18} style={{ color: 'var(--accent-primary)' }} />
                          ) : (
                            <FileText size={18} style={{ color: 'var(--accent-primary)' }} />
                          )}
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                            {previewMaterial.chapterTitle || previewMaterial.title}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                          Size: {previewMaterial.compressedSize || previewMaterial.fileSize}
                        </span>
                      </div>

                      {/* Content Preview Body */}
                      <div style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                        <div style={{ background: 'var(--bg-surface-muted)', padding: '1rem', borderRadius: 6, marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                          {previewMaterial.previewContent}
                        </div>

                        {previewMaterial.instructions && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.5rem 0' }}>
                            <strong>Faculty Instructions:</strong> {previewMaterial.instructions}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-primary)' }}>
                    <button
                      onClick={() => toggleOfflineMaterial(previewMaterial.id)}
                      className={`gravel-btn ${previewMaterial.savedOffline ? 'gravel-btn-subtle' : 'gravel-btn-outline'}`}
                      style={{ fontSize: '0.75rem' }}
                    >
                      <Download size={13} /> {previewMaterial.savedOffline ? 'Saved in Device Vault' : 'Save for Offline'}
                    </button>

                    <button
                      onClick={() => setPreviewMaterial(null)}
                      className="gravel-btn gravel-btn-primary"
                      style={{ fontSize: '0.75rem', padding: '0.4rem 1rem' }}
                    >
                      Close Viewer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* ============================================================== */}
      {/* TAB 5: ACADEMIC PROFILE & SCORE RADAR [F-MATH-303, F-GRPH-404] */}
      {/* ============================================================== */}
      {activeSubTab === 'student-profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              Academic Score Card & Subject Radar
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Theory exam marks combined with continuous TMA boost (20%) and practical scores.
            </p>
          </div>

          {/* Component Score Breakdown */}
          <ComponentScoreBar subjects={student.subjects} />

          {/* Radar Chart */}
          <ScoreRadarChart
            studentName={student.name}
            axes={student.subjects.map(s => ({
              label: `${s.code}-${s.name.slice(0, 4)}`,
              studentScore: s.theoryMarks || 50,
              cohortMean: 62
            }))}
          />

          {/* Enrolment Metadata */}
          <div className="gravel-card" style={{ padding: '1rem', fontSize: '0.78rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 8 }}>
              NIOS Institutional Registration &amp; Admission Dossier
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
              <div>Enrolment No: <strong className="font-mono">{student.nios.enrolmentNo}</strong></div>
              <div>Reference No: <span className="font-mono">{student.nios.refNo}</span></div>
              <div>Regional Centre: <strong>{student.nios.regionalCentre}</strong></div>
              <div>AI Study Centre: <strong className="font-mono">#{student.nios.aiCode}</strong></div>
              <div>Medium: <strong>{student.nios.medium}</strong></div>
              <div>Session: <strong>{student.nios.sessionYear}</strong></div>
              <div>Course Level: <strong>{student.nios.courseLevel}</strong></div>
              <div>Stream: <strong>{student.nios.streamBlock}</strong></div>
              <div>Category: <strong>{student.compliance.socialCategory}</strong> {student.compliance.isDivyangjan && '(PwD Concession)'}</div>
              <div>Father: <strong>{student.guardian.fatherName}</strong></div>
              <div>Mother: <strong>{student.guardian.motherName}</strong></div>
              <div>Parent Phone: <span className="font-mono">{student.guardian.phone}</span></div>
            </div>

            {/* Coaching Preferences & Setup if available */}
            {student.coachingPreferences && (
              <div style={{ marginTop: '0.85rem', borderTop: '1px solid var(--border-hairline)', paddingTop: '0.65rem' }}>
                <h5 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 4 }}>
                  Coaching Schedule &amp; Home Study Setup
                </h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.72rem' }}>
                  <div>Preferred Hours: <strong>{student.coachingPreferences.preferredTimings}</strong></div>
                  <div>Books Status: <strong>{student.coachingPreferences.academicProgress.booksReceived}</strong></div>
                  <div>TMA Progress: <strong>{student.coachingPreferences.academicProgress.tmaStarted}</strong></div>
                  <div>Practical Files: <strong>{student.coachingPreferences.academicProgress.practicalFileCompleted}</strong></div>
                  <div>Schedule Managed By: <strong>{student.coachingPreferences.homeStudySetup.managedBy}</strong></div>
                  <div>Primary Device: <strong>{student.coachingPreferences.homeStudySetup.primaryDevice}</strong></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

