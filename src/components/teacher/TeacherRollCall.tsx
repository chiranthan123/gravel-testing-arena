// GRAVEL — Teacher 15-Second Roll-Call Accelerator [F-ATT-601..605]
import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store';
import { 
  CheckSquare, 
  RotateCcw, 
  Send, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  User, 
  Award, 
  Sparkles, 
  FileCheck,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { findCatalogSubject } from '../../data/niosSubjectCatalog';

export const TeacherRollCall: React.FC = () => {
  const { students, schedules, submitAttendance } = useAppStore();

  // Active session or Subject filter [F-ATT-603]
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>(schedules[0]?.id || 'sch-101');
  const activeClass = schedules.find(s => s.id === selectedScheduleId) || schedules[0] || {
    id: 'sch-101',
    title: '311-Mathematics (PCP-04)',
    subjectCode: '311',
    subjectName: 'Mathematics',
    batch: 'XII-Stream1-B1',
    date: '2026-11-08',
    startTime: '10:00',
    endTime: '11:30',
    room: 'Room 204 (Was Room 102 - RESCHEDULED)',
    sessionType: 'NIOS Theory PCP' as const,
    status: 'RESCHEDULED' as const,
    previousTime: '09:00 - 10:30',
    previousRoom: 'Room 102'
  };

  const [activeSubjectCode, setActiveSubjectCode] = useState<string>(activeClass.subjectCode || '311');

  // Downstream Wiring 1: Filter students strictly enrolled in that subject code!
  const enrolledStudents = useMemo(() => {
    return students.filter(s => s.subjects.some(sub => sub.code === activeSubjectCode));
  }, [students, activeSubjectCode]);

  // Local state for each student's attendance in this session
  const [attendanceState, setAttendanceState] = useState<Record<string, {
    status: 'PRESENT' | 'ABSENT' | 'LATE';
    lateMinutes?: 5 | 15 | 30;
    excusedNote?: string;
    pcpMarks?: number;
  }>>({});

  const [submitted, setSubmitted] = useState(false);

  // Initialize or get student record
  const getStudentAtt = (studentId: string) => {
    return attendanceState[studentId] || { status: 'PRESENT' };
  };

  // 15-Second Accelerator: Mark All Present [F-ATT-603]
  const handleMarkAllPresent = () => {
    const updated: any = { ...attendanceState };
    enrolledStudents.forEach(s => {
      updated[s.id] = { status: 'PRESENT' };
    });
    setAttendanceState(updated);
  };

  const handleReset = () => {
    const updated: any = { ...attendanceState };
    enrolledStudents.forEach(s => {
      updated[s.id] = { status: 'ABSENT' };
    });
    setAttendanceState(updated);
  };

  const handleSetStatus = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setAttendanceState(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
        lateMinutes: status === 'LATE' ? (prev[studentId]?.lateMinutes || 5) : undefined
      }
    }));
  };

  const handleSetLateMinutes = (studentId: string, mins: 5 | 15 | 30) => {
    setAttendanceState(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        lateMinutes: mins
      }
    }));
  };

  const handleSetPcpMarks = (studentId: string, marks: number) => {
    setAttendanceState(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        pcpMarks: marks
      }
    }));
  };

  const handleSubmit = () => {
    const records = enrolledStudents.map(s => {
      const att = getStudentAtt(s.id);
      return {
        studentId: s.id,
        studentName: s.name,
        enrolmentNo: s.nios.enrolmentNo,
        status: att.status,
        lateMinutes: att.lateMinutes,
        excusedNote: att.excusedNote,
        pcpFormativeMarks: att.pcpMarks
      };
    });

    submitAttendance({
      scheduleId: activeClass.id,
      date: activeClass.date,
      subjectCode: activeSubjectCode,
      batch: activeClass.batch,
      locked: true,
      records
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Counts for enrolled students
  const counts = enrolledStudents.reduce(
    (acc, s) => {
      const st = getStudentAtt(s.id).status;
      if (st === 'PRESENT') acc.present++;
      else if (st === 'LATE') acc.late++;
      else if (st === 'ABSENT') acc.absent++;
      return acc;
    },
    { present: 0, late: 0, absent: 0 }
  );

  const subjectMeta = findCatalogSubject(activeSubjectCode);

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '840px', margin: '0 auto', width: '100%', paddingBottom: '5.5rem' }}>
      
      {/* Subject Filter Bar [Downstream Wiring 1] */}
      <div
        className="gravel-card"
        style={{
          padding: '0.75rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          backgroundColor: 'var(--bg-surface-primary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} style={{ color: 'var(--accent-primary)' }} />
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>
              Roll Call Subject Filter &amp; Roster Loader [F-ATT-601] [F-SCH-509]:
            </span>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
              Subject-Level Attendance (Recorded per lecture block, not once a day). Loads strictly students enrolled in [{activeSubjectCode}].
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <select
            className="gravel-input font-mono"
            value={activeSubjectCode}
            onChange={(e) => {
              const code = e.target.value;
              setActiveSubjectCode(code);
              const matchingSch = schedules.find(s => s.subjectCode === code);
              if (matchingSch) setSelectedScheduleId(matchingSch.id);
            }}
            style={{ fontSize: '0.78rem', fontWeight: 700 }}
          >
            <option value="311">[311] Mathematics (Sr. Secondary)</option>
            <option value="312">[312] Physics (Sr. Secondary - Practical)</option>
            <option value="313">[313] Chemistry (Sr. Secondary - Practical)</option>
            <option value="302">[302] English (Sr. Secondary)</option>
            <option value="314">[314] Biology (Sr. Secondary - Practical)</option>
            <option value="336">[336] Data Entry Operations (Practical)</option>
            <option value="201">[201] Hindi (Secondary)</option>
            <option value="211">[211] Mathematics (Secondary)</option>
            <option value="212">[212] Science &amp; Technology (Secondary)</option>
          </select>
        </div>
      </div>

      {/* Session Hero Banner */}
      <div className="gravel-card" style={{ padding: '1.25rem', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="status-pill status-pill-present" style={{ fontSize: '0.65rem' }}>
                LIVE CLASS
              </span>
              <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.85rem' }}>
                [{activeSubjectCode}] {subjectMeta?.name || activeClass.subjectName}
              </span>
              {subjectMeta?.hasPractical && (
                <span style={{ fontSize: '0.65rem', background: 'var(--status-present-bg)', color: 'var(--status-present)', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>
                  PRACTICAL PCP
                </span>
              )}
            </div>

            {/* Visual Diff Strikethrough Tag [F-SCH-505] */}
            {activeClass.status === 'RESCHEDULED' && (
              <div style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', marginTop: 4 }}>
                <span className="diff-strikethrough" style={{ color: 'var(--text-muted)', marginRight: 6 }}>
                  Was {activeClass.previousRoom || 'Room 102'}
                </span>
                &rarr; <strong>{activeClass.room}</strong> (RESCHEDULED)
              </div>
            )}

            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              Batch: {activeClass.batch} • {activeClass.date} • {activeClass.startTime} - {activeClass.endTime} • {activeClass.room}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', marginTop: 3, fontWeight: 600 }}>
              Active Enrolled Cohort: {enrolledStudents.length} of {students.length} Learners in Centre
            </div>
          </div>

          <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
            {activeClass.startTime}
          </div>
        </div>

        {/* 15-Second Accelerator Toolbar [F-ATT-603] */}
        <div
          style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-hairline)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleMarkAllPresent}
              className="gravel-btn gravel-btn-primary"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
            >
              <CheckSquare size={14} /> Mark All Present ({enrolledStudents.length})
            </button>
            <button
              onClick={handleReset}
              className="gravel-btn gravel-btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="font-mono" style={{ fontSize: '0.78rem', display: 'flex', gap: '0.75rem' }}>
            <span style={{ color: 'var(--status-present)', fontWeight: 600 }}>{counts.present} Present</span>
            <span style={{ color: 'var(--status-late)', fontWeight: 600 }}>{counts.late} Late</span>
            <span style={{ color: 'var(--status-absent)', fontWeight: 600 }}>{counts.absent} Absent</span>
          </div>
        </div>
      </div>

      {submitted && (
        <div
          style={{
            padding: '1rem',
            borderRadius: 'var(--card-radius)',
            backgroundColor: 'var(--status-present-bg)',
            color: 'var(--status-present)',
            fontWeight: 700,
            fontSize: '0.85rem',
            textAlign: 'center',
          }}
        >
          Attendance Roster for [{activeSubjectCode}] Successfully Committed &amp; Synced!
        </div>
      )}

      {/* Student Roll-Call List [F-ATT-601, F-ATT-602] strictly for enrolled students */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {enrolledStudents.length === 0 ? (
          <div className="gravel-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No students are currently enrolled in subject code [{activeSubjectCode}]. Use the subject filter above to select an active subject.
          </div>
        ) : (
          enrolledStudents.map((student, idx) => {
            const currentRec = getStudentAtt(student.id);
            const isLate = currentRec.status === 'LATE';
            const isAbsent = currentRec.status === 'ABSENT';
            const isPresent = currentRec.status === 'PRESENT';
            const arLow = student.attendanceRate < 75;

            return (
              <div
                key={student.id}
                className="gravel-card"
                style={{
                  padding: '0.85rem 1rem',
                  borderLeft: isPresent ? '4px solid var(--status-present)' : isLate ? '4px solid var(--status-late)' : '4px solid var(--status-absent)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{student.name}</span>
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      (#{student.nios.enrolmentNo.slice(-6)})
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: arLow ? 'var(--status-absent)' : 'var(--text-secondary)' }}>
                      AR: {student.attendanceRate}% {arLow && '[!]'}
                    </span>
                  </div>
                </div>

                {/* 3-State Segmented Radio Control [F-ATT-602] */}
                <div
                  style={{
                    display: 'flex',
                    borderRadius: 'var(--card-radius)',
                    backgroundColor: 'var(--bg-surface-muted)',
                    padding: 3,
                    gap: 3,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleSetStatus(student.id, 'PRESENT')}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      border: 'none',
                      borderRadius: 'calc(var(--card-radius) - 2px)',
                      fontSize: '0.75rem',
                      fontWeight: isPresent ? 700 : 500,
                      cursor: 'pointer',
                      backgroundColor: isPresent ? 'var(--status-present)' : 'transparent',
                      color: isPresent ? '#FFFFFF' : 'var(--text-secondary)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isPresent ? '● PRESENT' : '○ Present'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetStatus(student.id, 'LATE')}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      border: 'none',
                      borderRadius: 'calc(var(--card-radius) - 2px)',
                      fontSize: '0.75rem',
                      fontWeight: isLate ? 700 : 500,
                      cursor: 'pointer',
                      backgroundColor: isLate ? 'var(--status-late)' : 'transparent',
                      color: isLate ? '#FFFFFF' : 'var(--text-secondary)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isLate ? '● LATE' : '○ Late'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetStatus(student.id, 'ABSENT')}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      border: 'none',
                      borderRadius: 'calc(var(--card-radius) - 2px)',
                      fontSize: '0.75rem',
                      fontWeight: isAbsent ? 700 : 500,
                      cursor: 'pointer',
                      backgroundColor: isAbsent ? 'var(--status-absent)' : 'transparent',
                      color: isAbsent ? '#FFFFFF' : 'var(--text-secondary)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isAbsent ? '● ABSENT' : '○ Absent'}
                  </button>
                </div>

                {/* Late-Arrival Time Chips & Excused Reason Popover [F-ATT-604] */}
                {isLate && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: '0.5rem 0.75rem',
                      borderRadius: 4,
                      backgroundColor: 'var(--bg-surface-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Late By:</span>
                    {[5, 15, 30].map(mins => (
                      <button
                        key={mins}
                        onClick={() => handleSetLateMinutes(student.id, mins as any)}
                        className="gravel-btn"
                        style={{
                          padding: '0.15rem 0.5rem',
                          fontSize: '0.7rem',
                          backgroundColor: currentRec.lateMinutes === mins ? 'var(--status-late)' : 'transparent',
                          color: currentRec.lateMinutes === mins ? '#fff' : 'var(--text-primary)',
                          border: '1px solid var(--border-hairline)',
                        }}
                      >
                        +{mins}m
                      </button>
                    ))}
                    <input
                      type="text"
                      placeholder="Optional excused note..."
                      className="gravel-input"
                      style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', flex: 1, minWidth: 140 }}
                      value={currentRec.excusedNote || ''}
                      onChange={(e) => {
                        const note = e.target.value;
                        setAttendanceState(prev => ({
                          ...prev,
                          [student.id]: { ...prev[student.id], excusedNote: note }
                        }));
                      }}
                    />
                  </div>
                )}

                {/* NIOS 5-Session Practical PCP Grader [F-ATT-605] */}
                {(activeClass.sessionType === 'NIOS Mandatory Practical PCP' || subjectMeta?.hasPractical) && (
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                    <Award size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span>Practical PCP Formative Marks (0-10):</span>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      className="gravel-input font-mono"
                      style={{ width: 60, padding: '0.2rem 0.4rem', fontSize: '0.75rem' }}
                      defaultValue={8}
                      onChange={(e) => handleSetPcpMarks(student.id, Number(e.target.value))}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating Glass Submit Dock */}
      {enrolledStudents.length > 0 && (
        <div
          className="gravel-glass"
          style={{
            position: 'fixed',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '600px',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--card-radius)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
            zIndex: 40,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
              Submit Attendance ({enrolledStudents.length} Enrolled in [{activeSubjectCode}])
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
              [F-ATT-601] Caches offline and syncs automatically
            </div>
          </div>

          <button onClick={handleSubmit} className="gravel-btn gravel-btn-primary" style={{ fontSize: '0.82rem' }}>
            <Send size={14} /> Commit &amp; Lock Roll Call
          </button>
        </div>
      )}
    </div>
  );
};
